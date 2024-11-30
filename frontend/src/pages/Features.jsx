import React from 'react';

const Features = () => {
    return(
        <section className="features">
          <center><h2>Why AlgoForest?</h2></center>
          <div className="feature-cards">
            <div className="feature-card">
              <h3>Interactive Tree Visualizations</h3>
              <p>Dive into the world of data structures with dynamic, interactive tree visualizations. 
        Visualize how each step in the algorithm transforms the tree, and manipulate nodes in real-time 
        to understand their behavior. Perfect for students and professionals seeking clarity in tree algorithms.</p>
            </div>
            <div className="feature-card">
              <h3>Step-by-Step Algorithm Guides</h3>
              <p>Master tree algorithms with easy-to-follow, step-by-step guides. 
        Each guide breaks down complex logic into digestible steps, supported with animations and practical examples, ensuring you build a solid foundation for advanced problem-solving.</p>
            </div>
            <div className="feature-card">
              <h3>Placement Focused</h3>
              <p>Accelerate your preparation for coding interviews with a curated selection of tree-related challenges. Solve problems inspired by real-world placement tests, and track your progress with our analytics tools 
        to ensure you're interview-ready.</p>
            </div>
          </div>
        </section>
    );
}

export default Features