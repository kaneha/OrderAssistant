import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Styles from "./../css/Styles";

const deviceWidth = Dimensions.get("window").width;

export default class Dish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      imageURL:
        "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    };
  }

  up = () => {
    let numUp = this.state.num;
    numUp++;
    this.setState({
      num: numUp
    });
    this.onChangeState(numUp);
  };

  down = () => {
    let numDown = this.state.num;
    if (numDown > 0) numDown--;
    this.setState({ num: numDown });
    this.onChangeState(numDown);
  };

  onChangeState(num) {
    this.props.onChangeState(this.props.id, num);
  }

  render() {
    return (
      <View style={Styles.dish} onPress={this.props.onPress}>
        <View
          style={{
            flex: 2,
            justifyContent: "center",
            alignContent: "center"
          }}
        >
          <Image
            style={Styles.imageDish}
            source={{
              uri: this.state.imageURL
            }}
          />
        </View>
        <View style={{ flex: 6 }}>
          <Text style={Styles.labelText}>{this.props.dishName}</Text>
          <Text style={Styles.infoText}>describe</Text>
          <Text style={Styles.infoText}>{this.props.price} đ</Text>
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 0.06 * deviceWidth,
              height: 0.06 * deviceWidth,
              borderBottomLeftRadius: 5,
              borderTopLeftRadius: 5,
              borderWidth: 1,
              borderColor: "#95a5a6"
            }}
            onPress={this.down}
          >
            <Text
              style={{
                fontSize: 0.04 * deviceWidth,
                margin: 10,
                color: "#0984e3"
              }}
            >
              -
            </Text>
          </TouchableOpacity>
          <Text style={{ margin: 10, fontSize: 0.03 * deviceWidth }}>
            {this.state.num}
          </Text>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#95a5a6",
              width: 0.06 * deviceWidth,
              height: 0.06 * deviceWidth,
              borderBottomRightRadius: 5,
              borderTopRightRadius: 5
            }}
            onPress={this.up}
          >
            <Text
              style={{
                fontSize: 0.04 * deviceWidth,
                margin: 10,
                color: "#0984e3"
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
