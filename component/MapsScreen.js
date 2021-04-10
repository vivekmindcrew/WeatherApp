import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons';
import NotificationService from './notification';

export default function MapsScreen({ navigation }) {

  const [latitude, setLatitude] = useState(parseFloat(navigation.getParam('lat')));
  const [longitude, setLongitude] = useState(parseFloat(navigation.getParam('lng')));
  const [city, setcity] = useState(navigation.getParam('city'));
  const [clou, setclou] = useState(navigation.getParam('clou'));
  const [humidity, sethumidity] = useState(parseFloat(navigation.getParam('humidity')));
  const [wind, setwind] = useState(parseFloat(navigation.getParam('wind')));
  const [maxtemp, setmaxtemp] = useState(parseFloat(navigation.getParam('maxtemp')));
  const [mintemp, setmintemp] = useState(parseFloat(navigation.getParam('mintemp')));
  const [temp, settemp] = useState(parseFloat(navigation.getParam('temp')));

  this.notification = new NotificationService(this.onNotification);


  onNotification = (notif) => {
    Alert.alert(notif.title, notif.message);
  }

  //   //Permissions to use notifications
  // handlePerm(perms) = ()=>{
  //   Alert.alert("Permissions", JSON.stringify(perms));
  // }

  useEffect(() => {
    console.log(JSON.stringify(city))
    setLatitude(parseFloat(navigation.getParam('lat')));
    setLongitude(parseFloat(navigation.getParam('lng')));
    this.notification.scheduleNotification()

  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0021,
        }}


        style={styles.map}
      >
        <Marker coordinate={{ latitude: latitude, longitude: longitude }} />

      </MapView>
      <View style={styles.innnerbox}>
        <Text style={styles.temp}>{temp.toFixed(2)}°C</Text>
        <Image
          source={require('../component/image/cloudimage.png')}
          style={styles.ImageStyle}
        />
        <View >

          <Text style={styles.title}>{city}</Text>
          <Text style={styles.cloudy}>Cloud  :  {clou}</Text>
          <Text style={styles.cloudy}>humidity  :  {humidity}</Text>
          <Text style={styles.cloudy}>Wind Speed : {wind}</Text>
          <Text style={styles.cloudy}>Max Temp  :  {maxtemp.toFixed(2)}°C</Text>
          <Text style={styles.cloudy}>Min Temp  :  {mintemp.toFixed(2)}°C</Text>


        </View>

      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,

    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1
  },
  map: {
    height: '60%',
    ...StyleSheet.absoluteFillObject,

  },
  innerbox: {
    flexDirection: 'row'
    , width: '100%', justifyContent: 'center'
  }, title: {
    fontSize: 22,
    width: 200,
    marginBottom: 10, fontWeight: 'bold'
    // padding: 10
  }, cloudy: {
    fontSize: 14,
    width: 200,
    marginTop: 5
    // padding: 10
    ,
    marginBottom: 15, marginRight: 100
  },
  ImageStyle: {
    margin: 10,
    height: 115,
    width: 115,

    marginLeft: 180, marginBottom: -150
  },
  temp: {
    fontSize: 22,
    width: 100,
    marginBottom: -20, fontWeight: 'bold',
    marginLeft: 200,
    // padding: 10
  }
})

MapsScreen.navigationOptions = ({ navigation }) => ({
  title: 'WeatherApps',
  headerTitleStyle: { marginLeft: 50 },

});