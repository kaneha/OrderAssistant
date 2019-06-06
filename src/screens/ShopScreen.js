import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid
} from "react-native";
import Styles from "./../css/Styles";
import Dish from "./../components/Dish";
import { firebaseApp } from "./../connectDatabase/connectFirebase";
import { StackActions, NavigationActions } from "react-navigation";
import { connect } from "react-redux";

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "MainTabNavigator" })]
});

//create reference to firestore
const shopsRef = firebaseApp.firestore().collection("shops");

class ShopScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      address: null,
      imageURL: null,
      menu: [],
      order: [],
      totalPrice: 0,
      keyShop: ""
    };
  }

  async componentWillMount() {
    const key = this.props.navigation.getParam("key", "null").toString();
    this.setState({
      keyShop: key
    });
    if (key != null) {
      //get data from firebase, set to state
      await shopsRef
        .doc(key)
        .get()
        .then(doc => {
          this.setState({
            name: doc.data().name,
            address: doc.data().address,
            imageURL: doc.data().imageURL
          });
        });

      await shopsRef
        .doc(key)
        .collection("menu")
        .get()
        .then(querySnapshot => {
          const menu = [];
          querySnapshot.forEach(doc => {
            menu.push({
              key: doc.id,
              name: doc.data().name,
              price: doc.data().price
            });
          });
          this.setState({
            menu: menu
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  isInArray(key, arr) {
    let check = false;
    arr.forEach(item => {
      if (item.key === key) check = true;
    });
    return check;
  }

  orderChangeListener(key, num) {
    const order = this.state.order;
    if (this.isInArray(key, order)) {
      if (num > 0) {
        order.forEach(item => {
          if (item.key == key) {
            item.num = num;
          }
        });
      } else {
        let tmp;
        order.forEach(item => {
          if (item.key.indexOf(key) !== -1) tmp = item;
        });
        order.splice(order.indexOf(tmp), 1);
      }
    } else {
      if (num !== 0) {
        this.state.menu.forEach(item => {
          if (item.key == key) {
            let tmp = { ...item };
            tmp.num = num;
            order.push(tmp);
          }
        });
      }
    }
    let sum = 0;
    order.forEach(value => {
      sum += value.price * value.num;
    });
    this.setState({
      order: order
    });
    this.setState({
      totalPrice: sum
    });
  }

  orderButton(keyShop, shopName, order) {
    if (order.length > 0) {
      var list = {};
      list.keyShop = keyShop;
      list.shopName = shopName;
      list.order = order;
      this.props.navigation.dispatch(resetAction);
      this.props.navigation.navigate("OrderListStackNavigator");
      this.props.addToOrderList(list);
    } else {
      ToastAndroid.show("Let's choose something", ToastAndroid.SHORT);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={Styles.avatarContainer}>
          <View
            style={{
              flex: 4,
              margin: 5,
              alignItems: "center"
            }}
          >
            <Image
              style={Styles.imageDetail}
              source={{
                uri: this.state.imageURL
              }}
            />
          </View>
          <View style={Styles.shopDetail}>
            <Text style={Styles.labelText}>{this.state.name}</Text>
            <Text style={Styles.infoText}>describe</Text>
            <Text style={Styles.infoText}>{this.state.address}</Text>
            <Text style={Styles.infoText}>Hotline</Text>
            <Text style={Styles.infoText}>Rate</Text>
          </View>
        </View>
        <View
          style={{
            flex: 7,
            backgroundColor: "#bdc3c7"
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
            {this.state.menu.map((l, i) => (
              <Dish
                dishName={l.name}
                price={l.price}
                key={i}
                id={l.key}
                onChangeState={(id, num) => this.orderChangeListener(id, num)}
              />
            ))}
            <View style={Styles.space} />
          </ScrollView>
          <View style={Styles.totalPriceContainer}>
            <Text style={Styles.totalPrice}>Total:</Text>
            <Text style={Styles.totalPrice}>{this.state.totalPrice} đ</Text>
          </View>
          <View style={Styles.space} />
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={Styles.orderButton}
              onPress={() =>
                this.orderButton(
                  this.state.keyShop,
                  this.state.name,
                  this.state.order
                )
              }
            >
              <Text
                style={{
                  fontSize: 20,
                  margin: 10,
                  color: "white"
                }}
              >
                ORDER
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addToOrderList: getItem => {
      dispatch({ type: "ADD_TO_ORDER", getItem });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopScreen);
