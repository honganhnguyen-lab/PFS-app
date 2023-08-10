import {useEffect, useState, useRef} from 'react';
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
  Button,
  Modal,
  FormControl,
  Input,
  Select,
} from 'native-base';
import {styles} from '../style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import axios from 'axios';

import {ImageBackground} from 'react-native';
import {InfoBlock} from '../components/Info';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {useSelector} from 'react-redux';
import {setDataUser} from '../redux/auth/authSlice';

import {BarChartCustom} from '../components/BarChart';
import {axiosConfig, getListServicesEachProvider} from '../axios';
import {ProviderTimeRange} from '../components/ProviderTimeRange';
import TimeSlider from '../components/TimeSlider';
import {useIsFocused} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';

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
  const [modalVisible, setModalVisible] = useState(false);
  const [weekCategory, setWeekCategory] = useState('weekday');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const isFocus = useIsFocused();
  const [skipPermissionRequests, setSkipPermissionRequests] = useState(false);
  const [authorizationLevel, setAuthorizationLevel] = useState('auto');
  const [locationProvider, setLocationProvider] = useState('auto');
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();

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

  const updateDefaultSchedule = async () => {
    setLoading(true);
    const setAPIData = {
      weeklySchedule: weekCategory,
      timeRange: `${startTime}-${endTime}`,
    };
    try {
      await axiosConfig.patch(
        `${getListServicesEachProvider}${userDetail.id}`,
        setAPIData,
      );
      Toast.show({
        type: 'success',
        text1: 'Updated success',
      });
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: err,
      });
    }
    onGetDetailProvider();
    setModalVisible(false);
    setLoading(false);
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
          setDataUser({
            ...userDetail,
            location: {
              type: 'Point',
              coordinates: [latitude, longtitude],
              address: address,
            },
          }),
        );
        setAddress(address);
      } catch (err) {
        console.log('err', err);
      }
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
    onGetDetailProvider();
  }, []);
  return (
    <View style={styles.dashboardContainer}>
      <Text color="black">{address}</Text>
      {!userDetail || (isEmptyObj(userDetail) && <SkeletonView />)}
      <InfoBlock style={styles.infoArea} info={userDetail} address={address} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space={1} mt="7">
          <Text fontSize={16} color={'#559FA7'} fontWeight={600}>
            Overview
          </Text>
          <HStack justifyContent="space-between" p={3} shadow={2}>
            <VStack space={2} p={4} bg="white" w="47%" rounded="md">
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="20px" fontWeight={700} color={'#569FA7'}>
                  {dataProvider.appointmentNumber ?? 0}
                </Text>
                <Avatar bg="#E0F0F2">
                  <Icon as={Ionicons} name="search" size="md" color="#0CB7DD" />
                </Avatar>
              </HStack>
              <Text fontFamily={'WorkSans-regular'}> Total Booking</Text>
            </VStack>
            <VStack space={2} p={4} bg="white" w="47%" rounded="md">
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="20px" fontWeight={700} color={'#569FA7'}>
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
                <Text fontSize="20px" fontWeight={700} color={'#569FA7'}>
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
        <VStack space={3} mt="5">
          <HStack justifyContent={'space-between'} pl={2} pr={2}>
            <Text fontSize={16} color={'#559FA7'} fontWeight={600}>
              Default Schedule
            </Text>
            <Button
              bgColor="#559FA7"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              Change
            </Button>
          </HStack>
          <Modal
            isOpen={modalVisible}
            onClose={() => setModalVisible(false)}
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}>
            <Modal.Content>
              <Modal.CloseButton />
              <Modal.Header>Change Default Schedule</Modal.Header>
              <Modal.Body>
                <FormControl>
                  <FormControl.Label>Weekly schedule</FormControl.Label>
                  <Select
                    minWidth="200"
                    accessibilityLabel="Choose Service"
                    placeholder="Enter..."
                    size="xl"
                    value={weekCategory}
                    onValueChange={value => setWeekCategory(value)}
                    bgColor="#EEEEEE"
                    mt="1">
                    <Select.Item label="Weekday(Mon-Fri)" value="weekday" />
                    <Select.Item label="Weekend(Sat, Sun)" value="weekend" />
                    <Select.Item label="Full week" value="fullweek" />
                  </Select>
                </FormControl>
                <FormControl mt="3" pl={1}>
                  <TimeSlider
                    title="Start time"
                    onTimeChanged={time => setStartTime(time)}
                    minimumValue={14}
                    maximumValue={20}
                    initialTime="07:00"
                  />
                </FormControl>
                <FormControl mt="3" pl={1}>
                  <TimeSlider
                    title="End time"
                    onTimeChanged={time => setEndTime(time)}
                    minimumValue={14}
                    initialTime="07:00"
                  />
                </FormControl>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      setModalVisible(false);
                    }}>
                    Cancel
                  </Button>
                  <Button
                    bgColor="#559FA7"
                    onPress={() => {
                      updateDefaultSchedule();
                    }}>
                    Save
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
          <ProviderTimeRange dataProvider={dataProvider} />
        </VStack>
        <VStack space={3} mt="5">
          <Text fontSize={16} color={'#559FA7'} fontWeight={600}>
            Chart
          </Text>
          <BarChartCustom />
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
        <ProviderDashboardScreen />
      </ImageBackground>
    </NativeBaseProvider>
  );
};
