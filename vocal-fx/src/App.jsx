import { useState } from 'react';
import './App.css';
import girlImg from './assets/girl.jpg';

function App() {
  return (
    // This contains the launching page, with the image and info
    <div className="app">
      <div className="content-container">
        <div id="txt">
          <h1 className="slogan">Music in the palm of<br />your hands.</h1>
          <p>Here, you can make the music of your dreams..</p>
          <button>Create Here</button>
        </div>

        <div className="image-div">
          <img src={girlImg} alt="topImg" />
        </div>
      </div>
      
      <div className="about-us">
        <h1 id="aboutUs">Why Use Synced?</h1>
        
      </div>
    </div>

    

  );
}

export default App;
