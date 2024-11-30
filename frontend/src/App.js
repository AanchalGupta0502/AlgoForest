import React from 'react';
import { Routes, Route, BrowserRouter,useLocation} from "react-router-dom";
import MainContent from './pages/MainContent.jsx';
import Features from'./pages/Features.jsx';
import Header from './pages/Header.jsx';
import './styles/style.css';
import './index.css'
import TreeCarousel from "./pages/TreeCarousel.jsx";
import Footer from './pages/Footer.jsx';
import TreeVisualizer from './components/TreeVisualise';
//import HomePage from './pages/frontpage.';
import InOrderVisualiser from './components/inordervisualiser.js';
import PreorderVisualiser from './components/preordervisualiser.js';
import PostorderVisualiser from './components/postorderVisualise.js';
//import AVLVisualiser from './components/avlVisualiser';


function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <PageContent />
      </BrowserRouter>
      <Footer />
    </div>
  );
}

function PageContent() {
  const location = useLocation(); // Get the current location

  // Check if we are on the home page
  const isHomePage = location.pathname === "/";

  return (
    <>
      {isHomePage && (
        <>
          <MainContent />
          <Features />
        </>
      )}
      <Routes>
        <Route path="/" element={<TreeCarousel />} />
        <Route path="/preorder-visualiser" element={<PreorderVisualiser />} />
        <Route path="/inorder-visualiser" element={<InOrderVisualiser/>}/>
        <Route path="bst-visualiser" element={<TreeVisualizer/>}/>
        <Route path="/postorder-visualiser" element={<PostorderVisualiser/>}/>
{/*       <Route path="/postorder-visualiser" element={<PostOrderVisualiser/>}/> */}
      </Routes>
    </>
  );
}


export default App;

/*
 <HomePage/>
  <AVLVisualiser/>
<h1>Tree Visualizer</h1>
      <TreeVisualizer/>*/
