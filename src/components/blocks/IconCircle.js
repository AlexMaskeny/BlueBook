import React from 'react';
import { View, StyleSheet } from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons"
import globalColors from '../../config/globalColors';
import { Image } from 'react-native-expo-image-cache';

function IconCircle({color, image, width, size, icon, iconColor}) {
  return (
    <View style={[styles.container, {width: width}]}>
        {color &&
            <View style={{backgroundColor: color, borderRadius: 100, width: width, height: width, alignItems: "center", justifyContent: "center"}}>
                <MaterialCommunityIcons name={icon} color={iconColor ? iconColor : globalColors.background1} size={size} />
            </View>
        }
        {image &&
            <Image uri={image} style={{width: width, height: width, borderRadius: 100}} />
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
  },
});

export default IconCircle;