import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const SigninScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in as</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress = {()=> {(navigation.navigate('CustomerLogin'))}}>
          <Text style={styles.buttonText}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress = {()=> {(navigation.navigate('KitchenLogin'))}} >
          <Text style={styles.buttonText}>Kitchen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress = {()=> {(navigation.navigate('ChefLogin'))}}>
          <Text style={styles.buttonText}>Chef</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Rider</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FE724C',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default SigninScreen;
