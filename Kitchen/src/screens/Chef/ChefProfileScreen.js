import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const ChefProfileScreen = () => {
  const [expertise, setExpertise] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [availabilityHours, setAvailabilityHours] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleImagePick = () => {
    ImagePicker.showImagePicker((response) => {
      if (!response.didCancel && !response.error) {
        setProfileImage(response);
      }
    });
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('expertise', expertise);
    formData.append('workExperience', workExperience);
    formData.append('availabilityHours', availabilityHours);
    formData.append('profileImage', {
      uri: profileImage.uri,
      type: profileImage.type,
      name: profileImage.fileName,
    });

    axios.post('your-server-endpoint', formData)
      .then((response) => {
        console.log(response.data);
          navigation.navigate('ChefLogin');

      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      <TouchableOpacity onPress={handleImagePick}>
        {profileImage ? (
          <Image source={{ uri: profileImage.uri }} style={{ width: 150, height: 150, borderRadius: 75 }} />
        ) : (
          <Text>Select Profile Image</Text>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Expertise"
        value={expertise}
        onChangeText={setExpertise}
      />

      <TextInput
        placeholder="Work Experience"
        value={workExperience}
        onChangeText={setWorkExperience}
      />

      <View>
        <Text>Availability Hours:</Text>
        <Picker
          selectedValue={availabilityHours}
          onValueChange={setAvailabilityHours}
        >
          <Picker.Item label="Morning" value="Morning" />
          <Picker.Item label="Afternoon" value="Afternoon" />
          <Picker.Item label="Evening" value="Evening" />
        </Picker>
      </View>

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default ChefProfileScreen;
