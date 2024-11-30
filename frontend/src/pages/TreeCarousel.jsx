import React from 'react';
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "../styles/carousel.css"; 
//import '../components/TreeVisualizer.jsx';

const TreeCarousel = () => {
   //const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
      };
    
      const slides = [
        {
          title: "Binary Search Tree",
          content:`A Binary Search Tree (BST) is a node-based binary tree structure having left subtree which contains nodes with values smaller than the node’s value, right subtree which contains nodes with values greater than the node’s value and no duplicate values ensures each value in the tree is unique.
    BSTs enable efficient searching, insertion, and deletion with average time complexity O(log n).`,
          bg: "linear-gradient(90deg, #2563eb, #3b82f6)",
          visualiserPath:"/bst-Visualiser",
    
        },
        {
          title: "PreOrder Traversal",
          content: "Preorder traversal is a traversal technique in which the nodes are visited as the root node firstly then the left subtree and right subtree are traversed one by one. It visits nodes in the same order they are created. It is commonly used for creating or reconstructing trees.",
          bg: "linear-gradient(90deg, #10b981, #3b82f6)",
          visualiserPath:"/preorder-Visualiser",
        },
        {
          title: "PostOrder Traversal",
          content: "Postorder traversal is a tree traversal technique in which the nodes are visited in the following order: the left subtree is traversed first, followed by the right subtree, and finally, the root node. It is commonly used in applications such as deleting trees, evaluating expressions, or converting expressions into postfix notation.",
          bg: "linear-gradient(90deg, #60a5fa, #1e3a8a)",
          visualiserPath:"/postorder-Visualiser",
        },
        {
            title: "InOrder Traversal",
            content:`Inorder traversal is a traversal technique where the nodes are visited in this specific order: the left subtree is traversed first, followed by the root node, and finally the right subtree. It is widely used to retrieve tree elements in a sorted order, especially for binary search trees.`,
            bg: "linear-gradient(90deg, #2563eb, #3b82f6)",
            visualiserPath:"/inorder-Visualiser",
        },
        {
            title: "AVL Tree",
            content:`An AVL Tree is a self-balancing Binary Search Tree (BST) where the difference in height between the left and right subtrees (called the balance factor) of any node is at most 1. Balance factor is called as the difference between the height of the left subtree and the right subtree. Rotations (left, right, or a combination) are performed to maintain balance after insertions or deletions. Guarantees O(log n) time complexity for insertion, deletion and searching operations.`,
            bg: "linear-gradient(90deg, #2563eb, #3b82f6)",
            visualiserPath:"/avl-tree-Visualiser",
        },
      ];
      const openVisualizer = (path) => {
        window.open(path, "_blank"); // Opens the visualizer in a new tab
      };
      /*
const openPreorderVisualiser = () => {
  window.open("/preorder-visualiser", "_blank");
};
const openInorderVisualiser=()=>{
  window.open("/inorder-visualiser","_blank");
}*/
      return (
        <div className="carousel-container">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slide" style={{ background: slide.bg }}>
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.content}</p>
              {/* Add the Visualize Button */}
              <button
                className="visualize-btn"
                onClick={() => openVisualizer(slide.visualiserPath)}
              >
                Visualize
              </button>
            </div>
          </div>
        ))}
      </Slider>
      </div>
    );
}
export default TreeCarousel;