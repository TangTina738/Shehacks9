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
      h="50px"
    >
      <GridItem placeSelf="start">
        <Flex alignItems="center" gap={4}>
          <Link href="/"><Heading color="#C2DAF4"
          style={{fontFamily: "Inria Serif, serif",
            fontWeight: 700,
            fontStyle: "normal"}} size="2xl">Syncd</Heading></Link>
          <Link href="/"><Text size="sm" p={0} m={0} style={{fontFamily: "Inria Serif, serif",
                fontWeight: 700,
                fontStyle: "normal" }}>Why synced</Text></Link>
          <Link href="/tutorial"><Text size="sm" p={0} m={0}style={{fontFamily: "Inria Serif, serif",
                fontWeight: 700,
                fontStyle: "normal"}}>Tutorial</Text></Link>
        </Flex>
      </GridItem> 
      {/* <GridItem gridRow={2} /> */}
      <GridItem alignSelf="center" justifySelf="end">
        <Button px={4} rounded="full" bg="#C2DAF4" color="#6F4D38" h="30px">
          <Link href="/imagine"><Text style={{fontFamily: "Inria Serif, serif",
                fontWeight: 700,
                fontStyle: "normal"}}>Try now</Text></Link>
        </Button>
      </GridItem>
    </Grid>
  );
};

export default Nav;
