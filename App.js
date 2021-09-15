import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const App = () => {
  return(
    <View>
      <Text style={{marginTop: 150, marginLeft:150}}>Hello Harshil!!!</Text>
      <Image style={{width: 400, height: 160}} source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"}} />
      <TouchableOpacity activeOpacity={0.5}>
        <Text>Press Me</Text>
      </TouchableOpacity>
    </View>
  )
}


export default App;