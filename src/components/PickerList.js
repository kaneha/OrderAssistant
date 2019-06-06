import React from "react";
import { Picker } from "react-native";
import { firebaseApp } from "./../connectDatabase/connectFirebase";
import Styles from "./../css/Styles";

const rootRef = firebaseApp.database().ref();

class PickerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerSelection: "default value",
      list: [],
      loaded: false
    };
  }

  async componentDidMount() {
    await rootRef.child(this.props.type).once("value", childSnapshot => {
      const list = [];
      childSnapshot.forEach(element => {
        list.push({
          key: element.key,
          name: element.toJSON().toString()
        });

        this.setState({
          list: list,
          loaded: true
        });
      });
    });
  }

  onChangeState(pickerSelection) {
    this.setState({ pickerSelection: pickerSelection });
    this.props.pick(pickerSelection);
  }

  render() {
    return (
      <Picker
        selectedValue={this.state.pickerSelection}
        style={Styles.list}
        onValueChange={(itemValue, itemIndex) => this.onChangeState(itemValue)}
      >
        <Picker.Item label={this.props.label} value="" color="#636e72" />
        {this.state.list.map((l, i) => (
          <Picker.Item label={l.name} value={l.name} key={i} />
        ))}
      </Picker>
    );
  }
}

export default PickerList;
