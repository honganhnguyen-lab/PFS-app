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
  Avatar,
} from 'native-base';
import {styles} from '../style';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ImageBackground} from 'react-native';
import {InfoBlock} from '../components/Info';

import DiscountSlider from './DiscountSlider';
import {SvgCss} from 'react-native-svg';
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
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {BarChartCustom} from '../components/BarChart';
import {axiosConfig, getListServicesEachProvider} from '../axios';

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

const ProviderDashboardScreen = () => {
  const user = useSelector(state => state.auth.user);
  const userDetail = user.payload;
  const navigation = useNavigation();
  const [dataProvider, setDataProvider] = useState({});
  const [loading, setLoading] = useState(false);

  const onGetDetailProvider = async () => {
    setLoading(true);
    try {
      const responseData = await axiosConfig.get(
        `${getListServicesEachProvider}${userDetail.id}`,
      );
      setDataProvider(responseData.data.data.user);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    onGetDetailProvider();
  }, [userDetail]);
  return (
    <View style={styles.dashboardContainer}>
      {!userDetail || (isEmptyObj(userDetail) && <SkeletonView />)}
      <InfoBlock style={styles.infoArea} info={userDetail} />
      <ScrollView>
        <VStack space={1} mt="7">
          <HStack justifyContent="space-between" p={3} shadow={2}>
            <VStack space={2} p={4} bg="white" w="47%" rounded="md">
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="22px" fontWeight={700} color={'#569FA7'}>
                  {dataProvider.appointmentNumber}
                </Text>
                <Avatar bg="#E0F0F2">
                  <Icon as={Ionicons} name="search" size="md" color="#0CB7DD" />
                </Avatar>
              </HStack>
              <Text fontFamily={'WorkSans-regular'}> Total Booking</Text>
            </VStack>
            <VStack space={2} p={4} bg="white" w="47%" rounded="md">
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="22px" fontWeight={700} color={'#569FA7'}>
                  {dataProvider.services?.length ?? 0}
                </Text>
                <Avatar bg="#E0F0F2">
                  <Icon as={Ionicons} name="search" size="md" color="#0CB7DD" />
                </Avatar>
              </HStack>
              <Text fontFamily={'WorkSans-regular'}> Total Services</Text>
            </VStack>
          </HStack>
          <HStack justifyContent="space-between" p={3} shadow={2}>
            <VStack space={2} p={4} bg="white" w="47%" rounded="md">
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="22px" fontWeight={700} color={'#569FA7'}>
                  1
                </Text>
                <Avatar bg="#E0F0F2" size="md">
                  <Icon as={Ionicons} name="search" size="md" color="#0CB7DD" />
                </Avatar>
              </HStack>
              <Text fontFamily={'WorkSans-regular'}> Houseman</Text>
            </VStack>
            <VStack space={2} p={4} bg="white" w="47%" rounded="md">
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="20px" fontWeight={700} color={'#569FA7'}>
                  Đ 1.5
                </Text>
                <Avatar bg="#E0F0F2">
                  <Icon as={Ionicons} name="search" size="md" color="#0CB7DD" />
                </Avatar>
              </HStack>
              <Text fontFamily={'WorkSans-regular'}> Total Earning</Text>
            </VStack>
          </HStack>
        </VStack>
        <BarChartCustom />
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
        <ProviderDashboardScreen />
      </ImageBackground>
    </NativeBaseProvider>
  );
};
