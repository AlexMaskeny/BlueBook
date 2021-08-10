import React from 'react';
import Constants from "expo-constants";
import {SafeAreaView, StyleSheet, View } from 'react-native';
import globalColors from '../../config/globalColors';

function Screen({ children, style, margin1=globalColors.primary, margin2=globalColors.background1 }) {
    return (
        <>
            <View style={[styles.screen, {backgroundColor: margin1}, style]}>
                <View style={styles.inner}>
                    {children}
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    inner: {
        flex: 1,
        width: "100%",
        backgroundColor: globalColors.background1
    }
})

export default Screen;