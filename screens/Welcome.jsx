import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

const data = [
    {
        id: "123",
        title: "Welcome to Uber Clone",
        bulletPoints: "Here you can set origin and destination locations",
        image: require('../assets/ride.png'),
        screen: "MapScreen"
    }
]


const Item = ({image, title, screen, nav, hasOrigin, bulletPoints }) => (
    <TouchableOpacity
        onPress={() => nav.navigate(screen)}
        style={tw`text-center pb-8 pt-4 bg-gray-200 m-5 w-80`}
        disabled={!hasOrigin}
    >
    <View
        style={tw`items-center`}
    >
      <Text style={tw`mt-2 text-lg font-semibold`}>{ title }</Text>
      <Text style={tw`mt-2 text-lg p-2`}>{ bulletPoints }</Text>

      <Image 
        style={{ width: 120, height: 120, resizeMode: 'contain' }}
        source={image}
      />

      <Icon 
        style={tw`p-2 bg-black rounded-full w-10 mt-4`}
        name='arrowright' color='white' type='antdesign'
      />
    </View>
    </TouchableOpacity>
);

const WelcomeScreen = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);

    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item}) => <Item 
                image={item.image} 
                title={item.title} 
                screen={item.screen} 
                nav={navigation} 
                hasOrigin={origin} 
                bulletPoints={item.bulletPoints}
            />}
        />
    );
}

export default WelcomeScreen;