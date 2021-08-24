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
            <IconButton Material={true} color={globalColors.background1} size={34} icon='arrow-back-ios' onPress={()=>{
              if (route.params.parent && route.params.mainCat) {
                navigation.navigate("Listings", {mainCat: route.params.mainCat, backData: route.params.backData, parent: route.params.parent})
              } else {
                navigation.navigate("MainCats", {initialData: route.params.backData, fromSearch: "Yes"})
              }
            }
            }/>
        </View>
        <Title size={18} color={globalColors.background1} numberOfLines={2} style={{flex: 1, alignContent: "center", alignItems: "center", justifyContent: "center"}}>{route.params.item.title}</Title>
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