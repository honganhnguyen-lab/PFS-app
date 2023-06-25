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
import BookingUpcoming from '../components/BookingUpcoming';
import BookingHistory from '../components/BookingHistory';
import {Pressable} from 'react-native';

const NotiList = () => {
  const [typeBooking, setTypeBooking] = useState(0);
  return (
    <View style={styles.listServicesScreen}>
      <View mt={50}>
        <HStack justifyContent="space-between" alignItems="center" p={3}>
          <HStack space={2}>
            <Divider bg="#87ADB2" thickness="4" mx="2" orientation="vertical" />
            <Heading>Notification</Heading>
          </HStack>
          <Icon as={Ionicons} name="trash" size="md" color="#87ADB2" />
        </HStack>
        <ScrollView>
          <HStack justifyContent="space-between" alignItems="center" p={5}>
            <HStack space={3} alignItems="center">
              <Avatar bg="#87ADB2">
                <Icon
                  as={Ionicons}
                  name="pencil-sharp"
                  size="sm"
                  color="white"
                />
              </Avatar>
              <VStack space={2} width="78%">
                <Text
                  fontWeight={600}
                  fontSize={14}
                  ellipsizeMode={'tail'}
                  numberOfLines={1}>
                  Edit profile
                </Text>
                <Text fontSize={12} ellipsizeMode={'tail'} numberOfLines={1}>
                  Edit profileEdit profileEdit profileEdit profileEdit
                  profileEdit profile
                </Text>
              </VStack>
            </HStack>
            <VStack space={2} alignItems="center">
              <Text
                fontWeight={600}
                fontSize={14}
                ellipsizeMode={'tail'}
                numberOfLines={1}>
                Sat
              </Text>
              <Icon as={Ionicons} name="ellipse" size="sm" color="#569FA7" />
            </VStack>
          </HStack>
          <HStack justifyContent="space-between" alignItems="center" p={5}>
            <HStack space={3} alignItems="center">
              <Avatar bg="#87ADB2">
                <Icon
                  as={Ionicons}
                  name="pencil-sharp"
                  size="sm"
                  color="white"
                />
              </Avatar>
              <VStack space={2} width="78%">
                <Text
                  fontWeight={600}
                  fontSize={14}
                  ellipsizeMode={'tail'}
                  numberOfLines={1}>
                  Edit profile
                </Text>
                <Text fontSize={12} ellipsizeMode={'tail'} numberOfLines={1}>
                  Edit profileEdit profileEdit profileEdit profileEdit
                  profileEdit profile
                </Text>
              </VStack>
            </HStack>
            <VStack space={2} alignItems="center">
              <Text
                fontWeight={600}
                fontSize={14}
                ellipsizeMode={'tail'}
                numberOfLines={1}>
                Sat
              </Text>
              <Icon as={Ionicons} name="ellipse" size="sm" color="#569FA7" />
            </VStack>
          </HStack>
          <HStack justifyContent="space-between" alignItems="center" p={5}>
            <HStack space={3} alignItems="center">
              <Avatar bg="#87ADB2">
                <Icon
                  as={Ionicons}
                  name="pencil-sharp"
                  size="sm"
                  color="white"
                />
              </Avatar>
              <VStack space={2} width="78%">
                <Text
                  fontWeight={600}
                  fontSize={14}
                  ellipsizeMode={'tail'}
                  numberOfLines={1}>
                  Edit profile
                </Text>
                <Text fontSize={12} ellipsizeMode={'tail'} numberOfLines={1}>
                  Edit profileEdit profileEdit profileEdit profileEdit
                  profileEdit profile
                </Text>
              </VStack>
            </HStack>
            <VStack space={2} alignItems="center">
              <Text
                fontWeight={600}
                fontSize={14}
                ellipsizeMode={'tail'}
                numberOfLines={1}>
                Sat
              </Text>
              <Icon as={Ionicons} name="ellipse" size="sm" color="#569FA7" />
            </VStack>
          </HStack>
        </ScrollView>
      </View>
    </View>
  );
};
export default () => {
  return (
    <NativeBaseProvider>
      <NotiList />
    </NativeBaseProvider>
  );
};
