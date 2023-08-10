import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Center, Box, NativeBaseProvider, Text, Link, Button} from 'native-base';
import {useState} from 'react';
import {StyleSheet} from 'react-native';

const OtpVerify = () => {
  const [code, setCode] = useState('');
  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="xl">
        <Text fontSize={20} color="#559FA7" fontWeight={600}>
          Verify Authentication OTP
        </Text>
        <OTPInputView
          flex={1}
          style={{
            width: '90%',
            height: 200,
            margin: 6,
            color: 'black',
          }}
          pinCount={6}
          code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={code => setCode(code)}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />
        <Link
          _text={{
            color: 'grey',
            fontSize: 14,
            marginBottom: 5,
          }}>
          Resend OTP
        </Link>

        <Button mt={3} bgColor="#238793" rounded="xl" size="lg">
          Verify
        </Button>
      </Box>
    </Center>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <OtpVerify />
      </Center>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#03DAC6',
  },

  underlineStyleHighLighted: {
    borderColor: '#559FA7',
  },
});
