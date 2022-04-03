import React, {useState, useEffect} from 'react'
import {Alert, Modal, StyleSheet, Pressable, TouchableOpacity, Button, Image} from 'react-native';
import { ListItem } from 'react-native-elements';
import { Text, View } from '../components/Themed';
import {COLOURS} from '../constants/MyColours'

const qr = require('../assets/images/qr.png')

export default function ProfileMenu(){
    const [isVisible, SetVi] = useState(false);
    const menu = [
        {
            title: "Moja karta",
            icon: "card"
        },
        {
            title: "Ostatnio skanowane",
            icon: "camera"
        },
        {
            title: "Ostatnie zakupy",
            icon: "shopping-cart"
        },
    ]

    return(
        <View>
            <Modal visible={isVisible} transparent={true} animationType='slide'>
                <View style={styles.modal}>
                    <Text style={styles.label_dark}>Karta</Text>
                    <Image source={qr}/>
                    <Button title="zamknij" onPress={()=>SetVi(false)}/>
                </View>
            </Modal>
                
            <TouchableOpacity style={styles.container} onPress={()=>SetVi(true)}>
               <Text style={styles.label}>{menu[0].title}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container}>
               <Text style={styles.label}>{menu[1].title}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container}>
               <Text style={styles.label}>{menu[2].title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOURS.main,
        marginVertical: 5,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 15,
        
    },
    label:{
        textAlign: 'center', 
        fontSize: 25,
    },
    label_dark:{
        textAlign: 'center', 
        fontSize: 25,
        color: '#000000',
    },
    modal: {
        marginTop: 260,
        justifyContent: "center",
        alignItems: "center",
        margin: 50,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
})