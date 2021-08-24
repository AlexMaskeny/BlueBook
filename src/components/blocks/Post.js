import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import globalColors from '../../config/globalColors';
import globalStyles from '../../config/globalStyles';
import SubTitle from '../text/SubTitle';
import Title from '../text/Title';
import IconCircle from './IconCircle';

function Post({cover, name, icon, category, logo, content, id}) {
  return (
    <View style={styles.container}>
        <Image style={{flex: 1, borderRadius: 7, opacity: 0.4, height: "40%", borderBottomLeftRadius: 0, borderBottomRightRadius: 0}} uri={cover} />
        <View style={styles.inner}>
            <Title style={{flex:1}} size={20} numberOfLines={1}>{name}</Title>
            {content.length > 0 &&
                <SubTitle style={{flex:1}} size={16} numberOfLines={1}>{content}</SubTitle>
            }
            <View style={styles.category}>
                <IconCircle color={globalColors.primary} icon={icon} width={50} size={36} />
                <View style={{width: 10}} />
                <SubTitle size={16} color={globalColors.text1}>{category}</SubTitle>
                {/* <TouchableOpacity onPress={()=>console.log("Favorite" + id)} style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                    <IconCircle color={globalColors.background4} icon="heart-outline" iconColor={globalColors.text2} width={36} size={22} />
                </TouchableOpacity> */}
            </View>
        </View>
        {logo &&
            <Image style={{borderRadius: 100, height: 80, width: 80, position: "absolute", backgroundColor: globalColors.background1, borderColor: globalColors.background1, borderWidth: 3, left: 20, bottom: 120}} uri={logo} />
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      width: "95%",
      height: 260,
      backgroundColor: globalColors.text2,
      justifyContent: "center",
      borderRadius: 8,
      borderColor: globalColors.text3,
      elevation: 1,
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.6,
      shadowRadius: 5,
      elevation: 10,
      marginVertical: 6,
      alignSelf: 'center',
  },
  inner: {
      alignItems: "flex-start",
      justifyContent: "flex-start",
      backgroundColor: globalColors.background1,
      width: "100%",
      height: "60%",
      padding: 10,
      paddingTop: 40,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
  },
  category: {
      flexDirection: "row",
      alignItems: "center"
  }
});

export default Post;