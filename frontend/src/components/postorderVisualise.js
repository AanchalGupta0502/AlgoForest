import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";
import "../styles/tree.css";

const PostOrderTraversalTree = () => {
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

  // Postorder Traversal with delayed state update for animation
  const postOrderTraversal = (node, visitedNodesList = [], visitedEdgesList = [], parent = null) => {
    if (node) {
      if (node.children) {
        node.children.forEach((child) =>
          postOrderTraversal(child, visitedNodesList, visitedEdgesList, node.name)
        );
      }
      visitedNodesList.push(node.name); // Visit the node after its children
      if (parent) {
        visitedEdgesList.push({ parent, child: node.name }); // Add the edge
      }
    }
    return { visitedNodesList, visitedEdgesList };
  };

  useEffect(() => {
    const { visitedNodesList, visitedEdgesList } = postOrderTraversal(treeData[0]);
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
    <div className="Visualiser" style={{ display: "flex", height: "100vh" }}>
      {/* Left Section: Algorithms */}
      <div className="left-section">
        <div className="code-snippet">
          <center><h2>Algorithm</h2></center>
          <pre>
            <code>
              {`
        function postOrderTraversal(root) {
            if (root === null) return;
            postOrderTraversal(root.left);
            postOrderTraversal(root.right);
            console.log(root.value);
        }
              `}
            </code>
          </pre>
        </div>
      </div>

      <div className="right-section">
        <div className="tree-container">
          <h2 align="center">Postorder Traversal Animation</h2>
          <div id="treeWrapper" className="tree-wrapper">
            <Tree
              data={treeData}
              orientation="vertical"
              transitionDuration={500}
              translate={{
                x: dimensions.width / 2,
                y: dimensions.height / 8,
              }}
              zoomable={true}
              scaleExtent={{ min: 0.5, max: 2 }}
              renderCustomNodeElement={(rd3tProps) => {
                const { nodeDatum } = rd3tProps;
                const isVisited = visitedNodes.slice(0, currentIndex).includes(nodeDatum.name);

                return (
                  <g>
                    <circle
                      r="20"
                      className="node-circle"
                      fill={isVisited ? "red" : "white"}
                      onClick={() =>
                        console.log(`Visited Node: ${nodeDatum.name}`)
                      }
                    />
                    <text dy=".35 em" className="node-text">{nodeDatum.name}</text>
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
                      className={`edge-path ${isVisited ? "visited" : ""}`}
                      d={path}
                      stroke={isVisited ? "blue" : "aqua"}
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

export default PostOrderTraversalTree;
