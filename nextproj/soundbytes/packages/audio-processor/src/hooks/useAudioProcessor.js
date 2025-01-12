import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

export function useAudioProcessor() {
  const [state, setState] = useState({
    isAudioStarted: false,
    isMicActive: false,
    isRecording: false,
    currentEffect: 'reverb',
    effectAmount: 0.5,
    volume: 0.5,
  });

  const microphoneIn = useRef();
  const recorder = useRef();
  const effects = useRef();

  useEffect(() => {
    // Initialize audio nodes
    effects.current = {
      reverb: new Tone.Reverb({ decay: 4, wet: state.effectAmount }),
      delay: new Tone.FeedbackDelay({ delayTime: 0.3, feedback: state.effectAmount }),
      distortion: new Tone.Distortion({ distortion: state.effectAmount }),
      pitchShift: new Tone.PitchShift({ pitch: state.effectAmount * 12 }),
      harmonyUp: new Tone.PitchShift({ pitch: 4 }).connect(new Tone.Gain(0.4)),
      harmonyDown: new Tone.PitchShift({ pitch: -3 }).connect(new Tone.Gain(0.4)),
    };

    microphoneIn.current = new Tone.UserMedia();
    recorder.current = new Tone.Recorder();

    Object.values(effects.current).forEach(effect => effect.toDestination());

    return () => {
      microphoneIn.current?.close();
      Object.values(effects.current).forEach(effect => effect.dispose());
      recorder.current?.dispose();
    };
  }, [state.effectAmount]);

  const startAudio = async () => {
    await Tone.start();
    setState(prev => ({ ...prev, isAudioStarted: true }));
  };

  const toggleMicrophone = async () => {
    if (!microphoneIn.current) return;

    try {
      if (!state.isMicActive) {
        await microphoneIn.current.open();
        updateAudioChain();
        setState(prev => ({ ...prev, isMicActive: true }));
      } else {
        microphoneIn.current.close();
        setState(prev => ({ ...prev, isMicActive: false }));
      }
    } catch (error) {
      console.error('Failed to access microphone:', error);
      throw new Error('Microphone access denied');
    }
  };

  const updateAudioChain = () => {
    if (!microphoneIn.current || !effects.current || !recorder.current) return;

    microphoneIn.current.disconnect();
    microphoneIn.current.connect(recorder.current);

    switch (state.currentEffect) {
      case 'reverb':
        microphoneIn.current.connect(effects.current.reverb);
        break;
      case 'delay':
        microphoneIn.current.connect(effects.current.delay);
        break;
      case 'distortion':
        microphoneIn.current.connect(effects.current.distortion);
        break;
      case 'pitch':
        microphoneIn.current.connect(effects.current.pitchShift);
        break;
      case 'harmony':
        microphoneIn.current.connect(effects.current.harmonyUp);
        microphoneIn.current.connect(effects.current.harmonyDown);
        break;
    }
  };

  const setEffect = (effect) => {
    setState(prev => ({ ...prev, currentEffect: effect }));
    updateAudioChain();
  };

  const setEffectAmount = (amount) => {
    setState(prev => ({ ...prev, effectAmount: amount }));
    if (!effects.current) return;

    effects.current.reverb.wet.value = amount;
    effects.current.delay.feedback.value = amount;
    effects.current.distortion.distortion = amount;
    effects.current.pitchShift.pitch = amount * 12;
  };

  const setVolume = (volume) => {
    setState(prev => ({ ...prev, volume }));
    if (microphoneIn.current) {
      microphoneIn.current.volume.value = Math.log10(volume) * 20;
    }
  };

  return {
    state,
    actions: {
      startAudio,
      toggleMicrophone,
      setEffect,
      setEffectAmount,
      setVolume,
    },
  };
}
