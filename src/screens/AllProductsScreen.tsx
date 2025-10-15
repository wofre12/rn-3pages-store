import React from "react";
import { View, Text, FlatList, Image, Button, RefreshControl } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";
import { fetchAllProducts, deleteProduct } from "../api/products";
import { useSelector } from "react-redux";
import { useThemeColors } from "../theme";

export default function AllProductsScreen(){
  const qc = useQueryClient();
  const { data, isFetching, refetch } = useQuery({ queryKey:["products"], queryFn:fetchAllProducts });
  const superadmin = useSelector((s:any)=>s.session.superadmin);
  const [online,setOnline] = React.useState(true);
  const { bg, text, card, border } = useThemeColors();

  React.useEffect(()=>{
    const sub = NetInfo.addEventListener(s=>setOnline(!!s.isConnected));
    return ()=>sub();
  },[]);

  const { mutate:remove, isPending } = useMutation({
    mutationFn: (id:number)=>deleteProduct(id),
    onSuccess: (_, id)=>{
      qc.setQueryData(["products"], (old:any)=>old?.filter((p:any)=>p.id!==id) ?? []);
    }
  });

  return (
    <View style={{ flex:1, padding:12 }}>
      {!online && <Text style={{ textAlign:"center", padding:8, backgroundColor:"#ffeaea" }}>Offline</Text>}
      <FlatList
        data={data ?? []}
        keyExtractor={(item)=>String(item.id)}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch}/>}
        renderItem={({item})=>(
          <View style={{ flexDirection:"row", gap:12, paddingVertical:8, alignItems:"center" }}>
            <Image source={{ uri:item.thumbnail }} style={{ width:64, height:64, borderRadius:8 }}/>
            <Text style={{ flex:1 }}>{item.title}</Text>
            {superadmin && <Button title={isPending?"...":"Delete"} onPress={()=>remove(item.id)}/>}
          </View>
        )}
      />
    </View>
  );
}
