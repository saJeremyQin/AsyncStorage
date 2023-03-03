import React from "react";
import { Text, StyleSheet, View } from "react-native";

const Login = () => {
    return (
        <View style={styles.body}>
            <Text style={styles.text}>Login Page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#0080ff"
    },
    text: {
        fontSize:22
    }
});

export default Login;