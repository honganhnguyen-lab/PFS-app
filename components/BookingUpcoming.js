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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {appointmentStatus, defineCategory} from '../CommonType';
import {Linking} from 'react-native';
import {axiosConfig, updateAppointment} from '../axios';
import moment from 'moment';
import {useState} from 'react';
import Toast from 'react-native-toast-message';

export default BookingUpcoming = ({
  listUpcomingAppointment,
  isRoleProvider,
}) => {
  const onCallProvider = phone => {
    Linking.openURL(`tel://${phone}`);
  };
  const [loading, setLoading] = useState(false);

  const updateStatusAppointment = async id => {
    setLoading(true);
    const setAPIData = {
      status: 5,
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
  const currentDate = moment();
  const isSameDay = day => moment(day).isSame(currentDate, 'day');

  return (
    <VStack w="100%" space={4}>
      {listUpcomingAppointment &&
        listUpcomingAppointment.length > 0 &&
        listUpcomingAppointment?.map((item, index) => {
          const infoService = item?.serviceId ?? {};
          const infoProvider = item?.providerId ?? {};
          const infoCustomer = item?.customerId ?? {};
          const renderStatusLabel = appointmentStatus.find(
            status => status.value === item.status,
          );
          return (
            <VStack
              space={2}
              p={2}
              shadow={2}
              bg="white"
              rounded="lg"
              key={index}>
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
                      {`${infoService.price}`.toLocaleString()} VND
                    </Text>
                  </HStack>
                  <HStack
                    justifyContent="flex-start"
                    alignItems="center"
                    space={1}>
                    <Icon as={Ionicons} name="cash-outline" />
                    <Text
                      color="#6F767E"
                      fontSize={16}
                      style={{textAlign: 'right'}}>
                      Payment method:
                    </Text>
                    <Text color="#6F767E" fontSize={16} fontWeight={600}>
                      {item.paymentMethod
                        ? item.paymentMethod.toLocaleUpperCase()
                        : ''}
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
              <HStack justifyContent="space-between" mt={1}>
                <Text>Status</Text>
                <Badge
                  style={{width: 100, height: 30}}
                  colorScheme={renderStatusLabel.color}>
                  {renderStatusLabel?.label ?? ''}
                </Badge>
              </HStack>
              <HStack space={3} pt={2} justifyContent="flex-start">
                <Avatar bg="white">
                  <Icon as={Ionicons} name="calendar-outline" size="md" />
                </Avatar>
                <VStack space={2}>
                  <Text fontWeight={600} fontSize={16}>
                    {item.appointmentDate} : {item.appointmentStartTime} -{' '}
                    {item.appointmentEndTime}
                  </Text>
                  <Text color="#6F767E" fontSize={16}>
                    Schedule
                  </Text>
                </VStack>
              </HStack>
              <HStack pt={1} justifyContent="space-between">
                <HStack space={3}>
                  <Avatar
                    bg="#95C4CB"
                    source={{
                      uri: infoProvider.photo && infoProvider.photo,
                    }}
                  />

                  <VStack space={2}>
                    <Text fontWeight={600} fontSize={16}>
                      {infoProvider.name}
                    </Text>
                    <Text color="#6F767E" fontSize={16}>
                      Service provider
                    </Text>
                  </VStack>
                </HStack>
                <Button
                  w={100}
                  h={10}
                  onPress={() => onCallProvider(infoProvider.phoneNumber)}
                  leftIcon={
                    <Icon as={Ionicons} name="call-outline" size="sm" />
                  }>
                  <Text color={'white'} fontWeight={600}>
                    Call
                  </Text>
                </Button>
              </HStack>
              {item.status === 2 && isRoleProvider && (
                <HStack justifyContent="center" space={5} mt={5}>
                  <Button
                    w={120}
                    isLoading={loading}
                    onPress={() => updateStatusAppointment(item._id)}>
                    <Text color={'white'} fontWeight={600}>
                      Finish
                    </Text>
                  </Button>
                </HStack>
              )}
            </VStack>
          );
        })}
    </VStack>
  );
};
