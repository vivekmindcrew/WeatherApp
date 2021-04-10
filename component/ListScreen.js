import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, View, Text, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { Team } from '../Team';

export default function ListScreen({ navigation }) {

  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    let datafetch =
    {
      method: 'GET',
      credentials: 'same-origin',
      mode: 'same-origin',
      headers:
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };
    fetch("http://api.openweathermap.org/data/2.5/find?lat=23.68&lon=90.35&cnt=50&appid=46a26121c9bcd9a1fd5c9cb8903c9180", datafetch)
      .then(response => response.json())
      .then(results => {
        setIsLoading(false);
        setShowLoading(false);
        setData(results.list);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err);
        console.log('error.......', err)
      });
  }, []);

  if (showLoading === true) {
    return (
      <View style={styles.activity}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
  if (isLoading == "true") {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }


  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>
          Error fetching data... Check your network connection!
        </Text>
      </View>
    );
  }


  return (

    <View style={styles.container}>


      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (

          <TouchableOpacity onPress={() => {
            navigation.navigate('Maps', {
              lat: `${item.coord.lat}`,
              lng: `${item.coord.lon}`,
              city: `${item.name}`,
              clou: `${item.weather[0].main}`,
              humidity: `${item.main.humidity}`,
              wind: `${item.wind.speed}`,
              maxtemp: `${item.main.temp_max - 273.15}`,
              mintemp: `${item.main.temp_min - 273.15}`,
              temp: `${item.main.temp - 273.15}`,
            });
          }} >
            <View style={styles.listItem}>

              <View style={styles.metaInfo}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.cloudy}>{item.weather[0].main}</Text>

              </View>
              <Text style={styles.degree}>{(item.main.temp - 273.15).toFixed(2)}°C</Text>

            </View>
          </TouchableOpacity>

        )}
      />
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  message: {
    padding: 16,
    fontSize: 18,
    color: 'red'
  }, listItem: {
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row'
  }, metaInfo: {
    marginLeft: 10,
    height: 20,
    justifyContent: 'center'
  }, title: {
    fontSize: 18,
    width: 200,

    // padding: 10
  }, cloudy: {
    fontSize: 14,
    width: 200,
    marginTop: 5
    // padding: 10
  }, degree: {
    fontSize: 16,
    width: 200,
    marginTop: 5,
    marginLeft: '20%',
    fontWeight: 'bold'
  }
});

ListScreen.navigationOptions = ({ navigation }) => ({
  title: 'WeatherApp',
  headerTitleStyle: { alignSelf: 'center' },

});