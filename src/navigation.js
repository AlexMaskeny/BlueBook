import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import LoadingScreen from './screens/loadingScreen';
import testScreen from './screens/testScreen';
import MainCats from './screens/MainCats/index';
import SubCats from './screens/SubCats/index';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import globalColors from './config/globalColors';
import globalStyles from './config/globalStyles';
import TabBarButton from './components/buttons/TabBarButton';
import API from '@aws-amplify/api';
import { getCategoriesByParent } from './graphql/queries';
import NetInfo from "@react-native-community/netinfo";
import Listings from './screens/Listings/index';

function navigation() {
    const getInitialData = async () => {
        const netInfo = await NetInfo.fetch();
        if (netInfo.isConnected) {
            try {
                const result = await API.graphql({
                    query: getCategoriesByParent, variables: {
                        parentId: "0"
                    }
                })
                if (result) {
                    //console.log(result.data.getCategoriesByParent.categories);
                    initialData.current=result.data.getCategoriesByParent.categories;
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
            <GeneralTab.Screen name="Explore" initialParams={{initialData: initialData.current}} component={ExploreStackNavigator} options={({ navigation }) => ({tabBarIcon: ({color}) => <TabBarButton icon="search" Ioni={true} color={color} size={42} onPress={() => navigation.navigate("Explore", {initialData: initialData.current})}/>})} />
            <GeneralTab.Screen name="Bookmarks" component={testScreen} options={({ navigation }) => ({tabBarIcon: ({color}) => <TabBarButton icon="heart-outline" color={color} size={42} onPress={() => navigation.navigate("Bookmarks")}/>})} />
        </GeneralTab.Navigator>
    )
    const ExploreStack = createStackNavigator();
    const ExploreStackNavigator = () => (
        <ExploreStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <ExploreStack.Screen name="MainCats" initialParams={{initialData: initialData.current}} component={MainCats} />
            <ExploreStack.Screen name="SubCats" component={SubCats} />
            <ExploreStack.Screen name="Listings" component={Listings} />
        </ExploreStack.Navigator>
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