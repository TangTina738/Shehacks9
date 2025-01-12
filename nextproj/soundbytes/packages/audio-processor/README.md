# Gesture-Controlled Audio Processing

This package provides hooks and components for gesture-controlled audio effects processing using Tone.js and MediaPipe.

## Installation

1. Install the package and its dependencies:

```bash
npm install tone @mediapipe/hands @mediapipe/camera_utils react-webcam
```

2. Copy the following folders from this package to your project:
   - `packages/audio-processor/src/hooks`
   - `packages/audio-processor/src/types.ts`
   - `app/components/GestureDetector.tsx`
   - `app/components/AudioControls.tsx`

## Usage

Here's how to integrate with your Chakra UI frontend:

```tsx
import { useAudioProcessor } from './packages/audio-processor/src/hooks/useAudioProcessor';
import { useRecorder } from './packages/audio-processor/src/hooks/useRecorder';
import { GestureDetector } from './components/GestureDetector';
import { Button, Container, Flex, Grid, Text, useToast } from '@chakra-ui/react';

export default function AudioPage() {
  const { state: audioState, actions: audioActions } = useAudioProcessor();
  const { state: recordingState, actions: recordingActions } = useRecorder();
  const toast = useToast();

  const handleGestureDetected = (gesture: string) => {
    switch (gesture) {
      case 'fist':
        audioActions.setEffect('reverb');
        break;
      case 'pinch':
        if (!audioState.isMicActive) {
          audioActions.toggleMicrophone();
        }
        break;
      // Add more gesture handlers as needed
    }
  };

  return (
    <Grid
      p={8}
      gridTemplateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
      gridTemplateRows={{ base: "repeat(2, auto)", md: "auto" }}
      gap={4}
    >
      {/* Webcam View */}
      <Container bg="grey" rounded="lg" my={4} w="450px" h="300px" position="relative">
        <Webcam
          ref={webcamRef}
          mirrored
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {webcamRef.current && (
          <GestureDetector
            webcamRef={webcamRef.current.video}
            onGestureDetected={handleGestureDetected}
          />
        )}
      </Container>

      {/* Audio Controls */}
      <Grid gap={2}>
        <Container>
          <Text>Effect: {audioState.currentEffect}</Text>
          <Flex flexDir="row" justifyContent="space-evenly">
            {['reverb', 'delay', 'distortion', 'pitch', 'harmony'].map((effect) => (
              <Button
                key={effect}
                size="md"
                h="30px"
                p={4}
                color="#235375"
                bg={audioState.currentEffect === effect ? "#235375" : "#D9D9D9"}
                onClick={() => audioActions.setEffect(effect)}
              >
                <Text>{effect}</Text>
              </Button>
            ))}
          </Flex>
        </Container>

        <Container w="100%">
          <Text>Microphone</Text>
          <Button
            w="100%"
            bg={audioState.isMicActive ? "#C25454" : "#235375"}
            onClick={audioActions.toggleMicrophone}
          >
            <Text>{audioState.isMicActive ? "Stop Microphone" : "Start Microphone"}</Text>
          </Button>
        </Container>

        <Button
          w="250px"
          bg="#235375"
          onClick={recordingState.isRecording ? recordingActions.stopRecording : recordingActions.startRecording}
          isDisabled={!audioState.isMicActive}
        >
          {recordingState.isRecording ? "Stop Recording" : "Start Recording"}
        </Button>

        {recordingState.blob && (
          <Button
            bg="#235375"
            onClick={recordingActions.downloadRecording}
          >
            Download Recording
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
```

## Features

- Real-time audio effects processing
- Hand gesture control
- Audio recording and export
- Volume control
- Effect parameter adjustment
- Multiple audio effects:
  - Reverb
  - Delay
  - Distortion
  - Pitch shift
  - Harmony

## Gestures

- Fist: Switch to reverb effect
- Pinch: Toggle microphone
- Three fingers: Switch to harmony effect
- Two fingers: Switch to delay effect
- One finger: Switch to distortion effect

## API

### useAudioProcessor Hook

```typescript
const { state, actions } = useAudioProcessor();

// State
state.isAudioStarted: boolean
state.isMicActive: boolean
state.currentEffect: 'reverb' | 'delay' | 'distortion' | 'pitch' | 'harmony'
state.effectAmount: number
state.volume: number

// Actions
actions.startAudio(): Promise<void>
actions.toggleMicrophone(): Promise<void>
actions.setEffect(effect: AudioEffect): void
actions.setEffectAmount(amount: number): void
actions.setVolume(volume: number): void
```

### useRecorder Hook

```typescript
const { state, actions } = useRecorder();

// State
state.blob: Blob | null
state.isRecording: boolean

// Actions
actions.startRecording(): Promise<void>
actions.stopRecording(): Promise<void>
actions.downloadRecording(): void
```

## Dependencies

- tone: ^14.7.77
- @mediapipe/hands: ^0.4.1646424915
- @mediapipe/camera_utils: ^0.3.1620248972
- react-webcam: ^7.0.1

## Notes

- Ensure you have microphone permissions enabled in your browser
- The webcam feed is required for gesture detection
- Audio effects are processed in real-time using Tone.js
