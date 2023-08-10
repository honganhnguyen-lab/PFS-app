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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ImageBackground} from 'react-native';
import {styles} from '../style';

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
    try {
      const user = await axiosConfig.post('/api/v1/users/login', {
        phoneNumber,
        password,
      });
      Toast.show({
        type: 'success',
        text1: 'Account verified',
        text2: 'Welcome to PFS 👋',
      });
      dispatch(setDataUser(user.data.data.user));
      navigation.navigate('Home');
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Wrong phone number or wrong password',
      });
    }

    setLoading(false);
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="xl">
        <VStack space={3} mt="5">
          <FormControl isRequired>
            <FormControl.Label>
              <Text style={{color: '#238793', fontSize: 14, fontWeight: 600}}>
                Phone number
              </Text>
            </FormControl.Label>
            <Input
              value={phoneNumber}
              onChangeText={onChangePhoneNumber}
              keyboardType="numeric"
              size="2xl"
              fontSize={16}
              variant="rounded"
            />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>
              <Text style={{color: '#238793', fontSize: 14, fontWeight: 600}}>
                Password
              </Text>
            </FormControl.Label>
            <Input
              type="password"
              value={password}
              onChangeText={onChangePassword}
              size="2xl"
              fontSize={16}
              variant="rounded"
            />
            <Link
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: '#238793',
              }}
              alignSelf="flex-end"
              mt="1">
              Forget Password?
            </Link>
          </FormControl>
          <Button
            mt="2"
            bgColor="#238793"
            rounded="xl"
            size="lg"
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
                color: '#238793',
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
      <ImageBackground
        style={styles.image}
        source={require('../assets/SignIn.png')}
        resizeMode="cover">
        <Center flex={1}>
          <Example />
        </Center>
      </ImageBackground>
    </NativeBaseProvider>
  );
};
