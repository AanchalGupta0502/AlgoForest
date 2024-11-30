import React, { useState, useEffect, useCallback } from "react";
import Tree from "react-d3-tree";
import { getTree, addNode, deleteNode } from "../api";
import "../styles/tree.css"
const TreeVisualizer = () => {
  const [treeData, setTreeData] = useState(null);

  const fetchTreeData = useCallback(async () => {
    try {
      const { data } = await getTree();
      setTreeData(formatTree(data));
    } catch (err) {
      console.log(err);
    }
  }, []);

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
/*
  const handleAddNode = async () => {
    const value = parseInt(prompt("Enter node value:"), 10);
    if (!isNaN(value)) {
      await addNode(value);
      fetchTreeData();
    }
  };
*/
const[inputVisible,setInputVisible]=useState(false);
  const[nodeValue,setNodeValue]=useState("");

const handleAddNode=async()=>{
  if(!inputVisible){
    setInputVisible(true);
  }else{
    const value=parseInt(nodeValue,10);
    if(!isNaN(value)){
      await addNode(value);
    fetchTreeData();
    setNodeValue("");
    setInputVisible(false);
  }else{
    alert("please enter a valid number");
  }
  }
};
  const handleDeleteNode = async (nodeId) => {
    if (nodeId) {
      try{
        await deleteNode(nodeId); // Send node ID to delete
      fetchTreeData();
    }catch(err){
        console.error('error deleting node:',err);
        }
    }
  };
  

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    // Dynamically set the initial tree position based on the container size
    const wrapper = document.getElementById("treeWrapper");
    if (wrapper) {
      setDimensions({
        width: wrapper.offsetWidth,
        height: wrapper.offsetHeight,
      });
    }
  }, []);
  return (
    <div className="Visualiser" style={{display:"flex",height:"100vh"}}>
      <div className="left-section">
       <div className="code-snippet">
       <center><h2>Algorithm</h2></center>
            <pre>
                <code >
                    {`
    function insertNode(root, value):
      if root == null:
        return new Node(value)
      if value < root.value:
        root.left = insertNode(root.left, value)
      else if value > root.value:
        root.right = insertNode(root.right, value)
    return root
    }
                    ` 
                    }
                </code>
            </pre>
        </div>
      </div>
      <div className="right-section">
        <div className="tree-container">
      <h2 align="center">BST- Visualiser</h2>
      <div className="btns">
      <button className="add-btn" onClick={handleAddNode}>
                    {inputVisible?"Submit Node": "Add Node"}</button>
      <button className="del-text" disabled>Click on Node for deletion</button>
      </div>
      {inputVisible && (
        <div className="input-container">
          <input
            type="number"
            value={nodeValue}
            onChange={(e) => setNodeValue(e.target.value)}
            placeholder="Enter node value"
          />
        </div>
      )}
      <div id="treeWrapper" className="tree-wrapper" style={{ width: "100%", height: "500px" }}>
        {treeData && (
          <Tree
            data={treeData}
            orientation="vertical"
            translate={{
              x: dimensions.width / 2,
              y: dimensions.height / 8,
            }}
            
            renderCustomNodeElement={(rd3tProps) => {
              const { nodeDatum } = rd3tProps;
              console.log("node data",nodeDatum);
              return (
                <g>
                  <circle r="30" fill="white" onClick={() =>{
                    console.log("clicked node id:",nodeDatum.id);
                  handleDeleteNode(nodeDatum.id);} }/>
                  <text>{nodeDatum.name}</text>
                </g>
              );
            }}
          />
        )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default TreeVisualizer;
