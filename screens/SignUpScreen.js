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
  Icon,
  IconButton,
  CloseIcon,
  Alert,
  Checkbox,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  const [userName, setUserName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(false);

  const isValidPassword = () =>
    /[a-z]/.test(password) && /[0-9]/.test(password);

  const isValidPhone = () =>
    /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(
      phoneNumber,
    );

  const dispatch = useDispatch();

  const onChangePhoneNumber = value => {
    setPhoneNumber(value);
  };

  const onChangeUserName = value => {
    setUserName(value);
  };

  const onChangeConfirmPassword = value => {
    setConfirmPassword(value);
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
    navigation.navigate('VerifyOTP');
    // axiosConfig
    //   .post('/api/v1/users/signup', {
    //     role: role ? 'provider' : 'customer',
    //     name: userName,
    //     phoneNumber: phoneNumber,
    //     password: password,
    //     passwordConfirm: confirmPassword,
    //   })
    //   .then(async response => {
    //     Toast.show({
    //       type: 'success',
    //       text1: 'Account verified',
    //       text2: 'Welcome to PFS 👋',
    //     });

    //     dispatch(setDataUser(response.data.data.user));
    //     // await AsyncStorage.setItem('token', response.data.token);
    //   })
    //   .catch(error => {
    //     if (error.response) {
    //       Toast.show({
    //         type: 'error',
    //         text1: 'Wrong phone number or wrong password',
    //       });
    //     }
    //   });
    setLoading(false);
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="xl">
        <VStack space={3} mt={10}>
          <FormControl mt={20}>
            <FormControl.Label>
              <Text style={{color: '#238793', fontSize: 14, fontWeight: 600}}>
                Role
              </Text>
            </FormControl.Label>
            <Checkbox value={role} onChange={() => setRole(!role)}>
              Provider
            </Checkbox>
          </FormControl>
          <FormControl isRequired isInvalid={!userName}>
            <FormControl.Label>
              <Text style={{color: '#238793', fontSize: 14, fontWeight: 600}}>
                User name
              </Text>
            </FormControl.Label>
            <Input
              value={userName}
              onChangeText={onChangeUserName}
              size="2xl"
              fontSize={16}
              variant="rounded"
            />

            <FormControl.ErrorMessage
              leftIcon={<Icon as={Ionicons} name="alert-circle" size="xs" />}>
              Required
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!isValidPhone()}>
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
            <FormControl.ErrorMessage
              leftIcon={<Icon as={Ionicons} name="alert-circle" size="xs" />}>
              Required
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!isValidPassword()}>
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
            <FormControl.ErrorMessage
              leftIcon={<Icon as={Ionicons} name="alert-circle" size="xs" />}>
              Invalid password
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={
              password.toLowerCase() !== confirmPassword.toLowerCase()
            }>
            <FormControl.Label>
              <Text style={{color: '#238793', fontSize: 14, fontWeight: 600}}>
                Confirm Password
              </Text>
            </FormControl.Label>
            <Input
              type="password"
              value={confirmPassword}
              onChangeText={onChangeConfirmPassword}
              size="2xl"
              fontSize={16}
              variant="rounded"
            />
            <FormControl.ErrorMessage
              leftIcon={<Icon as={Ionicons} name="alert-circle" size="xs" />}>
              Invalid confirm password
            </FormControl.ErrorMessage>
          </FormControl>

          <Button
            mt="2"
            bgColor="#238793"
            rounded="xl"
            size="lg"
            isLoading={loading}
            spinnerPlacement="end"
            onPress={onSignInButton}>
            Sign Up
          </Button>

          <HStack mt="6" justifyContent="center" space={1.5}>
            <Text
              fontSize="sm"
              color="white"
              _dark={{
                color: 'warmGray.200',
              }}>
              Already have account
            </Text>
            <Link
              _text={{
                color: 'white',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              onPress={() => navigation.navigate('Login')}>
              Login
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
