import React, {useState} from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  Image,
  View,
  IconButton,
  CloseIcon,
  Alert,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-toast-message';

import {useSelector, useDispatch} from 'react-redux';
import {setDataUser} from '../redux/auth/authSlice';
import {axiosConfig} from '../axios';

const Example = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onChangePhoneNumber = value => {
    setPhoneNumber(value);
  };

  const onChangePassword = value => {
    setPassword(value);
  };

  const ToastAlert = ({title, variant, description, isClosable, status}) => {
    return (
      <Alert
        maxWidth="100%"
        alignSelf="center"
        flexDirection="row"
        status={status ? status : 'info'}
        variant={variant}>
        <VStack space={1} flexShrink={1} w="100%">
          <HStack
            flexShrink={1}
            alignItems="center"
            justifyContent="space-between">
            <HStack space={2} flexShrink={1} alignItems="center">
              <Alert.Icon />
              <Text
                fontSize="md"
                fontWeight="medium"
                flexShrink={1}
                color={
                  variant === 'solid'
                    ? 'lightText'
                    : variant !== 'outline'
                    ? 'darkText'
                    : null
                }>
                {title}
              </Text>
            </HStack>
            {isClosable ? (
              <IconButton
                variant="unstyled"
                icon={<CloseIcon size="3" />}
                _icon={{
                  color: variant === 'solid' ? 'lightText' : 'darkText',
                }}
              />
            ) : null}
          </HStack>
          <Text
            px="6"
            color={
              variant === 'solid'
                ? 'lightText'
                : variant !== 'outline'
                ? 'darkText'
                : null
            }>
            {description}
          </Text>
        </VStack>
      </Alert>
    );
  };

  const onSignInButton = async () => {
    setLoading(true);
    axiosConfig
      .post('/api/v1/users/login', {
        phoneNumber: phoneNumber,
        password: password,
      })
      .then(response => {
        Toast.show({
          type: 'success',
          text1: 'Account verified',
          text2: 'Welcome to PFS 👋',
        });

        navigation.navigate('Home');

        dispatch(setDataUser(response.data.data.user));
      })
      .catch(error => {
        if (error.response) {
          Toast.show({
            type: 'error',
            text1: 'Wrong phone number or wrong password',
          });
        }
      });
    setLoading(false);
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="xl">
        <VStack alignItems="center">
          <Heading
            size="lg"
            fontWeight="600"
            color="#0077C0"
            _dark={{
              color: 'warmGray.50',
            }}>
            SIGN IN
          </Heading>
        </VStack>
        <VStack space={3} mt="5">
          <FormControl isRequired>
            <FormControl.Label>Phone number</FormControl.Label>
            <Input
              value={phoneNumber}
              onChangeText={onChangePhoneNumber}
              keyboardType="numeric"
              size="xl"
            />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              value={password}
              onChangeText={onChangePassword}
              size="xl"
            />
            <Link
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'indigo.500',
              }}
              alignSelf="flex-end"
              mt="1">
              Forget Password?
            </Link>
          </FormControl>
          <Button
            mt="2"
            isLoading={loading}
            spinnerPlacement="end"
            isLoadingText="Sign in"
            onPress={onSignInButton}>
            Sign in
          </Button>

          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              I'm a new user.{' '}
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              onPress={() => navigation.navigate('Signup')}>
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Example />
      </Center>
    </NativeBaseProvider>
  );
};
