import { StyleSheet, Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  containerSignUp: {
    flex: 1,
    backgroundColor: "#1B9CFC",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  containerHome: {
    flex: 8,
    backgroundColor: "white",
    alignItems: "center",
    backgroundColor: "#bdc3c7"
  },
  button: {
    backgroundColor: "red",
    borderWidth: 5,
    borderRadius: 5
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
  orderButton: {
    width: "95%",
    marginBottom: 0.01 * deviceHeight,
    backgroundColor: "#0984e3",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    elevation: 3
  },
  list: {
    height: "80%",
    width: "100%",
    borderRadius: 10
  },
  dropDown: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  dropDownComponent: {
    flex: 1,
    margin: 5,
    borderWidth: 4,
    borderRadius: 4,
    borderColor: "#0984e3",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3
  },
  shop: {
    flexDirection: "row",
    width: "95%",
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    backgroundColor: "white",
    marginBottom: 10,
    elevation: 3
  },
  avatarContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#95a5a6"
  },
  shopDetail: {
    flex: 6,
    margin: 5
  },
  dish: {
    flexDirection: "row",
    backgroundColor: "white",
    borderTopWidth: StyleSheet.hairlineWidth,
    width: "100%",
    borderColor: "#95a5a6",
    padding: 15
  },
  labelText: {
    fontSize: 0.035 * deviceWidth,
    marginBottom: 10
  },
  infoText: {
    fontSize: 0.025 * deviceWidth,
    color: "#636e72"
  },
  numBox: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  totalPriceContainer: {
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  totalPrice: {
    margin: 15,
    fontSize: 20,
    alignSelf: "flex-start"
  },
  space: {
    width: "100%",
    height: 10
  },
  cover: {
    backgroundColor: "rgba(0,0,0,.5)"
  },
  sheet: {
    position: "absolute",
    top: Dimensions.get("window").height,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end"
  },
  popup: {
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: "25%"
  },
  imageDetail: {
    width: 0.35 * deviceWidth,
    height: 0.35 * deviceWidth
    // borderRadius: 10
  },
  imageDish: {
    width: 0.15 * deviceWidth,
    height: 0.15 * deviceWidth
    // borderRadius: 10
  },
  imageShop: {
    width: 0.2 * deviceWidth,
    height: 0.2 * deviceWidth
    // borderRadius: 10
  },
  orderDish: {
    flexDirection: "row",
    width: "95%",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
    elevation: 3
  },
  oderDishText: {
    fontSize: 0.025 * deviceWidth,
    color: "#636e72",
    fontWeight: "bold"
  },
  confirmOrderText: {
    fontWeight: "bold",
    fontSize: 0.05 * deviceWidth,
    marginBottom: 0.1 * deviceWidth
  }
});

export default Styles;
