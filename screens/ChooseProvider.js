import {useEffect, useState} from 'react';
import {
  Text,
  Center,
  NativeBaseProvider,
  Image,
  View,
  VStack,
  Heading,
  HStack,
  ScrollView,
  Icon,
  Input,
  Divider,
  Pressable,
  PresenceTransition,
} from 'native-base';
import {styles} from '../style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {axiosConfig, getListServices} from '../axios';
import {useDispatch, useSelector} from 'react-redux';
import {
  onSendDataProvider,
  onSendDataServiceAndProvider,
} from '../redux/appointment/appointmentSlice';

const ProviderChoosing = () => {
  const [value, setValue] = useState('one');
  const dispatch = useDispatch();
  const appointmentName = useSelector(state => state.appointment.nameServices);
  const location = useSelector(state => state.appointment.location);
  const [open, setOpen] = useState(false);
  const [listProvider, setListProvider] = useState([]);
  const labelTypeServices = [
    {label: 'RepairServices', value: 0},
    {label: 'MaidServices', value: 1},
    {label: 'CleanServices', value: 2},
    {label: 'TutorServices', value: 3},
  ];

  const onGetListProvider = async () => {
    try {
      const response = await axiosConfig.get(
        `${getListServices}${location.coordinates?.join(',')}`,
        {
          params: {
            search: appointmentName.payload,
          },
        },
      );
      setListProvider(response.data.data.services);
    } catch (err) {
      console.log(err);
    }
  };

  const functionRenderLabel = array => {
    return array?.map(
      item => labelTypeServices.find(x => x.value === item)?.label,
    );
  };

  const onMoveToChooseService = id => {
    navigation.navigate('DetailProvider');
    dispatch(onSendDataProvider(id));
  };

  useEffect(() => {
    onGetListProvider();
  }, [location, appointmentName]);
  const navigation = useNavigation();
  return (
    <View style={styles.listAppointScreen}>
      <View mt={50}>
        <HStack justifyContent="space-between" alignItems="center" p={3}>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Icon
              as={Ionicons}
              name="arrow-back-outline"
              size="lg"
              color="#569FA7"
            />
          </Pressable>
          <Heading ml={2} color="#569FA7">
            Step 2
          </Heading>
          <PresenceTransition
            width="80%"
            visible={open}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 250,
              },
            }}>
            <Input size="lg" w="100%" placeholder="Search provider name" />
          </PresenceTransition>
          <Pressable onPress={() => setOpen(!open)}>
            <Icon
              as={Ionicons}
              name="search-outline"
              size="md"
              color="#569FA7"
            />
          </Pressable>
        </HStack>
        <Divider bg="#87ADB2" thickness="4" mx="2" />
      </View>
      <ScrollView>
        <VStack space={3} alignItems="center" mt="6">
          {listProvider.map((service, index) => {
            const providerDetail = service?.provider;
            const listServices = service?.services;
            const distanceFar = listServices[0]?.distance.toFixed(1);
            return (
              <Pressable
                w="100%"
                key={index}
                borderColor="#87ADB2"
                onPress={() => onMoveToChooseService(service._id)}>
                <VStack
                  w="100%"
                  space={2}
                  padding={2}
                  rounded="lg"
                  bgColor="white">
                  <HStack w="100%" space={1} rounded="lg" key={service.id}>
                    <Center p={2.5}>
                      <Image
                        source={{
                          uri: providerDetail?.avatar,
                        }}
                        alt="Alternate Text"
                        size="lg"
                        borderRadius={2}
                      />
                    </Center>
                    <VStack p={3}>
                      {service.isDiscount && (
                        <HStack space={2} alignItems="center">
                          <Icon
                            as={Ionicons}
                            size={4}
                            name="flame-outline"
                            color="#F76162"
                          />
                          <Text
                            fontWeight={600}
                            color="#F76162"
                            fontSize={12}
                            fontFamily={'WorkSans-regular'}>
                            Dicount
                          </Text>
                          <Icon
                            as={Ionicons}
                            size={4}
                            name="flame-outline"
                            color="#F76162"
                          />
                        </HStack>
                      )}

                      <Text
                        fontWeight={600}
                        fontSize={16}
                        fontFamily={'WorkSans-regular'}>
                        {providerDetail?.name}
                      </Text>
                      <Text
                        fontSize={12}
                        mb={1}
                        fontFamily={'WorkSans-regular'}>
                        {functionRenderLabel(providerDetail?.category)}
                      </Text>
                      <HStack alignItems="center" space={1}>
                        <Text fontSize={12}>{distanceFar ?? 0} km</Text>
                        <Divider
                          bg="#87ADB2"
                          thickness="2"
                          mx="1"
                          orientation="vertical"
                        />
                        <Icon
                          as={Ionicons}
                          size={4}
                          name="star-sharp"
                          color="#87ADB2"
                        />
                        <Text>{providerDetail?.rating ?? 0}</Text>
                      </HStack>
                    </VStack>
                  </HStack>
                  <HStack space={3} alignItems="center">
                    {listServices?.length > 0 &&
                      listServices.map((item, index) => (
                        <VStack
                          style={{flexWrap: 'wrap'}}
                          alignItems="flex-start"
                          key={index}>
                          <Center>
                            <Image
                              source={{
                                uri: item?.picture,
                              }}
                              alt="Alternate Text"
                              size="md"
                              borderRadius={10}
                            />
                          </Center>
                          {item?.isDiscount ? (
                            <HStack
                              alignItems="center"
                              space={1}
                              width="100%"
                              flexWrap="wrap">
                              <Text fontWeight={600} fontSize={12}>
                                {parseFloat(item?.priceDiscount).toLocaleString(
                                  'en-US',
                                )}
                                đ
                              </Text>
                              <Text fontSize={10} strikeThrough>
                                {parseFloat(item?.price).toLocaleString(
                                  'en-US',
                                )}
                                đ
                              </Text>
                            </HStack>
                          ) : (
                            <Text fontWeight={600} fontSize={12}>
                              {parseFloat(item?.price).toLocaleString('en-US')}đ
                            </Text>
                          )}
                          <HStack space={1} alignItems="center">
                            <Icon
                              as={Ionicons}
                              size={2}
                              name="compass-outline"
                              color="#87ADB2"
                            />

                            <Icon
                              as={Ionicons}
                              size={2}
                              name="star-sharp"
                              color="#87ADB2"
                            />
                            <Text fontSize={12}>
                              {item.ratingsAverage ?? 0}
                            </Text>
                          </HStack>
                          <Text fontSize={12} style={{flexWrap: 'wrap'}}>
                            {item.title}
                          </Text>
                        </VStack>
                      ))}
                  </HStack>
                </VStack>
              </Pressable>
            );
          })}
        </VStack>
      </ScrollView>
    </View>
  );
};
export default () => {
  return (
    <NativeBaseProvider>
      <ProviderChoosing />
    </NativeBaseProvider>
  );
};
