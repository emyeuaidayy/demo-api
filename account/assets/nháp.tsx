import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const JobSelectionScreen = ({ navigation }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobs, setShowJobs] = useState(true);
  const [jobTypes, setJobTypes] = useState([]);

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = async () => {
    try {
      const token = await AsyncStorage.getItem('job');
      
      const decoded  :JwtPayload=  jwtDecode(token) ;
      console.log(decoded);
      interface JwtPayload {
        jobId: string;
    }
      
      const jobId = decoded.jobId;

      const query = `
        query  {
          getJobbyId (id : "${jobId}"){
            jobType_6
            jobType_5
            jobType_4
            jobType_3
            jobType_2
            jobType_1
          }
        }
      `;

      const response = await fetch('http://10.10.2.22:3000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const json = await response.json();
      const jobTypesFromQuery = Object.values(json.data.getJobbyId);

      setJobTypes(jobTypesFromQuery);
    } catch (error) {
      console.error('Error fetching job types:', error);
    }
  };

  const handlePress = async () => {
    if (!selectedJob) {
      // Kiểm tra nếu không có công việc nào được chọn
      alert('Vui lòng chọn một loại công việc');
      return;
    }
    try {
    const query  = `
      query {
        getJobNameType(JobType: "${setSelectedJob}") {
          userId
          price
          jobDecription
          id
          JobType
          JobName
        }
      }
    
    `

    const response = await fetch('http://10.10.2.22:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    
    const json = await response.json();


  } catch (error) {
    console.error('Error fetching job types:', error);
  }


    // Thực hiện xử lý khi nút đăng ký được nhấn
    // Ví dụ: gửi yêu cầu lên server, xử lý dữ liệu, vv.

    // Sau khi xử lý thành công, bạn có thể chuyển hướng đến màn hình khác
    // navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
    <View>
      <Text>Booking Job</Text>
    </View>
    <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
      <Text style={styles.refreshButtonText}>Refresh</Text>
    </TouchableOpacity>
    {showJobs && (
      <View style={styles.jobsContainer}>
        {jobTypes.map((job, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.jobOption, selectedJob === job && styles.selectedJobOption]}
            onPress={() => setSelectedJob(job)}
          >
            <Text style={styles.jobText}>{job}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )}
    <TouchableOpacity style={styles.registerButton} onPress={handlePress}>
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
refreshButton: {
  backgroundColor: '#3F51B5',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 10,
  marginBottom: 10,
},
refreshButtonText: {
  fontSize: 16,
  color: '#fff',
},
jobsContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 20,
},
jobOption: {
  backgroundColor: '#ccc',
  borderRadius: 20,
  width: 100,
  height: 60,
  margin: 5,
  justifyContent: 'center',
  alignItems: 'center',
},
selectedJobOption: {
  backgroundColor: '#3F51B5',
},
jobText: {
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