import React from "react";
import { StyleSheet, Picker } from "react-native";
import { firebaseApp } from "./../connectDatabase/connectFirebase";
import Styles from "./../css/Styles";

const rootRef = firebaseApp.database().ref();
const labelsRef = rootRef.child("labels");
const citiesRef = rootRef.child("cities");

class PickerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerSelection: "default value",
      labels: [],
      cities: [],
      loadedLabels: false,
      loadedCities: false
    };
  }

  async componentDidMount() {
    await labelsRef.once("value", childSnapshot => {
      const labels = [];
      childSnapshot.forEach(element => {
        labels.push({
          key: element.key,
          labelName: element.toJSON().toString()
        });

        this.setState({
          labels: labels,
          loadedLabels: true
        });
      });
    });
    await citiesRef.once("value", childSnapshot => {
      const cities = [];
      childSnapshot.forEach(element => {
        cities.push({
          key: element.key,
          cityName: element.toJSON().toString()
        });

        this.setState({
          cities: cities,
          loadedCities: true
        });
      });
    });
  }

  mapComponent() {
    if (this.props.type == "city")
      return this.state.cities.map((l, i) => (
        <Picker.Item label={l.cityName} value={l.cityName} key={i} />
      ));
    else
      return this.state.labels.map((l, i) => (
        <Picker.Item label={l.labelName} value={l.labelName} key={i} />
      ));
  }

  render() {
    return (
      <Picker
        selectedValue={this.state.pickerSelection}
        style={Styles.list}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({ pickerSelection: itemValue })
        }
      >
        {this.props.type == "city" ? (
          <Picker.Item label="Select city..." value="" />
        ) : (
          <Picker.Item label="Select label..." value="" />
        )}
        {this.mapComponent()}
      </Picker>
    );
  }
}

export default PickerList;
