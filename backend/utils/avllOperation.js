const AVLNode = require('../model/avlTree');

// Helper function to calculate height
const getHeight = async (nodeId) => {
  if (!nodeId) return 0;
  const node = await AVLNode.findById(nodeId);
  if (!node) return 0;
  return node.height || 1;
};

// Helper function to calculate balance factor
const getBalanceFactor = async (nodeId) => {
  if (!nodeId) return 0;
  const node = await AVLNode.findById(nodeId);
  if (!node) return 0;

  const leftHeight = await getHeight(node.left);
  const rightHeight = await getHeight(node.right);

  return leftHeight - rightHeight;
};

// Update height of a node
const updateHeight = async (nodeId) => {
  const node = await AVLNode.findById(nodeId);
  if (!node) return;

  const leftHeight = await getHeight(node.left);
  const rightHeight = await getHeight(node.right);

  node.height = Math.max(leftHeight, rightHeight) + 1;
  await node.save();
};

// Left Rotate
const leftRotate = async (nodeId) => {
  const node = await AVLNode.findById(nodeId);
  if (!node || !node.right) return null;

  const rightChild = await AVLNode.findById(node.right);

  node.right = rightChild.left;
  rightChild.left = node._id;

  await updateHeight(node._id);
  await updateHeight(rightChild._id);

  await node.save();
  await rightChild.save();

  return rightChild._id;
};

// Right Rotate
const rightRotate = async (nodeId) => {
  const node = await AVLNode.findById(nodeId);
  if (!node || !node.left) return null;

  const leftChild = await AVLNode.findById(node.left);

  node.left = leftChild.right;
  leftChild.right = node._id;

  await updateHeight(node._id);
  await updateHeight(leftChild._id);

  await node.save();
  await leftChild.save();

  return leftChild._id;
};

// Rebalance tree
const rebalance = async (nodeId) => {
  const node = await AVLNode.findById(nodeId);
  if (!node) return null;

  await updateHeight(node._id);

  const balanceFactor = await getBalanceFactor(node._id);

  if (balanceFactor > 1) {
    // Left-heavy case
    const leftChild = await AVLNode.findById(node.left);
    const leftChildBalance = await getBalanceFactor(leftChild._id);

    if (leftChildBalance < 0) {
      // Left-Right case
      node.left = await leftRotate(node.left);
    }
    // Left-Left case
    return await rightRotate(node._id);
  }

  if (balanceFactor < -1) {
    // Right-heavy case
    const rightChild = await AVLNode.findById(node.right);
    const rightChildBalance = await getBalanceFactor(rightChild._id);

    if (rightChildBalance > 0) {
      // Right-Left case
      node.right = await rightRotate(node.right);
    }
    // Right-Right case
    return await leftRotate(node._id);
  }

  return node._id; // No rotations needed
};

// Insert node into AVL Tree
// Inside the insertNode function
const insertNode = async (value) => {
    const newNode = new AVLNode({ value: Number(value) }); // Ensure value is a Number
    let current = await AVLNode.findOne({ parent: null }); // Start at the root
  
    if (!current) {
      newNode.height = 1; // Root node height is 1
      await newNode.save();
      return newNode;
    }
  
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          newNode.parent = current._id;
          current.left = newNode._id;
          await current.save();
          await newNode.save();
          break;
        }
        current = await AVLNode.findById(current.left);
      } else {
        if (!current.right) {
          newNode.parent = current._id;
          current.right = newNode._id;
          await current.save();
          await newNode.save();
          break;
        }
        current = await AVLNode.findById(current.right);
      }
    }
  
    // Rebalance the tree upwards
    let nodeId = newNode.parent;
    while (nodeId) {
      nodeId = await rebalance(nodeId);
      const parent = await AVLNode.findById(nodeId);
      nodeId = parent?.parent || null;
    }
  
    return newNode;
  };
  
// Function to find the node with the minimum value in a subtree
const findMin = async (nodeId) => {
    let current = await AVLNode.findById(nodeId);
    while (current?.left) {
      current = await AVLNode.findById(current.left);
    }
    return current;
  };
  
  // Delete a node from AVL Tree
  const deleteNode = async (nodeId) => {
    const nodeToDelete = await AVLNode.findById(nodeId);
    if (!nodeToDelete) throw new Error("Node not found");
  
    // Case 1: No children (leaf node)
    if (!nodeToDelete.left && !nodeToDelete.right) {
      if (nodeToDelete.parent) {
        const parent = await AVLNode.findById(nodeToDelete.parent);
        if (parent.left?.toString() === nodeToDelete._id.toString()) {
          parent.left = null;
        } else {
          parent.right = null;
        }
        await parent.save();
      }
      await AVLNode.findByIdAndDelete(nodeId);
      return rebalanceUpwards(nodeToDelete.parent);
    }
  
    // Case 2: One child
    if (!nodeToDelete.left || !nodeToDelete.right) {
      const child = await AVLNode.findById(nodeToDelete.left || nodeToDelete.right);
      if (nodeToDelete.parent) {
        const parent = await AVLNode.findById(nodeToDelete.parent);
        if (parent.left?.toString() === nodeToDelete._id.toString()) {
          parent.left = child._id;
        } else {
          parent.right = child._id;
        }
        await parent.save();
      } else {
        child.parent = null; // If root node is being deleted
      }
      await child.save();
      await AVLNode.findByIdAndDelete(nodeId);
      return rebalanceUpwards(child.parent);
    }
  
    // Case 3: Two children
    const successor = await findMin(nodeToDelete.right); // Find in-order successor
    nodeToDelete.value = successor.value; // Copy the successor's value
    await nodeToDelete.save();
    return deleteNode(successor._id); // Recursively delete the successor
  };  

module.exports = {
  insertNode,
  deleteNode,
  leftRotate,
  rightRotate,
  rebalance,
};
