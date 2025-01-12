'use client';

import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';

export default function TutorialPage() {
  return (
    <Box bg="gray.900" color="white" p={4}>
      {/* Header Section */}
      <Box as="header" mt={32} mb={16} textAlign="left">
        <Heading
          as="h1"
          fontSize={['2xl', '3xl', '4xl']}
          fontWeight="normal"
          fontFamily="'Inria', serif"
        >
          Use hand gestures to trigger effects<br />
          and immerse yourself in your audio experience.
        </Heading>
      </Box>

      {/* Gesture Section */}
      <VStack spacing={12} mt={8}>
        {gestures.map((gesture, index) => (
          <Flex
            key={gesture.title}
            align="center"
            justify="center"
            direction={{ base: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' }}
            gap={8}
            wrap="wrap"
          >
            <VStack align="center">
              <Image
                src={gesture.image}
                alt={gesture.alt}
                boxSize="200px"
                borderRadius="full"
                borderWidth="5px"
                borderColor="#D5B893"
                bgColor="#D9D9D9"
                objectFit="cover"
              />
              <Text fontSize="sm" fontFamily="'Inria', serif">
                {gesture.alt}
              </Text>
            </VStack>
            <Box maxW="400px">
              <Heading as="h2" fontSize="lg" fontFamily="'Inria', serif" mb={2}>
                {gesture.title}
              </Heading>
              <Text fontSize="md" lineHeight="1.5" fontFamily="'Inria', serif">
                {gesture.description}
              </Text>
            </Box>
          </Flex>
        ))}
      </VStack>

      {/* Footer Section */}
      <Box mt={12}>
        <Heading as="h2" fontSize="2xl" fontFamily="'Inria', serif">
          Let's walk you through how to use Syncd
        </Heading>
      </Box>
    </Box>
  );
}

const gestures = [
  {
    image: 'gesture1.png',
    alt: 'Gesture One',
    title: 'Reverb',
    description: 'Use gestures to add depth and ambiance to your recordings.',
  },
  {
    image: 'gesture2.png',
    alt: 'Gesture Two',
    title: 'Delay',
    description: 'Create echo effects with just a simple swipe of your hand.',
  },
  {
    image: 'gesture3.png',
    alt: 'Gesture Three',
    title: 'Distortion',
    description: 'Make your vocals edgy and bold with a quick hand gesture.',
  },
  {
    image: 'gesture4.png',
    alt: 'Gesture Four',
    title: 'Pitch Shift',
    description: 'Control pitch effortlessly for creative and dynamic effects.',
  },
  {
    image: 'gesture5.png',
    alt: 'Gesture Five',
    title: 'Harmony',
    description: 'Add harmonies to your voice for a fuller, richer sound.',
  },
];
