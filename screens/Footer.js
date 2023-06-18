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

function Example() {
  const [selected, setSelected] = React.useState(1);
  return (
    <HStack
      alignItems="center"
      width="100%"
      safeAreaBottom
      borderTopWidth={1}
      borderColor="#D8D8D8">
      <Pressable
        cursor="pointer"
        opacity={selected === 0 ? 1 : 0.5}
        py="3"
        flex={1}
        onPress={() => setSelected(0)}>
        <Center>
          <Icon
            as={Ionicons}
            name={selected === 0 ? 'home' : 'home-outline'}
            color="#9AC7CC"
            size={6}
          />
        </Center>
      </Pressable>
      <Pressable
        cursor="pointer"
        opacity={selected === 1 ? 1 : 0.5}
        py="2"
        flex={1}
        onPress={() => setSelected(1)}>
        <Center>
          <Icon
            as={Ionicons}
            name={selected === 1 ? 'notifications' : 'notifications-outline'}
            color="#93B8BC"
            size={6}
          />
        </Center>
      </Pressable>
      <Pressable
        cursor="pointer"
        opacity={selected === 2 ? 1 : 0.6}
        py="2"
        flex={1}
        onPress={() => setSelected(2)}>
        <Center>
          <Icon
            as={Ionicons}
            name={selected === 2 ? 'list-circle' : 'list-circle-outline'}
            color="#9AC7CC"
            size={6}
          />
        </Center>
      </Pressable>
      <Pressable
        cursor="pointer"
        opacity={selected === 3 ? 1 : 0.5}
        py="2"
        flex={1}
        onPress={() => setSelected(3)}>
        <Center>
          <Icon
            as={Ionicons}
            name={selected === 3 ? 'person' : 'person-outline'}
            color="#9AC7CC"
            size={6}
          />
        </Center>
      </Pressable>
    </HStack>
  );
}

export default () => {
  return <Example />;
};
