import { createSlice } from "@reduxjs/toolkit";

const items = localStorage.getItem('cartItem')!== null ? JSON.parse(localStorage.getItem('cartItem')):[];

const cartSlice = createSlice({
    name:'cart',
    initialState:items,
    reducers:{
        addCart(state,action){
           state.push(action.payload);
           localStorage.setItem("cartItem",JSON.stringify(state))
        },
        remove(state,action){
           const {id} = action.payload;
           const getSize = state.find((item)=>item.id+item.size===id);
          if(getSize){
            console.log(getSize.id+getSize.size)
            return state.filter((item)=>item.id+item.size!==id);
          }
          if (items.length===1) {
           localStorage.removeItem('cartItem')
          }
          else{
            localStorage.setItem("cartItem",JSON.stringify(state))
          }
        },
        updateCart(state,action){
            const{id,newSize,newQny,csize,sprice,price}=action.payload;
            const getSize = state.find((item)=>item.id===id&&item.size===csize); 
            if(getSize){
            getSize.size=newSize;
            getSize.quantity=newQny;
            getSize.sprice=sprice*newQny;
            getSize.price=price*newQny;
            localStorage.setItem("cartItem",JSON.stringify(state))
            } 
            

        }
    }
})

export const {addCart,remove,updateCart} = cartSlice.actions;

export default cartSlice.reducer;