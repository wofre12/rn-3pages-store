import React from "react";
import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchByCategory } from "../api/products";

// Chosen category for the “Specific Category” screen (document in README): "smartphones". :contentReference[oaicite:6]{index=6}
const CATEGORY = "smartphones";

export default function CategoryScreen(){
  const { data, isFetching, refetch } = useQuery({
    queryKey:["category", CATEGORY],
    queryFn:()=>fetchByCategory(CATEGORY),
  });

  return (
    <View style={{ flex:1, padding:12 }}>
      <Text style={{ fontSize:18, fontWeight:"600", marginBottom:8 }}>{CATEGORY}</Text>
      <FlatList
        data={data ?? []}
        keyExtractor={(i)=>String(i.id)}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch}/>}
        renderItem={({item})=>(
          <View style={{ flexDirection:"row", gap:12, paddingVertical:8, alignItems:"center" }}>
            <Image source={{ uri:item.thumbnail }} style={{ width:64, height:64, borderRadius:8 }}/>
            <Text style={{ flex:1 }}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}
