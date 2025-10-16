import React, { useState } from "react";
import { Modal, View, Text, TextInput, Button } from "react-native";
import { useDispatch } from "react-redux";
import { setLocked } from "../store/lock.slice";
import { useThemeColors } from "../theme";

const FALLBACK_PWD = "1234";

export default function LockOverlay({ visible }:{ visible:boolean }){
  const [pwd,setPwd]=useState("");
  const [err,setErr]=useState("");
  const dispatch = useDispatch();
  const { card, text, border } = useThemeColors();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={{ flex:1, backgroundColor:"rgba(0,0,0,0.6)", justifyContent:"center", padding:24 }}>
        <View style={{ backgroundColor:card, borderRadius:12, padding:16 }}>
          <Text style={{ fontSize:18, fontWeight:"700", marginBottom:8, color: text }}>Locked</Text>
          <Text style={{ marginBottom:8, color: text }}>Use biometrics or enter fallback password.</Text>
          <TextInput
            placeholder="Password"
            placeholderTextColor={text+"99"}
            secureTextEntry
            value={pwd}
            onChangeText={setPwd}
            style={{ borderWidth:1, borderColor: border, color: text, padding:12, borderRadius:8, marginBottom:8 }}
          />
          {!!err && <Text style={{ color:"#ef4444", marginBottom:8 }}>{err}</Text>}
          <Button title="Unlock" onPress={()=>{
            if (pwd===FALLBACK_PWD){ setErr(""); setPwd(""); dispatch(setLocked(false)); }
            else setErr("Wrong password");
          }}/>
        </View>
      </View>
    </Modal>
  );
}
