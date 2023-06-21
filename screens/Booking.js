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
import Footer from './Footer';
import {acIcon} from '../assets/icon';
import {SvgCss} from 'react-native-svg';
import BookingUpcoming from '../components/BookingUpcoming';
import BookingHistory from '../components/BookingHistory';

const BookingScreen = () => {
  const [typeBooking, setTypeBooking] = useState(0);
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
              </Text>
            </Button>
          </HStack>
        </Center>
      </View>

      <ScrollView>
        <VStack space={3} alignItems="center" mt="3">
          {typeBooking === 0 && <BookingUpcoming />}
          {typeBooking === 1 && <BookingHistory />}
        </VStack>
      </ScrollView>
    </View>
  );
};
export default () => {
  return (
    <NativeBaseProvider>
      <BookingScreen />
      <Footer selectValue={1} />
    </NativeBaseProvider>
  );
};
