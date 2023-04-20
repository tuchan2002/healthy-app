import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {closeCircle} from "react-native-vector-icons/AntDesign";
import Fillter from "./Fillter";
import Item from "./Item";
import { SCREEN_HEIGHT } from "../../../constants/size";
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

export default function Exercises() {
  const [exercises, setExercises] = useState(null);
  const [targets, setTargets] = useState(null);
  const [bodyparts, setBodyparts] = useState(null);

  useEffect(() => {
    const getData = async () => {
      let exercisesData = await axios.get('http://10.0.2.2:5000/videos/all', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      let targetsData = await axios.get('http://10.0.2.2:5000/targets', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      let bodypartsData = await axios.get('http://10.0.2.2:5000/bodyparts', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      setTargets(targetsData.data.data);
      setBodyparts(bodypartsData.data.data);
      setExercises(exercisesData.data.data);
    }
    getData();
  }, [])

  //console.log(exercises);

  if(targets && bodyparts && exercises) {
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
          <Fillter data={targets}/>
          <Fillter data={bodyparts}/>
        </View>
        <ScrollView style={styles.list} disableScrollViewPanResponder={true}
        showsVerticalScrollIndicator={false}>
          {exercises.map((element, index) => (
            <Item key={index} data={element}/>
          ))}
        </ScrollView>
      </View>
  );
  } else {
    return (
      <View style={styles.container} onLayout={() => {SplashScreen.hideAsync();}}>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={true}
          //Text with the Spinner
          textContent={'Loading...'}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
      </View>
  );
  }
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
    height: SCREEN_HEIGHT - 50 - 48 - 20 - 60 - 140,
    borderRadius: 10,
    paddingHorizontal: 10,
  }
})