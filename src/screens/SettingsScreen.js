import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
import QRCode from "react-native-qrcode";

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyOrder: ""
    };
  }

  componentWillMount() {
    if (this.props.keyOrder) {
      this.setState({
        keyOrder: this.props.keyOrder
      });
    }
  }

  render() {
    console.log(this.props.keyOrder);
    return (
      <View style={styles.container}>
        <QRCode
          value={this.state.keyOrder}
          size={200}
          bgColor="purple"
          fgColor="white"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bdc3c7",
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    keyOrder: state.keyOrder
  };
};

export default connect(
  mapStateToProps,
  null,
  null
)(SettingsScreen);
