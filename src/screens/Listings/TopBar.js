import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

import globalStyles from '../../config/globalStyles';
import globalColors from '../../config/globalColors';
import styles from './styles';
import functions from './functions';
import Title from '../../components/text/Title';
import IconButton from '../../components/buttons/IconButton';

function topBar({navigation, route}) {
  const [active, setActive] = useState(false);
  return (
    <>    
    <View style={styles.topBar1}>
        <View style={{width: 50}}>
            <IconButton Material={true} color={globalColors.background1} size={34} icon='arrow-back-ios' onPress={()=>navigation.navigate("SubCats", {backData: route.params.backData, parent: route.params.mainCat})}/>
        </View>
        <Title size={18} color={globalColors.background1} numberOfLines={2} style={{flex: 1, alignContent: "center", alignItems: "center", justifyContent: "center"}}>{route.params.parent.name}</Title>
        <TouchableOpacity onPress={()=>navigation.navigate("MainCats", {initialData: route.params.backData})}>
            <View style={{width: 50}}>
                <Image source={require('../../../assets/logo.png')} style={{width: 50, height: 50,}} resizeMode="contain"/>
            </View>
        </TouchableOpacity>
    </View>
    </>
  );
}


export default topBar;