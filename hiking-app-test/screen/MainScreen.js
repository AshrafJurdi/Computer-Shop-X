import React from "react";
import MapView, { Polyline } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: 33.9684798,
            longitude: 35.8262136,
            latitudeDelta: 1.6,
            longitudeDelta: 1.6
          }}
          mapType={"standard"}
          provider={"google"}
          style={styles.mapStyle}
          showsUserLocation={true}
          userLocationAnnotationTitle={"My Location"}
          followsUserLocation={true}
          showsMyLocationButton={true}
          showsIndoorLevelPicker={true}
        >
          <Polyline
            lineJoin={"round"}
            coordinates={[
              { latitude: 33.9684798, longitude: 35.8362136 },
              { latitude: 33.9784798, longitude: 35.8462136 },
              { latitude: 33.9984798, longitude: 35.8562136 },
              { latitude: 33.9984798, longitude: 35.8662136 },
              { latitude: 33.9184798, longitude: 35.8762136 }
              // { latitude: 37.8025259, longitude: -122.4351431 }
            ]}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              "#7F0000",
              "#00000000", // no color, creates a "long" gradient between the previous and next coordinate
              "#B24112",
              "#E5845C",
              "#238C23",
              "#7F0000"
            ]}
            strokeWidth={6}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
