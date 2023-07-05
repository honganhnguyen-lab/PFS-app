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
  Badge,
  Fab,
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
import {SvgCss} from 'react-native-svg';

const SkeletonLoading = () => {
  return (
    <Center w="100%">
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

  const {isOpen, onOpen, onClose} = useDisclose();

  const getListServices = async () => {
    setIsLoading(true);
    try {
      const response = await axiosConfig.get(
        `${getListServicesEachProvider}${userDetail.id}/services`,
      );
      setListServices(response.data.data.service);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const onChangeFilterValue = value => {
    setFilter({...filter, [value]: !filter[value]});
  };
  const onClickNavigate = () => {
    navigation.navigate('AddService');
  };

  useEffect(() => {
    getListServices();
  }, [userDetail]);

  useEffect;
  const navigation = useNavigation();
  return (
    <View style={styles.listServicesScreen}>
      <View style={styles.searchBox}>
        <HStack
          space={2}
          justifyContent="space-between"
          alignItems="center"
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

      <ScrollView>
        {isLoading ? (
          <SkeletonLoading />
        ) : (
          <VStack space={3} mt="6">
            {listServices?.length > 0 &&
              listServices
                .reduce((result, item, index) => {
                  if (index % 2 === 0) {
                    result.push([item]);
                  } else {
                    result[result.length - 1].push(item);
                  }
                  return result;
                }, [])
                .map((item, index) => {
                  const renderIcon = defineCategory.find(
                    cate => cate.status === item[index].category,
                  )?.icon;
                  return (
                    <HStack space={2} key={index}>
                      <VStack
                        w="50%"
                        space={3}
                        rounded="lg"
                        bg="#F9F9F9"
                        shadow={2}>
                        <Center bg="#87ADB2" p={2}>
                          <Badge
                            style={{position: 'absolute', top: 0, left: 5}}
                            bg="white"
                            color="#316970">
                            <SvgCss
                              width={25}
                              height={25}
                              color="#316970"
                              fill="#316970"
                              xml={renderIcon}
                            />
                          </Badge>
                          <Badge
                            style={{position: 'absolute', bottom: 0, right: 0}}
                            bg="#316970"
                            color="white">
                            <Text color="white">${item[index].price}</Text>
                          </Badge>
                          <Image
                            source={{
                              uri: item[index].picture,
                            }}
                            alt="Alternate Text"
                            size="lg"
                          />
                        </Center>
                        <VStack p={3}>
                          <Text
                            fontWeight={600}
                            fontSize={16}
                            fontFamily={'WorkSans-regular'}>
                            {item[index].title}
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
