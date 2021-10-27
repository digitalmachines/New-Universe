import React from "react";
import Header from './Header'; 
import Photo from './Photo'; 
import Footer from './Footer'; 
import "./App.css";
import './styles.css'; 

function App() {
  return (
    <div className="main-window">
      <Header/>
      <Photo/>      
    </div>
  );
}

export default App;
