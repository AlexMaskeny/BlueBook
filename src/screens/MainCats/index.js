import React, { useState } from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';

import appNav from '../../appNav';
import API from '@aws-amplify/api';
import {getCategoriesByParent} from '../../graphql/queries';
import styles from './styles';
import Screen from '../../components/general/Screen';
import TopBar1 from './TopBar1';
import Title from '../../components/text/Title';
import Category from '../../components/blocks/Category'
import NetInfo from "@react-native-community/netinfo";
import NoConnection from '../../components/blocks/NoConnection';

const icons = {
  "102": "briefcase",
  "535": "emoticon-happy",
  "109": "silverware-fork-knife",
  "534": "airplane",
  "537": "dog",
  "108": "home",
  "110": "gift",
  "114": "run",
  "113": "car",
  "111": "medical-bag",
  "112": "home-group",
  "536": "account-group",
}

function index({navigation, route}) {
  const [data, makeData] = useState(route.params.initialData);
  const setData = (newData) => {
    const Data = newData.sort((a,b)=> {
      if (a.name > b.name) {
        return 1;
      } else {
        return -1;
      }
    })
    makeData(Data);
  }
  const [refresh, setRefresh] = useState(false);
  const onRefresh = async () => {
    setRefresh(true);
    try {
      const netInfo = await NetInfo.fetch();
      if (netInfo.isConnected) {
        const result = await API.graphql({
          query: getCategoriesByParent, variables: {
            parentId: "0"
          }
        })
        if (result) {
          //console.log(result.data.getCategoriesByParent.categories);
          setData(result.data.getCategoriesByParent.categories);
          setRefresh(false);
        } else {
  
        }
      } else {
        setData("Disconnected")
        setRefresh(false);
      }
    } catch (error) {
      
    }
  }
  return (
    <Screen style={styles.page}>
      <TopBar1 data={data} navigation={navigation} route={route}/>
      <View style={styles.container}>
        <FlatList 
          data={data != "Disconnected" ? data : [
            {
              id: 1,
            }
          ]}
          style={{width: '100%'}}
          ListHeaderComponent={<View style={{alignItems: "center", flex: 1, paddingTop: 10}}><Title>{data != "Disconnected" && "Main Categories"}</Title></View>}
          keyExtractor={(category)=>category.id.toString()}
          refreshing={refresh}
          onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
          renderItem={({item})=> {
            if (icons[item.id]) {
              return (
                <TouchableOpacity onPress={()=>appNav.nav(navigation,route,"MainCats","SubCats",{item: {...item, icon: icons[item.id]}})}>
                  <Category image={"https://www.bluebooklocal.com"+item.image} icon={icons[item.id]} name={item.name} numListings={item.count}/>
                </TouchableOpacity>
              )
            } else if (item.id == "1") {
              return (
                <NoConnection />
              )
            }
          }}
        />
      </View>
    </Screen>
  );
}


export default index;