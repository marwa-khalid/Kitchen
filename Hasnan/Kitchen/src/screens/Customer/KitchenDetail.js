import React, { useState, useEffect } from 'react';
import { View, Image, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const KitchenDetail = ({ route, navigation }) => {
  const { kitchen } = route.params;
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Fetch menu items for the kitchen from the API
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      // Make an API call to fetch menu items for the kitchen
      AsyncStorage.getItem("token")
      const response = await fetch(`http:localhost:3500/food`,  {headers: {"x-auth-token": token,}});
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.log('Error fetching menu items:', error);
    }
  };

  const addToCart = (menuItem) => {
    //cart logic
    console.log('Added to cart:', menuItem);
  };

  const renderMenuItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.menuItemContainer} onPress={() => addToCart(item)}>
        <Image style={styles.menuItemImage} source={{ uri: item.image }} />
        <View style={styles.menuItemInfo}>
          <Text style={styles.menuItemName}>{item.name}</Text>
          <Text style={styles.menuItemDescription}>{item.description}</Text>
          <Text style={styles.menuItemPrice}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Image style={styles.kitchenImage} source={{ uri: kitchen.image }} />
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMenuItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  kitchenImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  menuItemImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    marginRight: 12,
    borderRadius: 8,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  menuItemDescription: {
    marginBottom: 4,
    color: '#888',
  },
  menuItemPrice: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default KitchenDetail;
