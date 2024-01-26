import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TextInput, FlatList, TouchableOpacity, View, Button, SafeAreaView, Image } from 'react-native';
// import { useAuthentication } from '../utils/hooks/useAuthentication';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination } from '../slices/navSlice';
import NavFovourites from '../components/NavFovourites';
import { useAuthentication } from '../utils/hooks/useAuthentication';

export default function HomeScreen() {
    // const { user } = useAuthentication();
    const [initialLocation, setInitialLocation] = useState('')
    const [locItems, setLocItems] = useState([])
    const [locEntered, setLocEntered] = useState(false)
    const inputRef = useRef(null);
    const { userData } = useAuthentication();

    useEffect(() => {
        !userData?.driverEnabled ? 
        inputRef.current.focus() : null;
      }, []);

    const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search?';

    const handleTextChange = (loc) => {
        setInitialLocation(loc);
        //getLocation();
    };

    const setLocText = (loc) => {
        setInitialLocation(loc);
    };

    const getLocation = () => {
        const params = {
        q: initialLocation,
        format: 'json',
        addressdetails: 1,
        polygon_geojson: 0
        }
        const queryString = new URLSearchParams(params).toString()
        const requestOptions = {
        method: 'GET',
        redirect: 'follow'
        }
        fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            setLocEntered(true)
            setLocItems(JSON.parse(result))
        })
        .catch((err) => console.log('err: ', err))
    };

    const handleButtonPress = () => {
        console.log('Button pressed!');
        getLocation();
    };

    const dispatch = useDispatch();

    const Item = ({title, latitude, longitude, description}) => (        
        <TouchableOpacity
            style={tw`p-2 pl-4 pb-2 pt-0 bg-gray-200 m-1 w-80`}
        >
        <View>
        <Text 
            onPress={() => {
                setLocText(title)

                dispatch(
                    setOrigin({
                        locationLat: latitude,
                        locationLon: longitude,
                        description: description
                    })
                );

                dispatch(setDestination(null));
                setLocEntered(false);
            }}
            style={tw`mt-2 font-semibold`}
        >{ title }</Text>
        </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
        {/* <Text style={tw`text-blue-500 p-10`}>Welcome {user?.email}!</Text> */}
        {/* <Text style={tw`text-red-500 p-10`}>I am Home Screen</Text> */}
        
        <View style={tw`p-5`}>
            <Image
                style={{
                    width: 100, height: 100, resizeMode: 'contain'
                }}
                source={require('../assets/uber_logo_black.png')}
            />

            {!userData?.driverEnabled && (
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            ref={inputRef}
                            style={styles.input}
                            placeholder="Enter text"
                            value={initialLocation}
                            onChangeText={handleTextChange}
                            onFocus={() => inputRef.current.setNativeProps({ selection: { start: 0, end: 0 } })}
                            onBlur={() => inputRef.current.setNativeProps({ selection: null })}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </View>
            )}
                
            {/* <TextInput
                ref={inputRef}
                placeholder='Enter location'
                containerStyle={styles.locSearch}
                value={initialLocation}
                onChangeText={handleTextChange}
            /> */}

            {locEntered &&
                <FlatList
                    style={tw`ml-1`}
                    data={locItems}
                    keyExtractor={item => item.place_id}
                    renderItem={({item}) => <Item 
                        title={item.display_name} 
                        latitude={item.lat} 
                        longitude={item.lon} 
                        description={item.display_name} 
                    />}
                />
            }

            <NavOptions />
            <NavFovourites />
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    button: {
        marginTop: 10
    },
    locSearch: {
        flex: 1,
        backgroundColor: 'red', 
        padding: 8, 
        paddingLeft: 10,
        borderWidth: 1, 
        borderRadius: 10, 
        borderColor: 'gray', 
    },
    inputContainer: {
        flex: 1,
        marginRight: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        padding: 10,
    },
    button: {
        backgroundColor: 'black',
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});