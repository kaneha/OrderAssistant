import React, { Component } from "react";
import { View, ScrollView, StatusBar } from "react-native";
import Slider from "./../components/Slider";
import PickerList from "./../components/PickerList";
import Styles from "./../css/Styles";
import Shop from "./../components/Shop";
import LoadingScreen from "./LoadingScreen";
import { firebaseApp } from "./../connectDatabase/connectFirebase";

const shopsRef = firebaseApp.firestore().collection("shops");

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shops: [],
      sortCity: "",
      sortLabel: "",
      loaded: false
    };
  }

  async componentDidMount() {
    await shopsRef
      .orderBy("name", "asc")
      .get()
      .then(querySnapshot => {
        const shops = [];
        querySnapshot.forEach(doc => {
          shops.push({
            key: doc.id,
            name: doc.data().name,
            label: doc.data().label,
            address: doc.data().address,
            city: doc.data().city,
            imageURL: doc.data().imageURL
          });
        });
        this.setState({
          shops: shops,
          loaded: true
        });
      });
  }

  render() {
    var sortList = [];
    this.state.shops.forEach(item => {
      if (
        item.label.indexOf(this.state.sortLabel) !== -1 &&
        item.city.indexOf(this.state.sortCity) !== -1
      ) {
        sortList.push(item);
      }
    });

    return (
      <View style={{ flex: 1 }}>
        {this.state.loaded ? (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 2 }}>
              <Slider />
            </View>
            <View style={Styles.dropDown}>
              <View style={Styles.dropDownComponent}>
                <PickerList
                  type="cities"
                  label="Select city..."
                  pick={changeItem => {
                    this.setState({ sortCity: changeItem });
                  }}
                />
              </View>
              <View style={Styles.dropDownComponent}>
                <PickerList
                  type="labels"
                  label="Select label..."
                  pick={changeItem => {
                    this.setState({ sortLabel: changeItem });
                  }}
                />
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
                <View style={Styles.space} />
                {sortList.map((l, i) => (
                  <Shop
                    name={l.name}
                    address={l.address}
                    city={l.city}
                    imageURL={l.imageURL}
                    key={i}
                    onPress={() => {
                      this.props.navigation.navigate("Shop", {
                        key: l.key
                      });
                    }}
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

export default HomeScreen;
