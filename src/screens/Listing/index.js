import React, {useState} from 'react';
import {Linking, Platform, ScrollView, View} from 'react-native';

import globalStyles from '../../config/globalStyles';
import globalColors from '../../config/globalColors';
import styles from './styles';
import functions from './functions';
import Screen from '../../components/general/Screen';
import { Image } from 'react-native-expo-image-cache';
import TopBar from './TopBar';
import Title from '../../components/text/Title';
import Button from '../../components/buttons/Button';
import ListingSection from '../../components/blocks/ListingSection';

function index({navigation, route}) {
  const [uri, setUri] = useState(route.params.item.website);
  return (
    <>
      <Screen>
        <TopBar navigation={navigation} route={route}/>
        <ScrollView style={styles.page}>
          <Image style={{width: "100%", height: 100, backgroundColor: globalColors.text1, opacity: 0.6}} uri={"https://bluebooklocal.com/"+route.params.item.image} />
          {route.params.item.logo.length > 0 &&
                <Image style={{borderRadius: 100, height: 80, width: 80, position: "absolute", backgroundColor: globalColors.background1, borderColor: globalColors.background1, borderWidth: 3, left: 20, top: 140 }} uri={"https://bluebooklocal.com/"+route.params.item.logo} />
          }
          <View style={styles.Bio}>
            <Title>{route.params.item.title}</Title>
            <View style={{flexDirection: "row", justifyContent: "space-between", paddingTop: 10, paddingBottom: 0}}>
              {/* <Button title="Save" icon="heart"/> */}
              {(route.params.item.website.length > 0) &&
                <Button title="Website" icon="web" onPress={()=>{
                  if (route.params.item.website.charAt(0).toLowerCase() != "h") {
                    setUri("http://"+route.params.item.website);
                  }
                  Linking.openURL(uri);
                }}/>
              }
              {(route.params.item.address.length > 0) &&
                <Button title="Map Now" icon="google-maps" onPress={()=>{
                  Linking.openURL('http://maps.apple.com/maps?daddr='+route.params.item.address);
                }}/>
              }
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between", paddingBottom: 0}}>
              {(route.params.item.phone.length > 0) &&
                <Button title="Call Now" icon="phone" onPress={()=>{
                  Linking.openURL('tel:'+route.params.item.phone);
                }}/>
              }
              {(route.params.item.email.length > 0) &&
                <Button title="Email" icon="email" onPress={()=>{
                  Linking.openURL('mailto:'+route.params.item.email+"?subject=Contact From Bluebook");
                }}/>
              }
            </View>
          </View>
          <View style={styles.bottomPage}>
            {(route.params.item.content.length > 0) &&
              <ListingSection icon="reorder-horizontal" title="Description" content={route.params.item.content}/>
            }
            {(route.params.item.phone.length > 0) &&
              <ListingSection icon="phone" title="Phone Number" content={route.params.item.phone}/>
            }
            {(route.params.item.email.length > 0) &&
              <ListingSection icon="email" title="Email Address" content={route.params.item.email}/>
            }
            {(route.params.item.website.length > 0) &&
              <ListingSection icon="web" title="Website" content={route.params.item.website}/>
            }
          </View>
        </ScrollView>
      </Screen>
    </>
  );
}


export default index;