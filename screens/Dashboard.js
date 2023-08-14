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
  useToast,
} from 'native-base';
import {styles} from '../style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import {ImageBackground} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {io} from 'socket.io-client';

import {SvgCss} from 'react-native-svg';

import DiscountSlider from './DiscountSlider';
import {InfoBlock} from '../components/Info';
import {OutstandingProvider} from '../components/OutstandingProvider';
import {
  onSendLocation,
  onSendNameServices,
} from '../redux/appointment/appointmentSlice';

import {setListNoti} from '../redux/noti/notiSlice';

import {
  acIcon,
  cleanIcon,
  nannyIcon,
  personalChefIcon,
  plumberIcon,
  sofaIcon,
  teacherIcon,
  tutorIcon,
  wifiIcon,
} from '../assets/icon';
import {RenderAdver} from '../components/RenderAdver';
import {axiosConfig, getListServicesEachProvider} from '../axios';

const SkeletonView = () => (
  <HStack space="2" justifyContent="space-between">
    <Skeleton size="15" />
    <Skeleton size="5" rounded="full" />
  </HStack>
);

const DashboardScreen = () => {
  const user = useSelector(state => state.auth.user);
  const notiList = useSelector(state => state.noti.listNoti);

  const [userDetail, setUserDetail] = useState({});
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [skipPermissionRequests, setSkipPermissionRequests] = useState(false);
  const [authorizationLevel, setAuthorizationLevel] = useState('auto');
  const [locationProvider, setLocationProvider] = useState('auto');
  const [address, setAddress] = useState('');

  const ListServicesTop = [
    {
      label: 'AC repair',
      icon: acIcon,
    },
    {
      label: 'Tutor',
      icon: tutorIcon,
    },
  ];
  const ListSecondService = [
    {
      label: 'Cleaning',
      icon: cleanIcon,
    },
    {
      label: 'Nanny',
      icon: nannyIcon,
    },
  ];
  const ListServicesBottom = [
    {
      label: 'Wifi Repair',
      icon: wifiIcon,
    },
    {
      label: 'Private chef',
      icon: personalChefIcon,
    },
  ];
  const popularService = [
    {
      label: 'AC repair',
      image: '',
      rating: '4.5',
      providerName: 'William',
      price: '400000',
    },
    {
      label: 'AC repair',
      image:
        'https://5.imimg.com/data5/SELLER/Default/2023/7/323414708/VN/KN/UF/12889775/huawei-onu-wifi-router-repair-service.jpg',
      rating: '4.2',
      providerName: 'Jennifer',
      price: '700000',
    },
  ];

  const onNavigateToAppointment = label => {
    dispatch(onSendNameServices(label));
    navigation.navigate('List Services');
  };
  const getLocation = () => {
    Geolocation.getCurrentPosition(async info => {
      const latitude = info.coords.latitude;
      const longtitude = info.coords.longitude;

      try {
        const locationData = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${longtitude},${latitude}.json?access_token=pk.eyJ1IjoicXVhbnplbjgiLCJhIjoiY2xrcXJmcjN2MXAzYzNlcGxld2lyMTU1MyJ9.PmJmE5O1pyUlzIvAuWXs_g`,
        );
        const address = locationData.data?.features[0]?.place_name ?? '';
        dispatch(
          onSendLocation({
            coordinates: [latitude, longtitude],
            address,
          }),
        );
        setAddress(address);
      } catch (err) {
        console.log('err', err);
      }
    });
  };

  const getDetailProfile = async () => {
    try {
      const detailProfileUser = await axiosConfig.get(
        `api/v1/users/${user.payload.id}`,
      );
      setUserDetail(detailProfileUser.data.data.user);
    } catch (err) {
      console.log(err);
    }
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
    getDetailProfile();
  }, [user]);

  const thisSocket = globalThis.socket;

  useEffect(() => {
    thisSocket.on('connect', () => {
      console.log('connect socket');
    });

    const id = user.payload.id;

    thisSocket.on(`noti-appointment-success_${id}`, data => {
      console.log('Received message:', data.content);
      dispatch(setListNoti(data.content));
    });
    thisSocket.on(`request_appointment_${id}`, data => {
      console.log('Received message:', data.content);
      dispatch(setListNoti(data.content));
    });
    thisSocket.on(`noti-appointment-decline_${id}`, data => {
      console.log('Received message:', data.content);
      dispatch(setListNoti(data.content));
    });
    thisSocket.on(`noti-appointment-finish_${id}`, data => {
      console.log('Received message:', data.content);
      dispatch(setListNoti(data.content));
    });
  }, [thisSocket]);

  return (
    <View style={styles.dashboardContainer}>
      {!userDetail || (isEmptyObj(userDetail) && <SkeletonView />)}
      <InfoBlock style={styles.infoArea} info={userDetail} address={address} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack mt={2}>
          <GestureHandlerRootView>
            <DiscountSlider />
          </GestureHandlerRootView>
        </VStack>
        <VStack justifyContent="flex-start" mt="2" space={3}>
          <Text fontSize={16} color={'#559FA7'} fontWeight={600}>
            Services
          </Text>
          <HStack space={2} justifyContent="space-evenly">
            {ListServicesTop.map((item, index) => (
              <Pressable
                onPress={() => onNavigateToAppointment(item.label)}
                key={index}>
                <Box
                  width={170}
                  height={50}
                  rounded="lg"
                  bg="#559FA7"
                  overflow="hidden"
                  borderColor="#559FA7"
                  borderWidth="1"
                  alignItems={'center'}
                  justifyContent={'center'}
                  onPress={() => onNavigateToAppointment(item.label)}>
                  <HStack space={3} alignItems="center">
                    <Box alignItems={'center'} justifyContent={'center'}>
                      <SvgCss
                        width={25}
                        height={25}
                        xml={item.icon}
                        fill="black"
                      />
                    </Box>
                    <Text fontSize={14} fontWeight="600" color="white">
                      {item.label}
                    </Text>
                  </HStack>
                </Box>
              </Pressable>
            ))}
          </HStack>
          <HStack space={2} justifyContent="space-evenly">
            {ListSecondService.map((item, index) => (
              <Pressable
                onPress={() => onNavigateToAppointment(item.label)}
                key={index}>
                <Box
                  width={170}
                  height={50}
                  rounded="lg"
                  overflow="hidden"
                  bgColor="#559FA7"
                  borderColor="#559FA7"
                  borderWidth="1"
                  alignItems={'center'}
                  justifyContent={'center'}
                  onPress={() => onNavigateToAppointment(item.label)}>
                  <HStack space={3} alignItems="center">
                    <Box alignItems={'center'} justifyContent={'center'}>
                      <SvgCss
                        width={25}
                        height={25}
                        xml={item.icon}
                        fill="white"
                      />
                    </Box>
                    <Text fontSize={14} fontWeight="600" color="white">
                      {item.label}
                    </Text>
                  </HStack>
                </Box>
              </Pressable>
            ))}
          </HStack>
          <HStack space={2} justifyContent="space-evenly">
            {ListServicesBottom.map((item, index) => (
              <Pressable
                onPress={() => onNavigateToAppointment(item.label)}
                key={index}>
                <Box
                  width={170}
                  height={50}
                  rounded="lg"
                  overflow="hidden"
                  bg="#559FA7"
                  borderColor="white"
                  borderWidth="1"
                  alignItems={'center'}
                  justifyContent={'center'}
                  onPress={() => onNavigateToAppointment(item.label)}>
                  <HStack space={3} alignItems="center">
                    <Box alignItems={'center'} justifyContent={'center'}>
                      <SvgCss
                        width={25}
                        height={25}
                        xml={item.icon}
                        fill="black"
                      />
                    </Box>
                    <Text fontSize={14} fontWeight="600" color="white">
                      {item.label}
                    </Text>
                  </HStack>
                </Box>
              </Pressable>
            ))}
          </HStack>
        </VStack>
        <VStack justifyContent="flex-start" mt="4" space={3}>
          <Text fontSize={16} color={'#559FA7'} fontWeight={700}>
            Popular services
          </Text>
          <RenderAdver detail={popularService} />
        </VStack>
        <VStack justifyContent="flex-start" mt={4} space={3}>
          <Text fontSize={16} color={'#559FA7'} fontWeight={700}>
            Recommend for you
          </Text>
          <RenderAdver detail={popularService} />
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
        source={require('../assets/Homepagefinal.png')}
        resizeMode="cover">
        <DashboardScreen />
      </ImageBackground>
    </NativeBaseProvider>
  );
};
