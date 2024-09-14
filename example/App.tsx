import {useEffect, useState} from 'react';
import {Button, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {
  getApps,
  GetAppsResponse,
  Popup,
  showLocation,
  ShowLocationProps,
} from 'react-native-map-link-x';

const options = {
  latitude: 24.436048,
  longitude: 118.088061,
  title: '世贸海峡大厦',
  dialogTitle: 'This is the dialog Title',
  dialogMessage: 'This is the amazing dialog Message',
  cancelText: 'This is the cancel button text',
};

const onFootOptions: ShowLocationProps = {
  ...options,
  sourceLatitude: 24.436048,
  sourceLongitude: 118.088061,
  directionsMode: 'walk',
};

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [availableApps, setAvailableApps] = useState<GetAppsResponse[]>([]);

  useEffect(() => {
    const fetchAvailableApps = async () => {
      try {
        const apps = await getApps({
          latitude: 24.436048,
          longitude: 118.088061,
          title: '世贸海峡大厦',
          googleForceLatLon: false, // optionally force GoogleMaps to use the latlon for the query instead of the title
          alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
          appsWhiteList: ['amap', 'baidumap', 'qqmap'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
        });
        setAvailableApps(apps);
      } catch (error) {
        console.error('Error fetching available apps:', error);
      }
    };

    fetchAvailableApps();
  }, []);

  return (
    <View style={styles.container}>
      <Text>List of Applications</Text>
      <Popup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onCancelPressed={() => setIsVisible(false)}
        onAppPressed={() => setIsVisible(false)}
        options={options}
      />
      {availableApps.length > 0 ? (
        availableApps.map(({icon, name, id, open}) => (
          <Pressable key={id} onPress={open}>
            <Image source={icon} />
            <Text style={styles.option}>{name}</Text>
          </Pressable>
        ))
      ) : (
        <Text>No available apps found.</Text>
      )}
      <View style={styles.buttonContainer}>
        <Button onPress={() => setIsVisible(true)} title="Show Popup" />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => showLocation(options)}
          title="Show in Maps using action sheet"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          onPress={() => showLocation(onFootOptions)}
          title="Show direction (on foot) in Maps using action sheet"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  buttonContainer: {
    marginTop: 15,
  },
  option: {
    textAlign: 'center',
  },
});
