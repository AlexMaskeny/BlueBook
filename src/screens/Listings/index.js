import React, {useEffect, useRef, useState} from 'react';
import {FlatList, View, TouchableOpacity, Alert} from 'react-native';

import appNav from '../../appNav';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import API from '@aws-amplify/api';
import { listLists } from '../../graphql/queries';
import NoConnection from '../../components/blocks/NoConnection';
import Post from '../../components/blocks/Post';
import Spinner from 'react-native-loading-spinner-overlay';
import Category from '../../components/blocks/Category';

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
          query: listLists, variables: {
            filter: {
              categories: {
                contains: route.params.parent.id,
              }
            }
          }
        })
        if (result) {
          //console.log(result);
          const items = result.data.listLists.items;
          items.sort(function(a, b){
            return b.featured-a.featured;
          })
          //console.log(items);
          makeData(items);
          await AsyncStorage.setItem("listings"+route.params.parent.id, JSON.stringify({
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
      const data = await AsyncStorage.getItem("listings"+route.params.parent.id);
      const parsed = JSON.parse(data);
      //console.log(parsed);
      if (!parsed) {
        onRefresh();
      } else {
        if (Date.now() - parsed.date > 3600000) {
          AsyncStorage.removeItem("listings"+route.params.parent.id);
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
    <View style={styles.page}>
      <Spinner 
        visible={loading}
      />
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
            const image = (item.cover ? item.cover : route.params.parent.image);
            const content = (item.content.length > 0 ? item.content : (item.website.length > 0 ? item.website.slice(7) : item.phone))
            const logo = (item.logo.length > 0 ? "https://bluebooklocal.com"+item.logo : false);

            if (item.type == "place") {
              return (
                <TouchableOpacity onPress={async ()=>{
                   setLoading(true);
                   await appNav.nav(navigation, route, "Listings", "Listing", {item: {...item, image: image}})
                   setLoading(false);
                }}>
                  <Post cover={"https://bluebooklocal.com"+image} name={item.title} icon={route.params.parent.icon} logo={logo} category={route.params.parent.name} content={content} id={item.id}/>
                </TouchableOpacity>
              )
            } else {
              return (
                <TouchableOpacity onPress={async ()=>{
                    setLoading(true);
                    await appNav.nav(navigation, route, "Listings", "Coupon", {item: {...item, image: image}})
                    setLoading(false);
                }}>
                  <Category image={"https://www.bluebooklocal.com"+item.cover}  name={item.title} />
                </TouchableOpacity>
              )
            }
          }
        }}
      />
    </View>
  );
}


export default index;