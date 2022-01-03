import Amplify from '@aws-amplify/core';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import awsExports from './src/aws-exports';
import Navigation from './src/navigation';
 
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
