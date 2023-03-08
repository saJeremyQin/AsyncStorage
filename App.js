import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login.js';
import Home from './screens/Home.js';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const Stack = createStackNavigator();


export default function App() {
  return (
    <Provider store={store} >
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
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
