import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import "core-js/stable/atob";
import path from './setUp';

interface StateVariables {
  JobDecription: string;
  price: string;
  selectedJob: string;
  jobType: string;
  showJobs: boolean;
}

interface Work {
  name: string;
}

const JobRegistration = () => {
  const [stateVariables, setStateVariables] = useState<StateVariables>({
    JobDecription: '',
    price: '',
    selectedJob: '',
    jobType: '',
    showJobs: false,
  });
  const [works, setWorks] = useState<Work[]>([]);

  useEffect(() => {
    getAllWorks();
  }, []);

  const getAllWorks = async () => {
    try {
      const query = `
        query {
          getAllWorks {
            name
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
      const fetchedWorks = json.data.getAllWorks;
      setWorks(fetchedWorks);
    } catch (error) {
      console.error('Error fetching works:', error);
    }
  };


  const handleLogin = async () => {
    interface JwtPayload {
      accountId: string;
    }

    const status = 'available';
    const customerId  = 'null'


    const token = await AsyncStorage.getItem('token');
    const decoded: JwtPayload = jwtDecode(token);
    console.log(decoded);
    const accountId = decoded.accountId;
    const query = `
    mutation {
        jobRegistion(input: {
            jobDecription: "${stateVariables.JobDecription}",
            price : "${stateVariables.price}",
            JobName :"${stateVariables.selectedJob}",
            JobType: "${stateVariables.jobType}",
            userId : "${accountId}",
            status : "${status}"
            customerId : "${customerId}"
      }) {
        jobDecription
        price
        JobName
        JobType
        userId
        status
        customerId
        
      }
    }
  `;

    const variables = {};

    try {
      const res = await fetch(path, {
        method: 'POST',
        headers: {
          // 'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      Alert.alert(
        'Success',
        'Login successful!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );

      const json = await res.json();
      console.log(json.data.jobRegistion);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headers} />
      <Text style={styles.title}>Job Registration</Text>

      <TextInput
        style={styles.input}
        placeholder="Job Decription"
        value={stateVariables.JobDecription}
        onChangeText={text => setStateVariables({ ...stateVariables, JobDecription: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        value={stateVariables.price}
        onChangeText={text => setStateVariables({ ...stateVariables, price: text })}
      />

      <TouchableOpacity style={styles.jobButton} onPress={() => setStateVariables({ ...stateVariables, showJobs: !stateVariables.showJobs })}>
        <Text style={styles.jobButtonText}>Select Job</Text>
      </TouchableOpacity>

      {stateVariables.showJobs && (
        <View style={styles.jobsContainer}>
          {works.map((work, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.jobOption, stateVariables.selectedJob === work.name && styles.selectedJobOption]}
              onPress={() => setStateVariables({ ...stateVariables, selectedJob: work.name })}
            >
              <Text style={styles.jobText}>{work.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Job Type"
        value={stateVariables.jobType}
        onChangeText={text => setStateVariables({ ...stateVariables, jobType: text })}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleLogin}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  headers: {
    height: '10%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  jobButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  jobButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  jobsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  jobOption: {
    backgroundColor: '#c0c0c0',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  selectedJobOption: {
    backgroundColor: '#808080',
  },
  jobText: {
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: 'blue',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default JobRegistration;