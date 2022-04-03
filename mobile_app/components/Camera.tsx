import React, { useState, useEffect, Component } from 'react';
import { Text, View, StyleSheet, Button, Alert, Modal, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Layout from '../constants/Layout';
import { COLOURS } from '../constants/MyColours';
import { api } from './api/data';

export default function Cam() {
  const [timeout, SetTimeout] = useState(null);
  const [qr_a, SetA] = useState(0);
  const [qr_width, SetWidth] = useState(0);
  const [qr_height, SetHeight] = useState(0);
  const [x, SetX] = useState(0);
  const [y, SetY] = useState(0);
  const [data, SetData] = useState(null);
  const [a, SetB] = useState(null);
  const [barcode, setBarcode] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // const handleBarCodeScanned = ({ type, data }) => {
  //   setScanned(true);
  //   setModalVisible(true);
  // };
  //let timeout = setTimeout(function(){clear()}, 1500);

  const fetch_api = () => (
    api.map((elem)=>{
      if(elem.id == data)
      {
        SetB(Object.values(elem))
      }
    })
  )
  
  const drawModal = (param) => (
    clearTimeout(timeout),
    fetch_api(),
    SetX(Object.values(param)[4].origin.x),
    SetY(Object.values(param)[4].origin.y),
    SetData(Object.values(param)[0]),
    SetHeight(Object.values(param)[4].size.height),
    SetWidth(Object.values(param)[4].size.width),
    SetA(100),
    SetTimeout(setTimeout(function(){clear()}, 500))
    //console.log(x,y,data)
  );

  const clear = () => (
    SetA(0),
    SetX(0),
    SetY(0),
    SetData(null),
    
    SetHeight(0),
    SetWidth(0)
  )

    const fun = () =>{
      if(a != null)
      {
        return (
        <View>
           <Text style={styles.text_style}>{a[0]}</Text>
              <Text style={styles.text_style}>{a[1]}</Text>
              <Text style={styles.text_style}>{a[2]}</Text>
              <Text style={styles.text_style}>{a[3]}</Text>
              <Text style={styles.text_style}>{a[4]}</Text>
        </View>
          )
      }
    }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
        <BarCodeScanner
            onBarCodeScanned={(data)=>drawModal(data)}
            style={StyleSheet.absoluteFillObject}

        >
        <View
          style={{
            opacity: qr_a,
            borderWidth: 2,
            borderRadius: 10,
            position: 'absolute',
            borderColor: COLOURS.main,
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: 10,
            left: x,
            top: y,
            width: 200,
            height: 200,
          }}
        >
             
              <Text style={styles.text_style}>{a[0]}</Text>
              <Text style={styles.text_style}>{a[1]}</Text>
              <Text style={styles.text_style}>{a[2]}</Text>
              <Text style={styles.text_style}>{a[3]}</Text>
              <Text style={styles.text_style}>{a[4]}</Text>
        </View>
        </BarCodeScanner>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  refresh:{
    position: 'absolute',
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  imageStyle:{
    width: Layout.window.width/2,
    height: Layout.window.height/2,
  },
  text_style:{
    color: '#000000',
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'transparent',
  }
});
