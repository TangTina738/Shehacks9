import React from 'react';
import './TutorialPage.css';
import ProgressBar from "../../components/ProgressBar";

function TutorialPage() {
  return (
    <div className="tutorial-page">
            <ProgressBar/>

      {/* Header Section */}
      <header className="header">
        <h1 className="mainHeader">
          Use hand gestures to trigger effects and immerse yourself in your audio experience.
        </h1>
      </header>

      {/* New Gesture Section */}
      <section className="gesture-section">
        {/* Gesture 1 */}
        <div className="gesture-container">
          <div className="gesture-circle">
            <img
              src="/ReverbGesture.png"
              alt="Closed Fist Gesture"
              className="gesture-image"
            />
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
              src="/DistortionGesture.png"
              alt="Gesture Two"
              className="gesture-image"
            />
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
              src="/ReverbGesture.png"
              alt="Three Fingers Up Distortion Gesture"
              className="gesture-image"
            />
           
          </div>
          <div className="gesture-text">
            <h2>Distortion</h2>
            <p>Make your vocals edgy and bold with a quick hand gesture.</p>
          </div>
        </div>

        {/* Gesture 4 */}
        <div className="gesture-container reverse ">
          <div className="gesture-circle">
            <img
              src="/HarmonyGesture.png"
              alt="Four Fingers Up Harmony Gesture"
              className="gesture-image"
            />
          </div>
          <div className="gesture-text">
            <h2>Harmony</h2>
            <p>Add harmonies to your voice for a fuller, richer sound.</p>
          </div>
        </div>
      </section>

 {/* Step-by-step Tutorial Section */}
      <div>
        <h1 className="tutorialHeader">Explore how the app works step-by-step</h1>
        <div className="step-container">
          {/* Step 1 */}
          <div className="step">
            <div className="step-image">
              <img src="liveFeedPic.png" alt="Step 1" 
               style={{
                border: "15px solid rgba(194, 218, 244, 0.5)",  // Black border
                borderRadius: "25px",      // Curved edges (adjust the value as needed)
                padding: "5px",           // Optional: Add space between the border and image
                width: "100%",            // Optional: Ensures it scales properly
                height: "auto"            // Maintains aspect ratio
              }} 
              />

              <img
              src="Arrow1.png"
              alt="Squiggly Arrow Pointing to Mic Button"
              className="arrow1"
            />
            </div>
            <div className="step-text">
              <h2>1. Fine Tune your Mix before Recording</h2>
              <p>
              Before you start recording, fine-tune the sliders to achieve the ideal balance between effect intensity and recording volume, ensuring your audio sounds just the way you want it.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="step reverse">
            <div className="step-image overlap">
              <img src="AudioControls.png" alt="Step 2" />
            </div>
            <div className="step-text">
              <h2>2. Start Recording</h2>
              <p>Once you've allowed microphone + camera access and adjusted your sliders, you can press this button
              to record live input.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="step reverse">
            <div className="step-image">
              <img src="effects.png" alt="Step 3" />
            </div>
            <div className="step-text">
              <h2>3. Add Effects</h2>
              <p>
              In the control panel, you can see the effect being activated by your gestures as indicated by the change in colour of the corresponding button.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="step">
            <div className="step-image">
              <img src="your-image4.png" alt="Step 4" />
              <img
              src="Arrow2.png"
              alt="Squiggly Arrow Pointing to Sliders"
              className="arro2"
            />
            </div>
            <div className="step-text">
              <h2>4. Track your progress</h2>
              <p>Save your clip by pressing the microphone button again. The processed clip will be saved in the
              Timeline section at the bottom of your live feed.</p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="step">
            <div className="step-image">
              <img src="liveFeedPic.png" alt="Step 5" 
                style={{
                  border: "15px solid rgba(194, 218, 244, 0.5)",  // Black border
                  borderRadius: "25px",      // Curved edges (adjust the value as needed)
                  padding: "5px",           // Optional: Add space between the border and image
                  width: "100%",            // Optional: Ensures it scales properly
                  height: "auto"            // Maintains aspect ratio
                }} 
              />
              <img
              src="Arrow3.png"
              alt="Squiggly Arrow Pointing to Preview Mix Button"
              className="arrow3"
            />
            </div>
            <div className="step-text">
              <h2>5. Test your Mix</h2>
              <p>
                Your tracks are automatically layered upon finshing a recording. Preview your entire track with the applied effects before downloading it by pressing the button.
              </p>
            </div>
          </div>

          {/* Step 6 */}
          <div className="step reverse">
            <div className="step-image">
              
              <img
              src="Arrow4.png"
              alt="Squiggly Arrow Pointing to Download Track Button"
              className="arrow4"
            />
            </div>
            <div className="step-text">
              <h2>6. Download your Final Track</h2>
              <p>
                Once satisfied, download your fully mixed track using the 'Download Track' button under the Timeline. Share or save your creation instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorialPage;
