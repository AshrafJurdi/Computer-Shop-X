import React, { Component } from "react";
import {
  Alert,
  Platform,
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  Modal,
  Image
} from "react-native";
import MapView, { Polyline, AnimatedRegion, Marker } from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { ScrollView } from "react-native-gesture-handler";
import haversine from "haversine";
import {
  Ionicons,
  EvilIcons,
  AntDesign,
  Entypo,
  Feather,
  MaterialIcons,
  Foundation,
  FontAwesome
} from "@expo/vector-icons";

import Colors from "../constants/Colors";

const LATITUDE_DELTA = 0.001;
const LONGITUDE_DELTA = 0.001;
const LATITUDE = 33.89462341091958;
const LONGITUDE = 35.51144764761953;

export default class App extends Component {
  state = {
    location: null,
    errorMessage: null,
    locationUpdate: [],
    latitude: 0,
    longitude: 0,
    routeCoordinates: [],
    distanceTravelled: 0,
    prevLatLng: { latitude: LATITUDE, longitude: LONGITUDE },
    coordinate: new AnimatedRegion({
      latitude: 0,
      longitude: 0,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }),
    markers: [
      {
        title: "hello",
        description:
          "The description of the marker.This is only used if the component has no children that are a <Callout />, in which case the.",
        pinColor: "blue",
        image: "./assets/splash.png",
        coordinates: {
          latitude: 33.89462341091958,
          longitude: 35.51144764761953
        }
      },
      {
        title: "hey",
        description:
          "The description of the marker.This is only used if the component has no children that are a <Callout />, in which case the.",
        coordinates: {
          latitude: 33.89762341091958,
          longitude: 35.50144764761953
        }
      }
    ]
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
      // this.updateLocation();
      // console.log("state==>", this.state);
    }

    // this.props.navigation.setParams({ trophyTitle: selectedMap.title });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({ accuracy: 6 });
    this.setState({
      location
      // latitude: location.coords.latitude,
      // longitude: location.coords.longitude
    });
  };

  updateLocation = async () => {
    this.LocationUpdate = await Location.watchPositionAsync(
      { accuracy: 6, distanceInterval: 1 },
      result => {
        const { routeCoordinates, distanceTravelled } = this.state;
        const latitude = result.coords.latitude;
        const longitude = result.coords.longitude;

        const newCoordinate = {
          latitude,
          longitude
        };
        // console.log("newCoordinates", result.coords.latitude);
        this.setState({
          latitude,
          longitude,
          locationUpdate: [...this.state.locationUpdate, result.coords],
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled:
            distanceTravelled + this.calcDistance(newCoordinate)
        });
        // console.log("distance", distanceTravelled);
      }
    );
  };

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    // console.log("newLatLng", newLatLng);
    // console.log("prevLatLng", prevLatLng);

    return haversine(prevLatLng, newLatLng);
  };

  render() {
    let text = "Waiting..";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.distanceTravelled);
      // console.log("===>", this.state.locationUpdate);
      // console.log("locatin", this.state.location);
      // console.log("statestate==>", this.state);
    }

    // const altitude = [...locationUpdate].pop();
    return (
      // <ScrollView>
      //   <View style={styles.container}>
      //     <Text style={styles.paragraph}>{text}</Text>
      //     <Button
      //       title={"Pause"}
      //       onPress={() => this.LocationUpdate.remove()}
      //     />
      //     <Button title={"Resume"} onPress={() => this.updateLocation()} />
      //   </View>
      // </ScrollView>
      <View style={styles.container}>
        <View style={styles.container1}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "white" }}>Altitude:</Text>
            {this.state.locationUpdate.length > 0 ? (
              <Text style={{ color: "white" }}>
                {this.state.locationUpdate[
                  (this, this.state.locationUpdate.length - 1)
                ].altitude.toFixed(2)}{" "}
                M
              </Text>
            ) : null}
          </View>
          <View></View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "white" }}>Distance:</Text>
            <Text style={{ color: "white" }}>
              {(this.state.distanceTravelled / 1000).toFixed(2)} KM
            </Text>
          </View>
        </View>
        <MapView
          region={this.getMapRegion()}
          mapType={"standard"}
          provider={"google"}
          style={styles.mapStyle}
          showsUserLocation={true}
          userLocationAnnotationTitle={"My Location"}
          followsUserLocation={true}
          showsMyLocationButton={true}
          showsIndoorLevelPicker={true}
          showsCompass={true}
          showsScale={true}
          showsIndoors={true}
          showsIndoorLevelPicker={true}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              coordinate={marker.coordinates}
              // title={marker.title}
              // description={marker.description}
              pinColor={marker.pinColor}
              key={marker.title}
              onPress={() => {
                return (
                  (
                    <View style={styles.container1}>
                      <Image
                        source={{
                          uri:
                            "https://facebook.github.io/react-native/docs/assets/favicon.png"
                        }}
                      />
                    </View>
                  ),
                  console.log("something")
                );
              }}
            />
          ))}
          <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
        </MapView>
        <View style={styles.container1}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <AntDesign
              name="pushpino"
              size={25}
              color={"white"}
              onPress={() => <Marker onPress />}
            />
            <Text style={{ color: "white" }}>Pin Note</Text>
          </View>
          {this.state.longitude === 0 ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Foundation
                label="direction"
                name="record"
                size={25}
                color={"white"}
                onPress={() => this.updateLocation()}
              />
              <Text style={{ color: "white" }}>Record</Text>
            </View>
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <FontAwesome
                name="pause"
                size={25}
                color={"white"}
                onPress={() => {
                  this.LocationUpdate.remove();
                  Alert.alert(
                    "Stop",
                    "Are you sure you want to stop recording?",
                    [
                      {
                        text: "Yes",
                        onPress: () => console.log("Ask me later pressed")
                      },
                      {
                        text: "No",
                        onPress: () => this.updateLocation(),
                        style: "cancel"
                      }
                    ],
                    { cancelable: true }
                  );
                }}
              />
              <Text style={{ color: "white" }}>Pause</Text>
            </View>
          )}
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Entypo
              name="camera"
              size={25}
              color={"white"}
              onPress={() => {
                this.LocationUpdate.remove();
                alert("pause");
              }}
            />
            <Text style={{ color: "white" }}>Picture</Text>
          </View>
        </View>
      </View>
    );
  }
}

App.navigationOptions = navigationData => {
  // const TrophyTitle = navigationData.navigation.getParam("mealTitle");
  // const selectedMeal = MEALS.find(meal => meal.id === mealId);
  return {
    // headerTitle: TrophyTitle
    headerTitle: "Trophies"
    // headerRight: (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title="Favorite"
    //       iconName="ios-star"
    //       onPress={() => {
    //         console.log("Mark as favorite!");
    //       }}
    //     />
    //   </HeaderButtons>
    // )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
    // paddingTop: Constants.statusBarHeight,
    // backgroundColor: "#ecf0f1"
  },
  container1: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: Dimensions.get("window").width,
    height: "10%",
    backgroundColor: Colors.primaryColor
    // backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: "80%"
  }
});
