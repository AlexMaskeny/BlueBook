import React, {useState} from 'react';
import { View, StyleSheet, Button, Linking } from 'react-native';
import { API, graphqlOperation } from '@aws-amplify/api';
import { createTodo } from '../graphql/mutations';
import { getTodo, listLists } from '../graphql/queries';
import {WebView} from 'react-native-webview';
import WebModal from './Listing/WebModal';

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
    const points = [{id: 1, blah: 3}, {id: 2, blah: 2}, {id: 3, blah: 5}, {id: 4, blah: 4}]
    console.log(points)
    points.sort(function(a, b){
        return b.blah-a.blah
    })
    console.log(points)
}

const openInMap = () => {
    Linking.openURL("http://maps.apple.com/maps?daddr=11768+meteor+dr");
}

function testScreen(props) {
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