
import { useRef, useState } from 'react';
import * as Tone from 'tone';

export function useRecorder() {
  const [state, setState] = useState({
    blob: null,
    isRecording: false,
  });

  const recorder = useRef();

  const startRecording = async () => {
    if (!recorder.current) return;
    await recorder.current.start();
    setState(prev => ({ ...prev, isRecording: true }));
  };

  const stopRecording = async () => {
    if (!recorder.current || !state.isRecording) return;
    const recording = await recorder.current.stop();
    setState({ blob: recording, isRecording: false });
  };

  const downloadRecording = () => {
    if (!state.blob) return;
    const url = URL.createObjectURL(state.blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'voice-effects-recording.webm';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return {
    state,
    actions: {
      startRecording,
      stopRecording,
      downloadRecording,
    },
  };
}
