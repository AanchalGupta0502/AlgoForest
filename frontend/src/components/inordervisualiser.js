import React, {useState, useEffect} from 'react';
import Tree from 'react-d3-tree';
import "../styles/tree.css";

const InorderTraversalTree = () => {
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
    const [visitedEdges, setVisitedEdges] = useState([]);

    const inorderTraversal = (node, visitedNodesList = [], visitedEdgesList = [], parent = null) => {
        if (node) {
            if (node.children && node.children[0]) {
                inorderTraversal(node.children[0], visitedNodesList, visitedEdgesList, node.name);
            }
            visitedNodesList.push(node.name);
            if (parent) {
                visitedEdgesList.push({ parent, child: node.name });
            }
            if (node.children && node.children[1]) {
                inorderTraversal(node.children[1], visitedNodesList, visitedEdgesList, node.name);
            }
        }
        return { visitedNodesList, visitedEdgesList };
    };

    useEffect(() => {
        const { visitedNodesList, visitedEdgesList } = inorderTraversal(treeData[0]);
        setVisitedNodes(visitedNodesList);
        setVisitedEdges(visitedEdgesList);
    }, [treeData]);

    useEffect(() => {
        if (visitedNodes.length > 0 || visitedEdges.length > 0){
            const intervalId = setInterval(() => {
                if (currentIndex < visitedNodes.length) {
                    setCurrentIndex((prev) => prev + 1);
                } else {
                    clearInterval(intervalId);
                }
            }, 1000);
            return() => clearInterval(intervalId);
        }
    }, [ visitedNodes, visitedEdges, currentIndex ]);

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    useEffect(() => {
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
             {/* Left Section: Algorithm */}
             <div className='left-section'>
                <div className='code-snippet'>
                    <center>
                        <h2>Algorithm</h2>
                    </center>
                    <pre>
                        <code>
                            {`
        function inOrderTraversal(root){
            if (root == null) return;
            inOrderTraversal(root.left);
            console.log(root.value);
            inOrderTravesal(root.right);
        }
                            `}
                        </code>
                    </pre>
                </div>
             </div>

            {/* Right Section: Tree Visualization */}
            <div className='right-section'>
                <div className='tree-container'>
                    <h2 align="center">Inorder Traversal Animation</h2>
                    <div id = "treeWrapper" className = "tree-wrapper">
                        <Tree
                            data = {treeData}
                            orientation = "vertical"
                            transitionDuration = {500}
                            translate={{
                                x: dimensions.width / 2,
                                y: dimensions.height / 8,
                            }}
                            zoomable = {true}
                            scaleExtent={{ min: 0.5, max: 2 }}
                            renderCustomNodeElement={(rd3tProps) => {
                                const { nodeDatum } = rd3tProps;
                                const isVisited = visitedNodes.slice(0, currentIndex).includes(nodeDatum.name);
                                
                                return(
                                    <g>
                                        <circle
                                            r="20"
                                            className="node-circle"
                                            fill={isVisited ? "red" : "white"}
                                            onClick={() =>
                                                console.log(`Visited Node: ${nodeDatum.name}`)
                                            }
                                        />
                                        <text className="node-text" dy="0.35em">{ nodeDatum.name }</text>
                                    </g>
                                );
                            }}

                            renderCustomLinkElement={(rd3tProps) => {
                                const { source, target, path } = rd3tProps;
                                const isVisited = visitedEdges
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
                                        stroke={isVisited ? "green" : "blue"}
                                      />
                                    </g>
                                );
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InorderTraversalTree;