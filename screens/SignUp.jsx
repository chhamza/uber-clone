import { useState } from 'react';
import { TouchableOpacity, Switch, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import tw from 'tailwind-react-native-classnames';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const auth = getAuth();
const firestoreDB = getFirestore();

const SignUpScreen = ({ navigation }) => {
    const [value, setValue] = useState({
        firstName: '',
        lastName: '',
        driverEnabled: false,
        email: '',
        password: '',
        error: ''
    })

    async function signUp() {
        if (value.firstName === '' ||
            value.lastName === '' || 
            value.driverEnabled === '' ||
            value.email === '' ||
            value.password === ''
        ) {
        setValue({
            ...value,
            error: 'Email and password are mandatory.'
        })
        return;
        }
  
    try {
        const createUser = await createUserWithEmailAndPassword(auth, value.email, value.password);
        const user = createUser.user;
        const userRef = doc(firestoreDB, 'users', user.uid);
        await setDoc(userRef, {
            firstName: value.firstName,
            lastName: value.lastName,
            driverEnabled: value.driverEnabled,
            email: value.email,
        });

        navigation.navigate('Sign In');
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <TextInput
            style={tw`bg-gray-100 pl-4 mb-4 w-80 h-12`}
            placeholder='First Name'
            containerStyle={styles.control}
            value={value.firstName}
            onChangeText={(text) => setValue({ ...value, firstName: text })}
        />

        <TextInput
            style={tw`bg-gray-100 pl-4 mb-4 w-80 h-12`}
            placeholder='Last Name'
            containerStyle={styles.control}
            value={value.lastName}
            onChangeText={(text) => setValue({ ...value, lastName: text })}
        />

        <View style={tw`flex-row items-center bg-gray-100 pl-4 mb-4 w-80 h-12`}>
            <Text>Want to become a driver?</Text>        
            <Switch
                style={tw`ml-20`}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={value.driverEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(val) => setValue({ ...value, driverEnabled: val })}
                value={value.driverEnabled}
            />
        </View>

        <TextInput
            style={tw`bg-gray-100 pl-4 w-80 h-12`}
            placeholder='Email'
            containerStyle={styles.control}
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
        />

        <TextInput
            style={tw`bg-gray-100 mt-4 mb-4 pl-4 w-80 h-12`}
            placeholder='Password'
            containerStyle={styles.control}
            value={value.password}
            onChangeText={(text) => setValue({ ...value, password: text })}
            secureTextEntry={true}
        />

        {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

        <View>
            <TouchableOpacity
                onPress={signUp}
                style={tw`bg-black py-3`}
            >
                <Text style={tw`text-center text-white text-xl`}>Sign Up</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  controls: {
    flex: 1,
  },

  control: {
    marginTop: 10
  },

  error: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  }
});

export default SignUpScreen;
