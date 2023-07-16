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
  useDisclose,
  Square,
} from 'native-base';
import {styles} from '../style';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';
import {
  DatePickerCustomize,
  TimePickerCustomize,
} from '../components/atoms/DatePicker';

import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import moment from 'moment';
import {
  registerAppointment,
  onSendAppointmentEndTime,
  onSendAppointmentDateTime,
} from '../redux/appointment/appointmentSlice';

const AppointmentDetail = () => {
  const dispatch = useDispatch();
  const location = useSelector(state => state.appointment.location);
  const [locationInput, setLocationInput] = useState(location?.address ?? '');
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalNextStep, setIsModalNextStep] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [endTime, setEndTime] = useState('');

  const onChangeSelectedDate = date => {
    const dateObj = moment(date, 'YYYY/MM/DD HH:mm');
    const convertedTime = parseInt(dateObj.hour(), 10);
    if (convertedTime < 8) {
      alert('Please choose time after 8AM');
    } else if (convertedTime > 21) {
      alert('Please choose time before 8PM');
    } else {
      setSelectedDate(date);
      dispatch(onSendAppointmentDateTime(date));
    }
  };

  const handleTimeChange = time => {
    const convertedTime = parseInt(time.toString(), 10);
    const startTime = moment(selectedDate, 'YYYY/MM/DD HH:mm');
    const convertedStartTime = parseInt(startTime.hour(), 10);
    if (convertedTime < convertedStartTime) {
      alert('Please choose time after start time');
    } else {
      setEndTime(time);
      dispatch(onSendAppointmentEndTime(time));
    }
  };

  const handleSizeClick = () => {
    setModalVisible(!modalVisible);
  };

  const handleNextStep = () => {
    dispatch(registerAppointment());
    // navigation.navigate('Proceed');
  };

  const onMoveToNextStep = () => {
    setIsModalNextStep(false);
  };

  const onChooseProvider = () => {
    setIsModalNextStep(false);
    navigation.navigate('ProviderList');
  };
  const updateLocationDetail = location => {
    setLocationInput(location);
    dispatch(
      onSendLocation({
        address: defaultLocation,
      }),
    );
  };

  const navigation = useNavigation();

  useEffect(() => {
    if (selectedDate && endTime && locationInput) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [selectedDate, endTime, locationInput]);

  return (
    <View style={styles.listServicesScreen}>
      <View mt={50}>
        <HStack space={3} alignItems="center" p={3}>
          <Pressable onPress={() => navigation.navigate('DetailProvider')}>
            <Avatar bg="#569FA7">
              <Icon
                as={Ionicons}
                name="chevron-back-outline"
                size="md"
                color="white"
              />
            </Avatar>
          </Pressable>
          <Heading>Final step</Heading>
        </HStack>
        <Divider bg="#87ADB2" thickness="4" mx="2" />
      </View>
      <ScrollView>
        <VStack space={3} alignItems="center" mt="5">
          <Stack
            w="100%"
            shadow={3}
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
                {locationInput}
              </Text>
              <Button bgColor={'#316970'} onPress={handleSizeClick}>
                Change
              </Button>
            </HStack>
          </Stack>
          <Stack
            w="100%"
            shadow={3}
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
              <DatePickerCustomize
                selectedDate={selectedDate}
                onChangeSelectedDate={onChangeSelectedDate}
              />
            </HStack>
          </Stack>
          <Stack w="100%" shadow={3} bg="white" pt={4} p={2} rounded="lg">
            <HStack justifyContent="flex-start" space={2} alignItems="center">
              <Icon as={Ionicons} name="calendar-outline" color="#87ADB2" />
              <Text fontWeight={600} fontSize={14}>
                END TIME
              </Text>
            </HStack>
            <TimePickerCustomize handleTimeChange={handleTimeChange} />
          </Stack>
          <Button
            mt={10}
            bgColor={disabled ? 'grey' : '#316970'}
            width="100%"
            height={50}
            rounded={'md'}
            disabled={disabled}
            onPress={handleNextStep}>
            Procceed
          </Button>
        </VStack>
      </ScrollView>
      <Modal isOpen={modalVisible} onClose={setModalVisible} size={'lg'}>
        <Modal.Content maxH="212">
          <Modal.CloseButton />
          <Modal.Header>Change Location</Modal.Header>
          <Modal.Body>
            <Input
              value={locationInput}
              onChangeText={setLocationInput}
              size="lg"
            />
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
