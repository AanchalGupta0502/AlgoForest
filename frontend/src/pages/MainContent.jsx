import React from 'react';

const MainContent = () => {
    return (
        <main className="main-content">
          <div className="text-content">
            <center><h1>Dive Into the World of Algorithms with Dynamic Tree Visualizations</h1></center>
            <p>
            Visualize concepts, master algorithms, and ace your <em>placements</em> with our
            interactive learning tools. Whether you are learning about Binary Search Trees, AVL Trees, or Heap structures, AlgoForest aims to make complex tree algorithms easy to understand by visualizing their operations in real-time.
            </p>
            <div className="btn-group">
                <button className="btn-primary">Get started</button>
                <button className="btn-secondary">View on GitHub</button>
            </div>
          
          </div>
          <div className="code-snippet">
            <pre>
                <code>
                    {`
        function inOrderTraversal(root) {
            if (root === null) return;
            inOrderTraversal(root.left);
            console.log(root.value);
            inOrderTraversal(root.right);
        }
                    ` 
                    }
                </code>
            </pre>
           </div>
        </main>
    );
}
export default MainContent;