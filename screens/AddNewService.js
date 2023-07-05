import {useEffect, useState} from 'react';
import {
  Box,
  Text,
  Center,
  NativeBaseProvider,
  Divider,
  View,
  HStack,
  Button,
  VStack,
  ScrollView,
  Icon,
  Input,
  Heading,
  Avatar,
  Stack,
  Badge,
  Skeleton,
} from 'native-base';
import {styles} from '../style';
import {axiosConfig, bookingUri} from '../axios';
import {useSelector, useDispatch} from 'react-redux';
import {setListAppointment} from '../redux/auth/bookingSlice';
import ImagePicker from 'react-native-image-crop-picker';

const AddNewService = () => {
  const defineStatus = {
    pending: 0,
    confirm: 1,
    reject: 2,
    processing: 3,
    done: 4,
  };

  const takePhoto = () => {};
  const choosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };
  return (
    <View style={styles.listServicesScreen}>
      <View mt={50}>
        <HStack space={2} alignItems="center" p={3}>
          <Divider bg="#87ADB2" thickness="4" mx="2" orientation="vertical" />
          <Heading>Add</Heading>
        </HStack>
        <Center w="100%" shadow={2} bg="white" p={3} rounded="lg">
          <Button onPress={takePhoto}>Take photo</Button>
          <Button onPress={choosePhoto}>Choose photo</Button>
        </Center>
      </View>
    </View>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <AddNewService />
    </NativeBaseProvider>
  );
};
