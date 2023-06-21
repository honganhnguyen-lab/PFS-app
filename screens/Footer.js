import React from 'react';
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  HStack,
  Center,
  Pressable,
  Divider,
} from 'native-base';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export default Example = ({selectValue}) => {
  const [selected, setSelected] = React.useState(selectValue ?? 0);
  const navigation = useNavigation();
  const onPressNavigate = (value, uri) => {
    setSelected(value);
    navigation.navigate(uri);
  };
  return (
    <HStack
      alignItems="center"
      width="100%"
      safeAreaBottom
      borderTopWidth={1}
      borderColor="#D8D8D8"
      bg="#F9F9F9">
      <Pressable
        cursor="pointer"
        opacity={selected === 0 ? 1 : 0.5}
        py="3"
        flex={1}
        onPress={() => onPressNavigate(0, 'Dashboard')}>
        <Center>
          <Icon
            as={Ionicons}
            name={selected === 0 ? 'home' : 'home-outline'}
            color="#569FA7"
            size={6}
          />
        </Center>
      </Pressable>
      <Pressable
        cursor="pointer"
        opacity={selected === 1 ? 1 : 0.5}
        py="2"
        flex={1}
        onPress={() => onPressNavigate(1, 'Booking')}>
        <Center>
          <Icon
            as={Ionicons}
            name={selected === 1 ? 'calendar' : 'calendar-outline'}
            color="#569FA7"
            size={6}
          />
        </Center>
      </Pressable>

      <Pressable
        cursor="pointer"
        opacity={selected === 2 ? 1 : 0.5}
        py="2"
        flex={1}
        onPress={() => setSelected(3)}>
        <Center>
          <Icon
            as={Ionicons}
            name={selected === 2 ? 'person' : 'person-outline'}
            color="#569FA7"
            size={6}
          />
        </Center>
      </Pressable>
      <Pressable
        cursor="pointer"
        opacity={selected === 3 ? 1 : 0.5}
        py="2"
        flex={1}
        onPress={() => setSelected(1)}>
        <Center>
          <Icon
            as={Ionicons}
            name={selected === 3 ? 'notifications' : 'notifications-outline'}
            color="#569FA7"
            size={6}
          />
        </Center>
      </Pressable>
      <Pressable
        cursor="pointer"
        opacity={selected === 4 ? 1 : 0.6}
        py="2"
        flex={1}
        onPress={() => onPressNavigate(4, 'Services')}>
        <Center>
          <Icon
            as={Ionicons}
            name={selected === 4 ? 'list-circle' : 'list-circle-outline'}
            color="#9AC7CC"
            size={6}
          />
        </Center>
      </Pressable>
    </HStack>
  );
};
