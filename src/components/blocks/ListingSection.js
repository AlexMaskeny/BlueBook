import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import globalColors from '../../config/globalColors';
import globalStyles from '../../config/globalStyles';
import SubTitle from '../text/SubTitle';
import Title from '../text/Title';
import IconCircle from './IconCircle';

function ListingSection({icon, title, content}) {
  return (
    <View style={styles.container}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
            <MaterialCommunityIcons name={icon} size={20} color={globalColors.text3} />
            <View style={{width: 4}} />
            <Title size={18}>{title}</Title>
        </View>
        <SubTitle size={16} color={globalColors.text1}>{content}</SubTitle>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: globalColors.background1,
      justifyContent: "center",
      borderRadius: 8,
      borderColor: globalColors.text3,
      elevation: 1,
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 10,
      margin: 5,
      width: "100%",
      padding: 10,
      alignSelf: 'center',
  },
});

export default ListingSection;