"use client";
import Image from "next/image";
import { Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Aos from 'aos';
import 'aos/dist/aos.css';
import {useEffect } from "react";


export default function Home() {

  /**For Scroll Fire */
  useEffect(() => {
    Aos.init({duration: 1000});
  }, []);
  
  return (
    // grid for entire page body
    <Grid>
      <GridItem>
      <Image src="/3d.png" width={850} height={100} style={{position: "absolute", marginTop: "0px", opacity: "0.4"}}></Image>
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
                      px={5}
                      rounded="full"
                      bg="#C2DAF4"
                      color="#6F4D38"
                      h="40px"
                      _hover={{
                        color: "#25344f", 
                        bg: "#FFFFFF",
                        transition: "background-color 0.9s ease-in-out", // Smooth hover transition
                      }}
                      style={{fontFamily: "Inria Serif, serif",
                        fontWeight: 700,
                        fontStyle: "normal",
                        fontSize:"1.2rem",}}
                    >
                      Try Now
                    </Button>
                  </Link>
                  <Link href="/tutorial">
                    <Button
                      px={5}
                      rounded="full"
                      bg="#C2DAF4"
                      color="#6F4D38"
                      h="40px"
                      _hover={{
                        color: "#25344f", 
                        bg: "#FFFFFF",
                        transition: "background-color 0.9s ease-in-out", 
                      }}
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
          <Image src="/curly.png" width={130} height={150}
          style={{
            position: "absolute", 
            right: "-7px", 
            top: "100px", 
            animation: "bounce 2s infinite"}}></Image>
            <Image src="/music-note.png" width={80} height={80} 
            style={{
              position: "absolute", 
              right: "490px", 
              top: "510px",
              animation: "bounce 1.7s infinite",
              }}></Image>
        </Grid>
      </GridItem>
      <GridItem as="div" data-aos="fade-in" style={{margin: "10px"}}>
        <Heading 
        textAlign="center" 
        color="#632024"
        style={{fontFamily: "Inria Serif, serif",
          fontWeight: 700,
          fontStyle: "normal",
          marginTop: "350px",
          marginBottom: "20px"
          }} size="5xl">
          Why Syncd?
        </Heading>
      </GridItem>
      <Image src="/squiggle.png" width={360} height={100} style={{position: "absolute", right: "-120px", top: "80vh", overflow:"hidden", maxWidth:"100vw"}}></Image>
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