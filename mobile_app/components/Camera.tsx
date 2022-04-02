import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, Modal, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Layout from '../constants/Layout';


export default function App() {

  const response = 
  [
    {
      product_name: "Ogórek",
      product_img: "https://media.istockphoto.com/photos/cucumber-slices-on-a-white-background-picture-id91516166?k=20&m=91516166&s=612x612&w=0&h=YAMQg2xORdEfGkB2UA4RuXOJGwRzCFCHAvPgzhalyAo=",

    }
  ];
  const [qr_a, SetA] = useState(0);
  const [qr_width, SetWidth] = useState(0);
  const [qr_height, SetHeight] = useState(0);
  const [x, SetX] = useState(0);
  const [y, SetY] = useState(0);
  const [data, SetData] = useState(null);
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
  const drawModal = (param) => (
    //clearTimeout(timeout),
    SetX(Object.values(param)[4].origin.x),
    SetY(Object.values(param)[4].origin.y),
    SetData(Object.values(param)[0]),
    SetHeight(Object.values(param)[4].size.height),
    SetWidth(Object.values(param)[4].size.width),
    SetA(100)
    //setTimeout(function(){clear()}, 1500)
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
            borderColor: '#F00',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: 10,
            left: x,
            top: y,
            width: qr_width,
            height: qr_height,
          }}
        >
          <Text style={{
            color: '#F00',
            flex: 1,
            position: 'absolute',
            textAlign: 'center',
            backgroundColor: 'transparent',
          }}>{data}</Text>
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
  }
});
