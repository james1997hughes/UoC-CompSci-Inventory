import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, ToastAndroid, FlatList, TouchableOpacity} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import ListItem from './ListItem.js';

export default class App extends Component<Props> {

  constructor(props){
    super(props);
    this.state = { itemList: [] };
  }

  async componentDidMount(){
    ID_SCANNER_ACTIVE = false;
    var idPassed=this.props.navigation.getParam('IDScanned');
    console.log(idPassed.substring(2, 9));
    await fetch(`http://10.74.1.60:5000/api/item/bystudent/${idPassed.substring(2, 9)}`)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({itemList: responseJson});
    })
    .catch((error) => {
      console.error(error);
    });

  }

  _renderItem = ({item}) => (
    <ListItem
      id={item.id}
      deviceType={item.deviceType}
    />
  );

  render() {
    return (
      <View style={styles.container}>
          <FlatList
            data={this.state.itemList}
            renderItem={this._renderItem}/>
          <TouchableOpacity onPress={() =>
            this.props.navigation.navigate('ScanItem')
          }
          style={styles.addItem}
          >
            <Text style={styles.addIcon}>+</Text>
          </TouchableOpacity>
      </View>

    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  addItem: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: 'red',
  },
  addIcon: {
    fontSize: 40,
    color: 'white',
  },
});
