import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export const getMMKV = (key: string): string | null => {
  try {
    return storage.getString(key) ?? null;
  } catch (error) {
    console.warn("MMKV get error:", error);
    return null;
  }
};

export const setMMKV = (key: string, value: string): void => {
  try {
    storage.set(key, value);
  } catch (error) {
    console.warn("MMKV set error:", error);
  }
};

export const delMMKV = (key: string): void => {
  try {
    storage.delete(key);
  } catch (error) {
    console.warn("MMKV delete error:", error);
  }
};
