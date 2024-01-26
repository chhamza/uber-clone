import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { useSelector } from "react-redux";
import { selectDestination, selectOrigin, setTravelTimeInformation } from "../slices/navSlice";
import { useRef, useEffect } from 'react';
import MapViewDirections from 'react-native-maps-directions';
import { useDispatch } from 'react-redux';
import Constants from 'expo-constants';

const Map = () => {
    const origin = useSelector(selectOrigin);
    const lat = parseFloat(origin?.locationLat) || 0;
    const lon = parseFloat(origin?.locationLon) || 0;
    const destination = useSelector(selectDestination);
    const destlat = parseFloat(destination?.locationLat) || 0;
    const destlon = parseFloat(destination?.locationLon) || 0;
    const GOOGLE_MAPS_APIKEY = Constants.expoConfig?.extra?.googleMapsApiKey;
    const mapRef = useRef(null);
    const  originCombined = origin?.locationLat ?  [parseFloat(origin?.locationLat), parseFloat(origin?.locationLon)] : 0;
    const  destCombined = destination?.locationLat ? [parseFloat(destination.locationLat), parseFloat(destination.locationLon)] : 0;
    const  originDescription = origin?.locationLat ? origin.description : "";
    const  destDescription = destination?.locationLat ? destination.description : "";
    const dispatch = useDispatch();

    useEffect(() => {
        if (!origin || !destination) return;

        // Zoom and fit the markers
        mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
            edgePadding: {top: 50, right: 50, bottom: 50, left: 50}
        })
    }, [origin, destination]);

    useEffect(() => {
        if (!origin || !destination) return;
        
        const getTravelTime = async() => {
            try {
                const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.description}&origins=${origin.description}&units=imperial&key=${GOOGLE_MAPS_APIKEY}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch travel time: ${response.status}`);
                }
        
                const data = await response.json();
                console.log(data);
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
            } catch (error) {
                console.error('Error fetching travel time:', error.message);
                // Handle the error, show a message, or perform any necessary actions
            }
        }

        getTravelTime();

    }, [origin, destination, GOOGLE_MAPS_APIKEY]);

    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType='mutedStandard'
            initialRegion={{
                latitude: lat,
                longitude: lon,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin && destination && (
                <MapViewDirections
                    origin={originDescription}
                    destination={destDescription}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="black"
              />
            )}

            {origin?.locationLat && origin?.locationLon && (
                <Marker 
                    coordinate={{
                        latitude: lat,
                        longitude: lon,
                    }}
                    title="Origin"
                    description={origin.description}
                    identifier='origin'
                />
            )}

            {destination?.locationLat && destination?.locationLon && (
                <Marker 
                    coordinate={{
                        latitude: destlat,
                        longitude: destlon,
                    }}
                    title="Destination"
                    description={destination.description}
                    identifier='destination'
                />
            )}
        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#F5FCFF"
    },
  
    container: {
      height: 300,
      width: 300,
      backgroundColor: "tomato"
    },
  
    map: {
      flex: 1,
    },
  });
  