import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login.js';
import Home from './screens/Home.js';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login" 
      >
        <Stack.Screen 
          name="Login" 
          component={Login}
          options={
            {
              headerShown:false
            }
          }
          />
        <Stack.Screen 
          name="Home" 
          component={Home}
          // options={
          //   {
          //     headerShown:false
          //   }
          // }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
