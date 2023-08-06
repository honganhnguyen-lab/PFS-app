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
  Modal,
  useDisclose,
  Actionsheet,
} from 'native-base';
import {styles} from '../style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Pressable} from 'react-native';
import {logOut} from '../redux/auth/authSlice';
import ImagePicker from 'react-native-image-crop-picker';
import {axiosConfig} from '../axios';
import Toast from 'react-native-toast-message';
import {Image} from 'react-native-svg';

const SkeletonLoading = () => {
  return (
    <Center w="100%" h="300">
      <VStack
        w="100%"
        h="100%"
        borderWidth="1"
        space={6}
        rounded="md"
        alignItems="center"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}>
        <Skeleton h="80" />
        <Skeleton
          borderWidth={1}
          borderColor="coolGray.200"
          endColor="warmGray.50"
          w="80"
          h="40"
          mt="-70"
        />

        <Skeleton.Text lines={3} alignItems="center" px="12" />
      </VStack>
    </Center>
  );
};

const UserProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [userDetail, setUserDetail] = useState({});
  const [avatar, setAvatar] = useState(userDetail ? userDetail.photo : '');
  const [profile, setProfile] = useState(userDetail ? userDetail.photo : '');
  const {isOpen, onOpen, onClose} = useDisclose();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const takePhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setAvatar(image);
      setShowModal(true);
      onClose();
    });
  };
  const choosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
    }).then(async image => {
      setShowModal(true);
      setAvatar(image.path);
    });
    onClose();
  };

  const uploadAvatar = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('avatar', {
      uri: avatar,
      type: 'image/*',
      name: `${userDetail?.name}-${userDetail.id}`,
    });
    try {
      const changeImageResult = await axiosConfig.post(
        `api/v1/users/upload-avatar/${userDetail.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      setProfile(changeImageResult.data.data.avatarUrl);
      Toast.show({
        type: 'success',
        text1: 'Updated success',
      });
      setShowModal(false);
    } catch (err) {
      console.log('error upload avatar', err);
      Toast.show({
        type: 'error',
        text1: err,
      });
    }
    setIsLoading(false);
  };
  const getDetailProfile = async () => {
    console.log(user.payload.id);
    try {
      const detailProfileUser = await axiosConfig.get(
        `api/v1/users/${user.payload.id}`,
      );
      const detail = detailProfileUser.data.data.user;
      setUserDetail(detail);
      setAvatar(detail ? detail.photo : '');
      setProfile(detail ? detail.photo : '');
      console.log(userDetail);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickLogOut = async () => {
    dispatch(logOut);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Login'}],
      }),
    );
    setUserDetail({});
  };

  useEffect(() => {
    getDetailProfile();
  }, [user]);

  return (
    <View style={styles.listServicesScreen}>
      {userDetail ? (
        <View mt={50}>
          <HStack space={2} alignItems="center" p={3}>
            <Divider bg="#87ADB2" thickness="4" mx="2" orientation="vertical" />
            <Heading>Profile</Heading>
          </HStack>
          <Center w="100%" shadow={2} bg="white" p={3} rounded="lg">
            <VStack space={3} justifyContent="center" alignItems="center">
              <Avatar
                bg="#238793"
                alignSelf="center"
                size="xl"
                source={{
                  uri: profile,
                }}
                onError={error => console.log('Error loading avatar:', error)}>
                {userDetail?.name?.charAt(0).toUpperCase() ?? 'PFS'}
                <Avatar.Badge bg="white">
                  <Pressable onPress={onOpen}>
                    <Center>
                      <Icon
                        as={Ionicons}
                        name="camera-outline"
                        size="sm"
                        color="#87ADB2"
                      />
                    </Center>
                  </Pressable>
                </Avatar.Badge>
              </Avatar>
              <Heading color="#87ADB2">{userDetail?.name}</Heading>
              <Text fontWeight="600" fontSize={16}>
                {userDetail?.phoneNumber}
              </Text>
            </VStack>
          </Center>
          <HStack space={2} mt={4} alignItems="center">
            <Text fontWeight="600" fontSize={14} color="#238793">
              GENERAL
            </Text>
          </HStack>
          <VStack space={1} mt={3} w="100%" shadow={2} bg="white">
            <HStack justifyContent="space-between" alignItems="center" p={3}>
              <HStack space={3} alignItems="center">
                <Icon
                  as={Ionicons}
                  name="pencil-sharp"
                  size="md"
                  color="#87ADB2"
                />
                <Text fontWeight={600} fontSize={14}>
                  Edit profile
                </Text>
              </HStack>
              <Icon
                as={Ionicons}
                name="chevron-forward-outline"
                size="md"
                color="#569FA7"
              />
            </HStack>
            <HStack justifyContent="space-between" alignItems="center" p={3}>
              <HStack space={3} alignItems="center">
                <Icon
                  as={Ionicons}
                  name="lock-open"
                  size="md"
                  color="#87ADB2"
                />
                <Text fontWeight={600} fontSize={14}>
                  Change password
                </Text>
              </HStack>
              <Icon
                as={Ionicons}
                name="chevron-forward-outline"
                size="md"
                color="#569FA7"
              />
            </HStack>
            <HStack justifyContent="space-between" alignItems="center" p={3}>
              <HStack space={3} alignItems="center">
                <Icon
                  as={Ionicons}
                  name="heart-circle-outline"
                  size="md"
                  color="#87ADB2"
                />
                <Text fontWeight={600} fontSize={14}>
                  Favorite service
                </Text>
              </HStack>
              <Icon
                as={Ionicons}
                name="chevron-forward-outline"
                size="md"
                color="#569FA7"
              />
            </HStack>
            <HStack justifyContent="space-between" alignItems="center" p={3}>
              <HStack space={3} alignItems="center">
                <Icon as={Ionicons} name="star" size="md" color="#87ADB2" />
                <Text fontWeight={600} fontSize={14}>
                  Rate us
                </Text>
              </HStack>
              <Icon
                as={Ionicons}
                name="chevron-forward-outline"
                size="md"
                color="#569FA7"
              />
            </HStack>
          </VStack>
          <HStack space={2} mt={4} alignItems="center">
            <Text fontWeight="600" fontSize={14} color="#238793">
              ABOUT APP
            </Text>
          </HStack>
          <VStack space={1} mt={3} w="100%" shadow={2} bg="white">
            <HStack justifyContent="space-between" alignItems="center" p={3}>
              <HStack space={3} alignItems="center">
                <Icon as={Ionicons} name="reader" size="md" color="#87ADB2" />
                <Text fontWeight={600} fontSize={14}>
                  Privacy Policy
                </Text>
              </HStack>
              <Icon
                as={Ionicons}
                name="chevron-forward-outline"
                size="md"
                color="#569FA7"
              />
            </HStack>
            <Pressable onPress={onClickLogOut}>
              <HStack justifyContent="space-between" alignItems="center" p={3}>
                <HStack space={3} alignItems="center">
                  <Icon
                    as={Ionicons}
                    name="log-out"
                    size="md"
                    color="#87ADB2"
                  />
                  <Text fontWeight={600} fontSize={14}>
                    Log out
                  </Text>
                </HStack>
                <Icon
                  as={Ionicons}
                  name="chevron-forward-outline"
                  size="md"
                  color="#569FA7"
                />
              </HStack>
            </Pressable>
          </VStack>
        </View>
      ) : (
        <SkeletonLoading />
      )}

      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
        <Actionsheet.Content borderTopRadius="0">
          <Actionsheet.Item alignItems={'center'}>
            <Button
              w={150}
              bgColor="#238793"
              fontSize={16}
              onPress={takePhoto}
              rounded="lg"
              leftIcon={<Icon as={Ionicons} name="camera-outline" size="sm" />}>
              <Text color="white" fontSize={14} fontWeight={600}>
                Take photo
              </Text>
            </Button>
          </Actionsheet.Item>
          <Actionsheet.Item alignItems={'center'}>
            <Button
              w={150}
              bgColor="#238793"
              fontSize={16}
              onPress={choosePhoto}
              rounded="lg"
              leftIcon={<Icon as={Ionicons} name="images-outline" size="sm" />}>
              <Text color="white" fontSize={14} fontWeight={600}>
                Choose photo
              </Text>
            </Button>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Change Avatar</Modal.Header>
          <Modal.Body>
            <Center>
              <Avatar
                source={{
                  uri: avatar,
                }}
                alt="Alternate Text"
                size="2xl"
              />
            </Center>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}>
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                isLoadingText="Upload"
                onPress={uploadAvatar}>
                Button
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};
export default () => {
  return (
    <NativeBaseProvider>
      <UserProfile />
    </NativeBaseProvider>
  );
};
