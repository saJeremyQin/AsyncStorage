
import React from 'react';
import {StyleSheet, Pressable, Text } from 'react-native';

const JereButton = (props) => {
    //const {title,onPress} = props;
    return (
        <Pressable 
            onPress={props.onPress}
            hitSlop = {{left:20,right:20}}
            android_ripple = {{color:'#00f'}}
            style = { 
            ({ pressed }) => [
                { backgroundColor: pressed ? '#ddd' : props.color},
                styles.button,{...props.style}        //{...} is destructure, inside an array means override.
            ]}
        >
            <Text style={styles.text}>
                {props.title}
            </Text>
        </Pressable>
    )

}


const styles = StyleSheet.create({
    button:{
        width:150,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5
    },
    text:{   
        fontSize:18,
        color:'white',
        margin:5,
        textAlign:'center'
    }
})


export default JereButton;