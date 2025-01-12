'use client'

import { useEffect, useRef } from 'react';
// import { Camera } from '@mediapipe/camera_utils';
import * as CameraUtils from '@mediapipe/camera_utils';

const Camera = CameraUtils.Camera;
import * as HandsModule from '@mediapipe/hands';
const Hands = HandsModule.Hands;


// import { Hands, Results } from '@mediapipe/hands';
import { Box } from '@chakra-ui/react';


export function GestureDetector({ onGestureDetected, webcamRef }) {
  const handsRef = useRef<Hands | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!webcamRef) return;

    const initializeDetector = async () => {
      try {
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
      } catch (err) {
        console.error('Failed to initialize hand detection:', err);
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
    drawLandmarks(results);
    
    const landmarks = results.multiHandLandmarks[0];
    const gesture = processHandGesture(landmarks);
    if (gesture !== 'none') {
      onGestureDetected(gesture);
    }
  };

  // Drawing and gesture processing functions...
  // [Previous implementation remains the same]

  return (
    <Box position="relative">
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />
    </Box>
  );
}
