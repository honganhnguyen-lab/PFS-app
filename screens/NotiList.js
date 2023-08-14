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
} from 'native-base';
import {styles} from '../style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setListNoti} from '../redux/noti/notiSlice';
import {LoadingScreen} from '../components/atoms/LoadingScreen';

const NotiList = () => {
  const dispatch = useDispatch();
  const notiList = useSelector(state => state.noti.listNoti);
  console.log('notiList', notiList);

  const onRemoveNoti = () => {
    dispatch(setListNoti([]));
  };

  return (
    <View style={styles.listServicesScreen}>
      <View mt={50}>
        <HStack justifyContent="space-between" alignItems="center" p={3}>
          <HStack space={2}>
            <Divider bg="#87ADB2" thickness="4" mx="2" orientation="vertical" />
            <Heading>Notification</Heading>
          </HStack>
          <Pressable onPress={onRemoveNoti}>
            <Icon as={Ionicons} name="trash" size="md" color="#87ADB2" />
          </Pressable>
        </HStack>
        <ScrollView>
          <VStack space={2}>
            {notiList ? (
              <Stack height={500}>
                {notiList.map((item, index) => (
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    p={1}
                    key={index}>
                    <HStack space={3} alignItems="center" flex={0.9}>
                      <Avatar
                        bg="white"
                        borderColor={'#87ADB2'}
                        borderWidth={1}
                        size="sm">
                        <Icon
                          as={Ionicons}
                          name="notifications-sharp"
                          size="sm"
                          color="#87ADB2"
                        />
                      </Avatar>
                      <VStack space={2} width="75%">
                        <Text
                          fontWeight={600}
                          fontSize={14}
                          ellipsizeMode={'tail'}
                          numberOfLines={3}>
                          {item.title}
                        </Text>
                        <Text
                          fontSize={12}
                          fontWeight={600}
                          ellipsizeMode={'tail'}
                          numberOfLines={3}>
                          {item.provider}
                        </Text>
                        <Text
                          fontSize={10}
                          ellipsizeMode={'tail'}
                          numberOfLines={2}
                          color="#305D62">
                          {moment(item.updatedAt).format('YYYY/MM/DD HH:mm:ss')}
                        </Text>
                      </VStack>
                    </HStack>
                    <HStack space={2} alignItems="center" flex={0.1}>
                      <Icon
                        as={Ionicons}
                        name="ellipse"
                        size="sm"
                        color="#569FA7"
                      />
                    </HStack>
                  </HStack>
                ))}
              </Stack>
            ) : (
              <LoadingScreen />
            )}
          </VStack>
        </ScrollView>
      </View>
    </View>
  );
};
export default () => {
  return (
    <NativeBaseProvider>
      <NotiList />
    </NativeBaseProvider>
  );
};
