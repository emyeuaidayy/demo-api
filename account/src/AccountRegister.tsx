import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import path from './setUp'


const AccountRegister = ({navigation}) => {
  const [stateVariables, setStateVariables] = useState({
    username: '',
    password: '',
    name: '',
    nhaplaimatkhau: '',
    email: '',
    address: '',
    gender: '',
    age: '',
    phone: '',
  });

  const dangKy = async () => {
    // Kiểm tra xem mật khẩu có khớp không
    if (stateVariables.password !== stateVariables.nhaplaimatkhau) {
      alert('Mật khẩu không khớp');
      return;
    }

    const query = `
      mutation {
        registerAccount(input: {
          name: "${stateVariables.name}",
          password : "${stateVariables.password}",
          username :"${stateVariables.username}",
          email: "${stateVariables.email}",
          address: "${stateVariables.address}",
          gender: "${stateVariables.gender}",
          age: ${stateVariables.age},
          phone: "${stateVariables.phone}"
        }) {
          name
          password
          username
          email
          address
          gender
          age
          phone
        }
      }
    `;

    const variables = {};

    try {
      const res = await fetch(path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      const json = await res.json();
      console.log(json.data.registerAccount);
      Alert.alert(
        'Success',
        'Login successful!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
      
    } catch (error) {
      console.log(error);
    }
    


  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Đăng ký</Text>
      <TextInput
        style={{ width: 300, height: 40, borderWidth: 1, borderColor: '#ccc', padding: 5, marginVertical: 5 }}
        placeholder="Tên"
        value={stateVariables.name}
        onChangeText={(text) => setStateVariables({ ...stateVariables, name: text })}
      />
      <TextInput
        style={{ width: 300, height: 40, borderWidth: 1, borderColor: '#ccc', padding: 5, marginVertical: 5 }}
        placeholder="Tên đăng nhập"
        value={stateVariables.username}
        onChangeText={(text) => setStateVariables({ ...stateVariables, username: text })}
      />
      <TextInput
        style={{ width: 300, height: 40, borderWidth: 1, borderColor: '#ccc', padding: 5, marginVertical: 5 }}
        placeholder="Mật khẩu"
        value={stateVariables.password}
        onChangeText={(text) => setStateVariables({ ...stateVariables, password: text })}
        secureTextEntry={true}
      />
      <TextInput
        style={{ width: 300, height: 40, borderWidth: 1, borderColor: '#ccc', padding: 5, marginVertical: 5 }}
        placeholder="Nhập lại mật khẩu"
        value={stateVariables.nhaplaimatkhau}
        onChangeText={(text) => setStateVariables({ ...stateVariables, nhaplaimatkhau: text })}
        secureTextEntry={true}
      />
      <TextInput
        style={{ width: 300, height: 40, borderWidth: 1, borderColor: '#ccc', padding: 5, marginVertical: 5 }}
        placeholder="Email"
        value={stateVariables.email}
        onChangeText={(text) => setStateVariables({ ...stateVariables, email: text })}
      />
      <TextInput
        style={{ width: 300, height: 40, borderWidth: 1, borderColor: '#ccc', padding: 5, marginVertical: 5 }}
        placeholder="Địa chỉ"
        value={stateVariables.address}
        onChangeText={(text) => setStateVariables({ ...stateVariables, address: text })}
      />
      <TextInput
        style={{ width: 300, height: 40, borderWidth: 1, borderColor: '#ccc', padding: 5, marginVertical: 5 }}
        placeholder="Giới tính"
        value={stateVariables.gender}
        onChangeText={(text) => setStateVariables({ ...stateVariables, gender: text })}
      />
      <TextInput
        style={{ width: 300, height: 40, borderWidth: 1, borderColor: '#ccc', padding: 5, marginVertical: 5 }}
        placeholder="Tuổi"
        value={stateVariables.age}
        onChangeText={(text) => setStateVariables({ ...stateVariables, age: text })}
      />
      <TextInput
        style={{ width: 300, height: 40, borderWidth: 1, borderColor: '#ccc', padding: 5, marginVertical: 5 }}
        placeholder="Số điện thoại"
        value={stateVariables.phone}
        onChangeText={(text) => setStateVariables({ ...stateVariables, phone: text })}
      />
      <TouchableOpacity style={{ marginTop: 10 }} onPress={dangKy}>
        <Text style={{ fontSize: 18, color: 'blue' }}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountRegister;
