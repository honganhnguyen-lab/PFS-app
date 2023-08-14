import {useEffect, useState} from 'react';
import {
  Text,
  Center,
  NativeBaseProvider,
  Divider,
  View,
  HStack,
  Button,
  VStack,
  ScrollView,
  Heading,
  Skeleton,
} from 'native-base';
import {styles} from '../style';
import BookingUpcoming from '../components/BookingUpcoming';
import BookingHistory from '../components/BookingHistory';
import {axiosConfig, bookingUri} from '../axios';
import {useSelector, useDispatch} from 'react-redux';
import {setListAppointment} from '../redux/auth/bookingSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const SkeletonLoading = () => {
  return (
    <Center pt={5}>
      <VStack
        w="100%"
        borderWidth="1"
        space={8}
        mt={5}
        overflow="hidden"
        rounded="lg"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}>
        <Skeleton h="40" mt={4} />

        <Skeleton.Text px="4" />
        <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
      </VStack>
    </Center>
  );
};

const BookingScreen = () => {
  const user = useSelector(state => state.auth.user);
  const isFocused = useIsFocused();

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
          v.status === defineStatus.pending ||
          v.status === defineStatus.confirm ||
          (v.status === defineStatus.notPayYet && v.paymentMethod === 'cash'),
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
    if (isFocused) {
      onGetListBooking();
    }
  }, [isFocused]);

  return (
    <View style={styles.listServicesScreen}>
      <View mt={50}>
        <VStack space={3} alignItems="center" p={3}>
          <Text style={{color: '#559FA7', fontWeight: 600, fontSize: 18}}>
            Booking
          </Text>
          <Divider bg="#F4F4F4" thickness="2" mx="2" />
        </VStack>
        <Center
          w="100%"
          shadow={2}
          bg="white"
          p={1}
          rounded="lg"
          bgColor="#F3F3F3">
          <HStack alignItems="center" justifyContent="center">
            <Button
              flex={1}
              onPress={() => setTypeBooking(0)}
              style={
                typeBooking === 0
                  ? styles.statusBooking
                  : styles.statusBookingFocus
              }>
              <Text color={'#316970'} fontWeight={600}>
                Upcoming
              </Text>
            </Button>
            <Button
              flex={1}
              colorScheme="success"
              size="lg"
              onPress={() => setTypeBooking(1)}
              style={
                typeBooking === 1
                  ? styles.statusBooking
                  : styles.statusBookingFocus
              }>
              <Text color={'#316970'} fontWeight={600}>
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
