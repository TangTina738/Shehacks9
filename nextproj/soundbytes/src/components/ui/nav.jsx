import { Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import {Button} from "./button";
import Link from "next/link";

const Nav = () => {
  return (
    <Grid
      templateColumns="1fr 1fr"
      autoFlow="column"
      justifySelf="center"
      w="100%"
      m="4"
      my={1}
      borderBottom="1px solid rgba(0,0,0,0.15)"
      p={6}
      py={3}
      h="70px"
      bg="#576f8a"
      box-shadow="0 20px 30px 0 rgba(0,0,0,.2)"
    >
      <GridItem placeSelf="start">
        <Flex alignItems="center" gap={4}>
          <Link href="/"><Heading color="#C2DAF4"
          style={{fontFamily: "Inria Serif, serif",
            fontWeight: 700,
            fontStyle: "normal"}} size="4xl">Syncd</Heading></Link>
          <Link href="/"><Text size="sm" p={0} m={0} style={{fontFamily: "Inria Serif, serif",
                fontWeight: 700,
                fontStyle: "normal",
                fontSize: "1.3rem",
                marginLeft:"35px" }}>Why Synced</Text></Link>
          <Link href="/tutorial"><Text size="sm" p={0} m={0}style={{fontFamily: "Inria Serif, serif",
                fontWeight: 700,
                fontStyle: "normal",
                fontSize: "1.3rem",
                marginLeft:"35px"}}>Tutorial</Text></Link>
        </Flex>
      </GridItem> 
      {/* <GridItem gridRow={2} /> */}
      <GridItem alignSelf="center" justifySelf="end">
        <Button px={6} rounded="full" bg="#C2DAF4" color="#6F4D38" h="40px"
         _hover={{
          color: "#25344f", 
          bg: "#FFFFFF",
          transition: "background-color 0.9s ease-in-out", 
        }}
        >
          <Link href="/imagine"><Text
           style={{fontFamily: "Inria Serif, serif",
                fontWeight: 700,
                fontStyle: "normal",
                fontSize:"1.2rem"}}>Create Now</Text></Link>
        </Button>
      </GridItem>
    </Grid>
  );
};

export default Nav;