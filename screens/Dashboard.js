import {useEffect, useState} from 'react';
import {
  Box,
  Text,
  Center,
  NativeBaseProvider,
  Image,
  View,
  VStack,
  Heading,
  HStack,
  ScrollView,
  Circle,
  Icon,
  Stack,
  Pressable,
  isEmptyObj,
  Skeleton,
} from 'native-base';
import {styles} from '../style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import {ImageBackground} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

import {SvgCss} from 'react-native-svg';

import DiscountSlider from './DiscountSlider';
import {InfoBlock} from '../components/Info';
import {OutstandingProvider} from '../components/OutstandingProvider';
import {
  onSendLocation,
  onSendNameServices,
} from '../redux/appointment/appointmentSlice';

import {
  acIcon,
  cleanIcon,
  personalChefIcon,
  plumberIcon,
  sofaIcon,
  teacherIcon,
  tutorIcon,
  wifiIcon,
} from '../assets/icon';

const SkeletonView = () => (
  <VStack
    w="90%"
    maxW="400"
    borderWidth="1"
    space={6}
    rounded="md"
    alignItems="center"
    _dark={{
      borderColor: 'coolGray.500',
    }}
    _light={{
      borderColor: 'coolGray.200',
    }}>
    <Skeleton h="40" />
    <Skeleton
      borderWidth={1}
      borderColor="coolGray.200"
      endColor="warmGray.50"
      size="20"
      rounded="full"
      mt="-70"
    />
    <HStack space="2">
      <Skeleton size="5" rounded="full" />
      <Skeleton size="5" rounded="full" />
      <Skeleton size="5" rounded="full" />
      <Skeleton size="5" rounded="full" />
      <Skeleton size="5" rounded="full" />
    </HStack>
    <Skeleton.Text lines={3} alignItems="center" px="12" />
    <Skeleton mb="3" w="40" rounded="20" />
  </VStack>
);

const DashboardScreen = () => {
  const user = useSelector(state => state.auth.user);
  const userDetail = user.payload;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [skipPermissionRequests, setSkipPermissionRequests] = useState(false);
  const [authorizationLevel, setAuthorizationLevel] = useState('auto');
  const [locationProvider, setLocationProvider] = useState('auto');

  const ListServicesTop = [
    {
      label: 'AC Repair',
      icon: acIcon,
    },
    {
      label: 'Tutor',
      icon: teacherIcon,
    },
    {
      label: 'Cleaning',
      icon: cleanIcon,
    },
  ];
  const ListServicesBottom = [
    {
      label: 'Plumber',
      icon: plumberIcon,
    },
    {
      label: 'Wifi Repair',
      icon: wifiIcon,
    },
    {
      label: 'Private chef',
      icon: personalChefIcon,
    },
  ];

  const onNavigateToAppointment = label => {
    dispatch(onSendNameServices(label));
    navigation.navigate('ProviderList');
  };
  const getLocation = () => {
    Geolocation.getCurrentPosition(async info => {
      const latitude = info.coords.latitude;
      const longtitude = info.coords.longitude;
      let address = '';
      try {
        const locationData = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${longtitude},${latitude}.json?access_token=pk.eyJ1IjoicXVhbnplbjgiLCJhIjoiY2xqNnB1bG5qMGVmODNzbzVhbmlydWI4YyJ9.-5blwlT5oWlIINJKW_ERzQ`,
        );
        address = locationData.data?.features[0]?.place_name ?? '';
      } catch (err) {
        console.log(err);
      }
      dispatch(
        onSendLocation({
          coordinates: [latitude, longtitude],
          address,
        }),
      );
    });
  };

  useEffect(() => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests,
      authorizationLevel,
      locationProvider,
    });
  }, [skipPermissionRequests, authorizationLevel, locationProvider]);

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.dashboardContainer}>
      {!userDetail || (isEmptyObj(userDetail) && <SkeletonView />)}
      <InfoBlock style={styles.infoArea} info={userDetail} />
      <ScrollView>
        <VStack space={4} alignItems="center" mt="6">
          <Center w="100%" h="16" bg="white" rounded="md" shadow={3}>
            <HStack
              w="100%"
              justifyContent="space-between"
              padding="3"
              alignItems="center">
              <VStack>
                <Text allowFontScaling={false}>Number of Appoinment</Text>
                <Heading>{userDetail?.appointmentNumber ?? 0}</Heading>
              </VStack>
              <Icon as={Ionicons} name="chevron-forward-outline" />
            </HStack>
          </Center>
          <OutstandingProvider />
        </VStack>
        <VStack justifyContent="flex-start" mt="4" space={3}>
          <Heading fontFamily={'LobsterTwo'}>Services</Heading>
          <HStack space={3} justifyContent="space-evenly">
            {ListServicesTop.map((item, index) => (
              <Box
                width={110}
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                alignItems={'center'}
                justifyContent={'center'}
                _dark={{
                  borderColor: 'coolGray.600',
                  backgroundColor: 'gray.700',
                }}
                _web={{
                  shadow: 2,
                  borderWidth: 0,
                }}
                _light={{
                  backgroundColor: 'gray.50',
                }}
                key={index}>
                <Pressable
                  width={'100%'}
                  onPress={() => onNavigateToAppointment(item.label)}>
                  <Box
                    height={75}
                    width={'100%'}
                    alignItems={'center'}
                    justifyContent={'center'}>
                    <SvgCss width={40} height={40} xml={item.icon} />
                  </Box>
                  <Stack
                    p="4"
                    space={3}
                    w="100%"
                    alignItems="center"
                    backgroundColor={'#569FA7'}>
                    <Text
                      fontSize="xs"
                      fontWeight="600"
                      color="white"
                      ml="-0.5"
                      mt="-1"
                      fontFamily={'WorkSans-Regular'}>
                      {item.label}
                    </Text>
                  </Stack>
                </Pressable>
              </Box>
            ))}
          </HStack>
          <HStack space={3} justifyContent="space-evenly">
            {ListServicesBottom.map((item, index) => (
              <Box
                width={110}
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                alignItems={'center'}
                justifyContent={'center'}
                _dark={{
                  borderColor: 'coolGray.600',
                  backgroundColor: 'gray.700',
                }}
                _web={{
                  shadow: 2,
                  borderWidth: 0,
                }}
                _light={{
                  backgroundColor: 'gray.50',
                }}
                key={index}>
                <Pressable
                  width={'100%'}
                  onPress={() => onNavigateToAppointment(item.label)}>
                  <Box
                    height={75}
                    width={'100%'}
                    bg="white"
                    alignItems={'center'}
                    justifyContent={'center'}>
                    <SvgCss width={40} height={40} xml={item.icon} />
                  </Box>
                  <Stack
                    p="4"
                    space={3}
                    w="100%"
                    alignItems="center"
                    backgroundColor={'#569FA7'}>
                    <Text
                      fontSize="xs"
                      fontWeight="600"
                      color="white"
                      ml="-0.5"
                      mt="-1"
                      fontFamily={'WorkSans-Regular'}>
                      {item.label}
                    </Text>
                  </Stack>
                </Pressable>
              </Box>
            ))}
          </HStack>
        </VStack>
        <VStack mt={4}>
          <GestureHandlerRootView>
            <DiscountSlider />
          </GestureHandlerRootView>
        </VStack>
      </ScrollView>
    </View>
  );
};
export default () => {
  return (
    <NativeBaseProvider>
      <ImageBackground
        style={styles.image}
        source={require('../assets/Homepaki.png')}
        resizeMode="cover">
        <DashboardScreen />
      </ImageBackground>
    </NativeBaseProvider>
  );
};
