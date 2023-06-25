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
  Radio,
  PresenceTransition,
} from 'native-base';
import {styles} from '../style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {diceIcon} from '../assets/icon';
import {SvgCss} from 'react-native-svg';

const ProviderChoosing = () => {
  const [value, setValue] = useState('one');
  const [open, setOpen] = useState(false);
  const labelTypeServices = [
    {label: 'RepairServices', value: 0},
    {label: 'MaidServices', value: 1},
    {label: 'CleanServices', value: 2},
    {label: 'TutorServices', value: 3},
  ];

  const functionRenderLabel = array => {
    return array?.map(
      item => labelTypeServices.find(x => x.value === item)?.label,
    );
  };
  const listServices = [
    {
      id: 1,
      service: [
        {
          id: 2,
          title: 'Tutor Service',
          picture:
            'https://epe.brightspotcdn.com/dims4/default/95f2bfb/2147483647/strip/true/crop/2084x1414+37+0/resize/840x570!/format/webp/quality/90/?url=https%3A%2F%2Fepe-brightspot.s3.amazonaws.com%2F94%2F2d%2F8ed27aa34da0a197b1d819ec39a5%2Fteacher-tutor-student-librarian-1137620335.jpg',
          price: '25.000',
        },
        {
          id: 3,
          title: 'Minor Tutor Service',
          picture:
            'https://epe.brightspotcdn.com/dims4/default/95f2bfb/2147483647/strip/true/crop/2084x1414+37+0/resize/840x570!/format/webp/quality/90/?url=https%3A%2F%2Fepe-brightspot.s3.amazonaws.com%2F94%2F2d%2F8ed27aa34da0a197b1d819ec39a5%2Fteacher-tutor-student-librarian-1137620335.jpg',
          price: '25.000',
          priceDiscount: '20.000',
        },
      ],
      providerName: 'Mike Hauting',
      rating: 4.8,
      locationFar: '1.4km',
      ratingComments: '2.8k',
      isDiscount: true,
      provider: 'Amie',
      type: [0, 2],
      picture:
        'https://epe.brightspotcdn.com/dims4/default/95f2bfb/2147483647/strip/true/crop/2084x1414+37+0/resize/840x570!/format/webp/quality/90/?url=https%3A%2F%2Fepe-brightspot.s3.amazonaws.com%2F94%2F2d%2F8ed27aa34da0a197b1d819ec39a5%2Fteacher-tutor-student-librarian-1137620335.jpg',
    },
    {
      id: 2,
      service: [
        {
          id: 2,
          title: 'Tutor Service',
          picture:
            'https://www.gohousemaids.com/wp-content/uploads/2016/10/bigstock-Everything-Must-Be-Clean-As-A-115922414-1024x683.jpg',
          price: '25.000',
        },
        {
          id: 3,
          title: 'Minor Tutor Service',
          picture:
            'https://www.gohousemaids.com/wp-content/uploads/2016/10/bigstock-Everything-Must-Be-Clean-As-A-115922414-1024x683.jpg',
          price: '25.000',
          priceDiscount: '20.000',
        },
      ],
      providerName: 'Amie Nguyen',
      rating: 4.8,
      locationFar: '1.4km',
      ratingComments: '2.8k',
      isDiscount: true,
      provider: 'Amie',
      type: [0, 2],
      picture:
        'https://www.gohousemaids.com/wp-content/uploads/2016/10/bigstock-Everything-Must-Be-Clean-As-A-115922414-1024x683.jpg',
    },
  ];
  const navigation = useNavigation();
  return (
    <View style={styles.listServicesScreen} bg="#CAC9C9">
      <View mt={50}>
        <HStack justifyContent="space-between" alignItems="center" p={3}>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Icon
              as={Ionicons}
              name="arrow-back-outline"
              size="md"
              color="#569FA7"
            />
          </Pressable>
          <Text>Step 2</Text>
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
          {listServices.map(service => (
            <Pressable
              w="100%"
              onPress={() => navigation.navigate('DetailProvider')}>
              <VStack w="100%" space={2} bg="#F9F9F9" shadow={2}>
                <HStack w="100%" space={1} rounded="lg" key={service.id}>
                  <Center p={2.5}>
                    <Image
                      source={{
                        uri: service.picture,
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
                      {service.providerName}
                    </Text>
                    <Text fontSize={12} mb={1} fontFamily={'WorkSans-regular'}>
                      {functionRenderLabel(service.type).join('-')}
                    </Text>
                    <HStack alignItems="center">
                      <Icon
                        as={Ionicons}
                        size={4}
                        name="compass-outline"
                        color="#87ADB2"
                      />
                      <Text>{service.locationFar}</Text>
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
                        color="#87ADB2"
                      />
                      <Text>
                        {service.rating} ({service.ratingComments})
                      </Text>
                    </HStack>
                    <Heading
                      fontWeight={600}
                      fontSize={18}
                      mt={1}
                      fontFamily={'WorkSans-regular'}
                      color="#87ADB2">
                      200.000 đ
                    </Heading>
                  </VStack>
                </HStack>
                <HStack space={3} alignItems="center">
                  {service.service?.map(item => (
                    <VStack style={{flexWrap: 'wrap'}} alignItems="flex-start">
                      <Center>
                        <Image
                          source={{
                            uri: item.picture,
                          }}
                          alt="Alternate Text"
                          size="md"
                          borderRadius={2}
                        />
                      </Center>
                      {item.priceDiscount ? (
                        <HStack
                          alignItems="center"
                          space={1}
                          width="100%"
                          flexWrap="wrap">
                          <Text fontWeight={600} fontSize={12}>
                            {item.priceDiscount}
                          </Text>
                          <Text fontSize={10} strikeThrough>
                            {item.price}
                          </Text>
                        </HStack>
                      ) : (
                        <Text fontWeight={600} fontSize={12}>
                          {item.price}
                        </Text>
                      )}
                      <Text fontSize={12} style={{flexWrap: 'wrap'}}>
                        {item.title}
                      </Text>
                    </VStack>
                  ))}
                </HStack>
              </VStack>
            </Pressable>
          ))}
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
