//Created by James Hughes https://jameshughes.dev
//Designed by Alex Maden & David Sloane

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, ToastAndroid} from 'react-native';
import AppNavigator from './AppNavigator';
import './global.js';
type Props = {};

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator/>
    );
  }
}
