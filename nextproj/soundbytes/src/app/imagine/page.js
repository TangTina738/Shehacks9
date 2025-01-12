import { Slider } from "@/components/ui/slider";
import { WaveformSelect } from "@/components/ui/WaveformSelect";
import { Button, Container, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";

const ModeBtn = ({children}) => {
    return (
        <Button size="md" h="30px" p={4} color="#235375" bg="#D9D9D9">{children}</Button>
    )
}

export default () => {
  return (
    <Grid
  p={8}
  gridTemplateColumns={{ base: "repeat(1, 1fr)", md:"repeat(2, 1fr)"  }}
  gridTemplateRows={{ base: "repeat(2, auto)", md: "auto" }}
  gap={4}
>
      {/* left half */}
      <GridItem>
        <Heading color="#C2DAF4" fontSize="30px">Synced</Heading>
        <Container bg="grey" rounded="lg" my={4} w="450px" h="300px">

        </Container>
      </GridItem>
      {/* right half */}
      <GridItem>
        <Grid gap={2}>
          <Heading>Audio Controls</Heading>
          <Container>

          <Text>Effect: Reverb</Text>
          <Flex flexDir="row" justifyContent="space-evenly">
            <ModeBtn><Text p={0} m={0}>Reverb</Text></ModeBtn>
            <ModeBtn><Text>Delay</Text></ModeBtn>
            <ModeBtn><Text>Distortion</Text></ModeBtn>
            <ModeBtn><Text>Pitch Shift</Text></ModeBtn>
            <ModeBtn><Text>Harmony</Text></ModeBtn>
          </Flex>
          </Container>
          <Container w="100%">

          <Text>Microphone</Text>
          <Button w="100%" bg="#C25454"><Text>Start Microphone</Text></Button>
          </Container>
          <Button w="250px" bg="#235375">Start Recording</Button>
          <Container>

          <Text>Effect Amount</Text>
          <Slider />
          </Container>
          <Container>

          <Text>Volume</Text>
          <Slider />
          </Container>


          <Button bg="#235375">Preview your mix</Button>
          
        </Grid>
      </GridItem>
    </Grid>
  );
};
