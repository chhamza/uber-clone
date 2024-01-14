import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image, StyleSheet, StatusBar} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";
import { useAuthentication } from '../utils/hooks/useAuthentication';

const nonDriverData = [
    {
        id: "123",
        title: "Get a ride",
        mode: "user",
        image: "https://links.papareact.com/3pn",
        screen: "MapScreen"
    },
    {
        id: "456",
        title: "Order food",
        mode: "user",
        image: "https://links.papareact.com/28w",
        screen: "EatsScreen"
    },
]

const driverData = [
    {
        id: "123",
        title: "Find rides",
        mode: "driver",
        image: "https://links.papareact.com/3pn",
        screen: "RideRequestScreen"
    },
]


const Item = ({image, title, screen, nav, hasOrigin, driverEnabled }) => ( 
    <TouchableOpacity
        onPress={() => nav.navigate(screen)}
        style={tw`${driverEnabled ? "w-80 items-center pl-6 pb-8 pt-4 bg-gray-200 m-0" : "w-40 p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2"}`}
        disabled={!hasOrigin && !driverEnabled}
    >
            <View
                style={tw`${!hasOrigin && !driverEnabled && "opacity-20"}`}
            >
                <Image 
                    style={[tw`${driverEnabled ? "-mt-6 -ml-6" : "mt-2"}`, {width: 120, height: 120, resizeMode: 'contain',  alignSelf: 'center'}]}
                    source={{ uri: image}}
                />
                <Text 
                    style={tw`${driverEnabled ? "text-center mt-2 text-xl font-bold -ml-6" : "mt-2 text-lg font-semibold"}`}
                >
                    { title }
                </Text>
                <Icon 
                    style={tw`${driverEnabled ? "text-center mr-6 p-2 bg-black rounded-full w-60 mt-4" : "p-2 bg-black rounded-full w-10 mt-4"}`}
                    name='arrowright' color='white' type='antdesign'
                />
            </View>
        
    </TouchableOpacity>
);

const NavOptions = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);
    const { userData } = useAuthentication();

    return (
        <FlatList
            data={userData?.driverEnabled ? driverData : nonDriverData}
            horizontal
            keyExtractor={item => item.id}
            renderItem={({item}) => 
                <Item 
                    image={item.image} 
                    title={item.title} 
                    screen={item.screen} 
                    nav={navigation} 
                    hasOrigin={origin}
                    driverEnabled={userData?.driverEnabled}
                />
            }
        />
    );
};

export default NavOptions;
