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
  Skeleton,
} from 'native-base';
import {styles} from '../style';
import BookingUpcoming from '../components/BookingUpcoming';
import BookingHistory from '../components/BookingHistory';
import {axiosConfig, bookingUri} from '../axios';
import {useSelector, useDispatch} from 'react-redux';
import {setListAppointment} from '../redux/auth/bookingSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SkeletonLoading = () => {
  return (
    <Center mt={3}>
      <VStack
        w="100%"
        borderWidth="1"
        space={8}
        overflow="hidden"
        rounded="lg"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}>
        <Skeleton h="70" />

        <Skeleton.Text px="4" />
        <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
      </VStack>
    </Center>
  );
};

const BookingScreen = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const userId = user.payload?.id ?? '';
  const [loading, setLoading] = useState(false);
  const [typeBooking, setTypeBooking] = useState(0);
  const [listUpcomingAppointment, setListUpcomingAppointment] = useState([]);
  const [listHistoryAppointment, setListHistoryAppointment] = useState([]);

  const defineStatus = {
    notPayYet: 0,
    pending: 1,
    confirm: 2,
    reject: 3,
    processing: 4,
    done: 5,
  };

  const onGetListBooking = async () => {
    const token = await AsyncStorage.getItem('token');

    setLoading(true);
    try {
      const response = await axiosConfig.get(`${bookingUri}/${userId}`, {
        headers: {Authorization: `Bearer ${token}`},
      });

      const listFullAppointment = response.data.data.appointment;

      const selectListUpcomingAppointment = listFullAppointment?.filter(
        v =>
          v.status === defineStatus.confirm ||
          v.status === defineStatus.pending ||
          v.status === defineStatus.processing,
      );

      const selectListHistoryAppointment = listFullAppointment?.filter(
        v => v.status === defineStatus.reject || v.status === defineStatus.done,
      );
      setListUpcomingAppointment(selectListUpcomingAppointment);
      setListHistoryAppointment(selectListHistoryAppointment);
    } catch (err) {
      console.log('this', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    onGetListBooking();
  }, []);

  return (
    <View style={styles.listServicesScreen}>
      <View mt={50}>
        <HStack space={2} alignItems="center" p={3}>
          <Divider bg="#87ADB2" thickness="4" mx="2" orientation="vertical" />
          <Heading>Booking</Heading>
        </HStack>
        <Center w="100%" h={65} shadow={2} bg="white" p={3} rounded="lg">
          <HStack space={3}>
            <Button
              w={100}
              colorScheme="#59F5FF"
              onPress={() => setTypeBooking(0)}
              style={
                typeBooking === 0
                  ? styles.statusBooking
                  : styles.statusBookingFocus
              }>
              <Text
                color={typeBooking === 0 ? '#316970' : 'black'}
                fontWeight={600}>
                Upcoming
              </Text>
            </Button>
            <Button
              w={100}
              colorScheme="success"
              size="lg"
              onPress={() => setTypeBooking(1)}
              style={
                typeBooking === 1
                  ? styles.statusBooking
                  : styles.statusBookingFocus
              }>
              <Text
                color={typeBooking === 1 ? '#316970' : 'black'}
                fontWeight={600}>
                History
                {loading}
              </Text>
            </Button>
          </HStack>
        </Center>
      </View>

      <ScrollView>
        {loading ? (
          <SkeletonLoading />
        ) : (
          <VStack space={3} alignItems="center" mt="3">
            {typeBooking === 0 && (
              <BookingUpcoming
                listUpcomingAppointment={listUpcomingAppointment}
              />
            )}
            {typeBooking === 1 && (
              <BookingHistory listHistoryAppointment={listHistoryAppointment} />
            )}
          </VStack>
        )}
      </ScrollView>
    </View>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <BookingScreen />
    </NativeBaseProvider>
  );
};
