import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Styles from "./../css/Styles";

class OrderDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name
    };
  }

  render() {
    return (
      <TouchableOpacity
        onPress={(name, price, num) =>
          this.props.onPress(this.props.name, this.props.price, this.props.num)
        }
        style={Styles.orderDish}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start",
            marginLeft: 20
          }}
        >
          <Text style={Styles.labelText}> {this.props.name} </Text>
          <Text style={Styles.infoText}>  Đơn giá: {this.props.price} đ</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "flex-end",
            marginRight: 20
          }}
        >
          <Text style={Styles.oderDishText}>Số lượng: {this.props.num}</Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#eb4d4b",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              elevation: 3,
              marginTop: 10
            }}
            onPress={name => this.props.deleteDish(this.props.name)}
          >
            <Text style={{ color: "white", margin: 10 }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

export default OrderDish;
