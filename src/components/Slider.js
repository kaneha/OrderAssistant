import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSlider: [
        require("./../assets/pictures/pic1.jpg"),
        require("./../assets/pictures/pic2.jpg"),
        require("./../assets/pictures/pic3.jpg")
      ]
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Swiper autoplay index={1}>
          {this.state.imageSlider.map((item, key) => (
            <Image style={styles.image} key={key} source={item} />
          ))}
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B9CFC",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    flex: 1,
    width: "100%"
  }
});
