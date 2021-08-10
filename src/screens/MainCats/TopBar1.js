import React, {useState} from 'react';
import {View, Image, TouchableWithoutFeedback} from 'react-native';

import globalStyles from '../../config/globalStyles';
import globalColors from '../../config/globalColors';
import styles from './styles';
import functions from './functions';
import SubTitle from '../../components/text/SubTitle';
import IconButton from '../../components/buttons/IconButton';
import SearchModal from './searchModal';

function topBar(props) {
  const [active, setActive] = useState(false);
  return (
    <>    
    <View style={styles.topBar1}>
        <Image source={require('../../../assets/logo.png')} style={{width: 50, height: 50,}} resizeMode="contain"/>
        <View style={{width: 10}} />
        <TouchableWithoutFeedback onPress={()=>setActive(true)}>
            <View style={styles.searchButton}>
                <SubTitle>What are you looking for?</SubTitle>
                <IconButton Ioni={true} color={globalColors.text2} size={24} icon='search' disabled={true}/>
            </View>
        </TouchableWithoutFeedback>
    </View>
    <SearchModal active={active} setActive={setActive} />
    </>
  );
}


export default topBar;