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
  Pressable,
  Modal,
  FormControl,
} from 'native-base';
import {styles} from '../style';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';
import {DatePickerCustomize} from '../components/atoms/DatePicker';

import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {chooseProvider} from '../assets/icon';
import {SvgCss} from 'react-native-svg';

const AppointmentDetail = () => {
  const [skipPermissionRequests, setSkipPermissionRequests] = useState(false);
  const [authorizationLevel, setAuthorizationLevel] = useState('auto');

  const [locationProvider, setLocationProvider] = useState('auto');
  const [defaultLocation, setDefaultLocation] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalNextStep, setIsModalNextStep] = useState(false);

  const handleSizeClick = () => {
    setModalVisible(!modalVisible);
  };

  const updateLocationDetail = () => {
    setDefaultLocation(locationInput);
    setModalVisible(false);
  };

  const handleNextStep = () => {
    setIsModalNextStep(!modalVisible);
  };

  const onMoveToNextStep = () => {
    setIsModalNextStep(false);
  };

  const navigation = useNavigation();
  const getLocation = () => {
    Geolocation.getCurrentPosition(async info => {
      const latitude = info.coords.latitude;
      const longtitude = info.coords.longitude;
      try {
        const locationData = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${longtitude},${latitude}.json?access_token=pk.eyJ1IjoicXVhbnplbjgiLCJhIjoiY2xqNnB1bG5qMGVmODNzbzVhbmlydWI4YyJ9.-5blwlT5oWlIINJKW_ERzQ`,
        );
        setDefaultLocation(locationData.data?.features[0]?.place_name ?? '');
      } catch (err) {
        console.log(err);
      }
    });
  };

  useEffect(() => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests,
      authorizationLevel,
      locationProvider,
    });
  }, [skipPermissionRequests, authorizationLevel, locationProvider]);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    setLocationInput('');
  }, [modalVisible]);

  return (
    <View style={styles.listServicesScreen}>
      <View mt={50}>
        <HStack space={3} alignItems="center" p={3}>
          <Pressable onPress={() => navigation.navigate('Dashboard')}>
            <Avatar bg="#569FA7">
              <Icon
                as={Ionicons}
                name="chevron-back-outline"
                size="md"
                color="white"
              />
            </Avatar>
          </Pressable>
          <Heading>Cleaning</Heading>
        </HStack>
        <Divider bg="#87ADB2" thickness="4" mx="2" />
      </View>
      <VStack space={3} alignItems="center" mt="5">
        <Stack
          w="100%"
          shadow={2}
          bg="white"
          pt={4}
          p={2}
          rounded="lg"
          space={2}>
          <HStack justifyContent="flex-start" space={2} alignItems="center">
            <Icon as={Ionicons} name="location" color="#87ADB2" />
            <Text fontWeight={600} fontSize={14}>
              LOCATION
            </Text>
          </HStack>
          <HStack justifyContent="space-between" alignItems="center">
            <Text style={{flexWrap: 'wrap', width: '75%'}}>
              {defaultLocation}
            </Text>
            <Button bgColor={'#316970'} onPress={handleSizeClick}>
              Change
            </Button>
          </HStack>
        </Stack>
        <Stack
          w="100%"
          shadow={2}
          bg="white"
          pt={4}
          p={2}
          rounded="lg"
          space={2}>
          <HStack justifyContent="flex-start" space={2} alignItems="center">
            <Icon as={Ionicons} name="calendar-outline" color="#87ADB2" />
            <Text fontWeight={600} fontSize={14}>
              SCHEDULE
            </Text>
          </HStack>
          <HStack justifyContent="space-between" alignItems="center">
            <DatePickerCustomize />
          </HStack>
        </Stack>
        <Button
          mt={10}
          bgColor={'#316970'}
          width="100%"
          height={50}
          rounded={'md'}
          onPress={handleNextStep}>
          Next step
        </Button>
      </VStack>
      <Modal isOpen={modalVisible} onClose={setModalVisible} size={'lg'}>
        <Modal.Content maxH="212">
          <Modal.CloseButton />
          <Modal.Header>Change Location</Modal.Header>
          <Modal.Body>
            <FormControl.Label>Location</FormControl.Label>
            <Input value={locationInput} onChangeText={setLocationInput} />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false);
                }}>
                Cancel
              </Button>
              <Button bgColor={'#316970'} onPress={updateLocationDetail}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal
        isOpen={isModalNextStep}
        onClose={handleNextStep}
        size={'xl'}
        _backdrop={{
          _dark: {
            bg: 'muted.600',
          },
          bg: 'muted.600',
        }}
        overlayVisible>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Body>
            <Center>
              <SvgCss xml={chooseProvider} width={150} height={150} />
              <Text fontWeight={600} fontSize={'18'} fontFamily={'LobsterTwo'}>
                Do you want us to pick provider randomly ?
              </Text>
            </Center>
          </Modal.Body>
          <Button.Group space={5} justifyContent={'center'} p={3}>
            <Button
              variant="outline"
              colorScheme="blueGray"
              width={100}
              onPress={() => {
                setModalVisible(false);
              }}>
              No
            </Button>
            <Button
              bgColor={'#316970'}
              width={100}
              onPress={updateLocationDetail}>
              Yes
            </Button>
          </Button.Group>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <AppointmentDetail />
    </NativeBaseProvider>
  );
};
