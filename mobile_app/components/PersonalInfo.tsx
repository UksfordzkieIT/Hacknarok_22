import React, {useState, useEffect} from 'react'
import { StyleSheet, Image, TouchableOpacity} from 'react-native';
import { ListItem } from 'react-native-elements';
import {COLOURS} from '../constants/MyColours'
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

const pic = require('../assets/images/avatar.png');

export default function PersonalInfo() {

  const [user_name, SetName] = useState(null);

  const fetch_data = () => (
    SetName("Jan Kowalski")
  )

  useEffect(() => {
    fetch_data();
}, [])


  return (
    <View>
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={pic}/>
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{user_name}</Text>
        </View>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: COLOURS.main,
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:110
  },
  name:{
    fontSize:30,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    alignItems: 'center',
    padding:30,
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});