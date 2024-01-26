import { useState, useRef, useEffect } from 'react';
import tw from 'tailwind-react-native-classnames';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { StyleSheet, Text, TextInput, FlatList, TouchableOpacity, View, Button, SafeAreaView, Image } from 'react-native';
import NavOptions from '../components/NavOptions';
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFovourites from './NavFovourites';
import { Icon } from "react-native-elements";

const NavigateCard = () => {
    const [destinationLocation, setDestinationLocation] = useState('')
    const [locItems, setLocItems] = useState([])
    const [locEntered, setLocEntered] = useState(false)
    const inputRef = useRef(null);
    const { user, userData } = useAuthentication();
    const navigation = useNavigation();

    useEffect(() => {
        inputRef.current.focus();
      }, []);

    const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search?';

    const handleTextChange = (loc) => {
        setDestinationLocation(loc);
    };

    const setLocText = (loc) => {
        setDestinationLocation(loc);
    };

    const getLocation = () => {
        const params = {
        q: destinationLocation,
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

    const Item = ({title, latitude, longitude, description, nav}) => (        
        <TouchableOpacity
            style={tw`p-2 pl-4 pb-2 pt-0 bg-gray-200 m-1 w-80`}
        >
        <View>
        <Text 
            onPress={() => {
                setLocText(title)

                dispatch(
                    setDestination({
                        locationLat: latitude,
                        locationLon: longitude,
                        description: description
                    })
                );

                nav.navigate('RideOptionsCard')

                setLocEntered(false);
            }}
            style={tw`mt-2 font-semibold`}
        >{ title }</Text>
        </View>
        </TouchableOpacity>
    );

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
        <View>
            <Text style={tw`text-center py-5`}>Good Morning, {userData?.firstName}!</Text>
            <View style={styles.container}>
                    <View style={styles.inputContainer}>
                    <TextInput
                        ref={inputRef}
                        style={styles.input}
                        placeholder="Where to?"
                        value={destinationLocation}
                        onChangeText={handleTextChange}
                        onFocus={() => inputRef.current.setNativeProps({ selection: { start: 0, end: 0 } })}
                        onBlur={() => inputRef.current.setNativeProps({ selection: null })}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>

            {locEntered &&
                <FlatList
                    data={locItems}
                    keyExtractor={item => item.place_id}
                    renderItem={({item}) => <Item 
                        title={item.display_name} 
                        latitude={item.lat} 
                        longitude={item.lon} 
                        description={item.display_name}
                        nav={navigation} 
                    />}
                />
            }

            <NavFovourites />
        </View>
        <View style={tw`flex-row  bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
            <TouchableOpacity 
                onPress={() => navigation.navigate("RideOptionsCard")}
                style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}>
                <Icon 
                    name="car"
                    type="font-awesome"
                    color="white"
                    size={16}
                />
                <Text style={tw`text-white text-center`}>Rides</Text>
            </TouchableOpacity>

            <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
                <Icon 
                    name="fast-food-outline"
                    type="ionicon"
                    color="black"
                    size={16}
                />
                <Text style={tw`text-center`}>Eats</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 8,
        },
        button: {
            marginTop: 10
        },
        inputContainer: {
            flex: 1,
            marginRight: 8,
            fontSize: 18,
            borderRadius: 8,
            backgroundColor: "#DDDDDF"
        },
        input: {
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 8,
            padding: 8,
        },
        button: {
            backgroundColor: 'blue',
            padding: 8,
            borderRadius: 8,
        },
        buttonText: {
            color: 'white',
            textAlign: 'center',
        },
    });