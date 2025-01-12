import { useEffect, useRef, useState } from 'react';
// import { Camera } from '@mediapipe/camera_utils';
import * as CameraUtils from '@mediapipe/camera_utils';

const Camera = CameraUtils.Camera;
import * as HandsModule from '@mediapipe/hands';
const Hands = HandsModule.Hands;

export default function GestureDetector({ onGestureDetected, webcamRef, showLandmarks = true }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const handsRef = useRef(null);
  const cameraRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!webcamRef) return;

    const initializeDetector = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Initialize MediaPipe Hands
        const hands = new Hands({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
          }
        });

        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        hands.onResults(onResults);
        handsRef.current = hands;

        // Initialize camera
        const camera = new Camera(webcamRef, {
          onFrame: async () => {
            if (handsRef.current) {
              await handsRef.current.send({ image: webcamRef });
            }
          },
          width: 640,
          height: 480
        });

        cameraRef.current = camera;
        await camera.start();
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to initialize hand detection:', err);
        setError('Failed to load hand detection. Please refresh the page.');
        setIsLoading(false);
      }
    };

    initializeDetector();

    return () => {
      cameraRef.current?.stop();
      handsRef.current?.close();
    };
  }, [webcamRef]);

  const onResults = (results) => {
    if (!results.multiHandLandmarks?.length) return;

    if (showLandmarks) {
      drawLandmarks(results);
    }

    const landmarks = results.multiHandLandmarks[0];
    const gesture = processHandGesture(landmarks);
    if (gesture !== 'none') {
      onGestureDetected(gesture);
    }
  };

  const drawLandmarks = (results) => {
    if (!canvasRef.current || !webcamRef) return;
  
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Set canvas size to match video
    canvas.width = webcamRef.videoWidth;
    canvas.height = webcamRef.videoHeight;
  
    // Apply horizontal flip to the context
    ctx.save();
    ctx.scale(-1, 1); // Flip horizontally
    ctx.translate(-canvas.width, 0); // Adjust drawing position after flip
  
    // Draw landmarks
    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        // Draw hand connections
        drawConnectors(ctx, landmarks);
        // Draw landmark points
        drawLandmarkPoints(ctx, landmarks);
      }
    }
  
    ctx.restore();
  };
  

  const drawConnectors = (ctx, landmarks) => {
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
      [0, 5], [5, 6], [6, 7], [7, 8], // Index finger
      [0, 9], [9, 10], [10, 11], [11, 12], // Middle finger
      [0, 13], [13, 14], [14, 15], [15, 16], // Ring finger
      [0, 17], [17, 18], [18, 19], [19, 20], // Pinky
      [0, 5], [5, 9], [9, 13], [13, 17], // Palm
    ];

    ctx.strokeStyle = 'rgba(0, 255, 0, 0.8)';
    ctx.lineWidth = 3;

    for (const [i, j] of connections) {
      const start = landmarks[i];
      const end = landmarks[j];

      if (!start || !end) continue;

      ctx.beginPath();
      ctx.moveTo(start.x * ctx.canvas.width, start.y * ctx.canvas.height);
      ctx.lineTo(end.x * ctx.canvas.width, end.y * ctx.canvas.height);
      ctx.stroke();
    }
  };

  const drawLandmarkPoints = (ctx, landmarks) => {
    ctx.fillStyle = 'rgb(255, 0, 0)';

    for (const landmark of landmarks) {
      const x = landmark.x * ctx.canvas.width;
      const y = landmark.y * ctx.canvas.height;

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  const prevHandCenterRef = useRef(0);
  
  const processHandGesture = (landmarks) => {
    // Get fingertip and base positions
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];

    const indexBase = landmarks[5];
    const middleBase = landmarks[9];
    const ringBase = landmarks[13];
    const pinkyBase = landmarks[17];

    // Calculate distances from fingertips to their bases
    const fingerDistances = [
      calculateDistance(indexTip, indexBase),
      calculateDistance(middleTip, middleBase),
      calculateDistance(ringTip, ringBase),
      calculateDistance(pinkyTip, pinkyBase)
    ];

    // Check if all fingers are curled (fist)
    const isFist = fingerDistances.every(distance => distance < 0.1);
    if (isFist) return 'fist';

    // Check for pinch gesture
    const thumbIndexDistance = calculateDistance(thumbTip, indexTip);
    if (thumbIndexDistance < 0.05) return 'pinch';

    // Check for swipe left
    const handCenter = landmarks[0];
    if (handCenter.x < prevHandCenterRef.current - 0.2) {
      prevHandCenterRef.current = handCenter.x;
      return 'swipe_left';
    }
    prevHandCenterRef.current = handCenter.x;

    // Check for number of fingers up
    const indexUp = calculateDistance(indexTip, indexBase) > 0.1;
    const middleUp = calculateDistance(middleTip, middleBase) > 0.1;
    const ringUp = calculateDistance(ringTip, ringBase) > 0.1;
    const pinkyUp = calculateDistance(pinkyTip, pinkyBase) > 0.1;

    const upFingers = [indexUp, middleUp, ringUp, pinkyUp].filter(Boolean).length;

    if (upFingers === 2) return 'two_fingers';
    if (upFingers === 1) return 'one_finger';
    if (indexUp && middleUp && ringUp && !pinkyUp) return 'three_fingers';

    return 'none';
  };

  const calculateDistance = (
    point1, point2
  ) => {
    return Math.sqrt(
      Math.pow(point1.x - point2.x, 2) +
      Math.pow(point1.y - point2.y, 2)
    );
  };

  if (error) {
    console.log("gesture error")
    return <div className="text-red-500">{error}</div>;
  }

  if (isLoading) {
    return <div className="text-blue-500">Loading hand detection model...</div>;
  }

  return (
//    <div className="absolute top-0 left-0 h-full w-full">
//    {showLandmarks && (
     <canvas
       ref={canvasRef}
       style={{
         zIndex: 10, // Ensure canvas is above the webcam
         position: 'absolute', // Position it on top
         top: 0,
         left: 0,
         width: '50%',
         height: '100%',
       }}
     />
//    )}
//  </div>
  );
}
