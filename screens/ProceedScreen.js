import {View, Text, StyleSheet, Image, Linking} from 'react-native';
import {WebView} from 'react-native-webview';
import {axiosConfig, getTransaction} from '../axios';
import {
  Center,
  Divider,
  HStack,
  Heading,
  NativeBaseProvider,
  Spinner,
} from 'native-base';
import {useSelector} from 'react-redux';
import {useEffect, useRef, useState} from 'react';
import {styles} from '../style';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Example = () => {
  return (
    <HStack space={8} justifyContent="center" alignItems="center">
      <Spinner size="lg" />
    </HStack>
  );
};

const ProceedScreen = () => {
  const price = useSelector(state => state.appointment.price);
  const [transUrl, setTransUrl] = useState('');
  const navigation = useNavigation();
  const {width} = Dimensions.get('window');
  const getTransactionUrl = async () => {
    try {
      const response = await axiosConfig.post(getTransaction, {
        amount: Number(price?.payload) ?? 0,
        bankCode: 'VNBANK',
        language: 'vn',
      });
      setTransUrl(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTransactionUrl();
  }, []);

  const webViewRef = useRef(null);
  const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(JSON.stringify({message : "Rollback"}));
})();`;

  const handleMessage = event => {
    const message = event.nativeEvent.title;
    if (message === 'Payment Result') {
      setTimeout(() => {
        navigation.navigate('Home');
      }, 5000);
    }
  };

  return (
    <View style={styles.transactionScreen}>
      <Center w="100%" shadow={2} bg="white" p={3} rounded="lg">
        {!transUrl ? (
          <Example />
        ) : (
          <View width="100%" height="100%">
            <WebView
              injectedJavaScript={INJECTED_JAVASCRIPT}
              onMessage={handleMessage}
              source={{uri: transUrl}}
              style={{flex: 1}}
            />
          </View>
        )}
      </Center>
    </View>
  );
};
export default () => {
  return (
    <NativeBaseProvider>
      <ProceedScreen />
    </NativeBaseProvider>
  );
};
