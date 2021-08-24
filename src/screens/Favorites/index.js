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
import { getListsById } from '../../graphql/queries';
import NoConnection from '../../components/blocks/NoConnection';
import NoResults from '../../components/blocks/NoResults';
import Post from '../../components/blocks/Post';

function index({navigation, route}) {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const getData = async (ids) => {
    setRefresh(true);
    //console.log("Hi2")
    try {
      const netInfo = await NetInfo.fetch();
      if (netInfo.isConnected) {
        //get the RESULT which is a query of listallitems with id = ids
        if (result) {
          const result = await API.graphql({
            query: getListsById, variables: {
              ids: ids,
            }
          })
          console.log(result);
          setData(result.data.getListsById.items);
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
      const data = await AsyncStorage.getItem("favorites");
      const parsed = JSON.parse(data);
      //console.log(parsed);
      if (parsed) {
        getData(parsed);
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
      <TopBar/>
      <FlatList 
        data={data != "Disconnected" ? data : [
          {
            id: 1
          }
        ]}
        style={{width: '100%'}}
        ListHeaderComponent={()=> (
            <>
              {data != "Disconnected" && 
              <>
                {(data.length < 1 && refresh != true) &&
                  <>
                    <NoResults />
                  </>
                }
              </>
              }
            </>
          )
        }
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
            return (
              <TouchableOpacity onPress={()=>navigation.navigate("Listing", {backData: route.params.backData, mainCat: route.params.mainCat, parent: route.params.parent, item: {...item, image: image}})}>
                <Post cover={"https://bluebooklocal.com"+image} name={item.title} icon={route.params.parent.icon} logo={logo} category={route.params.parent.name} content={content}/>
              </TouchableOpacity>
            )
          }
        }}
      />
    </Screen>
  );
}


export default index;