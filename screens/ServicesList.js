import {useEffect, useMemo, useState} from 'react';
import {
  Box,
  Text,
  Center,
  NativeBaseProvider,
  Image,
  View,
  VStack,
  Heading,
  HStack,
  ScrollView,
  Circle,
  Icon,
  Stack,
  Input,
  Button,
  Avatar,
  Divider,
  Pressable,
  Skeleton,
  useDisclose,
  Actionsheet,
  Checkbox,
  Radio,
} from 'native-base';
import {styles} from '../style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {axiosConfig, getListServicesElasticUri} from '../axios';
import Geolocation from '@react-native-community/geolocation';

const SkeletonLoading = () => {
  return (
    <Center w="100%">
      <VStack space={1}>
        <HStack
          w="100%"
          borderWidth="1"
          space={8}
          mt="6"
          rounded="md"
          _dark={{
            borderColor: 'coolGray.500',
          }}
          _light={{
            borderColor: 'coolGray.200',
          }}
          p="4">
          <Skeleton flex="1" h="70" rounded="md" startColor="coolGray.100" />
          <VStack flex="3" space="4">
            <Skeleton.Text />
          </VStack>
        </HStack>
        <HStack
          w="100%"
          borderWidth="1"
          space={8}
          mt="6"
          rounded="md"
          _dark={{
            borderColor: 'coolGray.500',
          }}
          _light={{
            borderColor: 'coolGray.200',
          }}
          p="4">
          <Skeleton flex="1" h="70" rounded="md" startColor="coolGray.100" />
          <VStack flex="3" space="4">
            <Skeleton.Text />
          </VStack>
        </HStack>
        <HStack
          w="100%"
          borderWidth="1"
          space={8}
          mt="6"
          rounded="md"
          _dark={{
            borderColor: 'coolGray.500',
          }}
          _light={{
            borderColor: 'coolGray.200',
          }}
          p="4">
          <Skeleton flex="1" h="70" rounded="md" startColor="coolGray.100" />
          <VStack flex="3" space="4">
            <Skeleton.Text />
          </VStack>
        </HStack>
        <HStack
          w="100%"
          borderWidth="1"
          space={8}
          mt="6"
          rounded="md"
          _dark={{
            borderColor: 'coolGray.500',
          }}
          _light={{
            borderColor: 'coolGray.200',
          }}
          p="4">
          <Skeleton flex="1" h="70" rounded="md" startColor="coolGray.100" />
          <VStack flex="3" space="4">
            <Skeleton.Text />
          </VStack>
        </HStack>
      </VStack>
    </Center>
  );
};

