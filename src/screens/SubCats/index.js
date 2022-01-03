import React, { useEffect, useState, useRef } from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';

import appNav from '../../appNav';
import Title from '../../components/text/Title';
import NoConnection from '../../components/blocks/NoConnection';
import NetInfo from '@react-native-community/netinfo';
import API from '@aws-amplify/api';
import { getCategoriesByParent } from '../../graphql/queries';
import Category from '../../components/blocks/Category';
import AsyncStorage from '@react-native-async-storage/async-storage';

function index({navigation, route}) {
  const [data, setData] = useState([]);
  const fullData = useRef([]);
  const [refresh, setRefresh] = useState(false);
  const makeData = (newData) => {
    const Data = newData.sort((a,b)=> {
      if (a.name > b.name) {
        return 1;
      } else {
        return -1;
      }
    })
    setData(Data.slice(0, 6));
    fullData.current = Data;
  }
  const onRefresh = async () => {
    setRefresh(true);
    //console.log(route.params.parent);
    try {
      const netInfo = await NetInfo.fetch();
      if (netInfo.isConnected) {
        const result = await API.graphql({
          query: getCategoriesByParent, variables: {
            parentId: route.params.parent.id
          }
        })
        if (result) {
          //console.log(result.data.getCategoriesByParent.categories);
          makeData(result.data.getCategoriesByParent.categories);
          await AsyncStorage.setItem("subCat"+route.params.parent.id, JSON.stringify({
            data: result.data.getCategoriesByParent.categories,
            date: Date.now()
          }));
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
      const data = await AsyncStorage.getItem("subCat"+route.params.parent.id);
      const parsed = JSON.parse(data);
      //console.log(parsed);
      if (!parsed) {
        onRefresh();
        //console.log("Data Was Gone")
      } else {
        if (Date.now() - parsed.date > 3600000) {
          AsyncStorage.removeItem("subCat"+route.params.parent.id);
          onRefresh(); 
          //console.log("Data Expired")
        } else {
          makeData(parsed.data);
          //console.log("Had Data")
        }
      }
      
    } catch (error) {
      
    }
    setRefresh(false);
  }
  useEffect(()=> {
    onInitial();
  }, [])
  return (
    <View>
      <FlatList 
        data={data != "Disconnected" ? data : [
          {
            id: "1",
          }
        ]}
        style={{width: '100%'}}
        keyExtractor={(category)=>category.id.toString()}
        ListHeaderComponent={
          <View style={{alignItems: "center", flex: 1, paddingTop: 10}}><Title>{data != "Disconnected" && "Related Categories"}</Title></View>
        }
        refreshing={refresh}
        onEndReached={()=>{
          setData(fullData.current.slice(0,data.length+6));
          //console.log("end");
        }}
        onRefresh={onRefresh}
        renderItem={({item})=> {
          const image = (item.image ? item.image : route.params.parent.image)
          if (item.id == "1") {
            return (
              <NoConnection />
            )
          } else {
            return (
              <TouchableOpacity onPress={()=>appNav.nav(navigation, route, "SubCats","Listings",{item: item})}>
                <Category image={"https://www.bluebooklocal.com"+image} icon={route.params.parent.icon} name={item.name} numListings={item.count}/>
              </TouchableOpacity>
            )
          }
        }}
      />
    </View>
  );
}


export default index;