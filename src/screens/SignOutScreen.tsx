import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { signedOut } from "../store/session.slice";
import { delMMKV } from "../store/mmkv";
import { useThemeColors } from "../theme";

export default function SignOutScreen(){
  const dispatch = useDispatch();
  const { bg } = useThemeColors();

  useEffect(()=>{
    delMMKV("token"); delMMKV("user"); delMMKV("superadmin");
    dispatch(signedOut());
  },[]);

  return <View style={{flex:1,justifyContent:"center",alignItems:"center", backgroundColor:bg}}><ActivityIndicator/></View>;
}
