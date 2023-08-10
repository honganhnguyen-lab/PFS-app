import {
  Text,
  Divider,
  HStack,
  Button,
  VStack,
  Icon,
  Avatar,
  Badge,
} from 'native-base';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SvgCss} from 'react-native-svg';
import {appointmentStatus, defineCategory} from '../CommonType';
import {Linking} from 'react-native';
import Toast from 'react-native-toast-message';
import {
  axiosConfig,
  getListServicesEachProvider,
  updateAppointment,
} from '../axios';
import {useState} from 'react';

export default BookingPending = ({listPendingAppointment}) => {
  const user = useSelector(state => state.auth.user);
  const userDetail = user.payload;
  const [loading, setLoading] = useState(false);
  const onCallProvider = phone => {
    Linking.openURL(`tel:${phone}`);
  };

  const updateStatusAppointment = async (id, value) => {
    setLoading(true);
    const setAPIData = {
      status: value,
    };
    try {
      await axiosConfig.patch(`${updateAppointment}${id}`, setAPIData);
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
    setLoading(false);
  };

  return (
    <VStack w="100%" space={4}>
      {listPendingAppointment &&
        listPendingAppointment?.length > 0 &&
        listPendingAppointment?.map(item => {
          const infoService = item?.serviceId ?? {};
          const infoProvider = item?.providerId ?? {};
          const infoCustomer = item?.userId ?? {};
          const totalPrice = item.totalPrice;
          return (
            <VStack
              space={2}
              p={2}
              shadow={2}
              bg="white"
              rounded="lg"
              key={item._id}>
              <HStack space={3} pt={2} justifyContent="flex-start">
                <Avatar
                  bg="#238793"
                  source={{
                    uri: infoService.picture,
                  }}
                />
                <VStack space={2}>
                  <Text fontWeight={600} fontSize={16}>
                    {infoService.title}
                  </Text>
                  <HStack
                    justifyContent="flex-start"
                    alignItems="center"
                    space={1}>
                    <Icon as={Ionicons} name="cash-outline" />
                    <Text
                      color="#6F767E"
                      fontSize={16}
                      style={{textAlign: 'right'}}>
                      Price:
                    </Text>
                    <Text color="#6F767E" fontSize={16} fontWeight={600}>
                      {totalPrice.toLocaleString()} VND
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
              <Divider
                my="2"
                _light={{
                  bg: 'muted.300',
                }}
                _dark={{
                  bg: 'muted.50',
                }}
              />
              <HStack space={3} p={2} justifyContent="flex-start">
                <Icon as={Ionicons} name="calendar-outline" size="md" />
                <VStack space={2}>
                  <Text fontWeight={600} fontSize={16}>
                    {item.appointmentDate} {item.appointmentStartTime}
                  </Text>
                </VStack>
              </HStack>
              <HStack space={3} p={2} justifyContent="flex-start">
                <Icon as={Ionicons} name="location-outline" size="md" />
                <VStack space={2}>
                  <Text fontWeight={600} fontSize={16}>
                    190 Dai La St, Hai Ba Trung district
                  </Text>
                </VStack>
              </HStack>
              <HStack p={2} justifyContent="space-between">
                <HStack space={3}>
                  <Icon as={Ionicons} name="person-outline" size="md" />

                  <VStack space={2}>
                    <Text fontWeight={600} fontSize={16}>
                      {infoCustomer.name}
                    </Text>
                    <Text color="#6F767E" fontSize={16}>
                      Customer
                    </Text>
                  </VStack>
                </HStack>
                <Button
                  w={100}
                  bg="#316970"
                  leftIcon={
                    <Icon
                      as={Ionicons}
                      name="call-outline"
                      size="sm"
                      onPress={() => onCallProvider(infoProvider.phoneNumber)}
                    />
                  }>
                  <Text color={'white'} fontWeight={600}>
                    Call
                  </Text>
                </Button>
              </HStack>
              <Divider
                my="2"
                _light={{
                  bg: 'muted.300',
                }}
                _dark={{
                  bg: 'muted.50',
                }}
              />
              <HStack justifyContent="center" space={5}>
                <Button
                  w={120}
                  bg="#316970"
                  isLoading={loading}
                  onPress={() => updateStatusAppointment(item._id, 2)}>
                  <Text color={'white'} fontWeight={600}>
                    Accept
                  </Text>
                </Button>
                <Button
                  w={120}
                  bg="white"
                  variant="outline"
                  borderColor="#316970"
                  onPress={() => updateStatusAppointment(item._id, 3)}>
                  <Text color={'#316970'} fontWeight={600}>
                    Decline
                  </Text>
                </Button>
              </HStack>
            </VStack>
          );
        })}
    </VStack>
  );
};
