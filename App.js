import Amplify from '@aws-amplify/core';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import awsExports from './src/aws-exports';
import Screen from './src/components/general/Screen';
import Spacer from './src/components/general/Spacer';
import SubTitle from './src/components/text/SubTitle';
import Title from './src/components/text/Title';
import globalColors from './src/config/globalColors';
import TestScreen from './src/screens/testScreen';
import Button from './src/components/buttons/Button'; 
import MainCats from './src/screens/MainCats/index';
import LoadingScreen from './src/screens/loadingScreen';
import Navigation from './src/navigation';
import SubCats from './src/screens/SubCats/index';
import Post from './src/components/blocks/Post';
 
Amplify.configure(awsExports);

export default function App() {
  return (
    <Navigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
