import axios from 'axios';
import {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';
import Category from './Categories';
import Recommendation from './Recommended';

const GOOGLE_API_KEY = 'AIzaSyB_SCxCebFiFojXQFe_odsJQhbIrpO4Jwc';

async function requestLocationPermission() {
  if (Platform.OS === 'ios') {
    return true; // On iOS, permissions are automatically requested.
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Permission',
          message: 'We need access to your location to show nearby hotels',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
}

function Home() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  // Function to fetch the reverse geocoded address
  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`,
      );
      const data = response.data;
      console.warn('address-->', data);
      if (data.results.length > 0) {
        setAddress(data.results[0].formatted_address);
      } else {
        Alert.alert('Error', 'Unable to fetch address');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch address');
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      const hasPermission = await requestLocationPermission();

      if (!hasPermission) {
        Alert.alert('Permission denied', 'Unable to access location');
        return;
      }

      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setLocation({latitude, longitude});
          fetchAddress(latitude, longitude); // Fetch the address after getting location
        },
        error => {
          Alert.alert('Error', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    };

    fetchLocation();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar backgroundColor="#6D38C3" barStyle="light-content" />
      <ScrollView style={{marginBottom: 80, flex: 1}}>
        <View
          style={{
            backgroundColor: '#6D38C3',
            flex: 0.25,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            elevation: 2,
            paddingBottom: 40,
          }}>
          <View
            style={{
              marginTop: 40,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <View style={{width: '70%'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="location-outline" type="ionicon" color={'#fff'} />
                {address ? (
                  <Text
                    numberOfLines={1}
                    style={{fontSize: 16, color: '#fff', fontWeight: '500'}}>
                    {address}
                  </Text>
                ) : (
                  <Text
                    style={{fontSize: 16, color: '#fff', fontWeight: '500'}}>
                    Fetching...
                  </Text>
                )}
              </View>
              {address && (
                <Text numberOfLines={1} style={{fontSize: 13, color: '#fff'}}>
                  {address}
                </Text>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 30,
                flexDirection: 'row',
                width: '18%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 50,
                  padding: 5,
                  height: 25,
                  width: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: '#fff',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: -5,
                    fontWeight: 'bold',
                    color: '#fff',
                  }}>
                  B
                </Text>
              </View>

              <Icon
                name="notifications-outline"
                type="ionicon"
                color={'#fff'}
                size={24}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: 10,
              width: '85%',
              alignSelf: 'center',
              marginTop: 40,
            }}>
            {/* Search Icon */}
            <Icon
              type="ionicon"
              name="search-outline"
              size={20}
              color="#696969"
              style={{paddingLeft: 10}}
            />

            {/* TextInput */}
            <TextInput
              placeholder="Search for 'Hotels'"
              style={{
                flex: 1,
                paddingLeft: 10,
                fontSize: 15,
                fontWeight: '700',
                paddingRight: 10, // Add padding to avoid overlap with mic icon
              }}
            />

            {/* Mic Icon */}
            <Icon
              name="mic-outline"
              type="ionicon"
              size={20}
              color="#696969"
              style={{paddingRight: 10}}
            />
          </View>
        </View>
        <View style={{flex: 0.75, paddingHorizontal: 20}}>
          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 18, fontWeight: '600', color: '#000'}}>
              Top Categories
            </Text>
            <View
              style={{
                backgroundColor: '#6D38C3',
                paddingHorizontal: 20,
                paddingVertical: 7,
                borderRadius: 10,
              }}>
              <Text style={{fontSize: 14, color: '#fff'}}>See all</Text>
            </View>
          </View>
         <Category />
          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{fontSize: 18, fontWeight: '600', color: '#000'}}>
                Recommended for you
              </Text>
              <Text style={{fontSize: 12, marginTop: 5}}>
                We recommend these based on your past orders and searches
              </Text>
            </View>
          </View>
          <Recommendation />
        </View>
      </ScrollView>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
 catImage: {
    width: 97,
    height: 97,
    borderRadius: 100,
    elevation: 2, // Android shadow
    backgroundColor: '#fff', // Required for shadow on Android
    shadowColor: '#000', // iOS shadow color
    shadowOffset: { width: 1, height: 10 }, // iOS shadow offset
    shadowOpacity: 0.25, // iOS shadow opacity
    shadowRadius: 3.84, // iOS shadow radius
},
  categroyText: {fontSize: 16, color: '#000', marginTop: 7, fontWeight: '500'},
});
