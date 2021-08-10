import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import globalColors from '../config/globalColors';

function loadingScreen(props) {
  return (
    <View style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={{width: 100, height: 100}} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: globalColors.primary,
      alignItems: 'center',
      justifyContent: "center",
      flex: 1,
  }
});

export default loadingScreen;