import React, {useState, useEffect} from 'react'
import {Alert, Modal, StyleSheet, Pressable, TouchableOpacity, Button, Image} from 'react-native';
import { ListItem } from 'react-native-elements';
import { Text, View } from '../components/Themed';
import {COLOURS} from '../constants/MyColours'

import { scanned_f } from './api/last_food';
import { scanned_m } from './api/last_machine';
import { alergeny } from './api/alergeny';

const qr = require('../assets/images/qr.png')

export default function ProfileMenu(){
    const [isVisible, SetVi] = useState(false);
    const [isVisible_b, SetVi_b] = useState(false);
    const [isVisible_c, SetVi_c] = useState(false);
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
            title: "Lista alergenów",
            icon: "shopping-cart"
        },
    ]

    return(
        <View>
            <Modal visible={isVisible} transparent={true} animationType='slide'>
                <View style={styles.modal}>
                    <Text style={styles.label_dark}>Karta</Text>
                    <Image source={qr}/>
                    <Button title="zamknij" color={COLOURS.main} onPress={()=>SetVi(false)}/>
                </View>
            </Modal>
            <Modal visible={isVisible_b} transparent={true} animationType='slide'>
                <View style={styles.modal}>
                    <Text style={styles.label_dark}>Ostatnio skanowane</Text>
                    {scanned_f.map((elem)=> {
                        return(
                        <View style={styles.container}>
                            <Text>{elem.id}</Text>
                            <Text>{elem.name}</Text>
                            <Text>->{elem.alergen_0}</Text>
                            <Text>->{elem.alergen_1}</Text>
                            <Text>->{elem.alergen_2}</Text>
                        </View>
                        )
                    })}
                    <Button title="zamknij" color={COLOURS.main} onPress={()=>SetVi_b(false)}/>
                </View>
            </Modal>    
            <Modal visible={isVisible_c} transparent={true} animationType='slide'>
                <View style={styles.modal}>
                    <Text style={styles.label_dark}>Twoje alergeny</Text>
                    {alergeny.map((elem)=> {
                        return(
                        <View style={styles.label_dark}>
                            <Text>{elem.name}</Text>
                        </View>
                        )
                    })}
                    <Button title="zamknij" color={COLOURS.main} onPress={()=>SetVi_c(false)}/>
                </View>
            </Modal>    
            <TouchableOpacity style={styles.container} onPress={()=>SetVi(true)}>
               <Text style={styles.label}>{menu[0].title}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container} onPress={()=>SetVi_b(true)}>
               <Text style={styles.label}>{menu[1].title}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container} onPress={()=>SetVi_c(true)}>
               <Text style={styles.label}>{menu[2].title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
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
        padding: 10,
        margin: 2,
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