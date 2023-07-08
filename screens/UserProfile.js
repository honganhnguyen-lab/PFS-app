import {useEffect, useState} from 'react';
import {
  Box,
  Text,
  Center,
  NativeBaseProvider,
  Divider,
  View,
  HStack,
  Button,
  VStack,
  ScrollView,
  Icon,
  Input,
  Heading,
  Avatar,
  Stack,
  Badge,
} from 'native-base';
import {styles} from '../style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Pressable} from 'react-native';
import {logOut} from '../redux/auth/authSlice';

const UserProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);
  const userDetail = user.payload;

  const onClickLogOut = async () => {
    await dispatch(logOut);
    navigation.navigate('Login');
  };
  return (
    <View style={styles.listServicesScreen}>
      <View mt={50}>
        <HStack space={2} alignItems="center" p={3}>
          <Divider bg="#87ADB2" thickness="4" mx="2" orientation="vertical" />
          <Heading>Profile</Heading>
        </HStack>
        <Center w="100%" shadow={2} bg="white" p={3} rounded="lg">
          <VStack space={3} justifyContent="center" alignItems="center">
            <Avatar
              bg="#87ADB2"
              alignSelf="center"
              size="md"
              source={{
                uri: userDetail?.avatar,
              }}>
              {userDetail?.name?.charAt(0).toUpperCase() ?? 'PFS'}
              <Avatar.Badge bg="white">
                <Pressable>
                  <Center>
                    <Icon
                      as={Ionicons}
                      name="create-outline"
                      size="sm"
                      color="#87ADB2"
                    />
                  </Center>
                </Pressable>
              </Avatar.Badge>
            </Avatar>
            <Heading color="#87ADB2">{userDetail?.name}</Heading>
            <Text fontWeight="600" fontSize={16}>
              {userDetail?.phoneNumber}
            </Text>
          </VStack>
        </Center>
        <HStack space={2} mt={4} alignItems="center">
          <Text fontWeight="600" fontSize={14} color="#238793">
            GENERAL
          </Text>
        </HStack>
        <VStack space={1} mt={3} w="100%" shadow={2} bg="white">
          <HStack justifyContent="space-between" alignItems="center" p={3}>
            <HStack space={3} alignItems="center">
              <Icon
                as={Ionicons}
                name="pencil-sharp"
                size="md"
                color="#87ADB2"
              />
              <Text fontWeight={600} fontSize={14}>
                Edit profile
              </Text>
            </HStack>
            <Icon
              as={Ionicons}
              name="chevron-forward-outline"
              size="md"
              color="#569FA7"
            />
          </HStack>
          <HStack justifyContent="space-between" alignItems="center" p={3}>
            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="lock-open" size="md" color="#87ADB2" />
              <Text fontWeight={600} fontSize={14}>
                Change password
              </Text>
            </HStack>
            <Icon
              as={Ionicons}
              name="chevron-forward-outline"
              size="md"
              color="#569FA7"
            />
          </HStack>
          <HStack justifyContent="space-between" alignItems="center" p={3}>
            <HStack space={3} alignItems="center">
              <Icon
                as={Ionicons}
                name="heart-circle-outline"
                size="md"
                color="#87ADB2"
              />
              <Text fontWeight={600} fontSize={14}>
                Favorite service
              </Text>
            </HStack>
            <Icon
              as={Ionicons}
              name="chevron-forward-outline"
              size="md"
              color="#569FA7"
            />
          </HStack>
          <HStack justifyContent="space-between" alignItems="center" p={3}>
            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="star" size="md" color="#87ADB2" />
              <Text fontWeight={600} fontSize={14}>
                Rate us
              </Text>
            </HStack>
            <Icon
              as={Ionicons}
              name="chevron-forward-outline"
              size="md"
              color="#569FA7"
            />
          </HStack>
        </VStack>
        <HStack space={2} mt={4} alignItems="center">
          <Text fontWeight="600" fontSize={14} color="#238793">
            ABOUT APP
          </Text>
        </HStack>
        <VStack space={1} mt={3} w="100%" shadow={2} bg="white">
          <HStack justifyContent="space-between" alignItems="center" p={3}>
            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="reader" size="md" color="#87ADB2" />
              <Text fontWeight={600} fontSize={14}>
                Privacy Policy
              </Text>
            </HStack>
            <Icon
              as={Ionicons}
              name="chevron-forward-outline"
              size="md"
              color="#569FA7"
            />
          </HStack>
          <Pressable onPress={onClickLogOut}>
            <HStack justifyContent="space-between" alignItems="center" p={3}>
              <HStack space={3} alignItems="center">
                <Icon as={Ionicons} name="log-out" size="md" color="#87ADB2" />
                <Text fontWeight={600} fontSize={14}>
                  Log out
                </Text>
              </HStack>
              <Icon
                as={Ionicons}
                name="chevron-forward-outline"
                size="md"
                color="#569FA7"
              />
            </HStack>
          </Pressable>
        </VStack>
      </View>
    </View>
  );
};
export default () => {
  return (
    <NativeBaseProvider>
      <UserProfile />
    </NativeBaseProvider>
  );
};
