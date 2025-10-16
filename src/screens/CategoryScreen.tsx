import React from "react";
import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchByCategory } from "../api/products";
import { useThemeColors } from "../theme";

const CATEGORY = "smartphones";

export default function CategoryScreen(){
  const { data, isFetching, refetch } = useQuery({
    queryKey:["category", CATEGORY],
    queryFn:()=>fetchByCategory(CATEGORY),
  });
  const { bg, text, card } = useThemeColors();

  return (
    <View style={{ flex:1, backgroundColor:bg, padding:12 }}>
      <Text style={{ fontSize:18, fontWeight:"600", color:text, marginBottom:8 }}>{CATEGORY}</Text>
      <FlatList
        data={data ?? []}
        keyExtractor={(i)=>String(i.id)}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch}/>}
        renderItem={({item})=>(
          <View style={{ flexDirection:"row", gap:12, paddingVertical:8, paddingHorizontal:8, alignItems:"center", backgroundColor:card, borderRadius:8, marginBottom:6 }}>
            <Image source={{ uri:item.thumbnail }} style={{ width:64, height:64, borderRadius:8 }}/>
            <Text style={{ flex:1, color: text }}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}
