import * as React from "react";
import { View, StyleSheet, Button } from "react-native";
import { Video, ResizeMode } from "expo-av";

export default function App() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          //uri: 192.168.222.106 'http://rr5---sn-npoldn7s.googlevideo.com/videoplayback?expire=1682155099&ei=-1FDZJ7LB6PmrtoP2pyyyAo&ip=2400:8901::f03c:93ff:fee4:7f9a&id=o-ALtChVNLRyeF6BVDyQbTdYXkzEwfngcZwBaybbDejJ9p&itag=22&source=youtube&requiressl=yes&mh=J_&mm=32&mn=sn-npoldn7s&ms=su&mv=m&mvi=5&pl=58&sc=yes&initcwndbps=237500&vprv=1&prv=1&mime=video/mp4&cnr=14&ratebypass=yes&dur=9593.370&lmt=1681707011111816&mt=1682133172&fexp=24007246&txp=6218224&sparams=expire,ei,ip,id,itag,source,requiressl,vprv,prv,mime,cnr,ratebypass,dur,lmt&sig=AOq0QJ8wRgIhAPEuLzfi6Rlaa9HElX2uPGS52aC-n1dcP7b0NYqcD3axAiEAtcwDzH6dvT9KvSjFtqzAtuBiMulZPrIWMVR2dM0b_MU=&lsparams=mh,mm,mn,ms,mv,mvi,pl,sc,initcwndbps&lsig=AG3C_xAwRQIgZshCR016Iff8AfCc9q0D77Kl8qCEdtRp-4QcBnxgJQsCIQCxAUAwyY_B4FKUuyQQVuu3SUk9oI_UmgecArXJVznTJw==',
          uri: "https://cdn.cnbj1.fds.api.mi-img.com/course-video/fit/1.mp4",
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
