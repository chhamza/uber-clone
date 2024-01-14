import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import tw from 'tailwind-react-native-classnames';

const auth = getAuth();

const SignInScreen = ({ navigation }) => {
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''
    })

    async function signIn() {
        if (value.email === '' || value.password === '') {
        setValue({
            ...value,
            error: 'Email and password are mandatory.'
        })
        return;
        }

        try {
            await signInWithEmailAndPassword(auth, value.email, value.password);
            } catch (error) {
            setValue({
                ...value,
                error: error.message,
            })
        }
    }

    return (
        <View style={styles.container}>
            {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

            <View style={styles.controls}>
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

                <View>
                    <TouchableOpacity
                        onPress={signIn}
                        style={tw`bg-black py-3`}
                    >
                        <Text style={tw`text-center text-white text-xl`}>Sign In</Text>
                    </TouchableOpacity>
                </View>
                
                <View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Sign Up')}
                        style={tw`bg-black mt-4 py-3`}
                    >
                        <Text style={tw`text-center text-white text-xl`}>Need to Register? Sign up</Text>
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
        padding: 10,
        color: '#fff',
        backgroundColor: '#D54826FF',
    },

    buttonSignIn: {
        marginTop: 10,
        backgroundColor: "green"
    }
});

export default SignInScreen;
