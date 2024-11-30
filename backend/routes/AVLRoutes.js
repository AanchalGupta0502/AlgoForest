const express = require('express');
const router = express.Router();
const AVLNode = require('../model/avlTree');  // Assuming AVL Node model
const { insertNode, deleteNode, rebalance } = require('../utils/avllOperation');

const buildAVLTree = async (nodeId) => {
    if (!nodeId) return null;
  
    const node = await AVLNode.findById(nodeId);
    if (!node) return null;
  
    // Recursively build left and right subtrees
    const leftChild = await buildAVLTree(node.left);
    const rightChild = await buildAVLTree(node.right);
  
    return {
      id: node._id.toString(),
      value: node.value,
      height: node.height, // Include height information for AVL-specific visualization
      left: leftChild,
      right: rightChild || null, // Explicitly return null if no right child exists
    };
  };
// GET route to fetch AVL tree root
router.get('/', async (req, res) => {
  try {
    const rootNode = await AVLNode.findOne();  // Assuming root node exists
    if (!rootNode) {
        return res.status(404).json({ message: 'Tree is empty' });
      }
        const tree = await buildAVLTree(rootNode._id);
      res.json(tree);
  } catch (err) {
    console.error("Error getting AVL tree:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST route to add a node to AVL tree
router.post('/add', async (req, res) => {
  const { value } = req.body;
  try {
    let root = await AVLNode.findOne(); // Find the root node

    if (!root) {
      const newNode = new AVLNode({ value });
      await newNode.save();
      return res.json(newNode);
    }

    // Insert node and balance tree
    root = await insertNode(root, value);
    root = await rebalance(root);

    await root.save();
    res.json(root);
  } catch (err) {
    console.error("Error adding node to AVL tree:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE route to remove a node from AVL tree
router.delete('/:id', async (req, res) => {
  try {
    const nodeId = req.params.id;
    const nodeToDelete = await AVLNode.findByIdAndDelete(nodeId);

    if (!nodeToDelete) {
      return res.status(404).json({ error: 'Node not found' });
    }

    // Rebalance tree after deletion
    const rootNode = await AVLNode.findOne();
    const balancedRoot = await rebalance(rootNode);
    await balancedRoot.save();

    res.json({ message: 'Node deleted and tree rebalanced' });
  } catch (err) {
    console.error("Error deleting node:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
