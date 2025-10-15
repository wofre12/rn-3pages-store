import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { queryClient } from "./client";
import { getMMKV, setMMKV } from "../store/mmkv";

const storage = {
  getItem: (k:string)=>getMMKV(k),
  setItem: (k:string,v:string)=>setMMKV(k,v),
  removeItem: (k:string)=>setMMKV(k,"")
};

export function enablePersistence() {
  const persister = createSyncStoragePersister({ storage, key: "rq-cache" });
  persistQueryClient({ queryClient, persister, maxAge: 1000*60*60*24 });
}
