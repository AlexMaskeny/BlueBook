import React from 'react';
import { View, StyleSheet } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import globalColors from '../../config/globalColors';
import Title from '../text/Title';
import SubTitle from '../text/SubTitle';
import Button from '../buttons/Button';

function NoResults() {
  return (
    <View style={styles.container}>
        <MaterialCommunityIcons name="emoticon-frown" size={100} color={globalColors.primary} />
        <Title>No Results Found</Title>
        <SubTitle>We didn't find any listings</SubTitle>
        <SubTitle>for this search / category</SubTitle>
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

export default NoResults;