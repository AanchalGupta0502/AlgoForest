import React, { useState, useEffect, useCallback } from "react";
import Tree from "react-d3-tree";
import { getAVLTree, addAVLNode, deleteAVLNode } from "../api"; // AVL-specific APIs

const AVLTreeVisualizer = () => {
  const [treeData, setTreeData] = useState(null);

  // Fetch tree data from the backend
  const fetchTreeData = useCallback(async () => {
    try {
      const { data } = await getAVLTree();
      setTreeData(formatTree(data)); // Format the tree data for rendering
    } catch (err) {
      console.error("Error fetching AVL tree data:", err);
    }
  }, []);

  // Helper function to format the tree data into a structure compatible with react-d3-tree
  const formatTree = (node) => {
    if (!node || !node.value) return null;
    return {
      name: node.value.toString(),
      id: node.id, // Store the node ID here
      children: [
        node.left ? formatTree(node.left) : null,
        node.right ? formatTree(node.right) : null,
      ].filter(Boolean),
    };
  };

  useEffect(() => {
    fetchTreeData();
  }, [fetchTreeData]);

  // Add a new node to the AVL tree
  const handleAddNode = async () => {
    const value = parseInt(prompt("Enter node value:"), 10);
    if (!isNaN(value)) {
      try {
        await addAVLNode(value);
        fetchTreeData();
      } catch (err) {
        console.error("Error adding node to AVL tree:", err);
      }
    }
  };

  // Delete a node from the AVL tree
  const handleDeleteNode = async (nodeId) => {
    if (nodeId) {
      try {
        await deleteAVLNode(nodeId); // Send the node ID to delete
        fetchTreeData();
      } catch (err) {
        console.error("Error deleting node from AVL tree:", err);
      }
    }
  };

  return (
    <div>
      <button onClick={handleAddNode}>Add Node</button>
      <div id="treeWrapper" style={{ width: "100%", height: "500px" }}>
        {treeData && (
          <Tree
            data={treeData}
            orientation="vertical"
            renderCustomNodeElement={(rd3tProps) => {
              const { nodeDatum } = rd3tProps;
              return (
                <g>
                  <circle
                    r="30"
                    fill="#4CAF50" // Green for AVL nodes
                    onClick={() => handleDeleteNode(nodeDatum.id)}
                  />
                  <text fill="#FFFFFF" fontSize="12" dy="-1em" textAnchor="middle">
                    {nodeDatum.name}
                  </text>
                </g>
              );
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AVLTreeVisualizer;
