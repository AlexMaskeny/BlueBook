import React, {useState} from 'react';
import { View, StyleSheet, Button, Linking } from 'react-native';
import { API, graphqlOperation } from '@aws-amplify/api';
import { createTodo } from '../graphql/mutations';
import { getTodo, listLists } from '../graphql/queries';
import AsyncStorage from '@react-native-async-storage/async-storage';

const add = async () => {
    try {
        const result = await API.graphql(graphqlOperation(createTodo, {
            input: {
                name: "Test123",
            }
        }))
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
const get = async () => {
    try {
        const result = await API.graphql({
            query: listLists, variables: {
                filter: {
                    categories: {
                        contains: ":"
                    }
                }
            }
        })
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

const sort = () => {
    const points = [{id: 1, blah: "Donald"}, {id: 2, blah: "Buck"}, {id: 3, blah: "Zachary"}, {id: 4, blah: "Alexander"}]
    points.sort((a,b) => {
        if (a.blah > b.blah) {
            return 1;
        } else {
            return -1;
        }
    })
    console.log(points)
}

const viewBookmarks = async (navigation) => {
    try {
        const bookmarks = await AsyncStorage.getItem("Bookmarks");
        if (bookmarks) {
          const parsed = JSON.parse(bookmarks);
          if (parsed) {
            if (parsed.data) {
              console.log(parsed.data);
              navigation.navigate("Listing", parsed.data[0]);
            }
          }
        }
    } catch (error) {
        console.log(error);
    }
}

const openInMap = () => {
    Linking.openURL("http://maps.apple.com/maps?daddr=11768+meteor+dr");
}

function testScreen() {
    const [enabled, setEnabled] = useState(false);
    return (
        <View style={styles.container}>
            <Button title="Open" onPress={()=>sort()} />
            <WebModal enabled={enabled} source="https://google.com" setEnabled={setEnabled}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});

export default testScreen;