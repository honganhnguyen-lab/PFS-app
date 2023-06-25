import {useEffect, useState} from 'react';
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
} from 'native-base';
import {Dimensions} from 'react-native';
import {styles} from '../style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const DetailProvider = () => {
  const navigation = useNavigation();
  const {width} = Dimensions.get('window');
  const listServiceEachProvider = [
    {
      id: 1,
      title: 'Secondary tutor',
      image:
        'https://epe.brightspotcdn.com/dims4/default/95f2bfb/2147483647/strip/true/crop/2084x1414+37+0/resize/840x570!/format/webp/quality/90/?url=https%3A%2F%2Fepe-brightspot.s3.amazonaws.com%2F94%2F2d%2F8ed27aa34da0a197b1d819ec39a5%2Fteacher-tutor-student-librarian-1137620335.jpg',
      price: '200.000',
      priceDiscount: '120.000 đ',
    },
    {
      id: 2,
      title: 'High school tutor',
      image:
        'https://epe.brightspotcdn.com/dims4/default/95f2bfb/2147483647/strip/true/crop/2084x1414+37+0/resize/840x570!/format/webp/quality/90/?url=https%3A%2F%2Fepe-brightspot.s3.amazonaws.com%2F94%2F2d%2F8ed27aa34da0a197b1d819ec39a5%2Fteacher-tutor-student-librarian-1137620335.jpg',
      price: '200.000 đ',
    },
    {
      id: 3,
      title: 'Elementary tutor',
      image:
        'https://epe.brightspotcdn.com/dims4/default/95f2bfb/2147483647/strip/true/crop/2084x1414+37+0/resize/840x570!/format/webp/quality/90/?url=https%3A%2F%2Fepe-brightspot.s3.amazonaws.com%2F94%2F2d%2F8ed27aa34da0a197b1d819ec39a5%2Fteacher-tutor-student-librarian-1137620335.jpg',
      price: '100.000 đ',
    },
  ];

  const listIsChosen = listServiceEachProvider.map(service => ({
    ...service,
    isChosen: true,
  }));
  const [isChosen, setIsChosen] = useState(listIsChosen);
  const {isOpen, onOpen, onClose} = useDisclose();

  const onCheckAddService = serviceId => {
    const newList = isChosen.map(item => {
      if (item.id === serviceId) {
        return {...item, isChosen: !item.isChosen};
      }
      return item;
    });
    setIsChosen(newList);
    onOpen();
  };
  return (
    <View style={styles.detailScreen} bg="#CAC9C9">
      <View width={width}>
        <Image
          source={{
            uri: 'https://epe.brightspotcdn.com/dims4/default/95f2bfb/2147483647/strip/true/crop/2084x1414+37+0/resize/840x570!/format/webp/quality/90/?url=https%3A%2F%2Fepe-brightspot.s3.amazonaws.com%2F94%2F2d%2F8ed27aa34da0a197b1d819ec39a5%2Fteacher-tutor-student-librarian-1137620335.jpg',
          }}
          style={styles.backgroundImage}
          alt="Alternate Text"
          borderRadius={2}
        />
        <HStack
          justifyContent="space-between"
          alignItems="flex-start"
          p={2}
          height={200}>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Avatar bg="white">
              <Icon
                as={Ionicons}
                name="arrow-back-outline"
                size="md"
                color="#569FA7"
              />
            </Avatar>
          </Pressable>
          <Pressable onPress={() => setOpen(!open)}>
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
      </View>
      <ScrollView style={styles.boxDetail}>
        <Box alignItems="center" justifyContent="center">
          <Box bg="white" width="90%" shadow={3} mb={4} rounded="lg">
            <VStack p={3} space={2}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text
                  fontWeight={600}
                  fontSize={22}
                  color="#569FA7"
                  fontFamily={'WorkSans-regular'}>
                  John Haukins
                </Text>
                <Icon
                  as={Ionicons}
                  name="chevron-forward-outline"
                  size="md"
                  color="#569FA7"
                />
              </HStack>
              <Divider bg="#87ADB2" thickness="1" mt={2} />
              <HStack justifyContent="space-between" alignItems="center" p={2}>
                <HStack space={4} alignItems="center">
                  <HStack alignItems="center" space={1}>
                    <Icon
                      as={Ionicons}
                      size={4}
                      name="star-sharp"
                      color="#87ADB2"
                    />
                    <Text fontWeight={600}>4.8</Text>
                    <Text>(46)</Text>
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
              <HStack justifyContent="space-between" alignItems="center" p={2}>
                <VStack>
                  <HStack space={1} alignItems="center">
                    <Icon
                      as={Ionicons}
                      name="location"
                      size="md"
                      color="#569FA7"
                    />
                    <Text> 9.1 km</Text>
                  </HStack>
                  <HStack space={1} alignItems="center">
                    <Icon as={Ionicons} name="pin" size="md" color="#569FA7" />
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
                  <Icon as={Ionicons} name="eye" size="md" color="#569FA7" />

                  <Text fontWeight={600}>Description</Text>
                </HStack>
                <Text width="80%" flexWrap="wrap">
                  Description
                </Text>
              </VStack>
            </VStack>
          </Box>
        </Box>

        <VStack space={12} alignItems="center" justifyContent="center">
          <Box width="90%">
            <Text
              fontWeight={600}
              fontSize={22}
              fontFamily={'AtkinsonHyperlegible-regular'}>
              Current discount
            </Text>
            {isChosen.map(item => {
              if (item.priceDiscount) {
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
                        <Text fontWeight={600} fontSize={16} color="#569FA7">
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
                    <Pressable onPress={() => onCheckAddService(item.id)}>
                      <Square
                        size="35px"
                        bg={!item.isChosen ? '#87ADB2' : 'white'}
                        rounded="lg"
                        borderWidth="1"
                        borderColor={!item.isChosen ? 'white' : '#87ADB2'}>
                        <Icon
                          as={Ionicons}
                          name={!item.isChosen ? 'add-sharp' : 'remove-sharp'}
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

          <Box width="90%">
            <Text
              fontWeight={600}
              fontSize={22}
              fontFamily={'AtkinsonHyperlegible-regular'}>
              For you
            </Text>
            <HStack space={6} alignItems="center" mt={3}>
              {isChosen.map(item => {
                if (!item.priceDiscount) {
                  return (
                    <VStack space={2} width="50%" key={item.id}>
                      <Image
                        source={{
                          uri: item.image,
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
                        <Pressable onPress={() => onCheckAddService(item.id)}>
                          <Square
                            size="30px"
                            bg={!item.isChosen ? '#87ADB2' : 'white'}
                            rounded="lg"
                            borderWidth="1"
                            borderColor={!item.isChosen ? 'white' : '#87ADB2'}>
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
                        <Text fontWeight={600} fontSize={14} color="#569FA7">
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
      </ScrollView>
      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
        <Actionsheet.Content borderTopRadius="0">
          <HStack
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            p={2}>
            <VStack space={3}>
              <Text fontWeight={600} fontSize={16} color="#569FA7">
                120.000 d
              </Text>
              <Text fontSize={16}>Secondary tutor</Text>
            </VStack>
            <Button
              w={150}
              bgColor="#238793"
              fontSize={16}
              onPress={() => navigation.navigate('Home')}
              rounded="lg">
              <Text color="white" fontSize={14} fontWeight={600}>
                Proceed
              </Text>
            </Button>
          </HStack>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};
export default () => {
  return (
    <NativeBaseProvider>
      <DetailProvider />
    </NativeBaseProvider>
  );
};
