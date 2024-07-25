import { createSlice } from "@reduxjs/toolkit";

const items = [];

const watchList = createSlice({
    name:'watchlist',
    initialState:items,
    reducers:{
        addWatch(state,action){
            state.push(action.payload);
            // localStorage.setItem("watchList",JSON.stringify(state))
        },
        remove(state,action){
          const id = action.payload;
          const findId = state.find((item)=>item.id===id);
          console.log(findId)
           if(findId){
            //  localStorage.setItem("watchList",JSON.stringify(state))
             return state.filter((item)=>item.id!==id);
           }
          //  if(items.length===1) {
          //   localStorage.removeItem('watchList')
          //  }
            
         }
    }
}) 

export const{addWatch,remove} = watchList.actions;
export default watchList.reducer;