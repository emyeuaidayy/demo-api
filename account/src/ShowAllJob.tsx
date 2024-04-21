import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const JobItem = ({ job }) => {

    
  const handleRegister = () => {
    // Thực hiện xử lý khi nút đăng ký được nhấn
    // Ví dụ: gửi yêu cầu lên server để đăng ký công việc, xử lý dữ liệu, vv.
  };

  return (
    <View style={styles.jobContainer}>
      <Text>{`UserID: ${job.userId}`}</Text>
      <Text>{`Price: ${job.price}`}</Text>
      <Text>{`Description: ${job.jobDecription}`}</Text>
      <Text>{`ID: ${job.id}`}</Text>
      <Text>{`Job Type: ${job.JobType}`}</Text>
      <Text>{`Job Name: ${job.JobName}`}</Text>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

const JobSelectionScreen = ({ jobs }) => {
  return (
    <View style={styles.container}>
      <Text>Thông tin công việc</Text>
      {jobs.map((job, index) => (
        <JobItem key={index} job={job} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jobContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  registerButton: {
    backgroundColor: '#3F51B5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 5,
  },
  registerButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default JobSelectionScreen;
