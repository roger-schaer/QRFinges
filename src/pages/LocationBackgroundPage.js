import React, { useState, useEffect } from "react";
import {AsyncStorage, Switch, Text, View} from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
const BACKGROUND_LOCATION_UPDATES_TASK = "START_LOCATION";



export const storeData = async( value ) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@currentLocation', jsonValue)
    } catch (e) {
        console.log('error saving data to AsyncStorage', e)
    }
}

export const getData = async() => {
    try {
        const jsonValue = await AsyncStorage.getItem('@currentLocation')
        return jsonValue != null ? JSON.parse(jsonValue) : "";
    } catch(e) {
        console.log('error reading data from AsyncStorage', e)
    }
}

TaskManager.defineTask(BACKGROUND_LOCATION_UPDATES_TASK, ({ data: { locations }, error }) => {

    if (error) {
        console.log('An error occured', error)
    }

/*    getData().then(previousLocations => {
        console.log('previousLocations: ', previousLocations)
        console.log('new location: ', locations)

        if(previousLocations != null){
            locations = previousLocations.concat(locations)
        }*/

        console.log(locations)
        storeData(locations).then(r => console.log('data saved', r))
  //  })
});



export const LocationBackgroundPage = () => {
    const [currentLocation, setCurrentLocation] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);

    const [locations, setLocations] = useState([]);
    const [isEnabled, setIsEnabled] = useState(false);
    const [timer, setTimer] = useState(0);


    useEffect(() => {
        if (isEnabled) {
            if (timer <= 36000) {
                (async () => {
                    const data = await getData();
                    setCurrentLocation(data);
                    setTimeout(() => {
                        setTimer(timer + 1);
                    }, 1000);
                })();
            }
            else {
                setIsEnabled(false);
            }
        }
    }, [isEnabled, timer]);


    useEffect(() => {

        if (isEnabled) {
            console.log('enable');

            async function requestForegroundPermissions() {
                try {
                    let { status } = await Location.requestForegroundPermissionsAsync();
                    console.log('foreground permission', status);
                    if (status !== 'granted') {
                        console.log('Permission to foreground location was denied');
                        return;
                    }

                   // let location = await Location.getCurrentPositionAsync({});
                   // setCurrentLocation(location);

                } catch (e) {
                    console.log('error with foreground permissions')
                }
            }

            async function requestBackgroundPermissions() {
                try {

                    let { status } = await Location.requestBackgroundPermissionsAsync();

                    if (status === 'granted') {
                        console.log('background permission granted')
                        await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_UPDATES_TASK, {
                            accuracy: Location.Accuracy.Highest,
                            timeInterval: 8000,
                            distanceInterval: 1
                        });
                    }
                } catch (e) {
                    console.log('error with background permissions')
                }
            }

            requestForegroundPermissions();
            requestBackgroundPermissions();


        } else {
            setLocations([]);
            Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_UPDATES_TASK);
        }
    }, [isEnabled]);



    let text = "Waiting..";
    if (errorMsg) {
        text = errorMsg;
    } else if (currentLocation) {
        text = JSON.stringify(currentLocation);
    }

    return (
        <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>

            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setIsEnabled}
                value={isEnabled}
            />
            {/* <Text>Number of locations: {locations.length}</Text> */}

            <Text>Timers: {timer}</Text>

            {isEnabled ? (
                <>
                    <Text>Current location: {text}</Text>
                </>
            ) : (
                <Text>Feature desactivée</Text>
            )}
         {/*   {locations.map((l, i) => (
                <Text key={`text-${i}`}>{JSON.stringify(l)}</Text>
            ))}*/}
        </View>
    );
};
