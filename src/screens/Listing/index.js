import React, {useState, useCallback} from 'react';
import {Linking, Platform, ScrollView, View, Alert, RefreshControl, FlatList} from 'react-native';

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
import appNav from '../../appNav';
import Spinner from 'react-native-loading-spinner-overlay';

function index({navigation, route}) {
  const [uri, setUri] = useState(route.params.item.website ? route.params.item.website : "");
  const [bookmarked, setBookmarked] = useState(route.params.bookmarked ? route.params.bookmarked : false);
  const [loading, setLoading] = useState(false);
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
        <FlatList 
          data={route.params.coupons != "Disconnected" ? route.params.coupons : [
            {
              id: 1
            }
          ]}
          style={{width: '100%'}}
          keyExtractor={(listing)=>listing.id.toString()}
          ListHeaderComponent={
            <>
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
                {route.params.coupons.length > 0 &&
                <View style={{marginTop: 20, alignItems: "center", justifyContent: "center"}}>
                  <Title>Coupons</Title>
                </View>
                }
              </View>
            </>
          }
          renderItem={({item})=> {
              return (
                <TouchableOpacity onPress={async ()=>{
                  setLoading(true);
                  if (route.params.fromBookmarks) {
                    await appNav.nav(navigation,route,"bListing","bCoupon",{item: item});

                  } else if(route.params.fromCoupons) {
                    await appNav.nav(navigation,route,"cListing","cCoupon",{item: item});
                  } else {
                    await appNav.nav(navigation,route,"Listing","Coupon",{item: item});
                  }
                  setLoading(false);
                }}>
                  <Category image={"https://www.bluebooklocal.com"+item.cover}/>
                </TouchableOpacity>
              )
            }
          }
        />
  );
}


export default index;