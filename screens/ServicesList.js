import {useEffect} from 'react';
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
} from 'native-base';
import {styles} from '../style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const ServicesList = () => {
  const serviceFilter = [
    {
      id: 1,
      label: 'Filter',
      icon: 'filter-outline',
    },
    {
      id: 2,
      label: 'Sort',
      icon: 'funnel-outline',
    },
    {
      id: 3,
      label: 'Discount',
      icon: 'pricetags-outline',
    },
    {
      id: 4,
      label: 'Nearest',
      icon: 'location-outline',
    },
  ];
  const listServices = [
    {
      id: 1,
      title: 'Tutor Service',
      rating: 4.8,
      locationFar: '1.4km',
      ratingComments: '2.8k',
      picture:
        'https://epe.brightspotcdn.com/dims4/default/95f2bfb/2147483647/strip/true/crop/2084x1414+37+0/resize/840x570!/format/webp/quality/90/?url=https%3A%2F%2Fepe-brightspot.s3.amazonaws.com%2F94%2F2d%2F8ed27aa34da0a197b1d819ec39a5%2Fteacher-tutor-student-librarian-1137620335.jpg',
    },
    {
      id: 2,
      title: 'Maid Service',
      rating: 4.9,
      locationFar: '3km',
      ratingComments: '2.8k',
      picture:
        'https://www.gohousemaids.com/wp-content/uploads/2016/10/bigstock-Everything-Must-Be-Clean-As-A-115922414-1024x683.jpg',
    },
    {
      id: 3,
      title: 'Repair AC',
      rating: 2.8,
      locationFar: '3.2km',
      ratingComments: '3',
      picture:
        'https://lirp.cdn-website.com/8534fced395e48cc95b25597bf7cb70a/dms3rep/multi/opt/58d28b52-afd4-4f64-a02b-b5ca91a628e1-640w.jpg',
    },
    {
      id: 4,
      title: 'Repair pump',
      rating: 3.8,
      locationFar: '1.4km',
      ratingComments: '5k',
      picture:
        'https://lirp.cdn-website.com/8534fced395e48cc95b25597bf7cb70a/dms3rep/multi/opt/58d28b52-afd4-4f64-a02b-b5ca91a628e1-640w.jpg',
    },
    {
      id: 5,
      title: 'Repair Refridgator',
      rating: 4.1,
      locationFar: '10.4km',
      ratingComments: '2k',
      picture:
        'https://lirp.cdn-website.com/8534fced395e48cc95b25597bf7cb70a/dms3rep/multi/opt/58d28b52-afd4-4f64-a02b-b5ca91a628e1-640w.jpg',
    },
    {
      id: 6,
      title: 'Cleaning services',
      rating: 4.2,
      locationFar: '8.4km',
      ratingComments: '600',
      picture:
        'https://lirp.cdn-website.com/8534fced395e48cc95b25597bf7cb70a/dms3rep/multi/opt/58d28b52-afd4-4f64-a02b-b5ca91a628e1-640w.jpg',
    },
  ];
  const navigation = useNavigation();
  return (
    <View style={styles.listServicesScreen}>
      <View style={styles.searchBox}>
        <HStack justifyContent="space-between" alignItems="center" p={3}>
          <Pressable onPress={() => navigation.navigate('Dashboard')}>
            <Icon size="6" as={Ionicons} name="arrow-back-outline" />
          </Pressable>
          <Input
            placeholder="What do you need"
            borderRadius="10"
            fontSize="14"
            w="90%"
            variant="filled"
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
        <HStack space={1.5} pt={2}>
          {serviceFilter.map(item => (
            <Button
              leftIcon={<Icon name={item.icon} as={Ionicons} color="#95C4CB" />}
              variant="outline"
              borderColor="#95C4CB"
              color="#95C4CB"
              size="xs"
              key={item.id}
              borderRadius="full">
              <Text style={styles.buttonText}>{item.label}</Text>
            </Button>
          ))}
        </HStack>
      </View>

      <ScrollView>
        <VStack space={3} alignItems="center" mt="6">
          {listServices.map(service => (
            <HStack
              w="100%"
              h={120}
              space={3}
              rounded="lg"
              bg="#F9F9F9"
              shadow={2}
              key={service.id}>
              <Center bg="#87ADB2" p={2.5} roundedLeft="lg">
                <Image
                  source={{
                    uri: service.picture,
                  }}
                  alt="Alternate Text"
                  size="md"
                  borderRadius={20}
                />
              </Center>
              <VStack p={3}>
                <Text
                  fontWeight={600}
                  fontSize={18}
                  fontFamily={'WorkSans-regular'}>
                  {service.title}
                </Text>
                <HStack p={2} alignItems="center">
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
                  fontFamily={'WorkSans-regular'}
                  color="#87ADB2">
                  $5.00
                </Heading>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </ScrollView>
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
