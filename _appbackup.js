import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import Header from './components/Header';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ padding: 10, fontSize: 20 }}>Welcome to Catering Services</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

function LoginScreen({ navigation }) {
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic using the password state
    console.log('Login with password:', password);
  };

  return (
    <SafeAreaView style={styles.loginScreen}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeUsername}
        value={username}
        placeholder="Username"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleLogin}>
        <Text style={ styles.submitButton }>Login</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 10 }}>Register?</Text>
    </SafeAreaView>
  );
}

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('./assets/favicon.png')}
    />
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            // headerTitle: (props) => <LogoTitle {...props} />,
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={ styles.loginButton}>Login</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
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
  },
  loginScreen: {
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  submitButton: {
    paddingTop: 10,
    paddingRight: 0,
    paddingBottom: 10,
    paddingLeft: 10,
    color: 'white',
    backgroundColor: 'black', 
    justifyContent: 'center',
    alignItems: 'center', 
  }
});
