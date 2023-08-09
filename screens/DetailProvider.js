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
import {ProviderTimeRange} from '../components/ProviderTimeRange';

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

const DetailProvider = ({route}) => {
  const navigation = useNavigation();
  const serviceId = useSelector(state => state.appointment.serviceId);
  const distanceFar = route && route.params ? route.params.distance : '';

  const dispatch = useDispatch();
  const {width} = Dimensions.get('window');
  const [detailService, setDetailService] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const getDetailService = async () => {
    setIsLoading(true);
    try {
      const response = await axiosConfig.get(`/api/v1/services/${serviceId}`);
      setDetailService(response.data.data.service);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const onProceedService = async () => {
    dispatch(onChangePayment(detailService.price));
    navigation.navigate('Appointment');
  };
  useEffect(() => {
    getDetailService();
  }, [serviceId]);

  return (
    <ScrollView style={styles.detailScreen} width={width} bg="#CAC9C9">
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        <View>
          <Image
            source={{
              uri: detailService.picture,
            }}
            style={styles.backgroundImage}
            alt="Alternate Text"
            borderRadius={2}
          />
          <View style={{marginBottom: 40, width: '100%'}}>
            <HStack
              justifyContent="space-between"
              alignItems="flex-start"
              p={2}
              height={200}
              mt={10}>
              <Pressable onPress={() => navigation.navigate('List Provider')}>
                <Avatar bg="white">
                  <Icon
                    as={Ionicons}
                    name="arrow-back-outline"
                    size="md"
                    color="#569FA7"
                  />
                </Avatar>
              </Pressable>
              <Pressable>
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
              <VStack
                bg="white"
                width="100%"
                space={2}
                borderTopLeftRadius={40}
                borderTopRightRadius={40}
                p={6}
                rounded="lg">
                <HStack justifyContent="space-between" alignItems="center">
                  <HStack space={3} alignItems="center">
                    <Avatar
                      bg="#238793"
                      alignSelf="center"
                      size="md"
                      source={{
                        uri: detailService?.providerId?.photo,
                      }}
                    />
                    <Text fontSize={16} fontWeight={600}>
                      {detailService?.providerId?.name}
                    </Text>
                  </HStack>
                  <HStack space={3} alignItems="center">
                    <Icon
                      as={Ionicons}
                      size={5}
                      name="call-sharp"
                      color="#87ADB2"
                    />
                    <Text fontSize={16} fontWeight={600}>
                      {detailService?.providerId?.phoneNumber}
                    </Text>
                  </HStack>
                </HStack>
                <HStack
                  w="100%"
                  space={1}
                  rounded="lg"
                  justifyContent="space-between"
                  alignItems="center">
                  <VStack w="80%">
                    <Text fontWeight={600} fontSize={16} w="80%">
                      {detailService.title}
                    </Text>
                    <HStack p={2} alignItems="center">
                      <Icon
                        as={Ionicons}
                        size={4}
                        name="star-sharp"
                        color="#FFC107"
                      />
                      <Text>
                        {detailService.ratingsAverage ?? 0} (
                        {detailService.ratingComments ?? 0})
                      </Text>
                    </HStack>
                  </VStack>
                  <Text fontSize={12} fontWeight={600}>
                    {detailService.price?.toLocaleString()}VND
                  </Text>
                </HStack>
              </VStack>
            </Box>
            <VStack
              space={2}
              alignItems="center"
              justifyContent="center"
              style={styles.boxDiscount}>
              <Box
                width="100%"
                p={3}
                borderBottomColor="#F5F5F5"
                borderBottomWidth={1}>
                <VStack space={1}>
                  <HStack space={3} alignItems="center">
                    <Icon
                      as={Ionicons}
                      name="location"
                      size="md"
                      color="#559FA7"
                    />
                    <Text fontSize={18} fontWeight={600}>
                      Location
                    </Text>
                  </HStack>
                  <Text pl={8} fontSize={16}>
                    {distanceFar} km
                  </Text>
                  <Text pl={8} pr={6} fontSize={14}>
                    {detailService?.location?.address}
                  </Text>
                </VStack>
              </Box>
              <Box
                width="100%"
                p={3}
                borderBottomColor="#F5F5F5"
                borderBottomWidth={1}>
                <VStack space={1}>
                  <HStack space={3} alignItems="center">
                    <Icon
                      as={Ionicons}
                      name="chatbubble"
                      size="md"
                      color="#559FA7"
                    />
                    <Text fontSize={18} fontWeight={600}>
                      Description
                    </Text>
                  </HStack>
                  <Text pl={8} pr={6} fontSize={14}>
                    {detailService?.description}
                  </Text>
                </VStack>
              </Box>
              <VStack width="100%" p={3}>
                <HStack space={3} alignItems="center">
                  <Icon
                    as={Ionicons}
                    name="calendar"
                    size="md"
                    color="#559FA7"
                  />
                  <Text fontSize={18} fontWeight={600}>
                    Schedule
                  </Text>
                </HStack>
                <ProviderTimeRange dataProvider={detailService?.providerId} />
              </VStack>
            </VStack>
            <Button
              w="90%"
              m={5}
              alignItems="center"
              bgColor="#238793"
              fontSize={16}
              onPress={onProceedService}
              rounded="lg">
              <Text color="white" fontSize={14} fontWeight={600}>
                Proceed
              </Text>
            </Button>
          </View>
        </View>
      )}
    </ScrollView>
  );
};
export default ({route}) => {
  return (
    <NativeBaseProvider>
      <DetailProvider route={route} />
    </NativeBaseProvider>
  );
};
