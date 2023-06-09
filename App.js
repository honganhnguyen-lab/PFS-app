import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, StyleSheet, Image} from 'react-native';

import InitScreen from './screens/InitScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Home" component={InitScreen} /> */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// <NavigationContainer>
//   <Stack.Navigator>
//     <Stack.Screen name="Init" component={InitScreen} />
//     <Stack.Screen name="Login" component={LoginScreen} />;
//     <Stack.Screen name="Signup" component={SignUpScreen} />;
//   </Stack.Navigator>
// </NavigationContainer>
