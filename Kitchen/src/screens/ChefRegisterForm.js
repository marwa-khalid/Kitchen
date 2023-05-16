import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const registerChef = async (chefData) => {
  try {
    const response = await axios.post('http://localhost:3500/food/register', chefData);
    console.log(response.data); 

  } catch (error) {
    console.log('Error registering chef:', error);
    // Handle the error appropriately
  }
};
const ChefRegisterForm = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
  
    const handleRegistration = () => {
      const chefData = {
        fullName,
        email,
        address,
        phoneNumber,
        password,
        userType: 'chef',
      };
  
      registerChef(chefData);
    };
  
    return (
      <View>
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Register" onPress={handleRegistration} />
      </View>
    );
  };
  
  export default ChefRegisterForm;
  