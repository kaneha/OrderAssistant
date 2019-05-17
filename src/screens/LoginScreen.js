import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { Font } from "expo";
import { firebaseApp } from "./../connectDatabase/connectFirebase";
import LoadingScreen from "./LoadingScreen";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
      email: "",
      password: ""
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      "Patchy-Robots": require("./../assets/fonts/Patchy-Robots.ttf")
    });

    this.setState({ fontLoaded: true });
  }

  Login() {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({
          email: "",
          password: ""
        });
        this.props.navigation.navigate("Main");
      })
      .catch(function(error) {});
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.fontLoaded ? (
          <View style={styles.container}>
            <StatusBar backgroundColor="#0984e3" barStyle="light-content" />
            <View style={styles.view}>
              {this.state.fontLoaded ? (
                <Text style={styles.title}>JARVIS</Text>
              ) : (
                <Text style={{ color: "white" }}>Loading....</Text>
              )}
            </View>
            <View style={styles.view}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#D8D8D8"
                selectionColor="white"
                underlineColorAndroid="white"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#D8D8D8"
                selectionColor="white"
                underlineColorAndroid="white"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.view}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() =>
                  this.props.navigation.navigate("AppStackNavigator")
                }
              >
                <Text style={styles.loginText}>LOG IN</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <LoadingScreen />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B9CFC",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "90%"
  },
  text: {
    fontSize: 20,
    color: "white"
  },
  title: {
    fontSize: 60,
    color: "white",
    fontFamily: "Patchy-Robots"
  },
  input: {
    paddingLeft: 5,
    paddingRight: 5,
    color: "white",
    fontSize: 15,
    alignSelf: "stretch",
    marginBottom: 15,
    height: 50
  },
  buttonContainer: {
    backgroundColor: "#182C61",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    height: "20%",
    borderRadius: 10
  },
  loginText: {
    fontSize: 20,
    color: "white"
  }
});
