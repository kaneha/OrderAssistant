import React, { Component } from "react";
import { View, Alert, ScrollView, StatusBar } from "react-native";
import Slider from "./../components/Slider";
import PickerList from "./../components/PickerList";
import Styles from "./../css/Styles";
import Shop from "./../components/Shop";
import LoadingScreen from "./LoadingScreen";
import { firebaseApp } from "./../connectDatabase/connectFirebase";

const rootRef = firebaseApp.database().ref();
const shopsRef = rootRef.child("shops");

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shops: [],
      loaded: false
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        loaded: true
      });
    }, 5000);
  }

  async componentDidMount() {
    await shopsRef.once("value", childSnapshot => {
      const shops = [];
      childSnapshot.forEach(element => {
        shops.push({
          key: element.key,
          name: element.val().name,
          label: element.val().label,
          address: element.val().address,
          city: element.val().city
        });

        this.setState({
          shops: shops,
          loaded: true
        });
      });
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.loaded ? (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Slider />
            </View>
            <View style={Styles.dropDown}>
              <View style={Styles.dropDownComponent}>
                <PickerList type="city" />
              </View>
              <View style={Styles.dropDownComponent}>
                <PickerList />
              </View>
            </View>
            <View style={Styles.containerHome}>
              <ScrollView
                style={{
                  width: "100%",
                  height: "100%"
                }}
                scrollEnabled
                contentContainerStyle={{
                  alignItems: "center"
                }}
              >
                {this.state.shops.map((l, i) => (
                  <Shop
                    name={l.name}
                    address={l.address}
                    key={i}
                    onPress={() =>
                      this.props.navigation.navigate("Shop")
                    }
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        ) : (
          <LoadingScreen />
        )}
      </View>
    );
  }
}
