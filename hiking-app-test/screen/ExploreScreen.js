import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Dimensions } from "react-native";

import MapView from "react-native-maps";
import Polyline from "@mapbox/polyline";

export default class RnDirectionsApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: []
    };
  }

  componentDidMount() {
    // find your origin and destination point coordinates and pass it to our method.
    // I am using Bursa,TR -> Istanbul,TR for this example
    this.getDirections("33.9684798,35.8362136", "33.9184798,35.8762136");
  }

  async getDirections(startLoc, destinationLoc) {
    try {
      const x = [
        "33.9684798, 35.8362136",
        "33.9784798,35.8462136",
        "33.9984798,35.8562136",
        "33.9984798,35.8662136",
        "33.918479835.8762136"
      ];
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=33.966704,35.8249067&destination=33.9909321,35.7359214&mode=walking&key=AIzaSyBPMYOGd1tXcpkL-pf59xmMCL9r4CfBcuA
      `);

      // `https://maps.googleapis.com/maps/api/directions/json?origin=35.9684798,33.8362136&destination=33.9184798,35.8762136&mode=walking&waypoints=${x}&key=AIzaSyBPMYOGd1tXcpkL-pf59xmMCL9r4CfBcuA`
      let respJson = await resp.json();
      console.log(resp);
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      console.log("points", points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      this.setState({ coords: coords });
      return coords;
    } catch (error) {
      alert(error);
      return error;
    }
  }

  render() {
    return (
      <View>
        <MapView
          provider={"google"}
          style={styles.map}
          initialRegion={{
            latitude: 41.43206,
            longitude: -81.38992,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
