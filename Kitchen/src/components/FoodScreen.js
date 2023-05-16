import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { Image } from 'react-native-elements';

const FoodScreen = ({ navigation }) => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    // Fetch the list of Foods from the server
    fetch('http://localhost:3500/food')
      .then(response => response.json())
      .then(data => setFoods(data))
      .catch(error => console.error(error));
  }, []);

  const handleAddFood = () => {
    navigation.navigate('AddFoodItem');
  };

  const renderFoodItem = ({ item:food }) => {
    return (
      <TouchableOpacity style={styles.foodItem}>
        <Image style={styles.foodImage} source={{uri:food.image}}></Image>
        <Text style={styles.foodName}>{food.name}</Text>
        <Text style={styles.foodDescription}>{food.description}</Text>
        <Text style={styles.foodPrice}>Rs.{food.price.toFixed(2)}</Text>
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
          <Button title="Edit" onPress = {()=>{navigation.navigate("EditFoodItem",food._id)}}/>
          <Button title="Delete" onPress = {()=>{navigation.navigate("DeleteFoodItem",food._id)}}/>
        </View>
      </TouchableOpacity>
    );
  };

  return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Food items in your Kitchen</Text>
    <View style={styles.container}>
      <FlatList
        data={foods}
        renderItem={renderFoodItem}
        keyExtractor={food => food._id}
        contentContainerStyle={styles.foodList}
      />
      <TouchableOpacity style={styles.fab} onPress={handleAddFood}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  foodList: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  foodItem: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  foodImage: {
    width: 100,
    height: 100
  },
  foodDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#007AFF',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
});

export default FoodScreen;
