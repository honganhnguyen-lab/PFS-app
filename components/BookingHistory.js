import {
  Text,
  Divider,
  HStack,
  Button,
  VStack,
  Icon,
  Avatar,
  Stack,
  Badge,
  Input,
  View,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {appointmentStatus, defineCategory} from '../CommonType';
import Stars from 'react-native-stars';
import {useState} from 'react';
import Toast from 'react-native-toast-message';
import {axiosConfig, updateAppointment} from '../axios';

export default BookingHistory = ({listHistoryAppointment, isProvider}) => {
  const [ratingVal, setRatingVal] = useState(2.5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const onChangeComment = value => {
    setComment(value);
  };
  const updateRatingAppointment = async id => {
    setLoading(true);
    const setAPIData = {
      rating: ratingVal,
      comment: comment,
    };
    try {
      await axiosConfig.patch(`${updateAppointment}${id}`, setAPIData);
      Toast.show({
        type: 'success',
        text1: 'Thank you for your rating',
      });
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: err,
      });
    }
    setLoading(false);
  };
  return (
    <VStack w="100%" space={4}>
      {listHistoryAppointment &&
        listHistoryAppointment?.length > 0 &&
        listHistoryAppointment?.map(item => {
          const infoService = item?.serviceId ?? {};
          const infoProvider = item?.providerId ?? {};
          const infoUser = item?.userId ?? {};
          const renderStatusLabel = appointmentStatus.find(
            status => status.value === item.status,
          );
          const renderIcon = defineCategory.find(
            cate => cate.status === infoService.category,
          )?.icon;
          return (
            <VStack
              space={2}
              p={2}
              shadow={2}
              bg="white"
              rounded="lg"
              key={item._id}>
              <HStack pt={2} justifyContent="space-between">
                <HStack space={2}>
                  <Icon as={Ionicons} name="person-outline" size="md" />
                  <Text fontWeight={600} fontSize={16}>
                    {isProvider ? infoUser.name : infoProvider.name}
                  </Text>
                </HStack>
                <Badge
                  style={{width: 100, height: 30}}
                  colorScheme={renderStatusLabel.color}>
                  {renderStatusLabel.label}
                </Badge>
              </HStack>
              <HStack space={3} pt={2}>
                <Avatar
                  bg="#238793"
                  source={{
                    uri: infoService.picture,
                  }}
                />
                <VStack space={2}>
                  <Text fontWeight={600} fontSize={16}>
                    {infoService.title}
                  </Text>
                  <HStack
                    space={2}
                    justifyContent="flex-start"
                    alignItems="center">
                    <Icon as={Ionicons} name="cash" color="#316970" />
                    <Text
                      color="#6F767E"
                      fontSize={16}
                      fontWeight={600}
                      style={{textAlign: 'right'}}>
                      {item.totalPrice.toLocaleString()} đ
                    </Text>
                  </HStack>
                  <HStack
                    space={2}
                    justifyContent="flex-start"
                    alignItems="center">
                    <Icon as={Ionicons} name="location" color="#316970" />
                    <Text
                      color="#6F767E"
                      fontSize={16}
                      fontWeight={600}
                      style={{textAlign: 'right'}}>
                      70 Trung Van
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
              {!isProvider && (
                <>
                  <Divider
                    my="2"
                    _light={{
                      bg: 'muted.300',
                    }}
                    _dark={{
                      bg: 'muted.50',
                    }}
                  />
                  <HStack justifyContent="space-between" alignItems="center">
                    <HStack space={2}>
                      <Icon
                        as={Ionicons}
                        size={4}
                        name="star-sharp"
                        color="yellow.300"
                      />
                      <Text>{item.rating ?? 0}</Text>
                    </HStack>
                    <Button style={{backgroundColor: '#0f766e'}}>
                      <Text color={'white'} fontWeight={600}>
                        Re-schedule
                      </Text>
                    </Button>
                  </HStack>
                </>
              )}

              <Text fontSize={16} fontWeight={600}>
                {!item.rating ? 'Give rating && comment' : 'Your rating'}
              </Text>
              {!item.rating ? (
                <VStack justifyContent="flex-start">
                  <Stars
                    update={val => {
                      setRatingVal(val);
                    }}
                    default={2.5}
                    count={5}
                    half={true}
                    starSize={50}
                    fullStar={
                      <Icon
                        as={Ionicons}
                        name="star"
                        size="lg"
                        style={{color: '#FFC700'}}
                      />
                    }
                    emptyStar={
                      <Icon
                        as={Ionicons}
                        style={{color: '#FFC700'}}
                        name="star-outline"
                        size="lg"
                      />
                    }
                    halfStar={
                      <Icon
                        as={Ionicons}
                        style={{color: '#FFC700'}}
                        name="star-half"
                        size="lg"
                      />
                    }
                  />
                  <View mt={2}>
                    <Input
                      placeholder="Give comment"
                      value={comment}
                      size="lg"
                      onChangeText={onChangeComment}
                    />
                  </View>
                  <Button
                    mt={4}
                    mb={4}
                    isLoading={loading}
                    onPress={() => updateRatingAppointment(item._id)}>
                    <Text color={'white'} fontWeight={600}>
                      Rate this appointment
                    </Text>
                  </Button>
                </VStack>
              ) : (
                <Stars
                  display={Number(item.rating)}
                  count={5}
                  half={true}
                  starSize={50}
                  fullStar={
                    <Icon
                      as={Ionicons}
                      name="star"
                      size="lg"
                      style={{color: '#FFC700'}}
                    />
                  }
                  emptyStar={
                    <Icon
                      as={Ionicons}
                      style={{color: '#FFC700'}}
                      name="star-outline"
                      size="lg"
                    />
                  }
                  halfStar={
                    <Icon
                      as={Ionicons}
                      style={{color: '#FFC700'}}
                      name="star-half"
                      size="lg"
                    />
                  }
                />
              )}
            </VStack>
          );
        })}
    </VStack>
  );
};
