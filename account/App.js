import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AccountRegister from './src/AccountRegister'
import Login from './src/Login'
import JobRegistion from './src/JobRegistion'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen';
import BookingJob from './src/BookingJob'
import BookingJob2 from './src/BookingJob2'
import UserJobInformation from './src/UserJobInforamtion'
import JobBooked from './src/JobBooked'
import canceJob from './src/canceJob'
import YourJob from './src/YourJob'
import deleteJob from './src/deleteJob'

// import JobRegistion from './src/JobRegistion'


const Stack = createStackNavigator()

export default function App() {
  return (
    // <AccountRegister></AccountRegister>
    // <Login></Login>
    // <JobRegistion></JobRegistion>
    // <BookingJob></BookingJob>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name = 'JobRegistion' component={JobRegistion}/>
      <Stack.Screen name  = 'AccountRegister' component={AccountRegister} />
       <Stack.Screen name  = 'BookingJob' component={BookingJob} />
       <Stack.Screen name  = 'BookingJob2' component={BookingJob2} />
       <Stack.Screen name = 'JobBooked' component={ JobBooked} />
       <Stack.Screen name = 'UserJobInformation' component={UserJobInformation} />
       <Stack.Screen name = 'canceJob' component={canceJob} />
       <Stack.Screen name = 'YourJob' component={ YourJob} />
       <Stack.Screen name = 'deleteJob' component={ deleteJob} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
