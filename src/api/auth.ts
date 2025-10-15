import { api } from "./http";
export async function login(username:string, password:string){
  // POST /auth/login → returns token + user
  const { data } = await api.post("/auth/login", { username, password });
  return data; // {token, ...}
}
export async function me(){
  const { data } = await api.get("/auth/me");
  return data;
}
