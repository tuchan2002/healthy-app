import { StatusBar } from "react-native";
import { Dimensions } from "react-native";

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const FOOTERBAR_HEIGHT = 60;
export const STATUSBAR_HEIGHT = StatusBar.currentHeight;