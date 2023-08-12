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
  Checkbox,
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

const AddNewService = () => {
  const takePhoto = () => {
    ImagePicker.openCamera({
      width: 800,
      height: 400,
      cropping: true,
    }).then(image => {
      setImageUrl(image.path);
    });
  };
  const choosePhoto = () => {
    ImagePicker.openPicker({
      width: 800,
      height: 400,
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
  const onClose = () => {
    setIsOpen(false);
  };
  const user = useSelector(state => state.auth.user);
  const userDetail = user.payload;
  const createNewService = async values => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', {
      uri: imageUrl,
      type: 'image/*',
      name: `${values.providerId} - ${values.title}`,
    });
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('category', Number(values.category));
    formData.append('price', values.price);
    formData.append('priceDiscount', values.priceDiscount);
    formData.append('providerId', values.providerId);
    try {
      const newService = await axiosConfig.post('api/v1/services', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Add the content type header for FormData
        },
      });
      const newServiceId = newService.data.data.service;

      await axiosConfig.patch(`api/v1/services/${newServiceId.id}`, {
        location: userDetail.location,
      });
      Toast.show({
        type: 'success',
        text1: 'Add new success',
      });
      navigation.navigate('Services');
    } catch (error) {
      console.error('Upload failed:', error.message);
      Toast.show({
        type: 'error',
        text1: error,
      });
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.listServicesScreen}>
      <View>
        <ScrollView>
          <Formik
            initialValues={{
              category: '',
              title: '',
              description: '',
              image: '',
              price: '',
              priceDiscount: '',
              providerId: userDetail.id,
            }}
            onSubmit={values => createNewService(values)}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <VStack space={3} mt={5}>
                <Text>Choose categories</Text>
                <Select
                  minWidth="200"
                  accessibilityLabel="Choose Service"
                  placeholder="Enter..."
                  size="xl"
                  fontSize={14}
                  padding={3}
                  variant="outline"
                  value={values.category}
                  onValueChange={handleChange('category')}
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size={2} />,
                  }}
                  mt="1">
                  <Select.Item label="Private Chef" value="0" />
                  <Select.Item label="Cleaning" value="1" />
                  <Select.Item label="AC Repair" value="2" />
                  <Select.Item label="Nanny" value="3" />
                  <Select.Item label="Tutor" value="4" />
                  <Select.Item label="Wifi Repair" value="5" />
                </Select>
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
                    minHeight={20}
                    height={170}
                    style={{
                      borderStyle: 'dashed',
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                    p={3}>
                    {imageUrl ? (
                      <Image
                        source={{
                          uri: imageUrl,
                        }}
                        alt="Alternate Text"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
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
                <Text>Price per hour</Text>
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
                <Text>Price discount per hour</Text>
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
                  isLoading={isLoading}
                  onPress={handleSubmit}
                  spinnerPlacement="end"
                  isLoadingText="Add new">
                  Submit
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

export default () => {
  return (
    <NativeBaseProvider>
      <AddNewService />
    </NativeBaseProvider>
  );
};
