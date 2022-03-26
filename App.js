import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import UserScreen from './Screens/UserScreen';
import EditScreen from './Screens/EditScreen';
import RegisterScreen from './Screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Users" component={UserScreen} />
        <Stack.Screen name="Edit" component={EditScreen} options={{ title: 'User Details' }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    // borderWidth: 1,
    width: '70%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttonWrapper: {
    marginVertical: 10,
    backgroundColor: '#9b59b6',
  },
  btnText: {
    fontSize: 16,
    padding: 10,
    paddingHorizontal: 15,
    color: '#ffffff',
  },
});
