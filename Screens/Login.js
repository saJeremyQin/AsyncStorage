import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../utils/db";
import JereButton from "../utils/JereButton";
import { useSelector, useDispatch } from "react-redux";
import { setAge, setName } from "../redux/action";


const Login = ({navigation}) => {
    // const [name, setName] = useState('');
    // const [age, setAge] = useState('');
    const {name, age} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        createTable();
        getData();
    },[]);

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Users "
                + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);"
            )
        })
    };

    const getData = async() => {
        try {
            await db.transaction(async (tx) => {
                await tx.executeSql(
                    "SELECT Name,Age FROM Users",
                    [],
                    (tx, results) => {
                        let len = results.rows._array.length;
                        // console.log("the len is", len);
                        if(len > 0) {
                            // let uName = results.rows.item[0].Name;
                            // let uAge = results.rows.item[0].Age;
                            // setName(uName);
                            // setAge(uAge);
                            navigation.navigate("Home");
                        }
                    }
                );
            })
        } catch (error) {
            console.log(error);
        }
    };

    const setData = async() => {

        if(name.length <= 2 || age.length <= 0)
            Alert.alert("Warning!", "The length of data is incorrect!")
        else {
            try {
                dispatch(setName(name));
                dispatch(setAge(age));
                // let user = {
                //     Name: name,
                //     Age: age                 
                // }
                // // convert an object to a string, JSON.Stringfy
                // console.log("user is", user);
                // await AsyncStorage.setItem("userData", JSON.stringify(user));

                await db.transaction(async (tx) => { 
                    // console.log("The name is", name);                
                    await tx.executeSql(
                        "INSERT INTO Users (Name, Age) VALUES (?,?)",
                        [name,age],
                        (tx, res) => {
                            console.log('Transaction successful');
                            console.log(res);
                          },
                        (tx, error) => {
                            console.log('Transaction error');
                            console.log(error);
                        }
                    );
                    // console.log('After executeSql');
                })
                navigation.navigate('Home');                      
            } catch (error) {
                console.log(error);       
            }
        }
    }

    return (
        <View style={styles.body}>
            <Image source={require("../assets/redux.png")} style={styles.logo}/>
            <Text style={styles.text}>Redux</Text>
            <TextInput
                onChangeText={(value) => dispatch(setName(value))}
                placeholder="Enter your name"
                style={styles.input}
            />
            <TextInput
                onChangeText={(value) => dispatch(setAge(parseInt(value)))}
                placeholder="Enter your age"
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
        marginTop:30,
        textAlign:"center",
        fontSize:20
    },
    text: {
        fontSize:30
    }
});

export default Login;