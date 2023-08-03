import {
  HStack,
  VStack,
  Avatar,
  Text,
  Badge,
  View,
  Center,
  Box,
  Stack,
  Heading,
  AspectRatio,
  Icon,
  Image,
} from 'native-base';
import {styles} from '../style';

import Ionicons from 'react-native-vector-icons/Ionicons';

export const RenderAdver = ({detail}) => {
  const convertAmount = amount => amount.toLocaleString();
  return (
    <HStack alignItems="center" justifyContent="center" space={3}>
      {detail.map((item, index) => (
        <Box
          flex={1}
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          key={index}>
          <Box alignItems="center" width={'100%'}>
            {item?.image.length > 0 ? (
              <Image
                resizeMode="cover"
                source={{uri: item.image}}
                alt="Alternate Text"
                size="xl"
                style={{
                  width: '45%',
                  marginTop: 10,
                }}
              />
            ) : (
              <Image
                resizeMode="cover"
                source={require('../assets/no-image.jpeg')}
                alt="Alternate Text"
                size="xl"
                style={{
                  width: '100%',
                  marginTop: 10,
                }}
              />
            )}

            <Center
              bg="#559FA7"
              _dark={{
                bg: '#559FA7',
              }}
              _text={{
                color: 'warmGray.50',
                fontWeight: '700',
                fontSize: 'xs',
              }}
              position="absolute"
              top="0"
              left="0"
              px="3"
              py="1.5">
              Best seller
            </Center>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                {item.title}
              </Heading>
              <Text
                fontSize={14}
                _light={{
                  color: '#559FA7',
                }}
                _dark={{
                  color: '#559FA7',
                }}
                fontWeight="500"
                ml="-0.5"
                mt="-1">
                {item.providerName}
              </Text>
            </Stack>
            <Text fontWeight="400">{convertAmount(item.price)}</Text>
            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between">
              <HStack alignItems="center">
                <Icon
                  as={Ionicons}
                  size={4}
                  name="star-sharp"
                  color="yellow.300"
                />
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                  fontWeight="400">
                  {item.rating}
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      ))}
    </HStack>
  );
};