const ServicesList = () => {
  const serviceFilter = [
    {
      id: 2,
      label: 'Rating',
      icon: 'star-sharp',
      value: 'sortRating',
      color: '#FFC107',
    },
    {
      id: 3,
      label: 'Discount',
      icon: 'pricetags-sharp',
      value: 'isDiscount',
      color: '#FF6C6C',
    },
    {
      id: 4,
      label: 'Nearest',
      icon: 'location-sharp',
      value: 'isGeo',
      color: '#0077E5',
    },
  ];

  const [listServices, setListServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({
    search: '',
    sortRating: false,
    sortPrice: false,
    isGeo: false,
  });
  const [skipPermissionRequests, setSkipPermissionRequests] = useState(false);
  const [authorizationLevel, setAuthorizationLevel] = useState('auto');
  const [locationProvider, setLocationProvider] = useState('auto');

  const {isOpen, onOpen, onClose} = useDisclose();
  const getLocation = () => {
    Geolocation.getCurrentPosition(async info => {
      const latitude = info.coords.latitude;
      const longtitude = info.coords.longitude;
      setIsLoading(true);
      try {
        const response = await axiosConfig.get(getListServicesElasticUri, {
          params: {
            search: filter.search,
            ...(filter.sortRating && {sortRating: filter.sortRating}),
            ...(filter.sortPrice && {sortPrice: filter.sortPrice}),
            lat: latitude,
            lon: longtitude,
            ...(filter.isGeo && {isGeo: filter.isGeo}),
          },
        });
        setListServices(response.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
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

  const onChangeFilterValue = value => {
    setFilter({...filter, [value]: !filter[value]});
  };
  const convertAmount = amount => amount.toLocaleString();

  useMemo(() => {
    getLocation();
  }, [filter]);

  useEffect;
  const navigation = useNavigation();
  return (
    <View style={styles.listServicesCustomerScreen}>
      <View style={styles.searchBox}>
        <HStack
          space={6}
          alignItems="center"
          p={3}
          bgColor="#559FA7"
          mt={50}
          mb={1}>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Icon
              size="4"
              as={Ionicons}
              name="chevron-back-outline"
              color="white"
            />
          </Pressable>
          <Input
            placeholder="What do you need"
            borderRadius="5"
            fontSize="14"
            height={9}
            w="80%"
            variant="filled"
            value={filter.search}
            onChangeText={value => setFilter({...filter, search: value})}
            onSubmitEditing={getLocation}
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
        </HStack>
      </View>
      <View style={styles.filterIcon}>
        <HStack
          space={1.5}
          pt={3}
          pb={1}
          alignItems="center"
          justifyContent="center">
          <Button
            leftIcon={
              <Icon name="options-outline" as={Ionicons} color="#95C4CB" />
            }
            variant="outline"
            color="#95C4CB"
            disabled={isLoading}
            size="sm"
            onPress={onOpen}
            borderRadius="full"
          />

          {serviceFilter.map(item => (
            <Button
              leftIcon={
                <Icon
                  name={item.icon}
                  as={Ionicons}
                  color={filter[item.value] ? 'white' : item.color}
                />
              }
              variant={filter[item.value] ? 'solid' : 'outline'}
              disabled={isLoading}
              size="sm"
              key={item.id}
              onPress={() => onChangeFilterValue(item.value)}
              borderRadius="full">
              {item.label?.length > 0 && (
                <Text
                  style={
                    filter[item.value]
                      ? styles.buttonTextFocus
                      : styles.buttonText
                  }>
                  {item.label}
                </Text>
              )}
            </Button>
          ))}
        </HStack>
        <Divider
          my="2"
          _light={{
            bg: '#DDDDEE',
          }}
          _dark={{
            bg: '#DDDDEE',
          }}
        />
      </View>

      <ScrollView>
        {isLoading ? (
          <SkeletonLoading />
        ) : (
          <VStack space={3} alignItems="center" p={2}>
            {listServices?.length > 0 &&
              listServices.map((service, index) => {
                return (
                  <HStack
                    w="100%"
                    space={3}
                    rounded="lg"
                    key={index}
                    borderBottomColor={'#DDDDEE'}
                    borderBottomWidth={1}>
                    <Center p={2}>
                      <Image
                        source={{
                          uri: service.picture,
                        }}
                        alt="Alternate Text"
                        size="lg"
                      />
                    </Center>
                    <VStack p={3} w="100%">
                      <Text fontWeight={600} fontSize={16} w="80%">
                        {service.title}
                      </Text>
                      <HStack p={2} alignItems="center">
                        <Text>{service.locationFar ?? '4km'}</Text>
                        <Divider
                          bg="#87ADB2"
                          thickness="2"
                          mx="2"
                          orientation="vertical"
                        />
                        <Icon
                          as={Ionicons}
                          size={4}
                          name="star-sharp"
                          color="#FFC107"
                        />
                        <Text>
                          {service.ratingsAverage ?? 0} (
                          {service.ratingComments ?? 0})
                        </Text>
                      </HStack>
                      <Text fontSize={18}>
                        VND {convertAmount(service.price)}
                      </Text>
                    </VStack>
                  </HStack>
                );
              })}
          </VStack>
        )}
      </ScrollView>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <HStack alignItems="center" justifyContent="center" space={2}>
            <Icon name="options-outline" as={Ionicons} />
            <Text fontWeight={600} fontSize={18}>
              Filter by
            </Text>
          </HStack>

          <Actionsheet.Item>
            <Checkbox value="one" my={2}>
              Discount
            </Checkbox>
          </Actionsheet.Item>
          <Actionsheet.Item>
            <Checkbox value="one" my={2}>
              Nearest
            </Checkbox>
          </Actionsheet.Item>
          <Actionsheet.Item>
            <Checkbox value="one" my={2}>
              Rating
            </Checkbox>
          </Actionsheet.Item>
          <Actionsheet.Item>
            <Checkbox value="one" my={2}>
              Price
            </Checkbox>
          </Actionsheet.Item>
          <Actionsheet.Item>
            <Text fontWeight="700">Categories</Text>
          </Actionsheet.Item>
          <Actionsheet.Item>
            <Radio.Group name="exampleGroup">
              <VStack w="100%" space={3} justifyContent="center">
                <Radio value="1" my={1}>
                  Maid Services
                </Radio>

                <Radio value="2" my={1}>
                  Repair Services
                </Radio>

                <Radio value="3" my={1}>
                  Clean Services
                </Radio>
                <Radio value="4" my={1}>
                  Tutor Services
                </Radio>
              </VStack>
            </Radio.Group>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};
export default () => {
  return (
    <NativeBaseProvider>
      <ServicesList />
    </NativeBaseProvider>
  );
};
