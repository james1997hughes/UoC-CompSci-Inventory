import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, ToastAndroid, Alert} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { createStackNavigator, createAppContainer } from "react-navigation";
let dialogOpen = false;

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
              if(!dialogOpen && ITEM_SCANNER_ACTIVE)
              {
                //TODO: VALIDATE THAT ITS A QR CODE
                this.displayDialogue(JSON.stringify(barcodes[0].rawData));

              }
            }}
          />
        </View>
    );
  }
  displayDialogue(ItemScanned){
    console.log(`Item scanned: ${ItemScanned}`);
    dialogOpen = true;
    Alert.alert(
      'User Login',
      `Are you sure you want to check out ${ItemScanned}?`,
    [{
      text: 'No',
      style: 'cancel',
      onPress: () => {dialogOpen = false},
    },
    {text: 'Yes', onPress: () => {
      this.displayTerms(ItemScanned);
    }
    },],
    {cancelable: false},
    );

  }
  displayTerms(ItemScanned){
    dialogOpen = true;
    Alert.alert(
      'Terms & Conditions',
      `1. To take all reasonable care to avoid loss of or damage to the equipment.\n\n
        2. In the event of theft, inform the police immediately and advise Paul Underhill as soon as reasonably
        practical.\n\n
        3. If the equipment is returned without all of its accessories, charges may apply.\n\n
        5. During periods of high demand, we reserve the right to recall equipment for the next due date and failure to
        return your items may result in fines.\n\n
        6. By agreeing to these conditions, you assume liability for any costs resulting from loss or damage caused to
        the equipment while it is in your care.\n\n
        7. You are not authorised to take any equipment outside of the UK.\n\n
        8. University of Chester computer policy applies\n\n`,
    [{
      text: 'Disagree',
      style: 'cancel',
      onPress: () => {dialogOpen = false},
    },
    {text: 'Agree', onPress: () => {
      this.checkoutItem(ItemScanned);
      ITEM_SCANNER_ACTIVE = false;
      dialogOpen = false;
    }
    },],
    {cancelable: false},
    );
  }

  checkoutItem(ItemScanned){
    var today = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var data = `'{\n\t\"Loaned\":\"true\",\n\t\"StudentNo\":\"${USER_LOGGED_IN}\",\n\t"SignOutDate\":\"${today}\"\n}'`;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    let itemToSend = ItemScanned.replace('"', '').replace('"', '');
    let serverAddress = `http:\/\/10.74.1.60:5000/api/item/${itemToSend}`;
    console.log(serverAddress);
    console.log(data);
    console.log(today);
    xhr.open("PATCH", serverAddress);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);
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
