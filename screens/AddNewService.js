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

const AddNewService = () => {
  const takePhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImageUrl(image.path);
    });
  };
  const choosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
    }).then(async image => {
      setIsOpen(false);
      setImageUrl(image.path);
    });
  };

  const navigation = useNavigation();

  const createNewService = async values => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imageUrl,
        type: 'image/jpeg', // Change the mime type accordingly if needed
        name: values.title,
      });
      const updatedFormData = {...formData, values};
      const response = await axiosConfig.post(
        'api/v1/services',
        updatedFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Add the content type header for FormData
          },
        },
      );
      console.log('Upload success:', response.data);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const onClose = () => {
    setIsOpen(false);
  };
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
            Add New Service
          </Text>
        </View>
        <Divider bg="#F1F1F1" thickness="2" mx="2" />
        <ScrollView>
          <Formik
            initialValues={{
              category: '',
              title: '',
              description: '',
              image: '',
              price: '',
              priceDiscount: '',
              providerId: '6485d103e299ea61cf412742',
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
                  value={values.category}
                  onValueChange={handleChange('category')}
                  bgColor="#EEEEEE"
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
                  variant="filled"
                  bgColor="#EEEEEE"
                  size="2xl"
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
                  value={values.description}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  placeholder="Enter text..."
                  bgColor="#EEEEEE"
                  variant="filled"
                  size="lg"
                />
                <Text>Image</Text>
                <Pressable onPress={() => setIsOpen(true)}>
                  <Center
                    w="100%"
                    minHeight={20}
                    height="118px"
                    bg="#EEEEEE"
                    borderRadius="8px"
                    p={3}>
                    {imageUrl ? (
                      <Image
                        source={{
                          uri: imageUrl,
                        }}
                        alt="Alternate Text"
                        size="xl"
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
                  variant="filled"
                  bgColor="#EEEEEE"
                  size="2xl"
                  value={values.price}
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                  placeholder="Enter text..."
                />
                <Text>Price discount</Text>
                <Input
                  variant="filled"
                  bgColor="#EEEEEE"
                  size="2xl"
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
