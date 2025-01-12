import Image from "next/image";
import { Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    // grid for entire page body
    <Grid>
      <GridItem>
      <Image src="/nest.png" width={700} height={250} style={{position: "absolute"}}></Image>
        <Grid gridTemplateColumns="repeat(9,1fr)" my={14}>
          <GridItem gridColumnStart={2} colSpan={4}>
            {/* grid for landing text */}
            <Grid gap={4} style={{ marginTop: "100px" }}> 
            <GridItem>
                <Heading style={{fontFamily: "Inria Serif, serif",
                fontWeight: 700,
                fontStyle: "normal",
                fontSize: "3rem",
                lineHeight: "1.1",}} size="2xl">Music in the palm of your hands</Heading>
              </GridItem>

              <GridItem>
                <Text style={{fontFamily: "Inria Serif, serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize:"1.5rem"}} size="2xl">
                  Play with effects on your voice in real time. Great for
                  beginners and music enthusiasts for all. Singing production
                  has never been easier.
                </Text>
              </GridItem>
              <GridItem>
                <Flex flexDirection="row" gap={4}>
                  <Link href="/imagine">
                    <Button
                      px={4}
                      rounded="full"
                      bg="#C2DAF4"
                      color="#6F4D38"
                      h="30px"
                      style={{fontFamily: "Inria Serif, serif",
                        fontWeight: 700,
                        fontStyle: "normal",
                        fontSize:"1.2rem",}}
                    >
                      Try now
                    </Button>
                  </Link>
                  <Link href="/tutorial">
                    <Button
                      px={4}
                      rounded="full"
                      bg="#C2DAF4"
                      color="#6F4D38"
                      h="30px"
                      style={{fontFamily: "Inria Serif, serif",
                        fontWeight: 700,
                        fontStyle: "normal",
                        fontSize: "1.2rem",}}
                    >
                      See Tutorial
                    </Button>
                  </Link>
                </Flex>
              </GridItem>
            </Grid>
          </GridItem>
          {/* <GridItem> */}
          <GridItem gridColumnStart={7} colSpan={3}>
            <Image src="/girl.png" width={450} height={350}></Image>
            {/* </GridItem> */}
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem>
        <Heading 
        textAlign="center" 
        color="#632024"
        style={{fontFamily: "Inria Serif, serif",
          fontWeight: 700,
          fontStyle: "normal"}} size="5xl">
          Why Syncd?
        </Heading>
      </GridItem>
      <GridItem>
        <Grid
          mb={6}
          textAlign="center"
          gridRowGap={10}
          gridTemplateColumns="repeat(3,1fr)"
          gridTemplateRows="repeat(2,1fr)"
          placeItems="center"
        >
          <GridItem>
            <Text fontSize="20px">
              Hand Motion Detection</Text>
          </GridItem>
          <GridItem>
            <Text fontSize="20px">Easy</Text>
          </GridItem>
          <GridItem>
            <Text fontSize="20px">Accessible</Text>
          </GridItem>
          <GridItem>
            <Text maxW="200px"
            style={{fontFamily: "Inria Serif, serif",
              fontWeight: 400,
              fontStyle: "normal"}} size="2xl">
              Detects hand motions to decide which effect to use in real time.
            </Text>
          </GridItem>
          <GridItem>
            <Text maxW="200px"
            style={{fontFamily: "Inria Serif, serif",
              fontWeight: 400,
              fontStyle: "normal"}} size="2xl">
              Easy to use like breathing. Great for beginners or advanced
              artists alike.
            </Text>
          </GridItem>
          <GridItem>
            <Text maxW="200px"
            style={{fontFamily: "Inria Serif, serif",
              fontWeight: 400,
              fontStyle: "normal"}} size="2xl">
              Minimal manual work, great for those who are visually impaired or
              with cognitive disabilities.
            </Text>
          </GridItem>
        </Grid>
      </GridItem>

      <GridItem placeSelf="end">
        <Image src="/note.png" width={50} height={50} mb={4}></Image>
      </GridItem>
    </Grid>
  );
}
