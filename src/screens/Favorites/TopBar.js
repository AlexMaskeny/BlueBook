import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

import globalStyles from '../../config/globalStyles';
import globalColors from '../../config/globalColors';
import styles from './styles';
import functions from './functions';
import Title from '../../components/text/Title';
import IconButton from '../../components/buttons/IconButton';

function topBar() {
  return (
    <>    
    <View style={styles.topBar1}>
        <Title size={18} color={globalColors.background1} numberOfLines={2} style={{flex: 1, alignContent: "center", alignItems: "center", justifyContent: "center"}}>Bookmarked</Title>
    </View>
    </>
  );
}


export default topBar;