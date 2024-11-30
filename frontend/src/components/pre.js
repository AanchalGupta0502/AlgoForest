import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";

const PreorderTraversalTree = () => {
  const [treeData] = useState([
    {
      name: "1",
      children: [
        {
          name: "2",
          children: [
            { name: "4" },
            { name: "5" },
          ],
        },
        { name: "3" },
      ],
    },
  ]);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visitedEdges, setVisitedEdges] = useState([]); // Track visited edges

  // Preorder Traversal with delayed state update for animation
  const preorderTraversal = (node, visitedNodesList = [], visitedEdgesList = [], parent = null) => {
    if (node) {
      visitedNodesList.push(node.name); // Visit the node
      if (parent) {
        visitedEdgesList.push({ parent, child: node.name }); // Add the edge
      }
      if (node.children) {
        node.children.forEach((child) =>
          preorderTraversal(child, visitedNodesList, visitedEdgesList, node.name)
        );
      }
    }
    return { visitedNodesList, visitedEdgesList };
  };

  useEffect(() => {
    const { visitedNodesList, visitedEdgesList } = preorderTraversal(treeData[0]);
    setVisitedNodes(visitedNodesList);
    setVisitedEdges(visitedEdgesList);
  }, [treeData]);

  useEffect(() => {
    if (visitedNodes.length > 0 || visitedEdges.length > 0) {
      const intervalId = setInterval(() => {
        if (currentIndex < visitedNodes.length) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          clearInterval(intervalId); // Stop animation
        }
      }, 1000); // Delay of 1 second between each node/edge highlight
      return () => clearInterval(intervalId); // Cleanup on unmount
    }
  }, [visitedNodes, visitedEdges, currentIndex]);
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
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Section: Algorithms */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
          backgroundColor: "#f4f4f4",
          color: "black",
        }}
      >
        <h2>Algorithms</h2>
        <ul>
          <li>Preorder Traversal</li>
          <li>Inorder Traversal</li>
          <li>Postorder Traversal</li>
        </ul>
      </div>

      {/* Right Section: Tree Visualization */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <div style={{ width: "100%", height: "80%" }}>
          <h1 style={{ textAlign: "center", color: "black" }}>
            Preorder Traversal Animation </h1>
            <div id="treeWrapper" style={{ width: "100%", height: "500px", overflow: "hidden" }}>
          <Tree
            data={treeData}
            orientation="vertical"
            transitionDuration={500} 
            // Smooth transition
            translate={{
                x: dimensions.width / 2, // Center horizontally
                y: dimensions.height / 4, // Position closer to the top
              }}
              zoomable={true} // Enable zoom and pan
              scaleExtent={{ min: 0.5, max: 2 }} 
            renderCustomNodeElement={(rd3tProps) => {
              const { nodeDatum } = rd3tProps;
              const isVisited = visitedNodes
                .slice(0, currentIndex)
                .includes(nodeDatum.name);
                
              return (
                <g>
                  <circle
                    r="20"
                    fill={isVisited ? "red" : "white"} // Highlight visited nodes
                    stroke="black"
                    strokeWidth="2"
                    onClick={() =>
                      console.log(`Visited Node: ${nodeDatum.name}`)
                    }
                  />
                  <text
                    fill="black"
                    fontSize="12"
                    textAnchor="middle"
                    dy=".35em"
                  >
                    {nodeDatum.name}
                  </text>
                </g>
              );
            }}
            renderCustomLinkElement={(rd3tProps) => {
              const { source, target, path } = rd3tProps;
              const isVisited =
                visitedEdges
                  .slice(0, currentIndex - 1)
                  .some(
                    (edge) =>
                      edge.parent === source.data.name &&
                      edge.child === target.data.name
                  );
              return (
                <g>
                  <path
                    d={path}
                    fill="none"
                    stroke={isVisited ? "blue" : "aqua"} // Highlight visited edges
                    strokeWidth={isVisited ? 4 : 2} // Make visited edges thicker
                  />
                </g>
              );
            }}
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default PreorderTraversalTree;
