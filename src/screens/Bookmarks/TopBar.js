import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

import globalStyles from '../../config/globalStyles';
import globalColors from '../../config/globalColors';
import styles from './styles';
import functions from './functions';
import Title from '../../components/text/Title';
import IconButton from '../../components/buttons/IconButton';

function topBar({number}) {
  return (
    <>    
    <View style={styles.topBar1}>
        <Title size={18} color={globalColors.background1} style={{alignContent: "center", alignItems: "flex-end", justifyContent: "center", alignSelf: "center"}}>Bookmarks ({number})</Title>
    </View>
    </>
  );
}


export default topBar;