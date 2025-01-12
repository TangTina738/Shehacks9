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
              src="/ReverbGesture.png"
              alt="Closed Fist Gesture"
              className="gesture-image"
            />
            <p className="alt-text">Closed Fist Gesture</p>
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

 {/* Step-by-step Tutorial Section */}
      <div>
        <h1 className="tutorialHeader">Explore how the app works step-by-step</h1>
        <div className="step-container">
          {/* Step 1 */}
          <div className="step">
            <div className="step-image">
              <img src="your-image1.png" alt="Step 1" />
              <img
              src="./assets/Arrow1.png"
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
              <img src="your-image2.png" alt="Step 2" />
              <div className="gesture-overlay">Gesture Name</div>
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
              <img src="your-image3.png" alt="Step 3" />
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
              src="./assets/Arrow2.png"
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
              <img src="your-image5.png" alt="Step 5" />
              <img
              src="./assets/Arrow3.png"
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
              <img src="your-image6.png" alt="Step 6" />
              <img
              src="./assets/Arrow4.png"
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
