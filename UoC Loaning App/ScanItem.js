import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, ToastAndroid} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class App extends Component<Props> {
  render() {
      if (ITEM_SCANNER_ACTIVE){
        return this.showCamera();
      }else{
        return null;
      }

  }
  showCamera(){
    return(
      <View style={styles.container}>
          <RNCamera
            ref={ref => {this.camera = ref;}}
            style={styles.preview}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            captureAudio={false}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {


              this.props.navigation.navigate('MenuScreen', {'IDScanned': JSON.stringify(barcodes[0].rawData)});
              console.log(barcodes[0]);
            }}
          />
        </View>
    );
  }
}
const styles = StyleSheet.create({
  preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
