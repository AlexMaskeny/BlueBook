import React, {useState} from 'react';
import { View, StyleSheet, Modal, FlatList, TouchableOpacity, TouchableHighlight, ActivityIndicator, KeyboardAvoidingView, Alert } from 'react-native';
import Screen from '../../components/general/Screen';
import Title from '../../components/text/Title';
import TopBar from './TopBar2';
import styles from './styles';
import Spacer from '../../components/general/Spacer';
import globalColors from '../../config/globalColors';
import IconCircle from '../../components/blocks/IconCircle';
import NetInfo from '@react-native-community/netinfo';
import { getCategories } from '../../graphql/queries';
import API from '@aws-amplify/api';

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

const getParentImage = async (cats) => {
    try {
        const netInfo = await NetInfo.fetch()
        if(netInfo.isConnected) {
            const result = await API.graphql({
                query: getCategories, variables: {
                    id: cats.slice(cats.indexOf("s:")+4, cats.indexOf(";", cats.indexOf("s:")+3))
                }
            })
            if (result) {
                return result.data.getCategories.cover;
            }
        } else {
            
        }
    } catch (error) {
        console.log(error);
    }
}

function searchModal({active, setActive, data, navigation}) {
    const [listings, setListings] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const featured = [
        {
            id: "535",
            parent: 0,
            name: "Entertainment"
        },
        {
            id: "110",
            parent: 0,
            name: "Gifts & Retail"
        },
        {
            id: "111",
            parent: 0,
            name: "Medical",
        },
        {
            id: "102",
            parent: 0,
            name: "Professional Services", 
        },
        {
            id: "109",
            parent: 0,
            name: "Restraunts"
        },
    ]
  return (
    <Modal visible={active}>
        <Screen>
            <TopBar setActive={setActive} setListings={setListings} setCategories={setCategories} loading={loading} setLoading={setLoading}/>
                {(categories.length+listings.length==0 && !loading) &&
                <>
                    <View style={styles.modalContainer}>
                        <Title>Featured</Title>
                    </View>
                    <Spacer height={1} color={globalColors.text4}/>
                </>
                }
                {loading &&
                <View style={{alignSelf: "center", justifyContent: "center", height: "40%"}}>
                    <ActivityIndicator size="large" color={globalColors.text1} />
                </View>
                }
                {!loading && 
                <>
                <FlatList 
                    data={listings}
                    ListHeaderComponent={()=> {
                            return (
                                <FlatList 
                                data={listings.length+categories.length > 0 ? categories : featured}
                                ListHeaderComponent={()=> {
                                    if (categories.length > 0) {
                                        return (
                                            <>
                                            <View style={styles.modalContainer}>
                                                <Title>Categories</Title>
                                            </View>
                                            <Spacer height={1} color={globalColors.text4}/>
                                            </>
                                        )
                                    } else {
                                        return (<View />)
                                    }
                                }}
                                ListFooterComponent={()=> {
                                    if (listings.length > 0 ) { 
                                        return (
                                            <>
                                            <Spacer height={1} color={globalColors.text4}/>
                                            <View style={styles.modalContainer}>
                                                <Title>Listings</Title>
                                            </View>
                                            <Spacer height={1} color={globalColors.text4}/>
                                            </>
                                        )
                                    } else {
                                        return (<View />)
                                    }
                                }}
                                style={{width: '100%'}}
                                keyExtractor={(listing)=>listing.id.toString()}
                                scrollEnabled={false}
                                renderItem={({item})=> {
                                    return (
                                        <TouchableOpacity onPress={()=>{
                                            if (item.parent == 0) {
                                                navigation.navigate("SubCats", {backData: data, fromSearch: "Yes", parent: {...item, icon: icons[item.id]}});
                                                setActive(false);
                                            } else {
                                                navigation.navigate("Listings", {backData: data, parent: {...item, icon: icons[item.parent]}});
                                                setActive(false);
                                            }
                                        }}>
                                            <View style={styles.searchListing}>
                                                <IconCircle color={globalColors.primary} icon={icons[item.parent != 0 ? item.parent : item.id]} width={58} size={40}/>
                                                <View style={{width: 10}}/>
                                                <Title color={globalColors.text1}  style={{flex: 1}} numberOfLines={1} size={20}>{item.name}</Title>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                                />
                            )
                    }}
                    style={{width: '100%'}}
                    keyExtractor={(listing)=>listing.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=> {
                        return (
                            <TouchableOpacity onPress={async ()=>{
                                if (item.cover.length > 0) {
                                    navigation.navigate("Listing", {backData: data, item: {...item, image: item.cover}});
                                    setActive(false);
                                } else {
                                    const cover = await getParentImage(item.categories);
                                    navigation.navigate("Listing", {backData: data, item: {...item, image: cover}})
                                    setActive(false);
                                }
                            }}>
                                <View style={styles.searchListing}>
                                    <IconCircle color={globalColors.text1} icon="google-maps" width={58} size={40}/>
                                    <View style={{width: 10}}/>
                                    <Title color={globalColors.text1} style={{flex: 1}} numberOfLines={1} size={20}>{item.title}</Title>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
                </>                   
                }
        </Screen>
    </Modal>
  );
}

export default searchModal;