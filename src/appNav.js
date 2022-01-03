import AsyncStorage from "@react-native-async-storage/async-storage"
import NetInfo from '@react-native-community/netinfo';
import { getCategories, getListsByClient } from './graphql/queries';
import API from '@aws-amplify/api';

const getBookmarkdata = async (item) => {
    try {
      const bookmarks = await AsyncStorage.getItem("Bookmarks");
      if (bookmarks) {
        const parsed = JSON.parse(bookmarks);
        if (parsed) {
          if (parsed.data) {
            const data = parsed.data.filter(el => {return el.item.id == item + ""});
            //console.log(data);
            if (data.length >= 1) {
              return true;
            }
          }
        }
      }
      return false;
    } catch (error) {
      console.log(error);
    }
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

const getCouponData = async (client_id) => {
    try {
      const netInfo = await NetInfo.fetch();
      if (netInfo.isConnected) {
        const result = await API.graphql({
          query: getListsByClient, variables: {
            clientId: client_id
          }
        })
        if (result) {
          const rData = result.data.getListingsByClient.listings;
          console.log(rData);
          const fData = rData.filter(el => {
            return el.type == "coupon"
          });
          return fData;
        } else {
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getClientData = async (client_id) => {
    try {
      const netInfo = await NetInfo.fetch();
      if (netInfo.isConnected) {
        const result = await API.graphql({
          query: getListsByClient, variables: {
            clientId: client_id
          }
        })
        if (result) {
          const rData = result.data.getListingsByClient.listings;
          console.log(rData);
          const fData = rData.filter(el => {
            return el.type == "place"
          });
          return fData[0];
        } else {
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

const nav = async (navigation,route,screen1,screen2,params) => {
    //=============================================
    if (screen1 == "MainCats") {
        if (screen2 == "SubCats") {
            navigation.navigate("SubCats", {parent: params.item});
        } 
    //=============================================
    } else if (screen1 == "SubCats") {
        if (screen2 == "Listings") {
            navigation.navigate("Listings", {parent: {...params.item, icon: route.params.parent.icon}});
        }
    //=============================================
    } else if (screen1 == "Listings") {
        if (screen2 == "Listing") {
            const bookmarked = await getBookmarkdata(params.item.id);
            const coupons = await getCouponData(params.item.client_id);
            navigation.navigate("Listing", {parent: route.params.parent, bookmarked: bookmarked, item: params.item, coupons: coupons});
        } else if (screen2 == "Coupon") {
            const bookmarked = await getBookmarkdata(params.item.id);
            const clientItem = await getClientData(params.item.client_id);
            navigation.navigate("Coupon", {parent: route.params.parent, bookmarked: bookmarked, item: params.item, clientItem: clientItem});
        } 
    //=============================================
    } else if (screen1 == "Listing") {
        if (screen2 == "Coupon") {
            const bookmarked = await getBookmarkdata(params.item.id);
            navigation.navigate("Coupon", {parent: route.params.parent, bookmarked: bookmarked, item: params.item, clientItem: route.params.item});
        }
        
    //=============================================
    } else if (screen1 == "bListing") {
        if (screen2 == "bCoupon") {
            const bookmarked = await getBookmarkdata(params.item.id);
            navigation.navigate("bCoupon", {parent: route.params.parent, bookmarked: bookmarked, item: params.item, clientItem: route.params.item});
        }
    //=============================================
    } else if (screen1 == "Bookmarks") {
        if (screen2 == "bListing") {
            const coupons = await getCouponData(params.item.client_id);
            if (params.item.search) {
                navigation.navigate("bListing", {item: params.item, fromBookmarks: true, bookmarked: true, search: false, coupons: coupons});
            } else {
                navigation.navigate("bListing", {item: params.item, fromBookmarks: true, bookmarked: true, search: false, coupons: coupons});
            }
        } else {
            const clientItem = await getClientData(params.item.client_id);
            navigation.navigate("bCoupon", {item: params.item, fromBookmarks: true, bookmarked: true, search: false, clientItem: clientItem});
        }


    //=============================================
    } else if (screen1 == "Search") {
        if (screen2 == "SubCats") {
            navigation.navigate("SubCats", {search: true, parent: params.item});
        } else if (screen2 == "Listings") {
            navigation.navigate("Listings", {search: true, parent: params.item})
        } else if (screen2 == "Listing") {
            const bookmarked = await getBookmarkdata(params.item.id);
            const coupons = await getCouponData(params.item.client_id);
            if (params.item.cover.length > 0) {
                navigation.navigate("Listing", {item: {...params.item, image: params.item.cover}, search: true, bookmarked: bookmarked, coupons: coupons});
            } else {
                const cover = await getParentImage(params.categories);
                navigation.navigate("Listing", {item: {...params.item, image: cover}, search: true, bookmarked: bookmarked, coupons: coupons});
            }
        }
    //=============================================
    } else if (screen1 == "Coupon") {
        if (screen2 == "Listing") {
            const bookmarked = await getBookmarkdata(params.clientItem.id);
            const coupons = await getCouponData(params.clientItem.client_id);
            if (params.clientItem.cover.length > 0) {
                navigation.navigate("Listing", {item: {...params.clientItem, image: params.clientItem.cover}, parent: route.params.parent, bookmarked: bookmarked, coupons: coupons});
            } else {
                const cover = await getParentImage(params.categories);
                navigation.navigate("Listing", {item: {...params.clientItem, image: cover}, parent: route.params.parent, bookmarked: bookmarked, coupons: coupons});
            }
        }
    //=============================================
    } else if (screen1 == "bCoupon") {
        if (screen2 == "bListing") {
            const bookmarked = await getBookmarkdata(params.clientItem.id);
            const coupons = await getCouponData(params.clientItem.client_id);
            if (params.clientItem.cover.length > 0) {
                navigation.navigate("bListing", {item: {...params.clientItem, image: params.clientItem.cover}, fromBookmarks: true, bookmarked: bookmarked, coupons: coupons});
            } else {
                const cover = await getParentImage(params.categories);
                navigation.navigate("bListing", {item: {...params.clientItem, image: cover}, fromBookmarks: true, bookmarked: bookmarked, coupons: coupons});
            }
        }
    //=============================================
    } else if (screen1 == "CoupListings") {
        if (screen2 == "cCoupon") {
            const bookmarked = await getBookmarkdata(params.item.id);
            const clientItem = await getClientData(params.item.client_id);
            navigation.navigate("cCoupon", {bookmarked: bookmarked, item: params.item, clientItem: clientItem, fromCoupons: true});
        }
    //=============================================
    } else if (screen1 == "cCoupon") {
        if (screen2 == "cListing") {
            const bookmarked = await getBookmarkdata(params.clientItem.id);
            const coupons = await getCouponData(params.clientItem.client_id);
            if (params.clientItem.cover.length > 0) {
                navigation.navigate("cListing", {item: {...params.clientItem, image: params.clientItem.cover}, fromCoupons: true, bookmarked: bookmarked, coupons: coupons});
            } else {
                const cover = await getParentImage(params.categories);
                navigation.navigate("cListing", {item: {...params.clientItem, image: cover}, fromCoupons: true, bookmarked: bookmarked, coupons: coupons});
            }
        }
    } else if (screen1 == "cListing") {
        if (screen2 == "cCoupon") {
            const bookmarked = await getBookmarkdata(params.item.id);
            navigation.navigate("cCoupon", {parent: route.params.parent, bookmarked: bookmarked, item: params.item, clientItem: route.params.item, fromCoupons: true});
        }
    }
    //=============================================
}

export default {
    nav
}