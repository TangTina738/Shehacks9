import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
import Webcam from "react-webcam";
import GestureDetector from './gesture-detector';
import { Card, Input } from '@chakra-ui/react';

export default function GestureTrainer() {
  const [isRecording, setIsRecording] = useState(false);
  const [gestureName, setGestureName] = useState('');
  const [recordedFrames, setRecordedFrames] = useState(0);
  const webcamRef = useRef(null);
//   const { toast } = useToast();
  const recordingTimeoutRef = useRef(null);
  const landmarksRef = useRef([]);

  const startRecording = () => {
    if (!gestureName) {
        alert("error")
    //   toast({
    //     title: "Error",
    //     description: "Please enter a gesture name",
    //     variant: "destructive",
    //   });
      return;
    }

    setIsRecording(true);
    setRecordedFrames(0);
    landmarksRef.current = [];

    // Record for 3 seconds
    recordingTimeoutRef.current = setTimeout(() => {
      stopRecording();
    }, 3000);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    if (recordingTimeoutRef.current) {
      clearTimeout(recordingTimeoutRef.current);
    }

    if (landmarksRef.current.length === 0) {
      toast({
        title: "Error",
        description: "No hand landmarks detected during recording",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('/api/gestures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gesture_name: gestureName,
          landmarks: landmarksRef.current[Math.floor(landmarksRef.current.length / 2)], // Use middle frame
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save gesture');
      }

      toast({
        title: "Success",
        description: `Gesture "${gestureName}" saved successfully`,
      });

      // Reset form
      setGestureName('');
      landmarksRef.current = [];
    } catch (error) {
      console.error('Error saving gesture:', error);
      toast({
        title: "Error",
        description: "Failed to save gesture",
        variant: "destructive",
      });
    }
  };

  const handleGestureDetected = (landmarks) => {
    if (isRecording) {
      landmarksRef.current.push(landmarks);
      setRecordedFrames(prev => prev + 1);
    }
  };

  return (
    <Card className="p-4">
      <h2 className="text-2xl font-bold mb-4">Train New Gesture</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Gesture Name</label>
          <Input
            type="text"
            value={gestureName}
            onChange={(e) => setGestureName(e.target.value)}
            placeholder="Enter gesture name"
            disabled={isRecording}
          />
        </div>

        <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
          <Webcam
            ref={webcamRef}
            mirrored
            className="w-full h-full object-cover"
          />
          {webcamRef.current && (
            <GestureDetector
              webcamRef={webcamRef.current.video}
              onGestureDetected={handleGestureDetected}
            />
          )}
          {isRecording && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full">
              Recording... ({recordedFrames} frames)
            </div>
          )}
        </div>

        <Button
          onClick={isRecording ? stopRecording : startRecording}
          className="w-full"
          variant={isRecording ? "destructive" : "default"}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Button>
      </div>
    </Card>
  );
}
