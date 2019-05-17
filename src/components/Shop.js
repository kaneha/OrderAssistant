import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Styles from "./../css/Styles";

export default class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity style={Styles.shop} onPress={this.props.onPress}>
        <Text style={Styles.shopName}>{this.props.name}</Text>
        <Text>{this.props.address}</Text>
        <Text>Rate</Text>
      </TouchableOpacity>
    );
  }
}
