import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "../styles/frontpage.css"; // Add custom styling here for visuals

const FrontPage = () => {
  return (
    <Router>
      <div className="front-page">
        {/* Header Section */}
        <header className="header">
          <h2 className="title">AlgoForest</h2>
          <p className="tagline">Explore. Learn. Visualize.</p>
        </header>

        {/* Hero Section */}
        <section className="hero">
         
          <p className="hero-text">
            Dive into the world of algorithms and data structures with Our AlgoForest.
            Visualize concepts, master algorithms, and ace your <em>placements</em> with our
            interactive learning tools.
          </p>
          <img
            //src={require("../images/pexels-cottonbro-5473956.jpg")}
            alt="AlgoForest Hero"
            className="hero-image"
          />
          <Link to="/tree-visualizer" className="cta-button">
            Start Exploring
          </Link>
        </section>

        {/* Features Section */}
        <section className="features">
          <h2>Why AlgoForest?</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <h3>Interactive Tree Visualizations</h3>
              <p>Learn tree algorithms like never before with intuitive visualizations.</p>
            </div>
            <div className="feature-card">
              <h3>Step-by-Step Algorithm Guides</h3>
              <p>Understand complex algorithms with detailed explanations and examples.</p>
            </div>
            <div className="feature-card">
              <h3>Placement Focused</h3>
              <p>Prepare for coding interviews with curated challenges and problems.</p>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="footer">
          <p>© 2024 AlgoForest. All Rights Reserved.</p>
          <nav>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </nav>
        </footer>
      </div>
    </Router>
  );
};

export default FrontPage;
