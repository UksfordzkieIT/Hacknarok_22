import React, {useState, useEffect} from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity , Button, Modal} from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Cam from '../components/Camera'
import {COLOURS} from '../constants/MyColours'

export default function ScannerScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [isVisible, SetVi] = useState(true);
  return (
    <View style={styles.container}>
      <Modal visible={isVisible} transparent={true} animationType='slide'>
        <View style={styles.modal}>
        <FontAwesome name="camera" size={60} style={{margin: 20, color: COLOURS.main}}/>
          <Text style={styles.label_dark}>Zeskanuj kod qr produktu aby uzyskać szczegółowe informacje</Text>
            <Button title="zamknij" color={COLOURS.main} onPress={()=>SetVi(false)}/>
        </View>
      </Modal>
      <Cam />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
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
});
