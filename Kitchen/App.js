import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FoodScreen from './src/components/FoodScreen';
import AddFoodScreen from './src/components/AddFoodScreen';
import EditFoodScreen from './src/components/EditFoodScreen';
import DeleteFoodScreen from './src/components/DeleteFoodForm';
import KitchenLoginForm from './src/screens/KitchenLoginForm';
import KitchenRegisterForm from './src/screens/KitchenRegisterForm';
import Splash from "./src/screens/Splash"
import HomeScreen from './src/screens/HomeScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import ChefRegisterForm from './src/screens/ChefRegisterForm';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Splash}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="KitchenRegister" component={KitchenRegisterForm}/>
        <Stack.Screen name="ChefRegister" component={ChefRegisterForm}/>
        <Stack.Screen name="Signup" component={SignupScreen}/>
        <Stack.Screen name="Signin" component={SigninScreen}/>
        <Stack.Screen name="KitchenLogin" component={KitchenLoginForm}/>
        <Stack.Screen name="Welcome" component={FoodScreen} />
        <Stack.Screen name="AddFoodItem" component={AddFoodScreen} />
        <Stack.Screen name="EditFoodItem" component={EditFoodScreen} />
        <Stack.Screen name="DeleteFoodItem" component={DeleteFoodScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;