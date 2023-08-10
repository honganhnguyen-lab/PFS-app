import {useEffect, useState} from 'react';
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
  Icon,
  Input,
  Pressable,
  Skeleton,
  Badge,
  Fab,
  AspectRatio,
} from 'native-base';

import {styles} from '../style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {
  axiosConfig,
  getListServicesEachProvider,
  getListServicesElasticUri,
} from '../axios';
import {useSelector} from 'react-redux';
import {defineCategory} from '../CommonType';
import Toast from 'react-native-toast-message';
import {LoadingScreen} from '../components/atoms/LoadingScreen';
import {useIsFocused} from '@react-navigation/native';

const SkeletonLoading = () => {
  return (
    <Center w="100%" p={3}>
      <VStack
        w="90%"
        maxW="400"
        borderWidth="1"
        space={8}
        overflow="hidden"
        rounded="md"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}>
        <Skeleton h="40" />
        <Skeleton.Text px="4" />
        <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
      </VStack>
    </Center>
  );
};

const ProviderServicesList = () => {
  const user = useSelector(state => state.auth.user);
  const userDetail = user.payload;
  const [listServices, setListServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  const getListServices = async () => {
    setIsLoading(true);
    try {
      const response = await axiosConfig.get(
        `${getListServicesEachProvider}${userDetail.id}/services`,
      );

      console.log('fsfds', response.data.data.services);
      setListServices(response.data.data.services);
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  const removeService = async id => {
    setIsLoading(true);
    try {
      await axiosConfig.delete(`api/v1/services/${id}`);
      Toast.show({
        type: 'success',
        text1: 'Delete success',
      });
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Delete fail',
      });
    }
    getListServices();
    setIsLoading(false);
  };

  const onChangeFilterValue = value => {
    setFilter({...filter, [value]: !filter[value]});
  };
  const onClickNavigate = () => {
    navigation.navigate('Add New Service');
  };

  useEffect(() => {
    console.log('isFocused', isFocused);
    if (isFocused) {
      getListServices();
    }
  }, [isFocused]);

  const navigation = useNavigation();
  return (
    <View style={styles.listServicesCustomerScreen}>
      <View style={styles.searchBox}>
        <HStack
          space={2}
          justifyContent="space-between"
          alignItems="center"
          mt={50}
          p={3}>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Icon size="6" as={Ionicons} name="arrow-back-outline" />
          </Pressable>
          <Input
            placeholder="Find your service..."
            borderRadius="10"
            fontSize="14"
            w="85%"
            variant="filled"
            onSubmitEditing={getListServices}
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
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Icon size="6" as={Ionicons} name="options-outline" />
          </Pressable>
        </HStack>
      </View>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ScrollView>
          {isLoading ? (
            <SkeletonLoading />
          ) : (
            <VStack space={3} mt="6" p={3}>
              {listServices?.length > 0 &&
                listServices.map((item, index) => {
                  const renderIcon = defineCategory.find(
                    cate => cate.status === item?.category,
                  )?.icon;
                  return (
                    <HStack space={2} key={index} w="100%">
                      <VStack
                        space={3}
                        rounded="lg"
                        bg="#F9F9F9"
                        shadow={2}
                        flex={1}>
                        <Center>
                          <Badge
                            style={{
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              zIndex: 20,
                            }}
                            rounded="md">
                            <HStack space={4}>
                              <Pressable
                                onPress={() =>
                                  navigation.navigate('UpdateService', {
                                    serviceId: item.id,
                                  })
                                }>
                                <Icon
                                  as={Ionicons}
                                  name="pencil-outline"
                                  color="#316970"
                                  size="md"
                                />
                              </Pressable>
                              <Pressable onPress={() => removeService(item.id)}>
                                <Icon
                                  as={Ionicons}
                                  color="#316970"
                                  name="trash-outline"
                                  size="md"
                                />
                              </Pressable>
                            </HStack>
                          </Badge>
                          <Badge
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              right: 0,
                              zIndex: 20,
                            }}
                            bg="#316970"
                            color="white"
                            rounded="md">
                            <Text color="white" fontSize={12} fontWeight={700}>
                              {item.price?.toLocaleString()} VND/hour
                            </Text>
                          </Badge>
                          <Box w="100%">
                            {item.picture?.length > 0 ? (
                              <Box w="100%">
                                <AspectRatio
                                  ratio={{
                                    base: 12 / 5,
                                    md: 12 / 5,
                                  }}
                                  height={{
                                    base: 150,
                                  }}>
                                  <Image
                                    resizeMode="cover"
                                    source={{uri: item.picture}}
                                    alt="Alternate Text"
                                    // size="xl"

                                    style={{
                                      width: '100%',
                                      minHeight: 100,
                                      backgroundColor: 'red',
                                      // marginTop: 10,
                                    }}
                                  />
                                </AspectRatio>
                              </Box>
                            ) : (
                              <Box w="100%" bg="white">
                                <Image
                                  resizeMode="contain"
                                  source={require('../assets/no-image.jpeg')}
                                  alt="Alternate Text"
                                  size="xl"
                                  style={{
                                    width: '100%',
                                    marginTop: 10,
                                  }}
                                />
                              </Box>
                            )}
                          </Box>
                        </Center>
                        <VStack p={3}>
                          <Text
                            fontWeight={600}
                            fontSize={16}
                            fontFamily={'WorkSans-regular'}>
                            {item.title}
                          </Text>
                          <Text fontSize={12} fontFamily={'WorkSans-regular'}>
                            Des: {item.description}
                          </Text>
                          <HStack pt={2} alignItems="center">
                            <Icon
                              as={Ionicons}
                              size={4}
                              name="star-sharp"
                              color="#87ADB2"
                            />
                            <Text>4.8</Text>
                          </HStack>
                        </VStack>
                      </VStack>
                    </HStack>
                  );
                })}
            </VStack>
          )}
        </ScrollView>
      )}

      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        onPress={onClickNavigate}
        icon={<Icon color="white" as={Ionicons} name="add" size="md" />}
      />
    </View>
  );
};
export default () => {
  return (
    <NativeBaseProvider>
      <ProviderServicesList />
    </NativeBaseProvider>
  );
};
