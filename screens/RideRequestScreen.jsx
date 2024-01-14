import { SafeAreaView, TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { Icon } from "react-native-elements";

const RideRequestScreen = () => {
  return (
    <SafeAreaView style={tw`w-80 pl-4 pb-8 bg-gray-200 m-5`}>
        <View style={tw`flex-row`}>
            <Icon
                style={tw`mr-6 p-2 bg-black rounded-full w-10 mt-4`}
                name='user' color='white' type='antdesign'
            />
            <View>
                <Text style={tw`pt-4 pl-4 text-xl font-bold -ml-6`}>
                    Name
                </Text>
                <View style={tw`flex-row -mb-4`}>
                    <Icon
                        style={tw`mr-6 -ml-3 p-2 rounded-full w-10 mt-2`}
                        name='location' color='black' type='ionicon'
                    />
                    <Text style={tw`pt-4 pl-4 text-xl  -ml-6`}>
                        Origin
                    </Text>
                </View>
                <View style={tw`flex-row -mb-4`}>
                    <Icon
                        style={tw`mr-6 -ml-3 p-2 rounded-full w-10 mt-2`}
                        name='location' color='black' type='ionicon'
                    />
                    <Text style={tw`pt-4 pl-4 text-xl -ml-6`}>
                        Destination
                    </Text>
                </View>
                <View style={tw`flex-row -mb-4`}>
                    <Icon
                        style={tw`mr-4 -ml-3 p-2 rounded-full w-12 mt-3`}
                        name='money' size={20} color='black' type='font-awesome'
                    />
                    <Text style={tw`pt-4 pl-4 text-xl  -ml-6`}>
                        Price
                    </Text>
                </View>
            </View>
        </View>

        <View style={tw`flex-row justify-center -mb-5`}>
            <View style={tw`mt-4 border-t border-gray-200`}>
                <TouchableOpacity 
                    style={tw`bg-red-500 p-3 m-3 rounded-full`}
                >
                    <Text style={tw`text-center text-white text-xl`}>Reject</Text>
                </TouchableOpacity>
            </View>
            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity 
                    style={tw`bg-green-500 p-3 m-3 rounded-full`}
                >
                    <Text style={tw`text-center text-white text-xl`}>Accept</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default RideRequestScreen

const styles = StyleSheet.create({})