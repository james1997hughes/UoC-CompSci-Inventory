import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, ToastAndroid, Alert} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { createStackNavigator, createAppContainer } from "react-navigation";
let dialogOpen = false;

export default class App extends Component<Props> {
  render() {
      if (ID_SCANNER_ACTIVE){
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
              if(!dialogOpen && ID_SCANNER_ACTIVE)
              {
                //TODO: Validate that it's a code39
                this.displayDialogue(JSON.stringify(barcodes[0].rawData));
              }
            }}
          />
        </View>
    );
  }

  displayDialogue(IDScanned){
    dialogOpen = true;
    let IDParsed = IDScanned.substring(2, 9);
    Alert.alert(
      'User Login',
      `Are you sure you want to login as user ID ${IDParsed}?`,
    [{
      text: 'Cancel',
      style: 'cancel',
      onPress: () => {dialogOpen = false},
    },
    {text: 'Confirm', onPress: () => {
      this.props.navigation.navigate('MenuScreen', {'IDScanned': IDScanned});
        ID_SCANNER_ACTIVE = false;
      dialogOpen = false;
    }
    },],
    {cancelable: false},
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
