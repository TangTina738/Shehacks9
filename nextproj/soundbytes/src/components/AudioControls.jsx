import { useRef } from 'react';
import {
  Button,
  Container,
  Flex,
  Grid,
  Text,
//   useToast
} from '@chakra-ui/react';
import { Slider } from '@chakra-ui/slider';
import Webcam from 'react-webcam';
import { useAudioProcessor } from '@/packages/audio-processor';
import { useRecorder } from '@/packages/audio-processor';
import { GestureDetector } from './GestureDetector';

const ModeBtn = ({ children, isActive, onClick }) => {
  return (
    <Button
      size="md"
      h="30px"
      p={4}
      color="#235375"
      bg={isActive ? "#235375" : "#D9D9D9"}
      _hover={{ bg: isActive ? "#1a3f5a" : "#c4c4c4" }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export function AudioControls() {
  const webcamRef = useRef<Webcam>(null);
// //   const toast = useToast();
  
  const { state: audioState, actions: audioActions } = useAudioProcessor();
  const { state: recordingState, actions: recordingActions } = useRecorder();

  const handleGestureDetected = (gesture) => {
    switch (gesture) {
      case 'fist':
        audioActions.setEffect('reverb');
        break;
      case 'pinch':
        if (!audioState.isMicActive) {
          audioActions.toggleMicrophone();
        }
        break;
      case 'three_fingers':
        audioActions.setEffect('harmony');
        break;
      case 'two_fingers':
        audioActions.setEffect('delay');
        break;
      case 'one_finger':
        audioActions.setEffect('distortion');
        break;
    }
  };

  const handleMicrophoneToggle = async () => {
    try {
      await audioActions.toggleMicrophone();
    } catch (error) {
    //   toast({
    //     title: 'Error',
    //     description: 'Failed to access microphone. Please check permissions.',
    //     status: 'error',
    //     duration: 3000,
    //   });
    alert("please update permissions")
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
            <ModeBtn
              isActive={audioState.currentEffect === 'reverb'}
              onClick={() => audioActions.setEffect('reverb')}
            >
              <Text>Reverb</Text>
            </ModeBtn>
            <ModeBtn
              isActive={audioState.currentEffect === 'delay'}
              onClick={() => audioActions.setEffect('delay')}
            >
              <Text>Delay</Text>
            </ModeBtn>
            <ModeBtn
              isActive={audioState.currentEffect === 'distortion'}
              onClick={() => audioActions.setEffect('distortion')}
            >
              <Text>Distortion</Text>
            </ModeBtn>
            <ModeBtn
              isActive={audioState.currentEffect === 'pitch'}
              onClick={() => audioActions.setEffect('pitch')}
            >
              <Text>Pitch Shift</Text>
            </ModeBtn>
            <ModeBtn
              isActive={audioState.currentEffect === 'harmony'}
              onClick={() => audioActions.setEffect('harmony')}
            >
              <Text>Harmony</Text>
            </ModeBtn>
          </Flex>
        </Container>

        <Container w="100%">
          <Text>Microphone</Text>
          <Button
            w="100%"
            bg={audioState.isMicActive ? "#C25454" : "#235375"}
            onClick={handleMicrophoneToggle}
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

        <Container>
          <Text>Effect Amount</Text>
          <Slider
            value={audioState.effectAmount}
            onChange={(v) => audioActions.setEffectAmount(v)}
            min={0}
            max={1}
            step={0.01}
          />
        </Container>

        <Container>
          <Text>Volume</Text>
          <Slider
            value={audioState.volume}
            onChange={(v) => audioActions.setVolume(v)}
            min={0}
            max={1}
            step={0.01}
          />
        </Container>

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
