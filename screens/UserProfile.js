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

const UserProfile = () => {
  const [typeBooking, setTypeBooking] = useState(0);
  return (
    <View style={styles.listServicesScreen}>
      <View mt={50}>
        <HStack space={2} alignItems="center" p={3}>
          <Divider bg="#87ADB2" thickness="4" mx="2" orientation="vertical" />
          <Heading>Profile</Heading>
        </HStack>
        <Center w="100%" shadow={2} bg="white" p={3} rounded="lg">
          <VStack space={3} justifyContent="center" alignItems="center">
            <Avatar
              bg="purple.600"
              alignSelf="center"
              size="xl"
              source={{
                uri: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
              }}>
              RB
              <Avatar.Badge bg="#87ADB2">
                <Pressable>
                  <Center>
                    <Icon
                      as={Ionicons}
                      name="create-outline"
                      size="sm"
                      color="white"
                    />
                  </Center>
                </Pressable>
              </Avatar.Badge>
            </Avatar>
            <Heading color="#87ADB2">Amie Nguyen</Heading>
            <Text fontWeight="600" fontSize={16}>
              amie@gmail.com
            </Text>
          </VStack>
        </Center>
        <HStack space={2} mt={4} alignItems="center">
          <Text fontWeight="600" fontSize={14} color="#238793">
            GENERAL
          </Text>
        </HStack>
        <VStack space={1} mt={3} w="100%" shadow={2} bg="white">
          <HStack justifyContent="space-between" alignItems="center" p={3}>
            <HStack space={3} alignItems="center">
              <Icon
                as={Ionicons}
                name="pencil-sharp"
                size="md"
                color="#87ADB2"
              />
              <Text fontWeight={600} fontSize={14}>
                Edit profile
              </Text>
            </HStack>
            <Icon
              as={Ionicons}
              name="chevron-forward-outline"
              size="md"
              color="#569FA7"
            />
          </HStack>
          <HStack justifyContent="space-between" alignItems="center" p={3}>
            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="lock-open" size="md" color="#87ADB2" />
              <Text fontWeight={600} fontSize={14}>
                Change password
              </Text>
            </HStack>
            <Icon
              as={Ionicons}
              name="chevron-forward-outline"
              size="md"
              color="#569FA7"
            />
          </HStack>
          <HStack justifyContent="space-between" alignItems="center" p={3}>
            <HStack space={3} alignItems="center">
              <Icon
                as={Ionicons}
                name="heart-circle-outline"
                size="md"
                color="#87ADB2"
              />
              <Text fontWeight={600} fontSize={14}>
                Favorite service
              </Text>
            </HStack>
            <Icon
              as={Ionicons}
              name="chevron-forward-outline"
              size="md"
              color="#569FA7"
            />
          </HStack>
          <HStack justifyContent="space-between" alignItems="center" p={3}>
            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="star" size="md" color="#87ADB2" />
              <Text fontWeight={600} fontSize={14}>
                Rate us
              </Text>
            </HStack>
            <Icon
              as={Ionicons}
              name="chevron-forward-outline"
              size="md"
              color="#569FA7"
            />
          </HStack>
        </VStack>
        <HStack space={2} mt={4} alignItems="center">
          <Text fontWeight="600" fontSize={14} color="#238793">
            ABOUT APP
          </Text>
        </HStack>
        <VStack space={1} mt={3} w="100%" shadow={2} bg="white">
          <HStack justifyContent="space-between" alignItems="center" p={3}>
            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="reader" size="md" color="#87ADB2" />
              <Text fontWeight={600} fontSize={14}>
                Privacy Policy
              </Text>
            </HStack>
            <Icon
              as={Ionicons}
              name="chevron-forward-outline"
              size="md"
              color="#569FA7"
            />
          </HStack>
          <HStack justifyContent="space-between" alignItems="center" p={3}>
            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="log-out" size="md" color="#87ADB2" />
              <Text fontWeight={600} fontSize={14}>
                Log out
              </Text>
            </HStack>
            <Icon
              as={Ionicons}
              name="chevron-forward-outline"
              size="md"
              color="#569FA7"
            />
          </HStack>
        </VStack>
      </View>
    </View>
  );
};
export default () => {
  return (
    <NativeBaseProvider>
      <UserProfile />
    </NativeBaseProvider>
  );
};
