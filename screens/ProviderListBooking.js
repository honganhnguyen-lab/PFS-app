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
import {axiosConfig, bookingUri, listBookingProviderUri} from '../axios';
import {useSelector, useDispatch} from 'react-redux';
import {setListAppointment} from '../redux/auth/bookingSlice';
import BookingPending from '../components/BookingPending';
import {useIsFocused} from '@react-navigation/native';

const SkeletonLoading = () => {
  return (
    <Center w="100%">
      <VStack
        w="90%"
        maxW="400"
        borderWidth="1"
        space={8}
        overflow="hidden"
        rounded="md"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}>
        <Skeleton h="40" />
        <Skeleton.Text px="4" />
        <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
      </VStack>
    </Center>
  );
};

const ProviderBookingScreen = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const userId = user.payload?.id ?? '';
  const isRoleProvider = user.payload.role === 'provider';
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [typeBooking, setTypeBooking] = useState(0);
  const [listUpcomingAppointment, setListUpcomingAppointment] = useState([]);
  const [listHistoryAppointment, setListHistoryAppointment] = useState([]);
  const [listPendingAppointment, setListPendingAppointment] = useState([]);

  const defineStatus = {
    notPayYet: 0,
    pending: 1,
    confirm: 2,
    reject: 3,
    processing: 4,
    done: 5,
  };

  const onGetListBooking = async () => {
    setLoading(true);
    try {
      const response = await axiosConfig.get(
        `${listBookingProviderUri}/${userId}`,
      );

      const listFullAppointment = response.data.data.appointment;

      const selectListUpcomingAppointment = listFullAppointment?.filter(
        v =>
          v.status === defineStatus.confirm ||
          v.status === defineStatus.processing,
      );
      const selectListPendingAppointment = listFullAppointment?.filter(
        v => v.status === defineStatus.pending,
      );

      const selectListHistoryAppointment = listFullAppointment?.filter(
        v => v.status === defineStatus.reject || v.status === defineStatus.done,
      );
      setListUpcomingAppointment(selectListUpcomingAppointment);
      setListHistoryAppointment(selectListHistoryAppointment);
      setListPendingAppointment(selectListPendingAppointment);
    } catch (err) {
      console.log(err);
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
              onPress={() => setTypeBooking(1)}
              style={
                typeBooking === 1
                  ? styles.statusBooking
                  : styles.statusBookingFocus
              }>
              <Text color={'#316970'} fontWeight={600}>
                Pending
              </Text>
            </Button>
            <Button
              flex={1}
              colorScheme="success"
              size="lg"
              onPress={() => setTypeBooking(2)}
              style={
                typeBooking === 2
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
                isRoleProvider={isRoleProvider}
              />
            )}
            {typeBooking === 1 && (
              <BookingPending
                listPendingAppointment={listPendingAppointment}
                isProvider
              />
            )}
            {typeBooking === 2 && (
              <BookingHistory
                listHistoryAppointment={listHistoryAppointment}
                isProvider
                isRoleProvider={isRoleProvider}
              />
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
      <ProviderBookingScreen />
    </NativeBaseProvider>
  );
};
