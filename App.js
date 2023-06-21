import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import DashboardScreen from './screens/Dashboard';
import ServicesList from './screens/ServicesList';
import Booking from './screens/Booking';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="Home" component={InitScreen} /> */}
          {/* <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} /> */}
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Services"
            component={ServicesList}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Booking"
            component={Booking}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
