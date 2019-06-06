import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class AccountScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Edit profile</Text>
          <Ionicons name="ios-arrow-forward" size={25} color="#1B9CFC" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Login")}>
          <Text style={styles.text}>Log out</Text>
          <Ionicons name="ios-arrow-forward" size={25} color="#1B9CFC" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    height: "7%",
    borderBottomWidth: 1,
    borderBottomColor: "#1B9CFC"
  },
  text: {
    flex: 1,
    fontSize: 20,
    color: "#1B9CFC"
  }
});
