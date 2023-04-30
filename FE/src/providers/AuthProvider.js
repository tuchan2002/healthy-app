import { createContext, useEffect, useState } from "react";
import { getAuthUserProperty } from "../data/user";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    checkLogedIn();
  }, []);

  const checkLogedIn = async () => {
    const [aU] = await getAuthUserProperty("user_id, username, avatar");
    if (aU) {
      setAuthUser(aU);
      navigation.navigate("Home");
    } else {
      setAuthUser(null);
      navigation.navigate("Login");
    }
  };
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}
