import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';


export default function Splash({ navigation }) {

    useEffect(() => {

        async function fetchMyAPI() {

            setTimeout(async () => {
                navigation.navigate("List")
            }, 2000);

        }

        fetchMyAPI()
    }, [])

    return (
        <View style={styles.container}>

            <Text style={styles.AppText}>WeatherApp</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    AppText: {
        color: '#19AC52',
        fontSize: 30
    }
})

Splash.navigationOptions = ({ navigation }) => ({
    headerShown: false
});