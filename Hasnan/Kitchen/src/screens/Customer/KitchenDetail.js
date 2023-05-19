import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const KitchenDetailScreen = ({ route }) => {
  const [kitchen, setKitchen] = useState(null);
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    fetchKitchenDetail();
  }, []);

  const fetchKitchenDetail = async () => {
    const kitchenId = route.params.kitchenId;
    try {
      const response = await axios.get(`http://localhost:3500/kitchen/${kitchenId}`);
      const { kitchen, foodItems } = response.data;
      setKitchen(kitchen);
      setFoodItems(foodItems);
    } catch (error) {
      console.log('Error fetching kitchen detail:', error);
    }
  };

  if (!kitchen) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.kitchenName}>{kitchen.fullName}</Text>
      <Text style={styles.kitchenCuisine}>{kitchen.expertise}</Text>
      <Text style={styles.kitchenAddress}>{kitchen.address}</Text>
      // Render food items here using the 'foodItems' state
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kitchenName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  kitchenCuisine: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  kitchenAddress: {
    fontSize: 14,
    color: '#888',
  },
});

export default KitchenDetailScreen;
