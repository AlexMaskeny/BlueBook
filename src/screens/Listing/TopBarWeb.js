import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

import globalStyles from '../../config/globalStyles';
import globalColors from '../../config/globalColors';
import styles from './styles';
import functions from './functions';
import Title from '../../components/text/Title';
import IconButton from '../../components/buttons/IconButton';
import ClickableText from '../../components/buttons/ClickableText';
import SubTitle from '../../components/text/SubTitle';

function topBar({setEnabled, title, webRef}) {
  return (
    <>    
    <View style={styles.topBar2}>
        <View style={{width: 50}}>
            <ClickableText title="Done" color={globalColors.background1} onPress={()=>setEnabled(false)} type="subTitle" />
        </View>
        <View style={{flexDirection: "row", width: "62%"}}>
            <IconButton Material={true} color={globalColors.background1} size={24} icon='refresh' onPress={()=>webRef.current.reload()}/>
            <View style={{width: 5}} />
            <View style={styles.searchButton}>
                <SubTitle numberOfLines={1} color={globalColors.text4}>{title}</SubTitle>
            </View>
        </View>
        <View style={{flexDirection: "row"}}>
            <IconButton Material={true} color={globalColors.background1} size={22} icon='arrow-back-ios' onPress={()=>webRef.current.goBack()}/>
            <View style={{width: 15}} />
            <IconButton Material={true} color={globalColors.background1} size={22} icon='arrow-forward-ios' onPress={()=>webRef.current.goForward()}/>
        </View>
    </View>
    </>
  );
}


export default topBar;