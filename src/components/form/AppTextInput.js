import React from 'react';
import { View, StyleSheet, TextInput} from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons"

import globalColors from '../../config/globalColors';
import globalStyles from '../../config/globalStyles';

function AppTextInput({icon, inputStyle, containerStyle, reference, text, textSize=18, maxLength=128, ...otherProps}) { //This heading allows us to add more properties
    return (
        <View style={[styles.container, globalStyles.itemRadius, containerStyle]}>
            {icon && <MaterialCommunityIcons name={icon} size={20} color={globalColors.text2} style={styles.icon}/>} 
            <TextInput style={[styles.text, styles.textInput, inputStyle]} placeholderTextColor={globalColors.text3} ref={reference} maxLength={maxLength} {...otherProps}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalColors.background1,
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        maxHeight: "100%",
    },
    icon: {
        marginRight: 10,
        alignSelf: "center",
    },
    textInput: {
        flex: 1,
        alignSelf: "center",
    },
    text: {
        fontSize: 18,
        fontFamily: Platform.OS === 'android' ? "Roboto" : "Avenir",
        color: globalColors.text2,
        fontWeight: "400",
    }
})

export default AppTextInput;