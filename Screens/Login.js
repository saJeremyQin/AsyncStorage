import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JereButton from "../utils/JereButton";


const Login = ({navigation}) => {
    const [name, setName] = useState('');

    const setData = async() => {
        try {
            await AsyncStorage.setItem("userName", name);
            navigation.navigate('Home');       
        } catch (error) {
            console.log(error);       
        }
    }

    return (
        <View style={styles.body}>
            <Image source={require("../assets/asyncstorage.png")} style={styles.logo}/>
            <Text style={styles.text}>Async Storage</Text>
            <TextInput
                onChangeText={(value) => setName(value)}
                placeholder="Please input your name"
                style={styles.input}
            />
            <JereButton 
                title="Login" 
                color="#1eb900"
                style={{height:40, marginTop:10}} 
                onPress={setData}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        alignItems:"center",
        backgroundColor:"#0080ff"
    },
    logo:{
        width:100,
        height:100,
        margin:20
    },
    input:{
        width: 280,
        height: 40,
        backgroundColor:"#fff",
        borderColor:"#887",
        borderWidth:1,
        borderRadius:10,
        marginTop:100,
        textAlign:"center",
        fontSize:20
    },
    text: {
        fontSize:30
    }
});

export default Login;