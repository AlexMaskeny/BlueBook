import React, {useEffect, useRef, useState} from 'react';
import {FlatList, View, TouchableOpacity, Alert} from 'react-native';

import appNav from '../../appNav';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import API from '@aws-amplify/api';
import { getCoupons, listLists } from '../../graphql/queries';
import NoConnection from '../../components/blocks/NoConnection';
import Post from '../../components/blocks/Post';
import Category from '../../components/blocks/Category';
import TopBar from './TopBar';
import Spinner from 'react-native-loading-spinner-overlay';
import Screen from '../../components/general/Screen';

function index({navigation, route}) {
  const [data, setData] = useState([]);
  const fullData = useRef([]);
  const [loading, setLoading] = useState(false);
  const makeData = (newData) => {
    const Data = newData.sort((a,b)=> {
      if (a.title > b.title) {
        return 1;
      } else {
        return -1;
      }
    })
    setData(Data.slice(0, 6));
    fullData.current = Data;
  }
  const [refresh, setRefresh] = useState(true);

  const onRefresh = async () => {
    setRefresh(true);
    //console.log("Hi2")
    try {
      const netInfo = await NetInfo.fetch();
      if (netInfo.isConnected) {
        const result = await API.graphql({
          query: getCoupons, variables: {
            type: "coupon"
          }
        })
        if (result) {
          //console.log(result);
          const items = result.data.getCoupons.listings;
          items.sort(function(a, b){
            return b.featured-a.featured;
          })
          //console.log(items);
          makeData(items);
          await AsyncStorage.setItem("coupons", JSON.stringify({
            data: items,
            date: Date.now()
          }))
          setRefresh(false);
        }
      } else {
        setData("Disconnected");
        setRefresh(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const onInitial = async () => {
    console.log(refresh);
    setRefresh(true);
    try {
      const data = await AsyncStorage.getItem("coupons");
      const parsed = JSON.parse(data);
      //console.log(parsed);
      if (!parsed) {
        onRefresh();
      } else {
        if (Date.now() - parsed.date > 3600000) {
          AsyncStorage.removeItem("coupons");
          onRefresh();
        } else {
          makeData(parsed.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setRefresh(false);
  }
  useEffect(()=> {
    onInitial();
  }, [])
  return (
    <Screen style={styles.page}>
       <Spinner 
        visible={loading}
      />
      <TopBar />
      <FlatList 
        data={data != "Disconnected" ? data : [
          {
            id: 1
          }
        ]}
        style={{width: '100%'}}
        onEndReachedThreshold={0.3}
        onEndReached={()=>{
          setData(fullData.current.slice(0,data.length+6));
          //console.log("end");
        }}
        keyExtractor={(listing)=>listing.id.toString()}
        refreshing={refresh}
        onRefresh={onRefresh}
        renderItem={({item})=> {
          //console.log(item)
          if (item.id == "1") {
            return (
              <NoConnection />
              )
            } else {
              return (
                <TouchableOpacity onPress={async ()=>{
                  setLoading(true);
                  await appNav.nav(navigation,route,"CoupListings","cCoupon",{item: item});
                  setLoading(false);
                }}>
                  <Category image={"https://www.bluebooklocal.com"+item.cover}  name={item.title} />
                </TouchableOpacity>
              )
            }
        }}
      />
    </Screen>
  );
}


export default index;