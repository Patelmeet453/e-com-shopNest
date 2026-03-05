import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/* ================= CREATE PRODUCT ================= */
export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunkAPI) => {
    try {
      const { data } = await api.post("products", formData, {
        withCredentials: true,
      });
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Product creation failed",
      );
    }
  },
);

/* ================= FETCH ALL PRODUCTS ================= */
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("products");
      return data;
    } catch (err) {
      console.error("FETCH PRODUCTS ERROR:", err.response?.data);
      return thunkAPI.rejectWithValue("Failed to fetch products");
    }
  },
);

/* ================= DELETE PRODUCT ================= */
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`products/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue("Delete failed");
    }
  },
);

/* ================= UPDATE PRODUCT ================= */
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const { data } = await api.put(`products/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Update failed");
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [], // 👈 all products
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetProductState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ========== CREATE ========== */
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.list.unshift(action.payload); // 👈 instant UI update
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ========== FETCH ========== */
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ========== DELETE ========== */
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (product) => product._id !== action.payload,
        );
      })

      /* ========== UPDATE ========== */
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.list.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../api/axios";

// /* 🔥 CREATE PRODUCT */
// export const createProduct = createAsyncThunk(
//   "products/create",
//   async (formData, thunkAPI) => {
//     try {
//       const { data } = await api.post("products", formData, {
//         withCredentials: true,
//       });
//       return data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || "Product creation failed",
//       );
//     }
//   },
// );

// const productSlice = createSlice({
//   name: "products",
//   initialState: {
//     loading: false,
//     success: false,
//     error: null,
//   },
//   reducers: {
//     resetProductState: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createProduct.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createProduct.fulfilled, (state) => {
//         state.loading = false;
//         state.success = true;
//       })
//       .addCase(createProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetProductState } = productSlice.actions;
// export default productSlice.reducer;
