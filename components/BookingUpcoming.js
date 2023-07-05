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
import {SvgCss} from 'react-native-svg';
import {appointmentStatus, defineCategory} from '../CommonType';
import {Linking} from 'react-native';

export default BookingUpcoming = ({listUpcomingAppointment}) => {
  const onCallProvider = phone => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <VStack w="100%" space={4}>
      {listUpcomingAppointment?.length > 0 &&
        listUpcomingAppointment?.map((item, index) => {
          const infoService = item?.serviceId ?? {};
          const infoProvider = item?.providerId ?? {};
          const renderStatusLabel = appointmentStatus.find(
            status => status.value === item.status,
          );
          const renderIcon = defineCategory.find(
            cate => cate.status === infoService.category,
          )?.icon;
          return (
            <VStack
              space={2}
              p={2}
              shadow={2}
              bg="white"
              rounded="lg"
              key={index}>
              <HStack space={3} pt={2} justifyContent="flex-start">
                <Avatar bg="success.800">
                  <SvgCss
                    width={25}
                    height={25}
                    color="white"
                    fill="white"
                    xml={renderIcon}
                  />
                </Avatar>
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
                      {item.totalPrice} VND
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
                <Avatar bg="muted.100">
                  <Icon as={Ionicons} name="calendar-outline" size="md" />
                </Avatar>
                <VStack space={2}>
                  <Text fontWeight={600} fontSize={16}>
                    {item.appointmentDate} {item.appointmentStartTime}
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
                      uri: item.avatar && item.avatar,
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
            </VStack>
          );
        })}
    </VStack>
  );
};
