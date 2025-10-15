import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
  name:"lock",
  initialState:{ locked:false },
  reducers:{ setLocked:(s,{payload}:{payload:boolean})=>{s.locked=payload} }
});
export const { setLocked } = slice.actions;
export default slice.reducer;
