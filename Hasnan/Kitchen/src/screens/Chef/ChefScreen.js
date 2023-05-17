import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ChefScreen = ({ navigation }) => {
  const [user,setChef] = useState([]);

  const getChef = async() => {
    console.log("get chef details called");

    try{
      const token = await AsyncStorage.getItem("token");
      const userId =await AsyncStorage.getItem("userId");
      
      const res = await axios.get(`http://localhost:3500/user/${userId}`, {headers: {"x-auth-token": token,}} );
      console.log(res.data);
      setChef(res.data);
      console.log("test")

    }catch(err){
      console.log(err);

    }
  };

  useEffect(()=>{
    (async()=>{
    await getChef();
    })()
    },[])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome</Text>
      <View style={styles.container}>
        <TouchableOpacity style={styles.foodItem}>
          <Image style={styles.foodImage} source={{ uri: user.image }}></Image>
          <Text style={styles.foodName}>{user.name}</Text>
          <Text style={styles.foodDescription}>{user.expertise}</Text>
          <Text style={styles.foodPrice}>{user.experience}</Text>
          <Text style={styles.foodPrice}>{user.phoneNumber}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  foodList: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  foodItem: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  foodImage: {
    width: 100,
    height: 100,
  },
  foodDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  fab: {
    bottom: 16,
    right: 0,
    backgroundColor: "#007AFF",
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
});

export default ChefScreen;
