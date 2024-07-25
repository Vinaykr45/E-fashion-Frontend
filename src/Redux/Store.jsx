import { configureStore } from '@reduxjs/toolkit';
import productReducer from './Productslice';
import cartReducer from './Cartslice';
import watchReducer from './Watchlistslice';
const store = configureStore({
  reducer: {
    data: productReducer,
    cart:cartReducer,
    watchlist:watchReducer
  },
});

export default store;
