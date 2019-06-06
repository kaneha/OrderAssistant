import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  ToastAndroid
} from "react-native";
import Styles from "./../css/Styles";
import OrderDish from "./../components/OrderDish";
import { connect } from "react-redux";
import { firebaseApp } from "./../connectDatabase/connectFirebase";

const deviceWidth = Dimensions.get("window").width;

const ordersRef = firebaseApp.firestore().collection("orders");

class OrderListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: [],
      totalPrice: 0,
      animation: new Animated.Value(0),
      showButton: true,
      dishName: "",
      price: 0,
      num: 0
    };
  }

  componentWillMount() {
    if (this.props.dishes && this.props.shopName && this.props.keyShop) {
      this.setState({
        dishes: this.props.dishes
      });
    }
    // console.log(this.props.email);
  }

  totalPrice() {
    var sum = 0;
    this.state.dishes.forEach(dish => {
      sum += dish.num * dish.price;
    });
    this.setState({
      totalPrice: sum
    });
  }

  componentDidMount() {
    this.totalPrice();
  }

  setNum(dishName, price, num) {
    var dishes = this.state.dishes;
    dishes.forEach(dish => {
      if (dish.name === dishName && dish.price === price) {
        dish.num = num;
      }
    });
    this.totalPrice();
  }

  deleteDish(name) {
    let tmp;
    var dishes = this.state.dishes;
    dishes.forEach(dish => {
      if (dish.name.indexOf(name) !== -1) {
        tmp = dish;
      }
    });
    dishes.splice(dishes.indexOf(tmp), 1);
    this.setState({
      dishes: dishes
    });
    this.totalPrice();
  }

  confirmButton() {
    if (this.props.shopName && this.props.dishes && this.props.keyShop) {
      var order = {
        // email: this.props.email,
        keyShop: this.props.keyShop,
        shopName: this.props.shopName
      };
      var orderList = this.props.dishes;
      ordersRef
        .add(order)
        .then(doc => {
          orderList.forEach(order => {
            doc.collection("list").add(order);
          });
          console.log("Success");
        })
        .catch(error => console.log(error));
    } else {
      ToastAndroid.show("Let's choose something", ToastAndroid.SHORT);
    }
  }

  //show bottom popup
  handleOpen(name, price, num) {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
    this.setState({
      showButton: !this.state.showButton,
      dishName: name,
      price: price,
      num: num
    });
  }

  //hide bottom popup
  handleClose() {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start();
    this.setState({
      showButton: !this.state.showButton
    });
    this.setNum(this.state.dishName, this.state.price, this.state.num);
  }

  up = () => {
    let numUp = this.state.num;
    numUp++;
    this.setState({
      num: numUp
    });
  };

  down = () => {
    let numDown = this.state.num;
    if (numDown > 0) numDown--;
    this.setState({ num: numDown });
  };

  render() {
    const screenHeight = Dimensions.get("window").height;

    const backdrop = {
      transform: [
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0, 0.01],
            outputRange: [screenHeight, 0],
            extrapolate: "clamp"
          })
        }
      ],
      opacity: this.state.animation.interpolate({
        inputRange: [0.01, 0.5],
        outputRange: [0, 1],
        extrapolate: "clamp"
      })
    };

    const slideUp = {
      transform: [
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0.01, 1],
            outputRange: [0, -1 * screenHeight],
            extrapolate: "clamp"
          })
        }
      ]
    };

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#bdc3c7",
          alignItems: "center"
        }}
      >
        <View
          style={{
            flex: 3,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white"
          }}
        >
          <Text style={Styles.confirmOrderText}>Confirm your order</Text>
          <Text style={{ fontSize: 20 }}>{this.props.shopName}</Text>
        </View>
        <View
          style={{
            flex: 7,
            alignItems: "center",
            width: "100%",
            height: "100%"
          }}
        >
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
            {this.state.dishes.map((l, i) => (
              <OrderDish
                key={i}
                name={l.name}
                price={l.price}
                num={l.num}
                onPress={(name, price, num) =>
                  this.handleOpen(name, price, num)
                }
                deleteDish={name => this.deleteDish(name)}
              />
            ))}
            <View style={Styles.space} />
          </ScrollView>
        </View>
        <View style={Styles.totalPriceContainer}>
          <Text style={Styles.totalPrice}>Total:</Text>
          <Text style={Styles.totalPrice}>{this.state.totalPrice} đ</Text>
        </View>
        <View style={Styles.space} />
        {this.state.showButton ? (
          <TouchableOpacity
            style={Styles.orderButton}
            onPress={() => this.confirmButton()}
          >
            <Text
              style={{
                fontSize: 20,
                margin: 10,
                color: "white"
              }}
            >
              CONFIRM
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={Styles.orderButton} />
        )}

        <Animated.View
          style={[StyleSheet.absoluteFill, Styles.cover, backdrop]}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => this.handleClose()}
          >
            <View style={[Styles.sheet]}>
              <Animated.View style={[Styles.popup, slideUp]}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    flex: 1,
                    marginTop: 10
                  }}
                >
                  Edit
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "white",
                    width: "100%",
                    padding: 15,
                    justifyContent: "center"
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={Styles.labelText}>{this.state.dishName}</Text>
                    <Text style={Styles.infoText}>
                      Đơn giá: {this.state.price} đ
                    </Text>
                  </View>
                  <View>
                    <View
                      style={{
                        flex: 2,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      {/* button decrease */}
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
                      <Text
                        style={{ margin: 10, fontSize: 0.03 * deviceWidth }}
                      >
                        {this.state.num}
                      </Text>
                      {/* button increase */}
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
                </View>
                <TouchableOpacity
                  style={{
                    marginBottom: 20,
                    marginTop: 20,
                    width: "40%",
                    height: "20%",
                    backgroundColor: "#0984e3",
                    elevation: 3,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={() => this.handleClose()}
                >
                  <Text style={{ color: "white", fontSize: 15 }}>Close</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    shopName: state.shopName,
    dishes: state.dishes,
    email: state.email,
    keyShop: state.keyShop
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch1: () => {
      dispatch(actionCreator);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderListScreen);
