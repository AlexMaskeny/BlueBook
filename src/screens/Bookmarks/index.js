import React, {useEffect, useRef, useState} from 'react';
import {FlatList, View, TouchableOpacity} from 'react-native';

import globalStyles from '../../config/globalStyles';
import globalColors from '../../config/globalColors';
import styles from './styles';
import functions from './functions';
import Screen from '../../components/general/Screen';
import TopBar from './TopBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import API from '@aws-amplify/api';
import { getListsById, listLists } from '../../graphql/queries';
import NoBookmarks from '../../components/blocks/NoBookmarks';
import NoResults from '../../components/blocks/NoResults';
import Spinner from 'react-native-loading-spinner-overlay';
import Post from '../../components/blocks/Post';
import { TabRouter } from '@react-navigation/routers';
import Category from '../../components/blocks/Category';
import appNav from '../../appNav';

function index({navigation, route}) {
  const [data, setData] = useState([]);
  const fullData = useRef([]);
  const [loading, setLoading] = useState(false);
  const makeData = (newData) => {
    setData(newData.slice(0, 6));
    fullData.current = newData;
  }
  const [refresh, setRefresh] = useState(false);
  const onInitial = async () => {
    setRefresh(true);
    try {
      const bookmarks = await AsyncStorage.getItem("Bookmarks");
      if (bookmarks) {
        const parsed = JSON.parse(bookmarks);
        if (parsed) {
          if (parsed.data) {
            //console.log(parsed.data);
            makeData(parsed.data.reverse());
          }
        }
      }
    } catch (error) {
        console.log(error);
    }
    setRefresh(false);
  }
  useEffect(()=>{
    onInitial();
  }, [])
  return (
    <Screen style={styles.page}>
      <Spinner 
        visible={loading}
      />
      <TopBar number={fullData.current.length} />
      <FlatList 
        data={data}
        ListHeaderComponent={()=>(
          <>
            {data.length < 1 && 
              <>
                <NoBookmarks />
              </>
            } 
          </>
        )}
        style={{width: '100%'}}
        onEndReachedThreshold={0.3}
        onEndReached={()=>{
          setData(fullData.current.slice(0,data.length+6));
          //console.log("end");
        }}
        keyExtractor={(listing)=>listing.item.id.toString()}
        refreshing={refresh}
        onRefresh={onInitial}
        renderItem={({item})=> {
          const content = (item.item.content.length > 0 ? item.item.content : (item.item.website.length > 0 ? item.item.website.slice(7) : item.item.phone))
          const logo = (item.item.logo.length > 0 ? "https://bluebooklocal.com"+item.item.logo : false);
          //console.log(item);
          if (item.search || ((item.fromCoupons || item.fromBookmarks) && item.item.type=="place")) {
            const image = item.item.cover;
            return (
              <TouchableOpacity onPress={async()=>{
                setLoading(true);
                await appNav.nav(navigation, route, "Bookmarks", 'bListing', {item: item.item});
                setLoading(false)
              }}>
                <Post cover={"https://bluebooklocal.com"+image} name={item.item.title} logo={logo} content={content} id={item.item.id} />
              </TouchableOpacity>
            )
          } else {
            if (item.item.type == "place") {
              const image = (item.item.cover ? item.item.cover : item.parent.image);
              return (
                <TouchableOpacity onPress={async()=>{
                  setLoading(true);
                  await appNav.nav(navigation, route, "Bookmarks", 'bListing', {item: item.item});
                  setLoading(false);
                }}>
                  <Post cover={"https://bluebooklocal.com"+image} name={item.item.title} icon={item.parent.icon} logo={logo} category={item.parent.name} content={content} id={item.item.id} />
                </TouchableOpacity>
              )
            } else {
              return (
                <TouchableOpacity onPress={async()=>{
                  setLoading(true);
                  await appNav.nav(navigation, route, "Bookmarks", 'bCoupon', {item: item.item});
                  setLoading(false);
                }}>
                  <Category image={"https://www.bluebooklocal.com"+item.item.cover} name={item.item.title} />
                </TouchableOpacity>
              )
            }
          }
        }}
      />
    </Screen>
  );
}


export default index;