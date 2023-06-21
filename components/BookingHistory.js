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

export default BookingHistory = () => {
  return (
    <Stack w="100%" shadow={2} bg="white" p={2} rounded="lg">
      <VStack space={2} p={2}>
        <HStack pt={2} justifyContent="space-between">
          <Text fontWeight={600} fontSize={16}>
            Provider
          </Text>
          <Badge style={{width: 100, height: 30}} colorScheme="success">
            Success
          </Badge>
        </HStack>
        <HStack space={3} pt={2}>
          <Avatar bg="amber.500">
            <SvgCss width={20} height={20} xml={acIcon} />
          </Avatar>
          <VStack space={2}>
            <Text fontWeight={600} fontSize={16}>
              AC Installation
            </Text>
            <HStack justifyContent="flex-end" alignItems="center">
              <Icon as={Ionicons} name="cash-outline" />
              <Text color="#6F767E" fontSize={16} style={{textAlign: 'right'}}>
                Cost: 100.000d
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
        <HStack justifyContent="space-between" alignItems="center">
          <HStack space={2}>
            <Icon as={Ionicons} size={4} name="star-sharp" color="yellow.300" />
            <Text>4.8</Text>
          </HStack>
          <Button style={{backgroundColor: '#0f766e'}}>
            <Text color={'white'} fontWeight={600}>
              Re-schedule
            </Text>
          </Button>
        </HStack>
      </VStack>
    </Stack>
  );
};
