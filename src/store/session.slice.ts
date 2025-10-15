import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type User = { id:number; username:string };
type SessionState = { token:string|null; user:User|null; superadmin:boolean };
const initial: SessionState = { token:null, user:null, superadmin:false };

const slice = createSlice({
  name:"session",
  initialState: initial,
  reducers:{
    signedIn:(s, a:PayloadAction<{token:string; user:User; superadmin:boolean}>)=>{
      s.token=a.payload.token; s.user=a.payload.user; s.superadmin=a.payload.superadmin;
    },
    signedOut:(s)=>{ s.token=null; s.user=null; s.superadmin=false; }
  }
});
export const { signedIn, signedOut } = slice.actions;
export default slice.reducer;
