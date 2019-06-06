import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AccountScreen from "./src/screens/AccountScreen";
import OrderListScreen from "./src/screens/OrderListScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import ShopScreen from "./src/screens/ShopScreen";
import {
  FontAwesome,
  MaterialIcons,
  Foundation,
  Ionicons
} from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Provider } from "react-redux";
import store1 from "./src/store/Store";
import SignUpScreen from "./src/screens/SignUpScreen";

const HomeStackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: "Home",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#0984e3"
        },
        headerLeft: (
          <Ionicons
            style={{ paddingLeft: 10 }}
            onPress={() => console.log("Press!!")}
            name="md-menu"
            size={30}
            color="white"
          />
        )
      };
    }
  },
  Shop: {
    screen: ShopScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: "Shop",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#0984e3"
        }
      };
    }
  }
});

const OrderListStackNavigator = createStackNavigator({
  OrderLists: {
    screen: OrderListScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: "Order list",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#0984e3"
        },
        headerLeft: (
          <Ionicons
            style={{ paddingLeft: 10 }}
            onPress={() => console.log("Press!!")}
            name="md-menu"
            size={30}
            color="white"
          />
        )
      };
    }
  }
});

const AccountStackNavigator = createStackNavigator({
  Account: {
    screen: AccountScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: "Account",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#0984e3"
        },
        headerLeft: (
          <Ionicons
            style={{ paddingLeft: 10 }}
            onPress={() => console.log("Press!!")}
            name="md-menu"
            size={30}
            color="white"
          />
        )
      };
    }
  }
});

const SettingsStackNavigator = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: "Settings",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#0984e3"
        },
        headerLeft: (
          <Ionicons
            style={{ paddingLeft: 10 }}
            onPress={() => console.log("Press!!")}
            name="md-menu"
            size={30}
            color="white"
          />
        )
      };
    }
  }
});

const MainTabNavigator = createMaterialBottomTabNavigator(
  {
    HomeStackNavigator: {
      screen: HomeStackNavigator,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="home" size={25} color={tintColor} />
        )
      }
    },
    OrderListStackNavigator: {
      screen: OrderListStackNavigator,
      navigationOptions: {
        tabBarLabel: "Orders",
        tabBarIcon: ({ tintColor }) => (
          <Foundation name="list-bullet" size={25} color={tintColor} />
        )
      }
    },
    AccountStackNavigator: {
      screen: AccountStackNavigator,
      navigationOptions: {
        tabBarLabel: "Account",
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="account-circle" size={25} color={tintColor} />
        )
      }
    },
    SettingsStackNavigator: {
      screen: SettingsStackNavigator,
      navigationOptions: {
        tabBarLabel: "Setting",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-settings" size={25} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "HomeStackNavigator",
    activeTintColor: "#0984e3",
    barStyle: {
      backgroundColor: "white"
    },
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        header: null
      };
    }
  }
);

const AppStackNavigator = createStackNavigator(
  {
    MainTabNavigator: MainTabNavigator,
    Shop: {
      screen: ShopScreen,
      navigationOptions: {
        tabBarLabel: "Shop"
      }
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Ionicons
            style={{ paddingLeft: 10 }}
            onPress={() => console.log("Press!!")}
            name="md-menu"
            size={30}
            color="#0984e3"
          />
        )
      };
    }
  }
);

const AppSwitchNavigator = createSwitchNavigator(
  {
    Login: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen},
    AppStackNavigator: { screen: AppStackNavigator }
  },
  {}
);

const AppContainer = createAppContainer(AppSwitchNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store1}>
        <AppContainer />
      </Provider>
    );
  }
}
