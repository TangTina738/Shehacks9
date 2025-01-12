import React from 'react';
import './TutorialPage.css';

function TutorialPage() {
  return (
    <div className="tutorial-page">
      {/* Header Section */}
      <header className="header">
        <h1 className="mainHeader">
          Use hand gestures to trigger effects<br />
          and immerse yourself in your audio experience.
        </h1>
      </header>

      {/* New Gesture Section */}
      <section className="gesture-section">
        {/* Gesture 1 */}
        <div className="gesture-container">
          <div className="gesture-circle">
            <img
              src="gesture1.png"
              alt="Gesture One"
              className="gesture-image"
            />
            <p className="alt-text">Gesture One</p>
          </div>
          <div className="gesture-text">
            <h2>Reverb</h2>
            <p>Use gestures to add depth and ambiance to your recordings.</p>
          </div>
        </div>

        {/* Gesture 2 */}
        <div className="gesture-container reverse">
          <div className="gesture-circle">
            <img
              src="gesture2.png"
              alt="Gesture Two"
              className="gesture-image"
            />
            <p className="alt-text">Gesture Two</p>
          </div>
          <div className="gesture-text">
            <h2>Delay</h2>
            <p>Create echo effects with just a simple swipe of your hand.</p>
          </div>
        </div>

        {/* Gesture 3 */}
        <div className="gesture-container">
          <div className="gesture-circle">
            <img
              src="gesture3.png"
              alt="Gesture Three"
              className="gesture-image"
            />
            <p className="alt-text">Gesture Three</p>
          </div>
          <div className="gesture-text">
            <h2>Distortion</h2>
            <p>Make your vocals edgy and bold with a quick hand gesture.</p>
          </div>
        </div>

        {/* Gesture 4 */}
        <div className="gesture-container reverse">
          <div className="gesture-circle">
            <img
              src="gesture4.png"
              alt="Gesture Four"
              className="gesture-image"
            />
            <p className="alt-text">Gesture Four</p>
          </div>
          <div className="gesture-text">
            <h2>Pitch Shift</h2>
            <p>Control pitch effortlessly for creative and dynamic effects.</p>
          </div>
        </div>

        {/* Gesture 5 */}
        <div className="gesture-container">
          <div className="gesture-circle">
            <img
              src="gesture5.png"
              alt="Gesture Five"
              className="gesture-image"
            />
            <p className="alt-text">Gesture Five</p>
          </div>
          <div className="gesture-text">
            <h2>Harmony</h2>
            <p>Add harmonies to your voice for a fuller, richer sound.</p>
          </div>
        </div>
      </section>

      <div>
        <div>
            <h2>Let's walk you through how to use Syncd</h2>
        </div>
      </div>
    </div>
  );
}

export default TutorialPage;
