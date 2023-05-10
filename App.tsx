import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    // style={{ flexDirection: 'row' }}

    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>서울</Text>
      </View>
      <View style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>맑음</Text>
        </View>
      </View>
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
    flex: 3,
  },
  day: {
    flex: 1,
    alignItems: 'center',
  },
  temp: {
    fontSize: 178,
    marginTop: 50,
  },
  description: {
    fontSize: 60,
    marginTop: -30,
  },
});
