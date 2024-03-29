import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import tw from 'tailwind-react-native-classnames';
import { Icon } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from '../slices/navSlice';

const data = [
    {
        id: "Uber-X-123",
        title: "UberX",
        multiplier: 1,
        image: require('../assets/ride_x.png'),
    },
    {
        id: "Uber-XL-456",
        title: "Uber XL",
        multiplier: 1.2,
        image: require('../assets/ride_xl.png'),
    },
    {
        id: "Uber-LUX-789",
        title: "Uber LUX",
        multiplier: 1.75,
        image: require('../assets/ride_lux.png'),
    }
]

const SURG_CHARFE_RATE = 1.5;

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    return (
        <SafeAreaView style={tw`bg-white flex-1 -mt-3`}>
            <View style={tw`flex-row bg-white justify-evenly border-gray-100`}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("NavigateCard")}
                    style={tw`absolute top-3 left-5 p-3 rounded-full`}
                >
                    <Icon name="chevron-left" type="fontawesome" color="black" size={22} />
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>Select a ride - 
                {travelTimeInformation?.distance?.text}</Text>
            </View>

            <FlatList 
                style={tw`-mt-3`}
                data={data}
                keyExtractor={(item => item.id)}
                renderItem={({item: { id, title, multiplier, image}, item }) => (
                    <TouchableOpacity
                        onPress={() => setSelected(item)}
                        style={tw`flex-row justify-between items-center px-8 -mt-2 ${id ===
                        selected?.id && "bg-gray-200"}`}
                    >
                        <Image 
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain"
                            }}
                            source={image}
                        />
                        <View style={tw`-ml-3 mr-3`}>
                            <Text style={tw`text-xl font-semibold`}>{ title }</Text>
                            <Text>{travelTimeInformation?.duration.text} ETA</Text>
                        </View>
                        <Text style={tw`text-xl`}>
                            {new Intl.NumberFormat('en-gb', {
                                style: 'currency',
                                currency: 'EUR'
                            }).format(
                                (travelTimeInformation?.duration.value * SURG_CHARFE_RATE
                                    * multiplier) / 100
                            )}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity 
                    disabled={!selected} 
                    style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
                >
                    <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard

const styles = StyleSheet.create({})