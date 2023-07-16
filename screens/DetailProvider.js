import {useEffect, useMemo, useState} from 'react';
import {
  NativeBaseProvider,
  Image,
  View,
  VStack,
  HStack,
  ScrollView,
  Icon,
  Avatar,
  Pressable,
  Center,
  Text,
  Box,
  Divider,
  Stack,
  Heading,
  Square,
  useDisclose,
  Actionsheet,
  Button,
  Skeleton,
} from 'native-base';
import {Dimensions} from 'react-native';
import {styles} from '../style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {axiosConfig, getListServicesEachProvider} from '../axios';
import {
  onChangePayment,
  onSendDataService,
  registerAppointment,
} from '../redux/appointment/appointmentSlice';

const SkeletonLoading = () => {
  return (
    <Center w="100%" h="300">
      <VStack
        w="100%"
        h="100%"
        borderWidth="1"
        space={6}
        rounded="md"
        alignItems="center"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}>
        <Skeleton h="80" />
        <Skeleton
          borderWidth={1}
          borderColor="coolGray.200"
          endColor="warmGray.50"
          w="80"
          h="40"
          mt="-70"
        />

        <Skeleton.Text lines={3} alignItems="center" px="12" />
      </VStack>
    </Center>
  );
};

const DetailProvider = () => {
  const navigation = useNavigation();
  const provider = useSelector(state => state.appointment.providerId);

  const dispatch = useDispatch();
  const {width} = Dimensions.get('window');
  let isHavingDiscount;
  const [listServiceEachProvider, setListServiceEachProvider] = useState([]);

  const listIsChosen =
    listServiceEachProvider?.services?.length > 0 &&
    listServiceEachProvider?.services?.map(service => ({
      ...service,
      isChosen: false,
    }));

  const [isLoading, setIsLoading] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclose();
  const [serviceChoosen, setServiceChoosen] = useState({});

  const onCheckAddService = item => {
    const choosenPrice = item?.isDiscount ? item.priceDiscount : item.price;
    setServiceChoosen({price: choosenPrice, name: item.title});
    dispatch(onSendDataService(item._id));
    onOpen();
  };

  const onProceedService = async () => {
    dispatch(onChangePayment(serviceChoosen.price));
    navigation.navigate('Appointment');
  };

  const getListServices = async () => {
    setIsLoading(true);
    try {
      const response = await axiosConfig.get(
        `${getListServicesEachProvider}${provider}/services`,
      );
      setListServiceEachProvider(response.data.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getListServices();
  }, [provider]);

  useMemo(() => {
    const newList =
      listServiceEachProvider?.length > 0 &&
      listServiceEachProvider.map(item => item?.isDiscount);
    if (newList?.length > 0) {
      isHavingDiscount = true;
    }
  }, [listIsChosen]);
  return (
    <ScrollView style={styles.detailScreen} width={width} bg="#CAC9C9">
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        <View>
          <Image
            source={{
              uri:
                listServiceEachProvider?.picture ??
                'https://epe.brightspotcdn.com/dims4/default/95f2bfb/2147483647/strip/true/crop/2084x1414+37+0/resize/840x570!/format/webp/quality/90/?url=https%3A%2F%2Fepe-brightspot.s3.amazonaws.com%2F94%2F2d%2F8ed27aa34da0a197b1d819ec39a5%2Fteacher-tutor-student-librarian-1137620335.jpg',
            }}
            style={styles.backgroundImage}
            alt="Alternate Text"
            borderRadius={2}
          />
          <View style={{marginBottom: 40}}>
            <HStack
              justifyContent="space-between"
              alignItems="flex-start"
              p={2}
              height={200}
              mt={10}>
              <Pressable onPress={() => navigation.navigate('ProviderList')}>
                <Avatar bg="white">
                  <Icon
                    as={Ionicons}
                    name="arrow-back-outline"
                    size="md"
                    color="#569FA7"
                  />
                </Avatar>
              </Pressable>
              <Pressable onPress={onCheckAddService}>
                <Avatar bg="white">
                  <Icon
                    as={Ionicons}
                    name="heart-outline"
                    size="md"
                    color="#569FA7"
                  />
                </Avatar>
              </Pressable>
            </HStack>

            <Box
              style={styles.boxDetailContent}
              alignItems="center"
              justifyContent="center">
              <Box bg="white" shadow={3} mb={4} rounded="lg">
                <VStack p={3} space={2}>
                  <HStack justifyContent="space-between" alignItems="center">
                    <Text
                      fontWeight={600}
                      fontSize={22}
                      color="#569FA7"
                      fontFamily={'WorkSans-regular'}>
                      {listServiceEachProvider?.provider?.name}
                    </Text>
                    <Icon
                      as={Ionicons}
                      name="chevron-forward-outline"
                      size="md"
                      color="#569FA7"
                    />
                  </HStack>
                  <Divider bg="#87ADB2" thickness="1" mt={2} />
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    p={2}>
                    <HStack space={4} alignItems="center">
                      <HStack alignItems="center" space={1}>
                        <Icon
                          as={Ionicons}
                          size={4}
                          name="star-sharp"
                          color="#87ADB2"
                        />
                        <Text fontWeight={600}>
                          {listServiceEachProvider?.provider?.rating ?? 4.8}
                        </Text>
                        <Text>
                          ({listServiceEachProvider?.provider?.comment ?? 46})
                        </Text>
                      </HStack>
                      <HStack alignItems="center">
                        <Icon
                          as={Ionicons}
                          size={4}
                          name="chatbubble-ellipses-outline"
                          color="#87ADB2"
                        />
                        <Text fontSize={12}> Comment and rating</Text>
                      </HStack>
                    </HStack>
                    <Icon
                      as={Ionicons}
                      name="chevron-forward-outline"
                      size="md"
                      color="#569FA7"
                      style={{justifyContent: 'flex-end'}}
                    />
                  </HStack>
                  <Divider bg="#87ADB2" thickness="1" mt={2} />
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    p={2}>
                    <VStack>
                      <HStack space={1} alignItems="center">
                        <Icon
                          as={Ionicons}
                          name="location"
                          size="md"
                          color="#569FA7"
                        />
                        <Text>
                          {' '}
                          {listServiceEachProvider?.provider?.locationFar ??
                            '9.1km'}
                        </Text>
                      </HStack>
                      <HStack space={1} alignItems="center">
                        <Icon
                          as={Ionicons}
                          name="pin"
                          size="md"
                          color="#569FA7"
                        />
                        <Text flexWrap="wrap" width="80%">
                          91 Nguyen Chi Thanh, Ha Dong District, Ha Noi
                        </Text>
                      </HStack>
                    </VStack>
                    <Icon
                      as={Ionicons}
                      name="chevron-forward"
                      size="md"
                      color="#569FA7"
                      style={{justifyContent: 'flex-end'}}
                    />
                  </HStack>
                  <Divider bg="#87ADB2" thickness="1" mt={2} />
                  <VStack space={2} p={2}>
                    <HStack space={2}>
                      <Icon
                        as={Ionicons}
                        name="eye"
                        size="md"
                        color="#569FA7"
                      />

                      <Text fontWeight={600}>Description</Text>
                    </HStack>
                    <Text width="80%" flexWrap="wrap">
                      {listServiceEachProvider?.provider?.desciption ??
                        'Description'}
                    </Text>
                  </VStack>
                </VStack>
              </Box>
            </Box>

            <VStack
              space={12}
              alignItems="center"
              justifyContent="center"
              style={styles.boxDiscount}>
              <Box width="93%">
                {isHavingDiscount && (
                  <Text
                    fontWeight={600}
                    fontSize={22}
                    fontFamily={'AtkinsonHyperlegible-regular'}>
                    Current discount
                  </Text>
                )}

                {listIsChosen?.length > 0 &&
                  listIsChosen.map(item => {
                    if (item?.isDiscount) {
                      return (
                        <HStack
                          w="100%"
                          justifyContent="space-evenly"
                          mt={2}
                          rounded="lg"
                          alignItems="center"
                          bg="#F9F9F9"
                          shadow={2}
                          key={item.id}>
                          <Center p={2}>
                            <Image
                              source={{
                                uri: item.image,
                              }}
                              alt="Alternate Text"
                              size="sm"
                            />
                          </Center>
                          <VStack p={2} pt={3}>
                            <Text
                              fontWeight={600}
                              fontSize={16}
                              ellipsizeMode="middle"
                              fontFamily={'WorkSans-regular'}>
                              {item.title}
                            </Text>
                            <HStack
                              alignItems="center"
                              space={1}
                              width="100%"
                              flexWrap="wrap">
                              <Text
                                fontWeight={600}
                                fontSize={16}
                                color="#569FA7">
                                {item.priceDiscount}
                              </Text>
                              <Text fontSize={14} strikeThrough color="#569FA7">
                                {item.price}
                              </Text>
                              <Icon
                                as={Ionicons}
                                name="pricetag"
                                size="sm"
                                color="#87ADB2"
                              />
                            </HStack>
                          </VStack>
                          <Pressable onPress={() => onCheckAddService(item)}>
                            <Square
                              size="35px"
                              bg={!item.isChosen ? '#87ADB2' : 'white'}
                              rounded="lg"
                              borderWidth="1"
                              borderColor={
                                !item.isChosen ? 'white' : '#87ADB2'
                              }>
                              <Icon
                                as={Ionicons}
                                name={
                                  !item.isChosen ? 'add-sharp' : 'remove-sharp'
                                }
                                size="md"
                                color={!item.isChosen ? 'white' : '#87ADB2'}
                              />
                            </Square>
                          </Pressable>
                        </HStack>
                      );
                    }
                  })}
              </Box>

              <Box width="93%">
                <Text
                  fontWeight={600}
                  fontSize={22}
                  fontFamily={'AtkinsonHyperlegible-regular'}>
                  For you
                </Text>
                <HStack space={6} alignItems="center" mt={3}>
                  {listIsChosen?.length > 0 &&
                    listIsChosen.map(item => {
                      if (!item.isDiscount) {
                        return (
                          <VStack space={1} width="50%" key={item.id}>
                            <Image
                              source={{
                                uri: item.picture,
                              }}
                              alt="Alternate Text"
                              size="xl"
                              borderRadius="md"
                            />
                            <Text
                              fontSize={14}
                              ellipsizeMode="middle"
                              width="90%"
                              fontFamily={'WorkSans-regular'}>
                              {item.title}
                            </Text>
                            <HStack
                              alignItems="center"
                              space={2}
                              width="100%"
                              flexWrap="wrap">
                              <Pressable
                                onPress={() => onCheckAddService(item)}>
                                <Square
                                  size="30px"
                                  bg={!item.isChosen ? '#87ADB2' : 'white'}
                                  rounded="lg"
                                  borderWidth="1"
                                  borderColor={
                                    !item.isChosen ? 'white' : '#87ADB2'
                                  }>
                                  <Icon
                                    as={Ionicons}
                                    name={
                                      !item.isChosen
                                        ? 'add-sharp'
                                        : 'remove-sharp'
                                    }
                                    size="md"
                                    color={!item.isChosen ? 'white' : '#87ADB2'}
                                  />
                                </Square>
                              </Pressable>
                              <Text
                                fontWeight={600}
                                fontSize={14}
                                color="#569FA7">
                                {item.price}
                              </Text>
                            </HStack>
                          </VStack>
                        );
                      }
                    })}
                </HStack>
              </Box>
            </VStack>
          </View>
        </View>
      )}

      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
        <Actionsheet.Content borderTopRadius="0">
          <HStack
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            p={2}>
            <VStack space={3}>
              <Text fontWeight={600} fontSize={16} color="#569FA7">
                {serviceChoosen.price} VND
              </Text>
              <Text fontSize={16}>{serviceChoosen.name}</Text>
            </VStack>
            <Button
              w={150}
              bgColor="#238793"
              fontSize={16}
              onPress={onProceedService}
              rounded="lg">
              <Text color="white" fontSize={14} fontWeight={600}>
                Proceed
              </Text>
            </Button>
          </HStack>
        </Actionsheet.Content>
      </Actionsheet>
    </ScrollView>
  );
};
export default () => {
  return (
    <NativeBaseProvider>
      <DetailProvider />
    </NativeBaseProvider>
  );
};
