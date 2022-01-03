import React, {useState, useCallback} from 'react';
import {Linking, Platform, ScrollView, View, Text, RefreshControl, Modal, Dimensions} from 'react-native';

import globalColors from '../../config/globalColors';
import styles from './styles';
import Screen from '../../components/general/Screen';
import { Image } from 'react-native-expo-image-cache';
import Title from '../../components/text/Title';
import Button from '../../components/buttons/Button';
import ListingSection from '../../components/blocks/ListingSection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Category from '../../components/blocks/Category';
import Spinner from 'react-native-loading-spinner-overlay';
import appNav from '../../appNav';
import ClickableText from '../../components/buttons/ClickableText';
import Post from '../../components/blocks/Post';

function coupon({navigation, route}) {
  const [uri, setUri] = useState(route.params.item.website ? route.params.item.website : "");
  const [bookmarked, setBookmarked] = useState(route.params.bookmarked ? route.params.bookmarked : false);
  const [loading, setLoading] = useState(false);
  const [bigImage, setBigImage] = useState(false);
  const newBookmark = async () => {
    try {
      const data = await AsyncStorage.getItem("Bookmarks");
      var newData = [route.params];
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed) {
          if (parsed.data) {
            const filteredData = parsed.data.filter(el => {
              return el.item.id != route.params.item.id;
            }) //Avoid doubles in worst cases
            newData = [...filteredData, route.params];
          }
        }
      }
      await AsyncStorage.setItem("Bookmarks", JSON.stringify({
        data: newData,
        date: Date.now(),
      }))
      setBookmarked(true);
    } catch (error) {
      console.log(error);
    }
  }
  const removeBookmark = async () => {
    try {
      const data = await AsyncStorage.getItem("Bookmarks");
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed) {
          if (parsed.data){
            var newData = parsed.data;
            //delete newData[newData.indexOf(route.params.item.id)]
            const filteredData = newData.filter(el => {
              return el.item.id != route.params.item.id;
            })
            await AsyncStorage.setItem("Bookmarks", JSON.stringify({
              data: filteredData,
              date: Date.now(),
            }))
          }
        }
      }
      setBookmarked(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
        <ScrollView style={styles.page}>
          <Spinner 
          visible={loading}
          />
          <TouchableOpacity onPress={()=>setBigImage(true)}>
            <Category image={"https://www.bluebooklocal.com"+route.params.item.cover} />
          </TouchableOpacity>
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
                  Linking.openURL('mailto:'+route.params.item.email+'?subject=Contact From Bluebook');
                }}/>
              }
            </View>
            <Button title={bookmarked ? "Remove Bookmark" : "Bookmark"} icon="heart" onPress={()=>{
              if (bookmarked) {
                removeBookmark();

              } else {
                newBookmark();
              }
            }}/>
          </View>
          <View style={styles.bottomPage}>
            <TouchableOpacity onPress={async()=>{
              setLoading(true);
              if (route.params.fromBookmarks) {
                await appNav.nav(navigation,route,"bCoupon","bListing",{item: route.params.item, clientItem: route.params.clientItem});
              } else if (route.params.fromCoupons){
                await appNav.nav(navigation,route,"cCoupon", "cListing", {item: route.params.item, clientItem: route.params.clientItem});
              } else {
                await appNav.nav(navigation,route,"Coupon","Listing",{item: route.params.item, clientItem: route.params.clientItem})
              }
              setLoading(false);
            }}>
              <ListingSection icon="offer" title="Offered By" content={route.params.clientItem.title} />
            </TouchableOpacity>
            {(route.params.item.content.length > 0) &&
              <ListingSection icon="reorder-horizontal" title="Description" content={route.params.item.content.replace("<br>", "\n")}/>
            }
            {(route.params.item.phone.length > 0) &&
              <TouchableOpacity onPress={()=>{
                Linking.openURL('tel:'+route.params.item.phone);
              }}>
                <ListingSection icon="phone" title="Phone Number" content={route.params.item.phone}/>
              </TouchableOpacity>
            }
            {(route.params.item.email.length > 0) &&
              <TouchableOpacity onPress={()=>{
                Linking.openURL('mailto:'+route.params.item.email+'?subject=Contact From Bluebook');
              }}>
                <ListingSection icon="email" title="Email Address" content={route.params.item.email}/>
              </TouchableOpacity>
            }
            
            {(route.params.item.website.length > 0) &&
              <TouchableOpacity onPress={()=>{
                if (route.params.item.website.charAt(0).toLowerCase() != "h") {
                  setUri("http://"+route.params.item.website);
                }
                Linking.openURL(uri);
              }}>
                <ListingSection icon="web" title="Website" content={route.params.item.website}/>
              </TouchableOpacity>
            }
            {(route.params.item.address.length > 0) &&
              <TouchableOpacity onPress={()=>{
                Linking.openURL('http://maps.apple.com/maps?daddr='+route.params.item.address);
              }}>
                <ListingSection icon="google-maps" title="Address" content={route.params.item.address}/>
              </TouchableOpacity>
            }
          </View>
        </ScrollView>
        <Modal visible={bigImage}>
          <View style={{...styles.topBar1, alignItems: "flex-end", justifyContent: "center"}}>
            <ClickableText title="Close" type="subTitle" tStyle={{color: globalColors.background1}} onPress={()=>setBigImage(false)}/>
          </View>
          <View style={{flex: 1, alignItems: "center", justifyContent: "center", padding: 10,}}>
            
            <Image uri={"https://www.bluebooklocal.com"+route.params.item.cover} style={{width: Dimensions.get("screen").width*2-20, minHeight: Dimensions.get("screen").width-20, resizeMode: "contain", transform: [{rotate: '90deg'}]}}/>
          </View>
        </Modal>
      </>
  );
}


export default coupon;