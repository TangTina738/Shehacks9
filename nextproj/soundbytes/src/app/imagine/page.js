'use client'

import { useEffect, useRef, useState } from "react";
// import { div } from "@/components/ui/div";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Webcam from "react-webcam";
import * as Tone from "tone";
import GestureDetector from "@/components/ui/gesture-detector";
import GestureTrainer from "@/components/ui/gesture-trainer";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Mic, Square } from "lucide-react";
import WaveSurfer from 'wavesurfer.js';
import { Grid, GridItem, Heading, Text, Container, Flex } from "@chakra-ui/react";

const ModeBtn = ({ children, isActive, onClick }) => {
  return (
    <Button
      size="md"
      h="30px"
      p={4}
      color={isActive ? '#fff' : '#235375'}
      bg={isActive ? '#235375' : '#D9D9D9'}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default function Home() {
  const webcamRef = useRef(null);
  const [audioStarted, setAudioStarted] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(1);
  const [timelinePosition, setTimelinePosition] = useState(0);
  const [isMicActive, setIsMicActive] = useState(false);
  const [volume, setVolume] = useState([0.5]);
  const [mode, setMode] = useState("reverb");
  const [effectAmount, setEffectAmount] = useState([0.5]);
  const [currentVolume, setCurrentVolume] = useState(0);
  const [trackVolumes, setTrackVolumes] = useState([]);
  const trackPlayers = useRef([]);
  const meter = useRef();

  const microphoneIn = useRef();
  const reverb = useRef();
  const delay = useRef();
  const distortion = useRef();
  const pitchShift = useRef();
  const harmony = useRef();
  const harmonyUp = useRef();
  const harmonyDown = useRef();
  const recorder = useRef();
  const [wavesurferInstances, setWavesurferInstances] = useState([]);

  useEffect(() => {
    // Initialize microphone input
    microphoneIn.current = new Tone.UserMedia();
    meter.current = new Tone.Meter(); // Initialize meter

    // Initialize recorder
    recorder.current = new Tone.Recorder();

    // Initialize audio effects
    reverb.current = new Tone.Reverb({
      decay: 4,
      wet: effectAmount[0],
    }).toDestination();

    delay.current = new Tone.FeedbackDelay({
      delayTime: 0.3,
      feedback: effectAmount[0],
    }).toDestination();

    distortion.current = new Tone.Distortion({
      distortion: effectAmount[0],
    }).toDestination();

    pitchShift.current = new Tone.PitchShift({
      pitch: effectAmount[0] * 12, // Range from -6 to +6 semitones
    }).toDestination();

    harmony.current = new Tone.PitchShift({
      //pitch: -3, // Minor third down
    })
      .connect(new Tone.Gain(1))
      .toDestination();
    harmonyUp.current = new Tone.PitchShift({
      pitch: 4, // Major third up
    })
      .connect(new Tone.Gain(0.4))
      .toDestination(); // 40% volume

    harmonyDown.current = new Tone.PitchShift({
      pitch: -3, // Minor third down
    })
      .connect(new Tone.Gain(0.4))
      .toDestination(); // 40% volume

    // Connect to current effect
    updateAudioChain();

    return () => {
      microphoneIn.current?.close();
      reverb.current?.dispose();
      delay.current?.dispose();
      distortion.current?.dispose();
      pitchShift.current?.dispose();
      //harmonyUp.current?.dispose();
      harmonyDown.current?.dispose();
      recorder.current?.dispose();
      meter.current?.dispose(); // Dispose of the meter
    };
  }, []);

  const AudioPlayer = () => {
    const [tracks, setTracks] = useState([]); // Track state
    const [wavesurferInstances, setWavesurferInstances] = useState([]);

    // Function to add a new track
    const addTrack = (trackUrl) => {
      setTracks((prevTracks) => [
        ...prevTracks,
        { id: `track-${prevTracks.length + 1}`, url: trackUrl },
      ]);
    };

    // Handle file input change
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const trackUrl = URL.createObjectURL(file);
        addTrack(trackUrl);
      }
    };

    useEffect(() => {
      // Cleanup previous instances on tracks change
      wavesurferInstances.forEach((ws) => ws.destroy());

      // Create new WaveSurfer instances for each track
      const newInstances = tracks.map((track) => {
        return WaveSurfer.create({
          container: `#waveform-${track.id}`,
          waveColor: '#4F4A85',
          progressColor: '#383351',
          url: track.url,
        });
      });

      setWavesurferInstances(newInstances);

      return () => {
        newInstances.forEach((wavesurfer) => wavesurfer.destroy());
      };
    }, [tracks]); // Rerun effect when the tracks change

    return (
      <div>
        {/* File input for uploading tracks */}
        <input type="file" onChange={handleFileChange} />

        {/* Render each track's waveform */}
        <div>
          {tracks.map((track) => (
            <div key={track.id} className="waveform-container">
              <div
                id={`waveform-${track.id}`}
                style={{ width: '100%', height: '128px' }}
              ></div>
              <button onClick={() => playTrack(track.id)}>Play/Pause</button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  //export default AudioPlayer;

  useEffect(() => {
    updateAudioChain();
  }, [mode]);

  // Update playhead during playback
  useEffect(() => {
    if (trackPlayers.current.length > 0 && !isRecording) {
      const updatePlayhead = () => {
        const player = trackPlayers.current[0];
        if (player && player.loaded) {
          const position = (player.currentTime / player.buffer.duration) * 100;
          setTimelinePosition(position);
        }
        requestAnimationFrame(updatePlayhead);
      };
      requestAnimationFrame(updatePlayhead);
    }
  }, [trackPlayers.current.length, isRecording]);

  useEffect(() => {
    if (
      !reverb.current ||
      !delay.current ||
      !distortion.current ||
      !pitchShift.current ||
      !harmonyUp.current ||
      !harmonyDown.current
    )
      return;

    reverb.current.wet.value = effectAmount[0];
    delay.current.feedback.value = effectAmount[0];
    distortion.current.distortion = effectAmount[0];
    pitchShift.current.pitch = effectAmount[0] * 12;
  }, [effectAmount]);

  const updateAudioChain = () => {
    if (!microphoneIn.current || !recorder.current || !meter.current) return;

    // Disconnect from all effects
    microphoneIn.current.disconnect();

    // Connect to the selected effect first
    let effectNode;
    switch (mode) {
      case "reverb":
        effectNode = reverb.current;
        break;
      case "delay":
        effectNode = delay.current;
        break;
      case "distortion":
        effectNode = distortion.current;
        break;
      case "pitch":
        effectNode = pitchShift.current;
        break;
      case "harmony":
        // For harmony, connect to all three pitch shifters
        microphoneIn.current.connect(recorder.current); // Original signal
        microphoneIn.current.connect(harmonyUp.current);
        microphoneIn.current.connect(harmonyDown.current);
        harmonyUp.current.connect(recorder.current);
        harmonyDown.current.connect(recorder.current);
        return;
    }


    // Connect microphone to effect and meter
    microphoneIn.current.connect(meter.current);
    meter.current.connect(effectNode);

    // Connect effect to recorder
    effectNode.connect(recorder.current);
  };

  const startAudio = async () => {
    await Tone.start();
    setAudioStarted(true);
  };

  const toggleMicrophone = async () => {
    if (!microphoneIn.current) return;

    if (!isMicActive) {
      try {
        await microphoneIn.current.open();
        setIsMicActive(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
        alert(
          "Failed to access microphone. Please ensure microphone permissions are granted.",
        );
      }
    } else {
      microphoneIn.current.close();
      setIsMicActive(false);
    }
  };

  const startRecording = async () => {
    if (!recorder.current || !meter.current) return;

    try {
      // Ensure Tone.js context is running
      await Tone.start();

      // Start playing existing tracks from playhead position
      const startPositionSeconds = Math.max(0, Math.min(30, (timelinePosition / 100) * 30)); // Clamp between 0-30s
      trackPlayers.current.forEach(player => {
        if (player.loaded) {
          player.sync().start(0, startPositionSeconds);
          player.volume.value = volume[0];
        }
      });

      // Start transport and recording
      Tone.Transport.start();
      await recorder.current.start();
      setIsRecording(true);

      // Start progress and volume tracking
      const startTime = Date.now() - (startPositionSeconds * 1000);
      const updateProgress = () => {
        if (isRecording) {
          const elapsed = Date.now() - startTime;
          setTimelinePosition((elapsed / 30000) * 100); // 30 second timeline
          setCurrentVolume(meter.current ? Math.min(1, Math.abs(meter.current.getValue()) / 40 + 0.3) : 0);
          requestAnimationFrame(updateProgress);
        }
      };
      requestAnimationFrame(updateProgress);
    } catch (error) {
      console.error('Failed to start recording:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    if (!recorder.current || !isRecording) return;
    try {
      const recording = await recorder.current.stop();
      Tone.Transport.stop();

      // Stop and reset all players
      trackPlayers.current.forEach(player => {
        player.stop();
        player.seek(0);
      });

      // Add the new track
      const newTrack = { id: tracks.length + 1, blob: recording };
      setTracks(prevTracks => [...prevTracks, newTrack]);

      // Create and initialize player for the new track
      const url = URL.createObjectURL(recording);
      const player = new Tone.Player({
        url: url,
        onload: () => {
          player.sync().start(0);
        }
      }).toDestination();
      player && await player.load();
      trackPlayers.current.push(player);

      // Analyze the recording for volume levels
      const audioContext = new AudioContext();
      const arrayBuffer = await recording.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const pcmData = audioBuffer.getChannelData(0);
      const blockSize = Math.floor(pcmData.length / 100);
      const volumes = [];

      for (let i = 0; i < 100; i++) {
        const start = blockSize * i;
        const sum = pcmData.slice(start, start + blockSize).reduce((acc, val) => acc + Math.abs(val), 0);
        volumes.push(Math.min(1, (sum / blockSize) * 2.5));
      }

      setTrackVolumes([...trackVolumes, volumes]);
      setIsRecording(false);
      setTimelinePosition(0);
    } catch (error) {
      console.error('Failed to stop recording:', error);
      setIsRecording(false);
    }
  };

  const downloadRecording = (blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "voice-effects-recording.webm";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const mixAndDownloadTracks = async () => {
    if (tracks.length === 0) return;

    const audioContext = new AudioContext();
    const audioBuffers = await Promise.all(
      tracks.map(track =>
        track.blob.arrayBuffer()
          .then(buffer => audioContext.decodeAudioData(buffer))
      )
    );

    const maxDuration = Math.max(...audioBuffers.map(buffer => buffer.duration));
    const offlineContext = new OfflineAudioContext(2, audioContext.sampleRate * maxDuration, audioContext.sampleRate);

    audioBuffers.forEach((buffer, index) => {
      const source = offlineContext.createBufferSource();
      const gainNode = offlineContext.createGain();
      gainNode.gain.value = volume[0];
      source.buffer = buffer;
      source.connect(gainNode);
      gainNode.connect(offlineContext.destination);
      source.start(0);
    });

    const renderedBuffer = await offlineContext.startRendering();
    const mixedBlob = new Blob([await exportWAV(renderedBuffer)], { type: 'audio/wav' });
    downloadRecording(mixedBlob);
  };

  const exportWAV = (audioBuffer) => {
    const numOfChan = audioBuffer.numberOfChannels;
    const length = audioBuffer.length * numOfChan * 2;
    const buffer = new ArrayBuffer(44 + length);
    const view = new DataView(buffer);
    const channels = [];
    let pos = 0;

    // Write WAV header
    writeString(view, pos, 'RIFF'); pos += 4;
    view.setUint32(pos, 36 + length, true); pos += 4;
    writeString(view, pos, 'WAVE'); pos += 4;
    writeString(view, pos, 'fmt '); pos += 4;
    view.setUint32(pos, 16, true); pos += 4;
    view.setUint16(pos, 1, true); pos += 2;
    view.setUint16(pos, numOfChan, true); pos += 2;
    view.setUint32(pos, audioBuffer.sampleRate, true); pos += 4;
    view.setUint32(pos, audioBuffer.sampleRate * 2 * numOfChan, true); pos += 4;
    view.setUint16(pos, numOfChan * 2, true); pos += 2;
    view.setUint16(pos, 16, true); pos += 2;
    writeString(view, pos, 'data'); pos += 4;
    view.setUint32(pos, length, true); pos += 4;

    // Write audio data
    for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
      channels.push(audioBuffer.getChannelData(i));
    }

    let offset = 0;
    while (pos < view.byteLength) {
      for (let i = 0; i < numOfChan; i++) {
        const sample = Math.max(-1, Math.min(1, channels[i][offset]));
        view.setInt16(pos, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
        pos += 2;
      }
      offset++;
    }

    return buffer;
  };

  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const handleGestureDetected = (gesture) => {
    switch (gesture) {
      case "fist":
        setMode("reverb");
        break;
      case "pinch":
        if (!isMicActive) {
          toggleMicrophone();
        }
        break;
      case "three_fingers":
        setMode("harmony");
        break;
      case "two_fingers":
        setMode("delay");
        break;
      case "one_finger":
        setMode("distortion");
        break;
      case "swipe_left":
        setTimelinePosition(0);
        break;
    }
  };

  return (
    <Grid
      p={8}
      gridTemplateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
      gridTemplateRows={{ base: "repeat(2, auto)", md: "auto" }}
      gap={4}
    >
      {/* left half */}
      <GridItem>
        <Heading color="#C2DAF4" fontSize="30px">Synced</Heading>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Webcam View */}
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Gesture Detection</h2>
            <div>

              <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                <Webcam
                  ref={webcamRef}
                  mirrored
                  className="w-full h-full object-cover"
                />
                <div className="aspect-videp relative w-[300px]">


                  {webcamRef.current && (
                    <GestureDetector
                      showLandmarks
                      webcamRef={webcamRef.current.video}
                      onGestureDetected={handleGestureDetected}
                    />
                  )}
                </div>
                {/* {audioStarted && webcamRef.current && (
                     <GestureDetector
                     showLandmarks
                     webcamRef={webcamRef.current.video}
                     onGestureDetected={handleGestureDetected}
                     />
                     )} */}
              </div>
            </div>
          </div>
        </div>
        {/* <Container bg="grey" rounded="lg" my={4} w="450px" h="300px">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Gesture Detection</h2>
            <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
              <Webcam
                ref={webcamRef}
                mirrored
                className="w-full h-full object-cover"
              />
              {audioStarted && webcamRef.current && (
                <GestureDetector
                  webcamRef={webcamRef.current.video}
                  onGestureDetected={handleGestureDetected}
                />
              )}
            </div>
          </div>
        </Container> */}
      </GridItem>

      {/* right half */}
      <GridItem>
        <Grid gap={2}>
          <Heading>Audio Controls</Heading>

          <Container>
            <Text>Effect: {mode}</Text>
            <Flex flexDir="row" justifyContent="space-evenly">
              <ModeBtn variant={mode === "reverb" ? "default" : "outline"} isActive={mode === "reverb"} onClick={() => setMode("reverb")}>
                <Text p={0} m={0}>Reverb</Text>
              </ModeBtn>
              <ModeBtn isActive={mode === "delay"} onClick={() => setMode("delay")}>
                <Text>Delay</Text>
              </ModeBtn>
              <ModeBtn isActive={mode === "distortion"} onClick={() => setMode("distortion")}>
                <Text>Distortion</Text>
              </ModeBtn>
              {/* <ModeBtn isActive={mode === "pitch"} onClick={() => setMode("pitch")}>
                <Text>Pitch Shift</Text>
              </ModeBtn> */}
              <ModeBtn isActive={mode === "harmony"} onClick={() => setMode("harmony")}>
                <Text>Harmony</Text>
              </ModeBtn>
            </Flex>
          </Container>
          <div>
            {tracks.map((track, index) => (
              <div
                key={track.id}
                className="w-full h-12 mb-1 bg-muted rounded relative overflow-hidden"
                ref={el => {
                  if (el && !el.hasAttribute('data-wavesurfer-initialized')) {
                    el.setAttribute('data-wavesurfer-initialized', 'true');
                    const wavesurfer = WaveSurfer.create({
                      container: el,
                      waveColor: '#4CAF50',
                      progressColor: '#1a1a1a',
                      cursorColor: '#fff',
                      barWidth: 2,
                      barGap: 1,
                      height: 48,
                      normalize: true
                    });
                    const url = URL.createObjectURL(track.blob);
                    wavesurfer.load(url);
                    wavesurfer.on('ready', () => {
                      wavesurfer.setTime((timelinePosition / 100) * wavesurfer.getDuration());
                    });
                  }
                }}
              >
                <div className="absolute left-2 text-sm z-10 mix-blend-difference text-white">Track {track.id}</div>
              </div>
            ))}

          </div>
          {tracks.map((track) => (
            <Button
              key={track.id}
              onClick={() => downloadRecording(track.blob)}
              className="flex items-center gap-2"
              variant="outline"
            >
              <Download className="w-4 h-4" />
              Download Track {track.id}
            </Button>
          ))}
          <Container w="100%"> {/* Recording Controls */}
            <Text>Microphone</Text>
            <Button w="100%" bg={isMicActive ? "#C25454" : "#235375"} onClick={toggleMicrophone}>
              <Text>{isMicActive ? "Stop Microphone" : "Start Microphone"}</Text>
            </Button>
          </Container>

          <Button
            w="250px"
            bg={isRecording ? "#C25454" : "#235375"}
            onClick={isRecording ? stopRecording : startRecording}
          >
            <Text>{isRecording ? "Stop Recording" : "Start Recording"}</Text>
          </Button>

          <Container>
            <Text>Effect Amount</Text>
            <Slider
              value={effectAmount}
              onChange={setEffectAmount}
              max={1}
              step={0.01}
              className="w-full"
            />

          </Container>

          <Container>
            <Text>Volume</Text>
            <Slider
              value={volume}
              onValueChange={(v) => {
                setVolume(v);
                if (microphoneIn.current) {
                  microphoneIn.current.volume.value =
                    Math.log10(v[0]) * 20;
                }
              }}
              max={1}
              step={0.01}
              className="w-full"
            />
          </Container>
          {tracks.length > 0 && (
            <Button
              onClick={mixAndDownloadTracks}
              bg="#235375"
            >
              {/* <Download className="w-4 h-4" /> */}
              Download Final Mix
            </Button>

          )}
          {/* <Button bg="#235375">Preview your mix</Button> */}
        </Grid>
      </GridItem>
    </Grid>
  );

}


