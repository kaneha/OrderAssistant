import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import Styles from "./../css/Styles";
import { firebaseApp } from "./../connectDatabase/connectFirebase";

const userRef = firebaseApp.firestore().collection("users");

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      phone: ""
    };
  }

  signUp(username, email, password, phone) {
    if (username !== "" && email !== "" && password !== "" && phone !== "") {
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password.toString())
        .then(() => {
          var user = {
            username: username,
            email: email,
            role: "user",
            phone: phone
          };
          userRef.add(user).then(() => {
            ToastAndroid.show("Created new account", ToastAndroid.SHORT);
            this.props.navigation.navigate("Login");
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      ToastAndroid.show("Fill the boxes", ToastAndroid.SHORT);
    }
  }

  render() {
    return (
      <View style={Styles.containerSignUp}>
        <StatusBar backgroundColor="#0984e3" barStyle="light-content" />
        <View
          style={{
            flex: 3,
            justifyContent: "center",
            alignItems: "center",
            width: "90%"
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 35,
              fontWeight: "bold"
            }}
          >
            Create new account
          </Text>
        </View>
        <View
          style={{
            flex: 4,
            justifyContent: "center",
            alignItems: "center",
            width: "90%"
          }}
        >
          <TextInput
            placeholder="Username"
            placeholderTextColor="#D8D8D8"
            selectionColor="white"
            underlineColorAndroid="white"
            style={Styles.input}
            onChangeText={username =>
              this.setState({
                username: username
              })
            }
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#D8D8D8"
            selectionColor="white"
            underlineColorAndroid="white"
            style={Styles.input}
            onChangeText={email => this.setState({ email: email })}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#D8D8D8"
            selectionColor="white"
            underlineColorAndroid="white"
            secureTextEntry={true}
            onChangeText={password =>
              this.setState({
                password: password
              })
            }
            style={Styles.input}
          />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#D8D8D8"
            selectionColor="white"
            underlineColorAndroid="white"
            onChangeText={phone => this.setState({ phone: phone })}
            style={Styles.input}
          />
        </View>
        <View
          style={{
            flex: 3,
            justifyContent: "center",
            alignItems: "center",
            width: "90%"
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#182C61",
              width: "50%",
              alignItems: "center",
              justifyContent: "center",
              height: "20%",
              borderRadius: 10
            }}
            onPress={(username, email, password, phone) =>
              this.signUp(
                this.state.username,
                this.state.email,
                this.state.password,
                this.state.phone
              )
            }
          >
            <Text
              style={{
                fontSize: 20,
                color: "white"
              }}
            >
              Sign up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text
              style={{
                color: "white",
                fontSize: 15,
                textDecorationLine: "underline"
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
