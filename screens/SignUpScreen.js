import * as React from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  NativeBaseProvider,
  View,Image
} from 'native-base';

const SignupScreen = () => {
  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" py="8">
      <VStack alignItems="center">
        <Heading
          size="lg"
          fontWeight="600"
          color="#0077C0"
          _dark={{
            color: 'warmGray.50',
          }}>
          SIGN UP
        </Heading>
        </VStack>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Phone Number</FormControl.Label>
            <Input keyboardType="numeric"  size="xl"/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" size="xl"/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type="password" size="xl"/>
          </FormControl>
          <Button mt="2" colorScheme="indigo">
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <SignupScreen />
      </Center>
    </NativeBaseProvider>
  );
};
