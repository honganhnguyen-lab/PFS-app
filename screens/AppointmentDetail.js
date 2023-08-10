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
  Radio,
} from 'native-base';
import {styles} from '../style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableHighlight} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {
  DatePickerCustomize,
  TimePickerCustomize,
} from '../components/atoms/DatePicker';

import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  registerAppointment,
  onSendAppointmentStartTime,
  onSendAppointmentEndTime,
  onSendAppointmentDateTime,
  onChangePayment,
} from '../redux/appointment/appointmentSlice';
import {axiosConfig} from '../axios';
import {LoadingScreen} from '../components/atoms/LoadingScreen';

const AppointmentDetail = ({route}) => {
  const dispatch = useDispatch();
  const location = useSelector(state => state.appointment.location);
  const serviceId = useSelector(state => state.appointment.serviceId);
  const detailService = route.params.detailService;

  const [locationInput, setLocationInput] = useState(location?.address ?? '');
  const [listAvailableTime, setListAvailableTime] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalDuration, setModalDuration] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [duration, setDuration] = useState('0.5');
  const [showingDu, setShowingDu] = useState(0.5);
  const [showingTime, setShowingTime] = useState('');

  const onChangeSelectedDate = date => {
    setSelectedDate(date);
    dispatch(onSendAppointmentDateTime(date));
  };

  const onChangeDuration = () => {
    setShowingDu(Number(duration));
    setModalDuration(false);
  };
  const handleSizeClick = () => {
    setModalVisible(!modalVisible);
  };

  const handleNextStep = () => {
    dispatch(registerAppointment());
    navigation.navigate('Proceed');
  };

  const updateLocationDetail = location => {
    setLocationInput(location);
    dispatch(
      onSendLocation({
        address: defaultLocation,
      }),
    );
  };

  const getListAvailableAppointment = async duration => {
    setIsLoading(true);
    try {
      const itemsPerRow = 2;
      const request = {duration, currentDate: selectedDate};
      const availableTime = await axiosConfig.post(
        `/api/v1/services/time/${serviceId}`,
        request,
      );
      let rows = [];
      const listTime = availableTime.data.data.availableTimeRange;
      for (let i = 0; i < listTime.length; i += itemsPerRow) {
        const mappingAvailable = listTime.map(item => ({
          ...item,
          clicked: false,
        }));

        const rowItems = mappingAvailable.slice(i, i + itemsPerRow);
        rows.push(rowItems);
      }
      setListAvailableTime(rows);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  const [clickedToChooseTime, setClickedToChooseTime] = useState(false);

  const onChooseTime = (start, end, rowIndex, itemIndex) => {
    setClickedToChooseTime(true);
    setShowingTime(`${start}-${end}`);
    dispatch(onSendAppointmentStartTime(start));
    dispatch(onSendAppointmentEndTime(end));

    const newList = listAvailableTime.map((item, rIndex) => {
      const newRow = item.map((i, idx) => {
        if (rIndex === rowIndex && idx === itemIndex) {
          return {...i, clicked: true};
        }
        return {...i, clicked: false};
      });
      return newRow;
    });

    setListAvailableTime(newList);
  };
  const navigation = useNavigation();
  const totalPrice = () => {
    if (detailService.priceDiscount) {
      const totalDis = detailService.priceDiscount * showingDu;

      return totalDis;
    }
    const total = detailService.price * showingDu;
    return total;
  };

  useEffect(() => {
    if (selectedDate && clickedToChooseTime && locationInput) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [selectedDate, clickedToChooseTime, locationInput]);

  useEffect(() => {
    getListAvailableAppointment(showingDu);
  }, [showingDu, selectedDate, serviceId]);

  useEffect(() => {
    dispatch(onChangePayment(totalPrice()));
  }, [totalPrice]);

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
      <ScrollView showsVerticalScrollIndicator={false}>
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
            space={2}
            borderBottomColor="#F5F5F5"
            borderBottomWidth={1}>
            <HStack justifyContent="flex-start" space={2} alignItems="center">
              <Icon as={Ionicons} name="calendar-outline" color="#87ADB2" />
              <Text fontWeight={600} fontSize={14}>
                APPOINTMENT TIME
              </Text>
            </HStack>
            <Text fontSize={14} color={'#559FA7'} fontWeight={600}>
              Duration
            </Text>
            <Pressable onPress={() => setModalDuration(true)}>
              <HStack
                pt={2}
                justifyContent="center"
                alignItems="center"
                space={4}>
                <Input
                  placeholder=""
                  borderRadius="10"
                  fontSize="16"
                  fontWeight={600}
                  variant="filled"
                  InputLeftElement={
                    <Icon
                      m="2"
                      mr="3"
                      size="6"
                      color="#559FA7"
                      as={Ionicons}
                      name="time-sharp"
                    />
                  }
                  InputRightElement={
                    <Icon
                      m="2"
                      mr="3"
                      size="6"
                      color="#559FA7"
                      as={Ionicons}
                      name="pencil-sharp"
                    />
                  }>
                  {showingDu} hour
                </Input>
              </HStack>
            </Pressable>
            <VStack space={2} mt={2}>
              <Text fontSize={14} color={'#559FA7'} fontWeight={600}>
                Schedule time
              </Text>
              {isLoading ? (
                <LoadingScreen />
              ) : (
                <Stack space={2}>
                  {listAvailableTime.map((row, rowIndex) => (
                    <HStack key={rowIndex} justifyContent="space-between">
                      {row.map((item, index) => (
                        <Button
                          key={index}
                          style={
                            item.clicked ? styles.btnClick : styles.btnNotClick
                          }
                          onPress={() =>
                            onChooseTime(item.start, item.end, rowIndex, index)
                          }
                          rounded="lg">
                          <Text
                            fontSize={14}
                            color={item.clicked ? 'white' : '#238793'}>
                            {item.start} - {item.end}
                          </Text>
                        </Button>
                      ))}
                    </HStack>
                  ))}
                </Stack>
              )}
            </VStack>
          </Stack>
          <Button
            mt={10}
            mb={10}
            bgColor={disabled ? 'grey' : '#316970'}
            width="100%"
            height={50}
            rounded={'md'}
            disabled={disabled}
            onPress={() => setModalConfirm(true)}>
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
      <Modal
        isOpen={modalDuration}
        onClose={() => setModalDuration(false)}
        size={'full'}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Change duration</Modal.Header>
          <Modal.Body>
            <ScrollView>
              <Radio.Group
                onChange={value => setDuration(value)}
                name="exampleGroup"
                accessibilityLabel="favorite colorscheme">
                <Radio colorScheme="emerald" value="0.5" my={1}>
                  30 minutes
                </Radio>
                <Radio colorScheme="emerald" value="1" my={1}>
                  1 hour
                </Radio>
                <Radio colorScheme="emerald" value="1.5" my={1}>
                  1.5 hours
                </Radio>
                <Radio colorScheme="emerald" value="2" my={1}>
                  2 hours
                </Radio>
                <Radio colorScheme="emerald" value="2.5" my={1}>
                  2.5 hours
                </Radio>
                <Radio colorScheme="emerald" value="3" my={1}>
                  3 hours
                </Radio>
                <Radio colorScheme="emerald" value="3.5" my={1}>
                  3.5 hours
                </Radio>
                <Radio colorScheme="emerald" value="4" my={1}>
                  4 hours
                </Radio>
                <Radio colorScheme="emerald" value="4.5" my={1}>
                  4.5 hours
                </Radio>
                <Radio colorScheme="emerald" value="5" my={1}>
                  5 hours
                </Radio>
              </Radio.Group>
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalDuration(false);
                }}>
                Cancel
              </Button>
              <Button onPress={onChangeDuration}>Update</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal
        isOpen={modalConfirm}
        onClose={() => setModalConfirm(false)}
        size={'full'}>
        <Modal.Content>
          <Modal.Body>
            <ScrollView>
              <HStack justifyContent="center" alignItems="center" space={1}>
                <Icon
                  as={Ionicons}
                  name="checkmark-circle"
                  color="#559FA7"
                  size="md"
                />
                <Text fontSize={20} color="#559FA7" fontWeight={600}>
                  Confirmation
                </Text>
              </HStack>
              <HStack
                mt={4}
                space={2}
                alignItems="center"
                justifyContent="center">
                <Text
                  fontSize={24}
                  flex={1}
                  fontWeight={600}
                  alignItems="center"
                  justifyContent="center">
                  {detailService.title}
                </Text>
              </HStack>
              <HStack space={4} alignItems="center">
                <Icon as={Ionicons} name="location" color="#559FA7" size="md" />
                <Text fontSize={16} flex={1}>
                  {locationInput}
                </Text>
              </HStack>
              <HStack space={4} mt={2} alignItems="center">
                <HStack space={1}>
                  <Icon as={Ionicons} name="cash" color="#559FA7" size="md" />
                </HStack>
                <Text fontSize={16} flex={1}>
                  {detailService.priceDiscount
                    ? detailService.price.toLocaleString()
                    : detailService.price.toLocaleString()}
                  VND/hour
                </Text>
              </HStack>
              <HStack space={4} mt={2} alignItems="center">
                <Icon as={Ionicons} name="calendar" color="#559FA7" size="md" />
                <Text fontSize={16} flex={1}>
                  {selectedDate}
                </Text>
              </HStack>
              <HStack space={4} mt={2} alignItems="center">
                <Icon as={Ionicons} name="time" color="#559FA7" size="md" />
                <Text fontSize={16} flex={1}>
                  {showingTime}
                </Text>
              </HStack>
              <HStack space={4} mt={2} alignItems="center">
                <Icon as={Ionicons} name="person" color="#559FA7" size="md" />
                <Text fontSize={16} flex={1}>
                  {detailService.providerId.name}
                </Text>
              </HStack>
              <HStack space={4} mt={2} alignItems="center">
                <Text fontSize={18} color="#559FA7" flex={0.3}>
                  Total price:
                </Text>
                <Text fontSize={16} flex={0.7}>
                  {totalPrice().toLocaleString()} VND
                </Text>
              </HStack>
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalConfirm(false);
                }}>
                Cancel
              </Button>
              <Button onPress={handleNextStep} backgroundColor="#559FA7">
                Booking
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default ({route}) => {
  return (
    <NativeBaseProvider>
      <AppointmentDetail route={route} />
    </NativeBaseProvider>
  );
};
