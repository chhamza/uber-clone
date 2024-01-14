import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import WelcomeScreen from '../screens/Welcome';
import SignInScreen from '../screens/SignIn';
import SignOutScreen from '../screens/SignUp';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={({ navigation }) => ({
            // headerTitle: (props) => <LogoTitle {...props} />,
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
                <Text style={ styles.loginButton}>Login</Text>
              </TouchableOpacity>
            ),
          })}
        />
        {/* <Stack.Screen name="Welcome" component={WelcomeScreen} /> */}
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Sign Up" component={SignOutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    loginButton: {
      flex: 1,
      backgroundColor: 'white', 
      padding: 8, 
      paddingLeft: 10,
      borderWidth: 1, 
      borderRadius: 10, 
      borderColor: 'gray', 
      justifyContent: 'center',
      alignItems: 'center', 
    }
  });
  