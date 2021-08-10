import React, {useEffect, useState} from 'react';
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
import { listLists } from '../../graphql/queries';
import NoConnection from '../../components/blocks/NoConnection';
import Post from '../../components/blocks/Post';

function index({navigation, route}) {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
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
          setData(result.data.listLists.items);
          await AsyncStorage.setItem("listings"+route.params.parent.id, JSON.stringify({
            data: result.data.listLists.items,
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
          setData(parsed.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setRefresh(false);
    //console.log(data);
  }
  useEffect(()=> {
    onInitial();
  }, [])
  return (
    <Screen style={styles.page}>
      <TopBar navigation={navigation} route={route}/>
      <FlatList 
        data={data != "Disconnected" ? data : [
          {
            id: 1
          }
        ]}
        style={{width: '100%'}}
        keyExtractor={(listing)=>listing.id.toString()}
        refreshing={refresh}
        onRefresh={onRefresh}
        renderItem={({item})=> {
          //console.log(item)
          const image = (item.cover ? item.cover : route.params.parent.image);
          const content = (item.content.length > 0 ? item.content : (item.website.length > 0 ? item.website.slice(7) : item.phone))
          if (item.id == "1") {
            return (
              <NoConnection />
            )
          } else {
            return (
              <TouchableOpacity onPress={()=>console.log(item)}>
                <Post cover={"https://bluebooklocal.com"+image} name={item.title} icon={route.params.parent.icon} category={route.params.parent.name} content={content}/>
              </TouchableOpacity>
            )
          }
        }}
      />
    </Screen>
  );
}


export default index;