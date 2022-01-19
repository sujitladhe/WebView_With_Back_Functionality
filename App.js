import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";
import { WebView } from 'react-native-webview';


export const App = () => {

  const webView = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', HandleBackPressed);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', HandleBackPressed);
      }
    }
  }, []); // INITIALIZE ONLY ONCE

  const HandleBackPressed = () => {
    if (webView.current) {
      if(canGoBack){
        webView.current.goBack();
      return true; // PREVENT DEFAULT BEHAVIOUR (EXITING THE APP)
      } else {
        Alert.alert("Hold on!", "Are you sure you want to exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
      }
    } 
}

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      HandleBackPressed
    );

  return(
    <WebView 
    style={styles.container} 
    ref={webView}
    source={{ uri: 'https://reactnative.dev/' }} 
    onNavigationStateChange={navState => setCanGoBack(navState.canGoBack)}
    /> 
  );
};
 
const styles = StyleSheet.create({
  container: {
    marginTop: 0
  },
});