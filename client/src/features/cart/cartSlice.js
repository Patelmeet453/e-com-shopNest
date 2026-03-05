import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/* FETCH CART */
export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const { data } = await api.get("/cart", { withCredentials: true });
  return data;
});

/* ADD */
export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ productId, qty }) => {
    const { data } = await api.post(
      "/cart",
      { productId, qty },
      { withCredentials: true },
    );
    return data;
  },
);

/* UPDATE */
export const updateQty = createAsyncThunk(
  "cart/update",
  async ({ productId, qty }) => {
    const { data } = await api.put(
      "/cart",
      { productId, qty },
      { withCredentials: true },
    );
    return data;
  },
);

/* REMOVE */
export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (productId) => {
    const { data } = await api.delete(`/cart/${productId}`, {
      withCredentials: true,
    });
    return data;
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (s, a) => {
        s.items = a.payload;
      })
      .addCase(addToCart.fulfilled, (s, a) => {
        s.items = a.payload;
      })
      .addCase(updateQty.fulfilled, (s, a) => {
        s.items = a.payload;
      })
      .addCase(removeFromCart.fulfilled, (s, a) => {
        s.items = a.payload;
      });
  },
});

export default cartSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [],
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       const item = state.items.find(i => i._id === action.payload._id);
//       if (item) {
//         item.qty += action.payload.qty;
//       } else {
//         state.items.push({ ...action.payload, qty: action.payload.qty });
//       }
//     },
//     increaseQty: (state, action) => {
//       const item = state.items.find(i => i._id === action.payload);
//       if (item) item.qty += 1;
//     },
//     decreaseQty: (state, action) => {
//       const item = state.items.find(i => i._id === action.payload);
//       if (item && item.qty > 1) item.qty -= 1;
//     },
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(i => i._id !== action.payload);
//     },
//   },
// });

// export const {
//   addToCart,
//   increaseQty,
//   decreaseQty,
//   removeFromCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;
