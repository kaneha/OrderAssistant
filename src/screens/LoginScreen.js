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
import { connect } from "react-redux";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

class LoginScreen extends React.Component {
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
    // firebaseApp
    //   .auth()
    //   .signInWithEmailAndPassword(this.state.email, this.state.password)
    //   .then(() => {
    //     this.setState({
    //       email: "",
    //       password: ""
    //     });
    this.props.navigation.navigate("AppStackNavigator");
    //   })
    //   .catch(function(error) {});
    this.props.signInDispatch(this.state.email);
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
                onChangeText={email => this.setState({ email: email })}
                value={this.state.email}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#D8D8D8"
                selectionColor="white"
                underlineColorAndroid="white"
                secureTextEntry={true}
                onChangeText={password => this.setState({ password: password })}
                value={this.state.password}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.view}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.Login()}
              >
                <Text style={styles.loginText}>LOG IN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginTop: 20 }}
                onPress={() => this.props.navigation.navigate("SignUp")}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    textDecorationLine: "underline"
                  }}
                >
                  Create new account
                </Text>
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signInDispatch: email => {
      dispatch({ type: "SIGN_IN", email });
    }
  };
};

export default connect(
  null,
  mapDispatchToProps,
  null
)(LoginScreen);

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
    fontSize: 20,
    alignSelf: "stretch",
    marginBottom: 15,
    width: "100%",
    height: "15%"
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
