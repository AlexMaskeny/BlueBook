import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { API, graphqlOperation } from '@aws-amplify/api';
import { createTodo } from '../graphql/mutations';
import { getTodo, listLists } from '../graphql/queries';

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

function testScreen(props) {
    return (
        <View style={styles.container}>
            <Button title="Add" onPress={add} />
            <Button title="Get" onPress={get} />
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