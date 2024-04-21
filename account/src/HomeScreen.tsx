import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import jwt_decode, { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import path from './setUp'

const HomeScreen = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [sliders, setSliders] = useState([]); 
   const [latestJobs, setLatestJobs] = useState([]);
   const [selectedWork, setSelectedWork] = useState(null);

  useEffect(() => {
    showInformation();
    getAllcategory();
    getAllSlider(); 
     getLastestJob();
  }, []);

  interface JwtPayload {
    accountId: string;
  }


  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('token' , );
      console.log('Token removed successfully');
      navigation.navigate ('Login')
    } catch (error) {
      console.error('Error removing token:', error);
      // Xử lý lỗi nếu cần
    }
  };

  const showInformation = async () => {
    const token = await AsyncStorage.getItem('token')
    const decoded: JwtPayload = jwtDecode(token);

    const accountId = decoded.accountId;
    console.log(accountId)
    try {
      const query = `
        query {
          getUserNamebyID(id: "${accountId}") {
            name
            id
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
      const userName = json.data.getUserNamebyID.name;
      const userId = json.data.getUserNamebyID.id;
      setName(userName);
      setUserId(userId);
    } catch (error) {
      console.error('Error fetching name:', error);
    }
  };

  const getAllcategory = async () => {
    try {
      const query = `
        query {
          getIconMainScreen(showIn : "MainScreen" ) {
            showIn
            name
            data
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
      const icons = json.data.getIconMainScreen;
  
      if (Array.isArray(icons)) {
        const updatedCategories = icons.map(icon => ({
          title: icon.name,
          onPress: () => console.log(`${icon.name} pressed`),
          imageBase64: `data:image/jpeg;base64,${icon.data}`,
        }));
        setCategories(updatedCategories);
      } else {
        console.error('Icons data is not an array:', icons);
      }
    } catch (error) {
      console.error('Error fetching icons:', error);
    }
  };

  const getAllSlider = async () => {
    try {
      const query = `
        query {
          getIconMainScreen(showIn: "Slider") {
            showIn
            name
            data
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
      const slidersData = json.data.getIconMainScreen;

      if (Array.isArray(slidersData)) {
        const updatedSliders = slidersData.map(slider => ({
          title: slider.name,
          onPress: () => console.log(`${slider.name} pressed`),
          imageBase64: `data:image/jpeg;base64,${slider.data}`,
        }));
        setSliders(updatedSliders);
      } else {
        console.error('Slider data is not an array:', slidersData);
      }
    } catch (error) {
      console.error('Error fetching sliders:', error);
    }
  };

  const getLastestJob = async () => {
    try {
      const query = `
        query{
          getLastestJob(status: "available") {
            price
            jobDecription
            customerId
            _id
            JobType
            JobName
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
      const latestJobsData = json.data.getLastestJob;

      setLatestJobs(latestJobsData);
    } catch (error) {
      console.error('Error fetching latest jobs:', error);
    }
  };
 

  const HandleCategoryPress = async (categoryName) => {
    console.log('Category pressed:', categoryName);
  
    const query = `
      mutation {
        chooseWork(input: { name : "${categoryName}"}) {
          token
        }
      }
    `;
    
    const variables = { };
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
    
      if (!json.errors) {
        console.log('Success:', json.data.chooseWork);
        const token = json.data.chooseWork.token;
    
        const decoded = jwtDecode(token);
        console.log(decoded);
        
        // Lưu trữ token vào AsyncStorage
        await AsyncStorage.setItem('job', token);
  
        // Navigate to the next screen
        navigation.navigate('BookingJob2');
      } else {
        // Handle errors from mutation
        console.error('Mutation error:', json.errors);
        // Display an error message to the user if needed
      }
    } catch (error) {
      // Handle fetch or other errors
      console.error('Error:', error);
      // Display an error message to the user if needed
    }
};

const handleLastestJobPress = async (job) => {
  const query = `
    mutation {
      jobBookingGet(input: {
        _id: "${job._id}"
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
      console.log('Success:', json.data.jobBookingGet);
      const token = json.data.jobBookingGet.token;

      const decoded = jwtDecode(token);
      console.log(decoded);

      // Store token in AsyncStorage
      navigation.navigate('UserJobInformation')

      // Lưu trữ token vào AsyncStorage
      await AsyncStorage.setItem('userJob', token);
    } else {
      // Handle errors from mutation
      console.error('Mutation error:', json.errors);
      // Display an error message to the user if needed
    }
  } catch (error) {
    // Handle fetch or other errors
    console.error('Error:', error);
    // Display an error message to the user if needed
  }
};

  
  const goToJobRegistration = () => {
    navigation.navigate('JobRegistion');
  };

  const goToBooking = () => {
    navigation.navigate('BookingJob');
  };

  const goToBooked = () => {
    navigation.navigate('JobBooked');
  };

  const goToYourJob = () => {
    navigation.navigate('YourJob');
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
    
        <Text style={styles.title}>Welcome to Home Screen</Text>
        <Text style={styles.infoText}>User ID: {userId}</Text>
        <Text style={styles.infoText}>Name: {name}</Text>
        <Button title="đăng xuất" onPress={removeToken} />

        <ScrollView horizontal contentContainerStyle={styles.sliderContainer}>
          {sliders.map((slider, index) => (
            <TouchableOpacity key={index} style={styles.sliderItem} onPress={slider.onPress}>
              <Image source={{ uri: slider.imageBase64 }} style={styles.sliderImage} />
              <Text style={styles.sliderTitle}>{slider.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView horizontal contentContainerStyle={styles.categoriesContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.categoryItem} 
                onPress={() => HandleCategoryPress(category.title)}
              >
                <Image source={{ uri: category.imageBase64 }} style={styles.categoryImage} />
                <Text style={styles.categoryTitle}>{category.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>


          <ScrollView horizontal contentContainerStyle={styles.latestJobsContainer}>
  {latestJobs.map((job, index) => (
    <TouchableOpacity key={index} style={styles.latestJobItem} onPress={() => handleLastestJobPress(job)}>
      <Text style={styles.latestJobTitle}>{job.JobName}</Text>
      <Text>{job.jobDecription}</Text>
      <Text>{job.price}</Text>
    </TouchableOpacity>
  ))}
</ScrollView>


        <View style={styles.buttonContainer}>
          <Button title="Job Register" onPress={goToJobRegistration} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Job Booked" onPress={goToBooked} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Your Job" onPress={goToYourJob} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Job Booking" onPress={goToBooking} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
    width: '70%',
  },
  categoriesContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 10,
  },
  categoryImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  categoryTitle: {
    marginTop: 5,
  },
  sliderContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  sliderItem: {
    alignItems: 'center',
    marginRight: 10,
  },
  sliderImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  sliderTitle: {
    marginTop: 5,
  }, 
  latestJobsContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
    flexDirection: 'row', // Sắp xếp các công việc mới nhất theo chiều ngang
  },
  latestJobItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 10, // Khoảng cách giữa các công việc mới nhất
  },
  latestJobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default HomeScreen;
