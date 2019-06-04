import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, ToastAndroid, FlatList} from 'react-native';

export default class ListItem extends React.PureComponent{


  render(){
    return(
      <View style={styles.individual}>
      <Text>{this.props.id}</Text>
      <Text>{this.props.deviceType}</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  individual: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#7ec0ee',
    borderColor: '#000000',
    borderWidth: 5,
    padding: 20,
  },
});
