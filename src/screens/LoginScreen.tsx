import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { signedIn } from "../store/session.slice"
import { setMMKV } from "../store/mmkv";
import { login, me } from "../api/auth";

const SUPERADMIN_USERNAME = "superadmin"; // picked and documented in README. :contentReference[oaicite:5]{index=5}

export default function LoginScreen(){
  const [username,setUsername]=useState("kminchelle"); // DummyJSON demo user
  const [password,setPassword]=useState("0lelplR");
  const [loading,setLoading]=useState(false);
  const dispatch = useDispatch();

  const onLogin = async ()=>{
    try{
      setLoading(true);
      const auth = await login(username, password);
      const profile = await me();
      const superadmin = username === SUPERADMIN_USERNAME;
      setMMKV("token", auth.token);
      setMMKV("user", JSON.stringify(profile));
      setMMKV("superadmin", superadmin?"1":"0");
      dispatch(signedIn({ token:auth.token, user:profile, superadmin }));
    }catch(e:any){
      Alert.alert("Login failed", e?.message ?? "Try again");
    }finally{ setLoading(false); }
  };

  return (
    <View style={{ flex:1, padding:16, justifyContent:"center" }}>
      <Text style={{ fontSize:24, fontWeight:"700", marginBottom:16 }}>Sign in</Text>
      <TextInput placeholder="Username" autoCapitalize="none" value={username} onChangeText={setUsername}
        style={{ borderWidth:1, padding:12, marginBottom:12, borderRadius:8 }}/>
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword}
        style={{ borderWidth:1, padding:12, marginBottom:16, borderRadius:8 }}/>
      <Button title={loading?"Signing in...":"Sign in"} onPress={onLogin} />
      <Text style={{ marginTop:12, opacity:0.6 }}>
        Demo users at DummyJSON docs (e.g., kminchelle / 0lelplR).
      </Text>
    </View>
  );
}
