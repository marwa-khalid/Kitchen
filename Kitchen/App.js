import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FoodScreen from './src/components/FoodScreen';
import AddFoodScreen from './src/components/AddFoodScreen';
import EditFoodScreen from './src/components/EditFoodScreen';
import DeleteFoodScreen from './src/components/DeleteFoodForm';
import ChefLoginForm from './src/screens/ChefLoginForm';
import ChefRegisterForm from './src/screens/ChefRegisterForm';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={ChefRegisterForm}/>
        <Stack.Screen name="Login" component={ChefLoginForm}/>
        <Stack.Screen name="Welcome" component={FoodScreen} />
        <Stack.Screen name="AddFoodItem" component={AddFoodScreen} />
        <Stack.Screen name="EditFoodItem" component={EditFoodScreen} />
        <Stack.Screen name="DeleteFoodItem" component={DeleteFoodScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;