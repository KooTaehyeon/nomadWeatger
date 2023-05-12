import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, Suspense } from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Text,
  View,
} from 'react-native';
import * as Location from 'expo-location';
const SCREEN_WIDTH = Dimensions.get('window').width;

type JsonProps = {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: { lat: number; lon: number };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: [{ description: string; icon: string; id: number; main: string }];
  wind: { deg: number; speed: number };
};
// console.log(SCREEN_WIDTH);
const key = 'a2d9b1ba502b43fb11a2188842b65da2';
export default function App() {
  const [city, setCity] = useState('loading...');
  const [ok, setOk] = useState(true);
  const [day, setDay] = useState([]);
  const [temp, setTemp] = useState('');
  const ask = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
    console.log(permission);
    if (!permission.granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    console.log('location', latitude, longitude);
    const location: any = await Location.reverseGeocodeAsync(
      {
        latitude,
        longitude,
      },
      { useGoogleMaps: false }
    );
    console.log('location2', location);
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`
    );
    const json = await response.json();

    console.log(json);
    setDay(json.weather);
    setTemp(json.main.temp);
  };
  console.log(day, 'day');
  console.log(temp, 'te');

  useEffect(() => {
    ask();
    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={a2d9b1ba502b43fb11a2188842b65da2}
  }, []);

  return (
    // style={{ flexDirection: 'row' }}

    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {day.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color={'white'} style={{ marginTop: 10 }} />
          </View>
        ) : (
          day.map((day: any, idx) => {
            return (
              <View key={idx} style={styles.day}>
                <Text style={styles.temp}>{parseFloat(temp).toFixed(1)}</Text>
                <Text style={styles.description}>{day.description}</Text>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
  },
  city: {
    flex: 1.2,

    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName: {
    color: '#fff',
    fontSize: 68,
    fontWeight: '600',
  },
  weather: {
    // backgroundColor: 'blue',
  },
  day: {
    // flex: 1,
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  temp: {
    fontSize: 100,
    marginTop: 50,
  },
  description: {
    fontSize: 60,
    marginTop: -0,
  },
});
