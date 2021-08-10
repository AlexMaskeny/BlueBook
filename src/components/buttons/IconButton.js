import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { MaterialCommunityIcons, Ionicons, MaterialIcons } from "@expo/vector-icons";

function IconButton({ icon, color, size, onPress, style, disabled = false, Ioni = false, Material = false}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} disabled={disabled}>
      {!(Ioni || Material) &&
        <MaterialCommunityIcons name={icon} size={size} color={color} style={style} />
      }
      {Ioni &&
        <Ionicons name={icon} size={size} color={color} />
      }
      {Material &&
        <MaterialIcons name={icon} size={size} color={color} />
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  }
});

export default IconButton;