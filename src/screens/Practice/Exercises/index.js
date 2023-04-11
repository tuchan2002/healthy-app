import React from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {closeCircle} from "react-native-vector-icons/AntDesign";
import Fillter from "./Fillter";
import Item from "./Item";

export default function Exercises() {
  return (
      <View style={styles.container} onLayout={() => {SplashScreen.hideAsync();}}>
        <View>
          <TextInput
          style = {styles.input}
          placeholder = "Search"
          placeholderTextColor = "rgba(255, 162, 57, 1)"
          />
        </View>
        <View style={{...styles.fillters}}>
          <Fillter/>
          <Fillter/>
        </View>
        <ScrollView style={styles.list}>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container : {
    marginTop: "5%",
  },
  input : {
    height: 50,
    marginHorizontal: '5%',
    padding: 15,
    borderRadius: 15,
    backgroundColor: "rgba(226, 221, 221, 1)",
    color: "rgba(255, 162, 57, 1)",
  },
  fillters : {
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  list : {
    height: 460,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 20,
  }
})