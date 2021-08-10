import React from 'react';
import { View, StyleSheet } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import globalColors from '../../config/globalColors';
import Title from '../text/Title';
import SubTitle from '../text/SubTitle';
import Button from '../buttons/Button';

function NoConnection() {
  return (
    <View style={styles.container}>
        <MaterialCommunityIcons name="transit-connection-variant" size="100" color={globalColors.primary} />
        <Title>No Connection?</Title>
        <SubTitle>You seem to be disconnected</SubTitle>
        <SubTitle>from the internet.</SubTitle>
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

export default NoConnection;