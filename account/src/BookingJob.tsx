import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import jwt_decode, { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import path from './setUp'

const JobSelectionScreen = ({ navigation }) => {
  const [selectedWork, setSelectedWork] = useState(null);
  const [works, setWorks] = useState([]);

  useEffect(() => {
    getAllWorks();
  }, []);
  
  const getAllWorks = async () => {
    try {
      const query = `
        query {
          getAllWorks {
           
            name
            icon {
              data
            }
          }
        }
      `;
      const response = await fetch(path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const json = await response.json();
      const works = json.data.getAllWorks;
      setWorks(works);
    } catch (error) {
      console.error('Error fetching works:', error);
    }
  };
  const HandlePress = async () => {
    const query = `
      mutation {
        chooseWork(input: {name : "${selectedWork}"}) {
          token
        }
      }
    `;
  
    const variables = {};
    try {
      const res = await fetch( path, {
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
  
      if (!json.errors) {
        // Phản hồi thành công
        console.log('Success:', json.data.chooseWork);
        const token = json.data.chooseWork.token;
  
        const decoded = jwtDecode(token);
        console.log(decoded);
        navigation.navigate('BookingJob2')
        
        // Lưu trữ token vào AsyncStorage
        await AsyncStorage.setItem('job', token);
  
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View>
        <Text>Booking Job</Text>
      </View>
      <View style={styles.worksContainer}>
        {works.map((work) => (
          <TouchableOpacity
            key={work.name}
            style={[styles.workOption, selectedWork === work.name && styles.selectedWorkOption]}
            onPress={() => setSelectedWork(work.name)}
          >
            <Image
              source={{ uri: `data:image/jpeg;base64,${work.icon.data}` }}
              style={styles.workIcon}
            />
            <Text style={styles.workText}>{work.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={HandlePress}>
        <Text style={styles.registerButtonText}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  worksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  workOption: {
    alignItems: 'center',
    margin: 5,
  },
  selectedWorkOption: {
    backgroundColor: '#3F51B5',
  },
  workIcon: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 30,
  },
  workText: {
    fontSize: 16,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#3F51B5',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  registerButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default JobSelectionScreen;