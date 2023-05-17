import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChefLoginForm = ({ navigation, userId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async() => {
    console.log("Email: " + email);
    const data = {
      email: email,
      password: password,
    };

    try{
      const res = await axios.post("http://localhost:3500/user/login", data);
      console.log(res.data);

      await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("userId", res.data.userId);
      console.log("Token stored");
      navigation.navigate("ChefScreen");
      
    }catch(err){
      console.log("error: " + err.message);

    }
  };

  // fetch("http://localhost:3500/user/login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // })
  //   .then((response) => response.json())
  //   .then((responseData) => {
  //     console.log(responseData);
  //     AsyncStorage.setItem("token", responseData.token).then(() => {
  //       console.log("Token stored");
  //     });

  //     navigation.navigate("Welcome");
  //   })
  //   .catch((error) => {
  //     console.error("Error logging in:", error);
  //   });
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder="Enter your password"
      />

      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity
        onPress={() => {
          {
            navigation.navigate("ChefRegister");
          }
        }}
      >
        <Text> New to Bawarchi? Register!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
});

export default ChefLoginForm;
