import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  containerHome: {
    flex: 8,
    backgroundColor: "white",
    alignItems: "center",
    backgroundColor: "#0984e3"
  },
  button: {
    backgroundColor: "red",
    borderWidth: 5,
    borderRadius: 5
  },
  text: {
    fontSize: 20,
    color: "white"
  },
  containerList: {
    height: "7%",
    alignItems: "center"
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
  shopName: {
    flex: 1,
    fontSize: 20
  },
  shop: {
    flex: 1,
    width: "95%",
    padding: 5,
    borderRadius: 5,
    backgroundColor: "white",
    marginTop: 5,
    marginBottom: 5,
    elevation: 3
  }
});

export default Styles;
