import { createStore } from "redux";

const orderInitialState = {
  keyShop: "",
  shopName: "",
  dishes: [],
  email: ""
};
const orderReducer = (state = orderInitialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        email: action.email
      };
    case "ADD_TO_ORDER":
      return {
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
