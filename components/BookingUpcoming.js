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

export default BookingUpcoming = () => {
  return (
    <Stack w="100%" shadow={2} bg="white" p={2} rounded="lg">
      <VStack space={2} p={2}>
        <HStack space={3} pt={2} justifyContent="flex-start">
          <Avatar bg="amber.500">
            <SvgCss width={20} height={20} xml={acIcon} />
          </Avatar>
          <VStack space={2}>
            <Text fontWeight={600} fontSize={16}>
              AC Installation
            </Text>
            <Text color="#6F767E" fontSize={16}>
              Reference code: #D-1203
            </Text>
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
          <Badge style={{width: 100, height: 30}} colorScheme="success">
            Confirmed
          </Badge>
        </HStack>
        <HStack space={3} pt={2} justifyContent="flex-start">
          <Avatar bg="muted.100">
            <Icon as={Ionicons} name="calendar-outline" size="md" />
          </Avatar>
          <VStack space={2}>
            <Text fontWeight={600} fontSize={16}>
              8:00-9:00 AM, 09 Dec
            </Text>
            <Text color="#6F767E" fontSize={16}>
              Schedule
            </Text>
          </VStack>
        </HStack>
        <HStack pt={1} justifyContent="space-between">
          <HStack space={3}>
            <Avatar bg="amber.500">
              <SvgCss width={20} height={20} xml={acIcon} />
            </Avatar>
            <VStack space={2}>
              <Text fontWeight={600} fontSize={16}>
                Westinghouse
              </Text>
              <Text color="#6F767E" fontSize={16}>
                Service provider
              </Text>
            </VStack>
          </HStack>
          <Button
            w={100}
            leftIcon={<Icon as={Ionicons} name="call-outline" size="sm" />}>
            <Text color={'white'} fontWeight={600}>
              Call
            </Text>
          </Button>
        </HStack>
      </VStack>
    </Stack>
  );
};
