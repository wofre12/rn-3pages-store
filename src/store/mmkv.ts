import { MMKV } from "react-native-mmkv";
export const mmkv = new MMKV();
export const getMMKV = (k: string) => mmkv.getString(k) ?? null;
export const setMMKV = (k: string, v: string) => mmkv.set(k, v);
export const delMMKV = (k: string) => mmkv.delete(k);
