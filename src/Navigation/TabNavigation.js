import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Home/Home';
import { Icon } from 'react-native-elements';


function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Remove header
        tabBarActiveTintColor: '#6D38C3', // Color of active label and icon
        tabBarInactiveTintColor: 'gray', // Color of inactive label and icon
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarIconStyle: {
          marginTop: 5, // Adjust spacing if needed
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF', // Set the background color of the tab bar
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingBottom: 10,
          height: 65,
          elevation: 2,
          borderTopWidth: 2,
          borderWidth:2,
          borderColor: '#e0e0e0',
          overflow: 'hidden', // Clip the content to the border radius
          position: 'absolute', // Position it at the bottom
          left: 0,
          right: 0,
          bottom: 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon
              name="home-outline"
              type="ionicon"
              color={'#696969'}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({color, size}) => (
            <Icon
              name="bag-outline"
              type="ionicon"
              color={'#696969'}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({color, size}) => (
            <Icon
              name="chatbubbles-outline"
              type="ionicon"
              color={'#696969'}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({color, size}) => (
            <Icon
              name="person-circle-outline"
              type="ionicon"
              color={'#696969'}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
