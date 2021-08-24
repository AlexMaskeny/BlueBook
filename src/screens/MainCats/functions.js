import NetInfo from '@react-native-community/netinfo';
import API from '@aws-amplify/api';
import { listCategoriess, listLists } from '../../graphql/queries';

const onPress = () => {
    console.log("onPress");
}

const getData = async (input, lastInput, currentInput, setListings, setCategories, loading, setLoading) => {
    currentInput.current = input;
    //if (!loading) {
        setLoading(true)
        if (lastInput.current != input) {
            if (input.length == 0) {
                setListings([]);
                setCategories([])
            } else {
                // setListings([
                //     {
                //         id: 1,
                //         title: input
                //     }
                // ])
                try {
                    const netInfo = await NetInfo.fetch();
                    if (netInfo.isConnected) {
                        const result = await API.graphql({
                            query: listLists, variables: {
                                filter: {
                                    search: {
                                        contains: input
                                    }
                                },
                            }
                        })
                        const result2 = await API.graphql({
                            query: listCategoriess, variables: {
                                filter: {
                                    slug: {
                                        contains: input,
                                    }
                                }
                            }
                        })
                        console.log("Input:" + input);
                        console.log("currentInput:" + currentInput.current);
                        if (currentInput.current != 0 ) {
                            if (currentInput.current != input) {
                                setLoading(false);
                                await getData(currentInput.current, lastInput, currentInput, setListings, setCategories, loading, setLoading);
                            } else {
                                setListings(result.data.listLists.items.slice(0, 6));
                                setCategories(result2.data.listCategoriess.items.slice(0,3));
                                setLoading(false);
                                
                            }
                        } else {
                            setListings([]);
                            setCategories([]);
                        }
                        //console.log(result.data.listLists.items.slice(0, 6));
                    } else {
                        console.log("Disconnected");
                    }
                } catch (error) {
                    
                }
            }
        }
        setLoading(false);
    //} 
    lastInput.current = input;
}

export default {
    onPress,
    getData,
}