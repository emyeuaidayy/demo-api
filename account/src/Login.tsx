import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import path from './setUp';

const AccountRegister = ({ navigation }) => {
  const [stateVariables, setStateVariables] = useState({
    username: '',
    password: '',
  });



  
  const handleRegister = async () => {
    const query = `
      mutation {
        login(input: {
          username: "${stateVariables.username}",
          password: "${stateVariables.password}"
        }) {
          token
        }
      }
    `;

    try {
      const res = await fetch(path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
        }),
      });

      const json = await res.json();
      if (!json.errors) {
        const token = json.data.login.token;
        const decoded = jwtDecode(token);

        // Lưu trữ token vào AsyncStorage
        await AsyncStorage.setItem('token', token);

   

        Alert.alert(
          'Success',
          'Login successful!',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          'Error',
          'Failed to login. Please check your credentials.',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false }
        );
      }
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('AccountRegister');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        onChangeText={(text) => setStateVariables({ ...stateVariables, username: text })}
        value={stateVariables.username}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        onChangeText={(text) => setStateVariables({ ...stateVariables, password: text })}
        value={stateVariables.password}
        secureTextEntry
      />
      <Button title="Đăng Nhập" onPress={handleRegister} />
      <TouchableOpacity style={styles.signUp} onPress={handleSignUp}>
        <Text style={styles.signUpText}>Đăng ký tài khoản mới</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  signUp: {
    marginTop: 20,
  },
  signUpText: {
    color: 'blue',
    fontSize: 16,
  },
});

export default AccountRegister;
