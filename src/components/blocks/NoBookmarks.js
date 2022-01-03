import React from 'react';
import { View, StyleSheet } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import globalColors from '../../config/globalColors';
import Title from '../text/Title';
import SubTitle from '../text/SubTitle';
import Button from '../buttons/Button';

function NoBookmarks() {
  return (
    <View style={styles.container}>
        <MaterialCommunityIcons name="emoticon-frown" size={100} color={globalColors.primary} />
        <Title>You have no bookmarks</Title>
        <SubTitle>To view an added bookmark you</SubTitle>
        <SubTitle>may need to refesh this page.</SubTitle>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      width: "100%",
      height: 250,
      alignItems: 'center',
      justifyContent: "center",
  }
});

export default NoBookmarks;