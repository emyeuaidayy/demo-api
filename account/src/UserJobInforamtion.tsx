import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import path from './setUp'; // Import the path
import { jwtDecode } from 'jwt-decode';

// Define JwtPayload interface before usage
interface JwtPayload {
  userId: string;
  accountId: string;
  _id : string
}

const BookingEmployee = () => {
  const [userInfo, setUserInfo] = useState<any>(null); // State to store user information

  useEffect(() => {
    showInformation(); // Fetch user information when component mounts
  }, []);

  const showInformation = async () => {
    try {
      const token = await AsyncStorage.getItem('userJob');

      if (!token) {
        console.error('Token is empty or null');
        return;
      }

      const decoded: JwtPayload = jwtDecode(token);
      const userId = decoded.userId;

      const query = `
        query GetUserById{
          getUserNamebyID(id: "${userId}") {
            phone
            name
            id
            gender
            email
            age
            address
          }
        }
      `;

      const variables = { userId };

      const response = await fetch(path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });

      const json = await response.json();
      const userData = json.data.getUserNamebyID;
      setUserInfo(userData);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleBookingPress = async () => {
    try {
      const token_user = await AsyncStorage.getItem('token');

      if (!token_user) {
        console.error('Token is empty or null');
        return;
      }

      const decoded: JwtPayload = jwtDecode(token_user);
      const customerId = decoded.accountId;
      console.log('customerID ' + customerId);

      const status = "unavailable";
      const token = await AsyncStorage.getItem('userJob');
      if (!token) {
        console.error('Token is empty or null');
        return;
      }
      const decodedUser: JwtPayload = jwtDecode(token);
      const job_id = decodedUser._id;
      console.log('user ' + decodedUser._id);

      const query = `
        mutation {
          jobStatusChange(input: {
            _id: "${job_id}",
            status: "${status}",
            customerId: "${customerId}"
          }) {
            status
            customerId
          }
        }
      `;

      const variables = {};

      const response = await fetch(path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });

      const json = await response.json();
      Alert.alert(
        'Success',
        'Book thành công!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
      console.log(json); // Handle the response as needed
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <View style={styles.container}>
      {userInfo ? (
        <>
          <Text style={styles.userName}>Nhân Viên {userInfo.name}</Text>
          <Text style={styles.userInfo}>Phone: {userInfo.phone}</Text>
          <Text style={styles.userInfo}>ID: {userInfo.id}</Text>
          <Text style={styles.userInfo}>Gender: {userInfo.gender}</Text>
          <Text style={styles.userInfo}>Email: {userInfo.email}</Text>
          <Text style={styles.userInfo}>Age: {userInfo.age}</Text>
          <Text style={styles.userInfo}>Address: {userInfo.address}</Text>
          <TouchableOpacity style={styles.bookingButton} onPress={handleBookingPress}>
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 10,
  },
  bookingButton: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default BookingEmployee;
