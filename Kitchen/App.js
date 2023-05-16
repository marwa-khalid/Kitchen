import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FoodScreen from './src/components/FoodScreen';
import AddFoodScreen from './src/components/AddFoodScreen';
import EditFoodScreen from './src/components/EditFoodScreen';
import DeleteFoodScreen from './src/components/DeleteFoodForm';
import Splash from "./src/screens/Splash"
import HomeScreen from './src/screens/HomeScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import ChefRegisterForm from './src/screens/ChefRegisterForm';
import ChefLoginForm from './src/screens/ChefLoginForm';
import KitchenLoginForm from './src/screens/KitchenLoginForm';
import KitchenRegisterForm from './src/screens/KitchenRegisterForm';
import CustomerLoginForm from './src/screens/CustomerLoginFor.';
import CustomerRegisterForm from './src/screens/CustomerRegisterForm';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Splash}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Signup" component={SignupScreen}/>
        <Stack.Screen name="Signin" component={SigninScreen}/>
        <Stack.Screen name="Welcome" component={FoodScreen} />
        <Stack.Screen name="KitchenRegister" component={KitchenRegisterForm}/>
        <Stack.Screen name="KitchenLogin" component={KitchenLoginForm}/>
        <Stack.Screen name="ChefRegister" component={ChefRegisterForm}/>
        <Stack.Screen name="ChefLogin" component={ChefLoginForm}/>
        <Stack.Screen name="CustomerRegister" component={CustomerRegisterForm}/>
        <Stack.Screen name="CustomerLogin" component={CustomerLoginForm}/>
        <Stack.Screen name="AddFoodItem" component={AddFoodScreen} />
        <Stack.Screen name="EditFoodItem" component={EditFoodScreen} />
        <Stack.Screen name="DeleteFoodItem" component={DeleteFoodScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;