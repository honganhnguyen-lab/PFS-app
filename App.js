import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import DashboardScreen from './screens/Dashboard';
import ServicesList from './screens/ServicesList';
import Booking from './screens/Booking';
import AppointmentDetail from './screens/AppointmentDetail';
import {SvgCss} from 'react-native-svg';
import {
  listIcon,
  calendarFilledIcon,
  calendarIcon,
  homeFilledIcon,
  homeIcon,
  listFilledIcon,
  notificationFilledIcon,
  notificationIcon,
  personFilledIcon,
  personIcon,
} from './assets/icon';
import ChooseProvider from './screens/ChooseProvider';
import DetailProvider from './screens/DetailProvider';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarInactiveTintColor: '#569FA7',
        tabBarActiveTintColor: '#569FA7',
      })}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={() => ({
          tabBarIcon: ({focused}) => (
            <SvgCss
              xml={focused ? homeFilledIcon : homeIcon}
              fill="#569FA7"
              color="#569FA7"
              fontSize="4"
              width={20}
              height={20}
            />
          ),
          tabBarLabelStyle: {
            color: '#569FA7',
            fontSize: 12,
            fontWeight: 600,
          },
          tabBarAllowFontScaling: false,
        })}
      />
      <Tab.Screen
        name="Booking"
        component={Booking}
        options={() => ({
          tabBarIcon: ({focused}) => (
            <SvgCss
              xml={focused ? calendarFilledIcon : calendarIcon}
              fill="#569FA7"
              color="#569FA7"
              fontSize="4"
              width={20}
              height={20}
            />
          ),
          tabBarLabelStyle: {
            color: '#569FA7',
            fontSize: 12,
            fontWeight: 600,
          },
          tabBarAllowFontScaling: false,
        })}
      />
      <Tab.Screen
        name="User"
        component={DashboardScreen}
        options={() => ({
          tabBarIcon: ({focused}) => (
            <SvgCss
              xml={focused ? personFilledIcon : personIcon}
              fill="#569FA7"
              color="#569FA7"
              width={20}
              height={20}
            />
          ),
          tabBarLabelStyle: {
            color: '#569FA7',
            fontSize: 12,
            fontWeight: 600,
          },
          tabBarAllowFontScaling: false,
        })}
      />
      <Tab.Screen
        name="Notification"
        component={DashboardScreen}
        options={() => ({
          tabBarIcon: ({focused}) => (
            <SvgCss
              xml={focused ? notificationFilledIcon : notificationIcon}
              fill="#569FA7"
              color="#569FA7"
              width={20}
              height={20}
            />
          ),
          tabBarLabelStyle: {
            color: '#569FA7',
            fontSize: 12,
            fontWeight: 600,
          },
          tabBarAllowFontScaling: false,
        })}
      />
      <Tab.Screen
        name="Services"
        component={ServicesList}
        options={() => ({
          tabBarIcon: ({focused}) => (
            <SvgCss
              xml={focused ? listFilledIcon : listIcon}
              fill="#569FA7"
              color="#569FA7"
              width={20}
              height={20}
            />
          ),
          tabBarLabelStyle: {
            color: '#569FA7',
            fontSize: 12,
            fontWeight: 600,
          },
          tabBarAllowFontScaling: false,
        })}
      />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="Home" component={InitScreen} /> */}
          {/* <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} /> */}
          <Stack.Screen
            name="Home"
            component={HomeTab}
            options={{headerShown: false}}
          />
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
          <Stack.Screen
            name="Appointment"
            component={AppointmentDetail}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProviderList"
            component={ChooseProvider}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DetailProvider"
            component={DetailProvider}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
