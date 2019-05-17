import React, { Component } from "react";
import { View, Text } from "react-native";
import Styles from "./../css/Styles";

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={Styles.container}>
        <Text> ShopScreen </Text>
      </View>
    );
  }
}
