import { createStore } from "redux";

const orderInitialState = {
  keyShop: "",
  shopName: "",
  dishes: [],
  email: "",
  keyOrder: "",
  userKey: ""
};
const orderReducer = (state = orderInitialState, action) => {
  switch (action.type) {
    case "SEND_KEY_ORDER":
      return {
        keyOrder: action.keyOrder
      };
    case "SIGN_IN":
      return {
        email: action.email
      };
    case "ADD_TO_ORDER":
      return {
        userKey: action.getItem.userKey,
        keyShop: action.getItem.keyShop,
        shopName: action.getItem.shopName,
        dishes: action.getItem.order
      };
    default:
      return state;
  }
};

const store1 = createStore(orderReducer);

export default store1;
