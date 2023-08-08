import {
  Text,
  Divider,
  HStack,
  Button,
  VStack,
  Icon,
  Avatar,
  Stack,
  Badge,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {acIcon} from '../assets/icon';
import {SvgCss} from 'react-native-svg';
import {styles} from '../style';
import {appointmentStatus, defineCategory} from '../CommonType';

export default BookingHistory = ({listHistoryAppointment, isProvider}) => {
  return (
    <VStack w="100%" space={4}>
      {listHistoryAppointment &&
        listHistoryAppointment?.length > 0 &&
        listHistoryAppointment?.map(item => {
          const infoService = item?.serviceId ?? {};
          const infoProvider = item?.providerId ?? {};
          const infoUser = item?.userId ?? {};
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
              key={item._id}>
              <HStack pt={2} justifyContent="space-between">
                <HStack space={2}>
                  <Icon as={Ionicons} name="person-outline" size="md" />
                  <Text fontWeight={600} fontSize={16}>
                    {isProvider ? infoUser.name : infoProvider.name}
                  </Text>
                </HStack>
                <Badge
                  style={{width: 100, height: 30}}
                  colorScheme={renderStatusLabel.color}>
                  {renderStatusLabel.label}
                </Badge>
              </HStack>
              <HStack space={3} pt={2}>
                <Avatar bg="#238793"></Avatar>
                <VStack space={2}>
                  <Text fontWeight={600} fontSize={16}>
                    {infoService.title}
                  </Text>
                  <HStack
                    space={2}
                    justifyContent="flex-start"
                    alignItems="center">
                    <Icon as={Ionicons} name="cash" color="#316970" />
                    <Text
                      color="#6F767E"
                      fontSize={16}
                      fontWeight={600}
                      style={{textAlign: 'right'}}>
                      {item.totalPrice}
                    </Text>
                  </HStack>
                  <HStack
                    space={2}
                    justifyContent="flex-start"
                    alignItems="center">
                    <Icon as={Ionicons} name="location" color="#316970" />
                    <Text
                      color="#6F767E"
                      fontSize={16}
                      fontWeight={600}
                      style={{textAlign: 'right'}}>
                      70 Trung Van
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
              {!isProvider && (
                <>
                  <Divider
                    my="2"
                    _light={{
                      bg: 'muted.300',
                    }}
                    _dark={{
                      bg: 'muted.50',
                    }}
                  />
                  <HStack justifyContent="space-between" alignItems="center">
                    <HStack space={2}>
                      <Icon
                        as={Ionicons}
                        size={4}
                        name="star-sharp"
                        color="yellow.300"
                      />
                      <Text>{item.rating ?? 0}</Text>
                    </HStack>
                    <Button style={{backgroundColor: '#0f766e'}}>
                      <Text color={'white'} fontWeight={600}>
                        Re-schedule
                      </Text>
                    </Button>
                  </HStack>
                </>
              )}
            </VStack>
          );
        })}
    </VStack>
  );
};
