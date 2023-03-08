// import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import JereButton from "../utils/JereButton";
import { db } from "../utils/db";
import { useDispatch, useSelector } from "react-redux";
import { setAge, setName } from "../redux/action";

const Home = ({navigation}) => {
    // const [name, setName] = useState('');
    // const [age, setAge] = useState('');
    const {name, age} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        getData();
    },[]);

    const getData = async() => {
        try {
            // await AsyncStorage.getItem("userData").then(
            //     value => {
            //         if(value != null) {
            //             let user = JSON.parse(value);
            //             setName(user.Name);
            //             setAge(user.Age);
            //         }        
            //     }
            // )
            await db.transaction(async (tx) => {
                await tx.executeSql(
                    "SELECT Name,Age FROM Users",
                    [],
                    (tx, results) => {
                        let len = results.rows._array.length;
                        // console.log("The len in home is",len);
                        if(len > 0) {
                            let uName = results.rows._array[0].Name;
                            let uAge = results.rows._array[0].Age;  
        
                            dispatch(setName(uName));
                            dispatch(setAge(uAge));
                        }
                    },
                    (tx, error) => {
                        console.log('Transaction error');
                        console.log(error);
                    }

                );
            })
        }

        catch (error) {
            console.log(error);
        }
    };


    const updateData = async() => {
        if(name.length <= 2 || age.length ==0)
            Alert.alert("Warning!", "The length of data is incorrect!")
        else {
            try {
                // let user = {
                //     Name: name,
                // }
                // await AsyncStorage.mergeItem("userData", JSON.stringify(user));
                dispatch(setName(name));
                db.transaction((tx) => {
                    tx.executeSql(
                        "UPDATE Users SET Name=?",
                        [name],
                        (tx, res) => {
                            console.log('Transaction successful');
                            console.log(res);
                        },
                        (tx, error) => {
                            console.log('Transaction error');
                            console.log(error);
                        }
                    );

                });
                Alert.alert("Success!", "Your name has been updated.");
            } catch (error) {
                console.log(error);       
            }
        }
    }

    const removeData = async() => {
        try {
            // AsyncStorage.clear().then(
            //     navigation.navigate("Login")
            // )
            await db.transaction(async (tx) => {
                await tx.executeSql(
                    "delete from Users", 
                    [],
                    (tx, res) => {
                        console.log('Transaction successful');
                        console.log(res);
                    },
                    (tx, error) => {
                        console.log('Transaction error');
                        console.log(error);
                    }
                );
            })
            navigation.navigate("Login")
        } catch (error) {
            console.log(error);        
        }
    }

    return (
        <View style={styles.body}>
            <Text style={styles.text}>
                Hello,{name}.
            </Text>
            <Text>
                Your age is {age}
            </Text>        
            <TextInput
                onChangeText={(value) => dispatch(setName(value))}
                placeholder="Enter your name"
                style={styles.input}
                value={name}
            >
            </TextInput>
            <JereButton title="Update" color="#ff7f00" style={{marginTop:20, width:100, height:35}} onPress={updateData}/>
            <JereButton title="Remove" color="#f40100" style={{marginTop:20, width:100, height:35}} onPress={removeData}/>
       </View>
    );

}

const styles = StyleSheet.create({
    body:{
        flex:1,
        alignItems:"center",
        // justifyContent:"center"
        // backgroundColor:"#0080ff"
    },
    input: {
        width: 240,
        height: 40,
        backgroundColor:"#fff",
        borderColor:"#887",
        borderWidth:1,
        borderRadius:10,
        marginTop:60,
        textAlign:"center",
        fontSize:20
    },
    text: {
        fontSize:30,
        marginTop:150
    }
});


export default Home;