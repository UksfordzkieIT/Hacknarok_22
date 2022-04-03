import React, {useState, useEffect} from 'react'
import PersonalInfo from '../components/PersonalInfo';
import ProfileMenu from '../components/ProfileMenu';
import { Text, View } from '../components/Themed';

const pic = require('../assets/images/avatar.png');

export default function ProfileScreen() {
  return (
    <View>
      <PersonalInfo/>
      <ProfileMenu/>
  </View>
  );
}