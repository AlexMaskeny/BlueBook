import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import globalColors from '../../config/globalColors';
import globalStyles from '../../config/globalStyles';
import SubTitle from '../text/SubTitle';
import Title from '../text/Title';

function Category({image, name, icon, numListings}) {
  return (
    <View style={styles.container}>
        <Image style={{flex: 1, borderRadius: 7, opacity: 0.5}} uri={image} />
        <View style={styles.inner}>
            <MaterialCommunityIcons name={icon} size={80} color={globalColors.background1} />
            <View style={{height: 30}} />
            <Title color={globalColors.background1}>{name}</Title>
            <SubTitle color={globalColors.text4}>{numListings} listings</SubTitle>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      width: "95%",
      height: 240,
      backgroundColor: globalColors.text2,
      justifyContent: "center",
      borderRadius: 8,
      borderColor: globalColors.text3,
      borderWidth: 1,
      elevation: 1,
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.6,
      shadowRadius: 5,
      elevation: 10,
      marginVertical: 6,
      alignSelf: 'center',
  },
  inner: {
      position: 'absolute',
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center"
  }
});

export default Category;