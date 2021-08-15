import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import globalColors from '../../config/globalColors';
import globalStyles from '../../config/globalStyles';

function Button({title, icon, textColor = globalColors.background1, onPress, borderColor = globalColors.text3, padding = 15, givenStyle, disabled=false, loading = false,}) {
    return (
        <TouchableOpacity style={[styles.bContainer, {borderColor: borderColor, borderWidth: 1, padding: padding}, globalStyles.itemRadius, givenStyle]} onPress={onPress} disabled={disabled}>  
            <View style={styles.innerContainer}>
                {!loading && 
                <View style={styles.iconContainer}>
                    {icon &&
                        <MaterialCommunityIcons name={icon} size={22} color={textColor} />
                    }
                    <View style={{width: 5}} />
                    <Text style={[styles.text, {color: textColor}]}>{title}</Text>
                </View>
                }
                {loading &&
                    <ActivityIndicator size="small" color={textColor} />
                }
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    bContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: globalColors.primary,
        padding: 10,
        flex: 1,
        marginVertical: 5,
        elevation: 10,
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
    },
    innerContainer: {
        width: "100%",
        alignItems: "center",
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: "center",
    },
})

export default Button;