import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice'


let stock = createSlice({
  name: 'stock',
  initialState: [10, 11, 12]
})

let cart = createSlice({
  name: 'cartInfo',
  initialState: [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],
  reducers: {
    addCount(state, action){
      const foundItem = state.find((item) => item.id == action.payload)
      foundItem.count++
    },
    addOrder(state, action){
      let checking = state.some(item => item.id === action.payload.id) //false면 카트에 없는 상품
      if( !checking) {
        state.push({id : action.payload.id, name : action.payload.name, count : 1})
      } else {
        const foundItem = state.find((item) => item.id == action.payload.id)
        foundItem.count++
      }
    }
  }
})    

export let {addCount, addOrder}  = cart.actions


export default configureStore({
  reducer: { 
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer
  }
}) 