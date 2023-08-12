import {useEffect} from 'react';
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
import UserProfile from './screens/UserProfile';
import NotiList from './screens/NotiList';
import {useSelector} from 'react-redux';
import ProviderDashboardScreen from './screens/ProviderDashboard';
import ProviderListBooking from './screens/ProviderListBooking';
import ProviderServicesList from './screens/ProviderServicesList';
import AddNewService from './screens/AddNewService';
import ProceedScreen from './screens/ProceedScreen';
import UpdateService from './screens/UpdateService';
import OTPVerify from './screens/OTPVerify';
import {socket} from './socket';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTab = () => {
  const user = useSelector(state => state.auth.user);
  const userDetail = user.payload;

  useEffect(() => {
    globalThis.socket = socket.connect();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarInactiveTintColor: '#569FA7',
        tabBarActiveTintColor: '#569FA7',
      })}>
      <Tab.Screen
        name="Dashboard"
        component={
          userDetail?.role === 'provider'
            ? ProviderDashboardScreen
            : DashboardScreen
        }
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
        component={
          userDetail?.role === 'provider' ? ProviderListBooking : Booking
        }
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
        name="Services"
        component={
          userDetail?.role === 'provider' ? ProviderServicesList : ServicesList
        }
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
      <Tab.Screen
        name="Notification"
        component={NotiList}
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
        name="User"
        component={UserProfile}
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
    </Tab.Navigator>
  );
};

function App() {
  const user = useSelector(state => state.auth.user);
  const userDetail = user.payload;
  return (
    <>
      <NavigationContainer screenOptions={{unmountOnBlur: true}}>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={HomeTab}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="VerifyOTP"
            component={OTPVerify}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signup"
            component={SignUpScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Dashboard"
            component={
              userDetail?.role === 'provider'
                ? ProviderDashboardScreen
                : DashboardScreen
            }
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Services"
            component={
              userDetail?.role === 'provider'
                ? ProviderServicesList
                : ServicesList
            }
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Booking"
            component={
              userDetail?.role === 'provider' ? ProviderListBooking : Booking
            }
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Appointment"
            component={AppointmentDetail}
            options={{headerShown: false}}
            getId={({params}) => {
              return params;
            }}
          />
          <Stack.Screen
            name="List Provider"
            component={ChooseProvider}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="DetailProvider"
            component={DetailProvider}
            options={{headerShown: false}}
            getId={({params}) => {
              return params?.distance ?? '';
            }}
          />
          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NotiList"
            component={NotiList}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Add New Service"
            component={AddNewService}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="UpdateService"
            component={UpdateService}
            options={{headerShown: false}}
            getId={({params}) => {
              return params.screenId;
            }}
          />
          <Stack.Screen
            name="Proceed"
            component={ProceedScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
