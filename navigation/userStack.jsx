import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { getAuth, signOut } from 'firebase/auth'; 
import HomeScreen from '../screens/Home';
import MapScreen from '../screens/MapScreen';
import RideRequestScreen from '../screens/RideRequestScreen';

const Stack = createNativeStackNavigator();

export default function UserStack() {
    const { user } = useAuthentication();
    const auth = getAuth();

    const handleSignOut = async () => {
        try {
        await signOut(auth);
        // Handle any additional logic after signing out
        } catch (error) {
        console.error('Error signing out:', error.message);
        }
    };

    return (
        <NavigationContainer>
        <Stack.Navigator>
            {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={({ navigation }) => ({
                    // headerTitle: (props) => <LogoTitle {...props} />,
                    headerShown: true,
                    headerRight: () => (
                    <TouchableOpacity onPress={handleSignOut}>
                        <Text style={ styles.loginButton}>Logout</Text>
                    </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={({ navigation }) => ({
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name="RideRequestScreen"
                component={RideRequestScreen}
                options={({ navigation }) => ({
                    headerShown: true,
                })}
            />
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