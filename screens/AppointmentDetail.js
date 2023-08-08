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
import TimeSlider from '../components/TimeSlider';

const AppointmentDetail = () => {
  const dispatch = useDispatch();
  const location = useSelector(state => state.appointment.location);

  const [locationInput, setLocationInput] = useState(location?.address ?? '');
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalNextStep, setIsModalNextStep] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startTime, setStartTime] = useState('');

  const onChangeSelectedDate = date => {
    setSelectedDate(date);
    dispatch(onSendAppointmentDateTime(date));
  };

  const timeStringToNumber = () => {
    if (startTime?.length > 0) {
      return 0;
    }
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    const convertedValue = totalMinutes + 7 * 60;

    return convertedValue;
  };

  const handleSizeClick = () => {
    setModalVisible(!modalVisible);
  };

  const handleNextStep = async () => {
    await dispatch(registerAppointment());
    navigation.navigate('Proceed');
  };

  const onMoveToNextStep = () => {
    setIsModalNextStep(false);
  };

  const onChooseProvider = () => {
    setIsModalNextStep(false);
    navigation.navigate('List Provider');
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
          <Heading>Booking</Heading>
        </HStack>
        <Divider bg="#F5F5F5" thickness="2" mx="2" />
      </View>
      <ScrollView>
        <VStack space={3} alignItems="center" mt="5">
          <Stack
            w="100%"
            bg="white"
            p={2}
            rounded="lg"
            space={2}
            borderBottomColor="#F5F5F5"
            borderBottomWidth={1}>
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
                <Icon as={Ionicons} name="pencil" color="white" />
              </Button>
            </HStack>
          </Stack>
          <Stack
            w="100%"
            bg="white"
            p={2}
            rounded="lg"
            space={2}
            borderBottomColor="#F5F5F5"
            borderBottomWidth={1}>
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
          <Stack
            w="100%"
            bg="white"
            p={2}
            rounded="lg"
            borderBottomColor="#F5F5F5"
            borderBottomWidth={1}>
            <HStack justifyContent="flex-start" space={2} alignItems="center">
              <Icon as={Ionicons} name="calendar-outline" color="#87ADB2" />
              <Text fontWeight={600} fontSize={14}>
                APPOINTMENT TIME
              </Text>
            </HStack>
            <TimeSlider
              onTimeChanged={time => setStartTime(time)}
              title="Start time"
              initialTime="06:00"
              minimumValue={14}
            />

            <TimeSlider
              onTimeChanged={time => setEndTime(time)}
              title="End time"
              initialTime="12:00"
            />
          </Stack>
          <Button
            mt={10}
            bgColor={disabled ? 'grey' : '#316970'}
            width="100%"
            height={50}
            rounded={'md'}
            disabled={disabled}
            onPress={handleNextStep}>
            Booking now
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
