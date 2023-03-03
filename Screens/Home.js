import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';

const Home = () => {
    const [name, setName] = useState('');

    useEffect(() => {
        getData();
    },[]);

    const getData = async() => {
        try {
            await AsyncStorage.getItem("userName").then(
                value => {
                    if(value != null)
                        setName(value);
                }
            )
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.body}>
            <Text style={styles.text}>
                Hello,{name}
            </Text>
        </View>
    );

}

const styles = StyleSheet.create({
    body:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
        // backgroundColor:"#0080ff"
    },
    text: {
        fontSize:30
    }
});


export default Home;