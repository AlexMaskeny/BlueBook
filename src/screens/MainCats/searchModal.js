import React, {useState} from 'react';
import { View, StyleSheet, Modal, FlatList, TouchableOpacity, TouchableHighlight, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import Screen from '../../components/general/Screen';
import Title from '../../components/text/Title';
import TopBar from './TopBar2';
import styles from './styles';
import Spacer from '../../components/general/Spacer';
import globalColors from '../../config/globalColors';
import IconCircle from '../../components/blocks/IconCircle';
import NetInfo from '@react-native-community/netinfo';
import appNav from '../../appNav';
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
                                                appNav.nav(navigation, {}, "Search", "SubCats", {item: {...item, icon: icons[item.id]}})
                                                setActive(false);
                                            } else {
                                                appNav.nav(navigation, {}, "Search", "Listings", {item: {...item, icon: icons[item.parent]}});
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
                                console.log(item);
                                await appNav.nav(navigation,{},"Search","Listing",{item: item})
                                setActive(false);
                            }}>
                                <View style={styles.searchListing}>
                                    {item.logo.length < 1 &&
                                        <IconCircle color={globalColors.text1} icon="google-maps" width={58} size={40}/>
                                    }
                                    {item.logo.length > 0 &&
                                        <Image style={{borderRadius: 100, height: 62, width: 62, backgroundColor: globalColors.background1, borderColor: globalColors.background1, borderWidth: 3,}} uri={"https://bluebooklocal.com"+item.logo} />
                                    }
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