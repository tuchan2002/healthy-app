import * as React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Video, ResizeMode } from "expo-av";
import CustomText from "../../../../components/CustomText";
import { useEffect, useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import instance from "../../../../utils/axios";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
//import BackButton from "../../../../components/layout/BackButton";
import HealthyHeaderBar from '../../../../components/layout/HeathyHeaderBar';

export default function Detail({ route }) {
  const navigation = useNavigation();
  const video = React.useRef(null);
  const [data, setData] = useState();
  const [recommend, setRecommend] = useState();

  useEffect(() => {
    const getData = async () => {
      let exercise = await instance.get(
        `/videos/info/${route.params.id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setData(exercise.data.video);
      setRecommend(exercise.data.recommend);
    };
    getData();
  }, [route.params.id]);
  if (data && recommend) {
    console.log(data.targets);
    return (
      <View style={[styles.container]}>
        <HealthyHeaderBar title="Chi tiết bài tập" style={styles.back}/>

        <CustomText
          style={[
            {
              fontSize: 20,
              marginTop: "10%",
              marginBottom: "2%",
              fontWeight: "bold",
              marginHorizontal: "5%",
            },
          ]}
        >
          {data.title}
        </CustomText>
        <View
          style={{ width: "90%", marginHorizontal: "5%", marginVertical: "5%" }}
        >
          <Video
            style={styles.video}
            source={{
              uri: data.link,
            }}
            useNativeControls
            resizeMode={ResizeMode.STRETCH}
            isLooping
          />
        </View>
        <CustomText style={[styles.header]}>Mục tiêu :</CustomText>
        <View style={styles.buttons}>
          {data.targets.map((element, index) => {
            return (
              <View key={index} style={styles.button}>
                <CustomText
                  style={[
                    {
                      textAlign: "center",
                      fontSize: 16,
                      color: "rgba(255, 255, 255, 1)",
                    },
                  ]}
                >
                  {element.content}
                </CustomText>
              </View>
            );
          })}
        </View>
        <CustomText style={[styles.header]}>Nhóm cơ tác động:</CustomText>
        <View style={styles.buttons}>
          {data.bodyparts.map((element, index) => {
            return (
              <View key={index} style={styles.button}>
                <CustomText
                  style={[
                    {
                      textAlign: "center",
                      fontSize: 16,
                      color: "rgba(255, 255, 255, 1)",
                    },
                  ]}
                >
                  {element.content}
                </CustomText>
              </View>
            );
          })}
        </View>
        <CustomText
          style={[styles.header]}
        >{`Tiêu Hao: ${data.kalo} calories`}</CustomText>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={true}
          //Text with the Spinner
          textContent={"Loading..."}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ecf0f1",
    fontFamily: "NunitoSans-SemiBold",
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: 220,
  },
  header: {
    fontSize: 20,
    marginHorizontal: "5%",
  },
  buttons: {
    marginHorizontal: "5%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    heigth: 90,
    marginVertical: 6,
  },
  button: {
    marginHorizontal: 2,
    padding: 6,
    color: "rgba(255, 255, 255, 1)",
    backgroundColor: "rgba(255, 162, 57, 1)",
    borderRadius: 20,
  },
  back: {
    marginTop: 5,
    marginBottom: "8%",
    marginHorizontal: "3%",
    padding: 6,
    color: "rgba(255, 162, 57, 1)",
    //backgroundColor: "rgba(255, 162, 57, 1)",
  },
});
