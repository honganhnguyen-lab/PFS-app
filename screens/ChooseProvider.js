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
  Button,
  Avatar,
} from 'native-base';
import {styles} from '../style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {axiosConfig, getListServices} from '../axios';
import {useDispatch, useSelector} from 'react-redux';
import {
  onSendDataProvider,
  onSendDataService,
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

  const onMoveToChooseService = (id, distance) => {
    console.log('distance', distance);
    navigation.navigate('DetailProvider', {
      distance: distance,
    });
    dispatch(onSendDataService(id));
  };

  useEffect(() => {
    onGetListProvider();
  }, [location, appointmentName]);
  const navigation = useNavigation();
  return (
    <View style={styles.listAppointScreen}>
      <View>
        <VStack w="100%" mt={3}>
          <Input
            placeholder="What do you need"
            borderRadius="10"
            fontSize="14"
            w="100%"
            value={appointmentName.payload}
            isDisabled
            bgColor="white"
            variant="rounded"
            InputRightElement={
              <Icon
                m="2"
                mr="3"
                size="6"
                color="gray.400"
                as={Ionicons}
                name="search-sharp"
              />
            }
          />
        </VStack>
      </View>
      <ScrollView>
        <VStack space={3} alignItems="center" mt="3">
          {listProvider.map((service, index) => {
            const providerDetail = service?.provider;
            const distanceFar = service?.distance.toFixed(1);
            return (
              <Pressable
                w="100%"
                key={index}
                borderColor="#87ADB2"
                onPress={() => onMoveToChooseService(service._id, distanceFar)}>
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
                          uri: service.picture,
                        }}
                        alt="Alternate Text"
                        size="lg"
                        borderRadius={6}
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
                        {service?.title}
                      </Text>
                      <HStack alignItems="center" space={1}>
                        <Icon
                          as={Ionicons}
                          size={4}
                          name="compass-outline"
                          color="#87ADB2"
                        />
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
                      <HStack mt={1}>
                        <Button size="sm" bgColor="#95C4CB" borderRadius="full">
                          <Text color="white">
                            {service?.price?.toLocaleString()} d/hour
                          </Text>
                        </Button>
                      </HStack>
                    </VStack>
                  </HStack>
                  <HStack pl={2} space={3} alignItems="center">
                    <Avatar
                      bg="#238793"
                      alignSelf="center"
                      size="md"
                      source={{
                        uri: providerDetail.photo,
                      }}
                    />
                    <VStack space={1}>
                      <Text fontSize={16} fontWeight={600}>
                        {providerDetail.name}
                      </Text>
                      <Text fontSize={14} color="grey">
                        Provider
                      </Text>
                    </VStack>
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
