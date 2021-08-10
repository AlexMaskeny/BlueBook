import React from 'react';
import { View, StyleSheet } from 'react-native';

import styles from '../../config/globalStyles';
import IconButton from './IconButton';

function TabBarButton({ width="100%", ...otherProps }) {
    return (
        <View style={[styles.TabBarButton, { width: width }]}>
            <IconButton {...otherProps} />
        </View>
    );
}

export default TabBarButton;