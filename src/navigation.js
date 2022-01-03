import React, { useEffect, useState, useRef } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import API from '@aws-amplify/api';
import NetInfo from "@react-native-community/netinfo";

import { getCategoriesByParent } from './graphql/queries';
import LoadingScreen from './screens/loadingScreen';
import testScreen from './screens/testScreen';
import MainCats from './screens/MainCats/index';
import SubCats from './screens/SubCats/index';
import globalColors from './config/globalColors';
import globalStyles from './config/globalStyles';
import TabBarButton from './components/buttons/TabBarButton';
import Listings from './screens/Listings/index';
import Listing from './screens/Listing/index';
import Bookmarks from './screens/Bookmarks/index';
import IconButton from './components/buttons/IconButton';
import SubTitle from './components/text/SubTitle';
import Coupon from './screens/Listing/coupon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoupListings from './screens/Coupons/index';

function navigation() {
    const getInitialData = async () => {
        const netInfo = await NetInfo.fetch();
        //await AsyncStorage.clear();
        if (netInfo.isConnected) {
            try {
                const result = await API.graphql({
                    query: getCategoriesByParent, variables: {
                        parentId: "0"
                    }
                })
                if (result) {
                    //console.log(result.data.getCategoriesByParent.categories);
                    const Data = result.data.getCategoriesByParent.categories.sort((a,b)=> {
                        if (a.name > b.name) {
                          return 1;
                        } else {
                          return -1;
                        }
                      })
                    initialData.current=Data
                    setDataReady(true);
                } else {
    
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            initialData.current="Disconnected";
            console.log("Disconnected");
        }
    }
    const [dataReady, setDataReady] = useState(false);
    const initialData=useRef({});
    useEffect(()=>{getInitialData()}, []);
    const GeneralTab = createBottomTabNavigator();
    const GeneralTabNavigator = () => (
        <GeneralTab.Navigator
            screenOptions={{
                headerShown: false,
                activateTintColor: globalColors.primary,
                inactiveTintColor: globalColors.text1,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: globalStyles.footerHeight,
                    backgroundColor: globalColors.background1,
                    alignItems: "center",
                    justifyContent: "center",
                }
            }}
        >
            <GeneralTab.Screen name="Explore" initialParams={{initialData: initialData.current}} component={ExploreStackNavigator} options={({ navigation }) => ({tabBarIcon: ({color}) => <TabBarButton icon="search" Ioni={true} color={color} size={36} onPress={()=>navigation.navigate("MainCats")}/> })} />
            <GeneralTab.Screen name="Coupons" component={CoupStackNavigator} options={({ navigation }) => ({tabBarIcon: ({color}) => <TabBarButton icon="tag-outline" color={color} size={36} onPress={()=>navigation.navigate("Coupons")} /> })} />
            <GeneralTab.Screen name="Bookmark" component={BookStackNavigator} options={({ navigation }) => ({tabBarIcon: ({color}) => <TabBarButton icon="heart-outline" color={color} size={36} onPress={()=>navigation.navigate("Bookmark")} /> })} />
        </GeneralTab.Navigator>
    )
    const stackOptions = ({route, navigation}) => ({
        headerShown: true,
        headerStyle: {
            backgroundColor: globalColors.primary,
            height: globalStyles.headerHeight+30,
        },
        headerBackAccessibilityLabel: "",
        headerTintColor: globalColors.background1,
        headerBackTitle: "Back",
        headerBackTitleVisible: false,
        headerRight: () => (
            <TouchableOpacity onPress={()=>navigation.navigate("MainCats", {initialData: route.params.backData})}>
                <View style={{width: 50}}>
                    <Image source={require('../assets/logo.png')} style={{width: 50, height: 50,}} resizeMode="contain"/>
                </View>
            </TouchableOpacity>
        ),
        headerLeft: () => (
            <View style={{marginLeft: 16, flexDirection: "row", alignItems: "center"}}>
                <IconButton Material={true} color={globalColors.background1} size={32} icon="arrow-back-ios" onPress={()=>{
                    if (route.params.search == true) {
                        navigation.navigate("MainCats", {initialData: route.params.backData, search: true});
                    } else {
                        navigation.goBack();
                    }
                }} />
            </View>
        )
    })
    const titleShrink = (title) => {
        if (title.length > 26) {
            return {title: title.substring(0,23) + "..."};
        } else {
            return {title: title};
        }
    }
    const ExploreStack = createStackNavigator();
    const ExploreStackNavigator = () => (
        <ExploreStack.Navigator
            screenOptions={stackOptions}
        >
            <ExploreStack.Screen name="MainCats" initialParams={{initialData: initialData.current}} component={MainCats} options={{headerShown: false}} />
            <ExploreStack.Screen name="SubCats" component={SubCats} options={({route})=>(titleShrink(route.params.parent.name))}/>
            <ExploreStack.Screen name="Listings" component={Listings} options={({route})=>(titleShrink(route.params.parent.name))} />
            <ExploreStack.Screen name="Listing" component={Listing} options={({route})=>(titleShrink(route.params.item.title))}/>
            <ExploreStack.Screen name="Coupon" component={Coupon} options={({route})=>(titleShrink(route.params.item.title))}/>
        </ExploreStack.Navigator>
    )
    const BookStack = createStackNavigator();
    const BookStackNavigator = () => (
        <BookStack.Navigator
            screenOptions={stackOptions}
        >
            <BookStack.Screen name="Bookmarks" component={Bookmarks} options={{headerShown: false}} />
            <BookStack.Screen name="bListing" component={Listing} options={({route})=>(titleShrink(route.params.item.title))}/>
            <BookStack.Screen name="bCoupon" component={Coupon} options={({route})=>(titleShrink(route.params.item.title))}/>
        </BookStack.Navigator>
    )
    const CoupStack = createStackNavigator();
    const CoupStackNavigator = () => (
        <CoupStack.Navigator
            screenOptions={stackOptions}
        >
            <CoupStack.Screen name = "CoupListings" component={CoupListings} options={({route})=>({headerShown: false})} />
            <CoupStack.Screen name = "cCoupon" component={Coupon} options={({route})=>(titleShrink(route.params.item.title))} />
            <CoupStack.Screen name = "cListing" component={Listing} options={({route})=>(titleShrink(route.params.item.title))} />
        </CoupStack.Navigator>
    )
  return (
      <>
        {dataReady &&        
            <NavigationContainer>
                <GeneralTabNavigator />
            </NavigationContainer>
        }
        {!dataReady &&
            <LoadingScreen />
        }
      </>
  );
}


export default navigation;