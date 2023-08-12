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
  Select,
  CheckIcon,
  TextArea,
  Actionsheet,
  Image,
} from 'native-base';
import {styles} from '../style';
import {axiosConfig, bookingUri, uploadService} from '../axios';
import {useSelector, useDispatch} from 'react-redux';
import {setListAppointment} from '../redux/auth/bookingSlice';
import ImagePicker from 'react-native-image-crop-picker';
import {Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const UpdateService = ({route}) => {
  const user = useSelector(state => state.auth.user);
  const userDetail = user.payload;
  const screenId = route.params.serviceId;
  const takePhoto = () => {
    ImagePicker.openCamera({
      width: 1600,
      height: 900,
      cropping: true,
    }).then(image => {
      setImageUrl(image.path);
    });
  };
  const choosePhoto = () => {
    ImagePicker.openPicker({
      width: 1600,
      height: 900,
      cropping: true,
    }).then(async image => {
      setIsOpen(false);
      setImageUrl(image.path);
    });
  };

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [detailService, setDetailService] = useState({});
  const onClose = () => {
    setIsOpen(false);
  };
  const getDetailService = async () => {
    try {
      const detail = await axiosConfig.get(`api/v1/services/${screenId}`);
      setDetailService(detail.data.data.service);
    } catch (err) {
      console.log(err);
    }
  };

  const UpdateService = async values => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', {
      uri: imageUrl,
      type: 'image/*',
      name: `services=${screenId}`,
    });
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('category', values.category);
    formData.append('price', values.price);
    formData.append('priceDiscount', values.priceDiscount);
    formData.append('providerId', userDetail.id);
    try {
      await axiosConfig.patch(`api/v1/services/${screenId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Add the content type header for FormData
        },
      });

      Toast.show({
        type: 'success',
        text1: 'Updated success',
      });

      navigation.navigate('Home', {screen: 'Services'});
    } catch (error) {
      console.error('Upload failed:', error.message);
      Toast.show({
        type: 'error',
        text1: error,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getDetailService();
  }, [screenId]);

  useEffect(() => {
    setImageUrl(detailService?.picture ?? '');
  }, [detailService]);

  return (
    <View style={styles.listServicesScreen}>
      <View mt={50}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
            marginBottom: 10,
          }}>
          <Pressable
            onPress={() => navigation.navigate('Home')}
            style={{position: 'absolute', left: 0}}>
            <Icon size="6" as={Ionicons} name="arrow-back-outline" />
          </Pressable>

          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 600,
            }}>
            Update Service
          </Text>
        </View>
        <Divider bg="#F1F1F1" thickness="2" mx="2" />
        <ScrollView>
          <Formik
            enableReinitialize={true}
            initialValues={{
              category: detailService.category,
              title: detailService.title,
              description: detailService.description,
              price: `${detailService.price}`,
              priceDiscount: detailService.priceDiscount
                ? `${detailService.priceDiscount}`
                : '',
            }}
            onSubmit={values => UpdateService(values)}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <VStack space={3} mt={5}>
                <Text>Title</Text>
                <Input
                  variant="outline"
                  padding={3}
                  size="2xl"
                  fontSize={14}
                  value={values.title}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  p={2}
                  placeholder="Enter text..."
                />
                <Text>Description</Text>
                <TextArea
                  h={20}
                  totalLines={5}
                  fontSize={14}
                  padding={3}
                  value={values.description}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  placeholder="Enter text..."
                  variant="outline"
                  size="lg"
                />
                <Text>Image</Text>
                <Pressable onPress={() => setIsOpen(true)}>
                  <Center
                    w="100%"
                    // minHeight={20}
                    // height={170}
                    style={{
                      borderStyle: 'dashed',
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                    p={3}>
                    {imageUrl ? (
                      <Image
                        resizeMode="contain"
                        source={{
                          uri: imageUrl,
                        }}
                        alt="Alternate Text"
                        style={{
                          width: '100%',
                          height: 170,
                          // objectFit: 'cover',
                          borderRadius: 4,
                        }}
                      />
                    ) : (
                      <Center>
                        <Icon size="10" as={Ionicons} name="cloud-upload" />
                        <Text>Choose Image</Text>
                      </Center>
                    )}
                  </Center>
                </Pressable>
                <Text>Price</Text>
                <Input
                  variant="outline"
                  padding={3}
                  size="2xl"
                  fontSize={14}
                  value={values.price}
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                  placeholder="Enter text..."
                />
                <Text>Price discount</Text>
                <Input
                  variant="outline"
                  padding={3}
                  size="2xl"
                  fontSize={14}
                  value={values.priceDiscount}
                  onChangeText={handleChange('priceDiscount')}
                  onBlur={handleBlur('priceDiscount')}
                  placeholder="Enter text..."
                />
                <Button
                  mt="2"
                  bgColor="#559FA7"
                  rounded="xl"
                  size="lg"
                  onPress={handleSubmit}
                  spinnerPlacement="end"
                  isLoadingText="Sign in">
                  Update
                </Button>
              </VStack>
            )}
          </Formik>
        </ScrollView>
      </View>
      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
        <Actionsheet.Content borderTopRadius="0">
          <Actionsheet.Item alignItems={'center'}>
            <Button
              w={150}
              bgColor="#238793"
              fontSize={16}
              onPress={takePhoto}
              rounded="lg">
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
              rounded="lg">
              <Text color="white" fontSize={14} fontWeight={600}>
                Choose photo
              </Text>
            </Button>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};

export default ({route}) => {
  return (
    <NativeBaseProvider>
      <UpdateService route={route} />
    </NativeBaseProvider>
  );
};
