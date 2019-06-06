import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Styles from "./../css/Styles";

export default class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity style={Styles.shop} onPress={this.props.onPress}>
        <View
          style={{
            flex: 3,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            style={Styles.imageShop}
            source={{
              uri: this.props.imageURL
            }}
          />
        </View>
        <View style={{ flex: 7, marginBottom: 10, marginTop: 10 }}>
          <Text style={Styles.labelText}>{this.props.name}</Text>
          <Text style={Styles.infoText}>{this.props.address}</Text>
          <Text style={Styles.infoText}>{this.props.city}</Text>
          <Text style={Styles.infoText}>Describe</Text>
          <Text style={Styles.infoText}>Rate</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
