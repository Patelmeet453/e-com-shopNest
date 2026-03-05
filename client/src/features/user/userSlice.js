import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/* =========================
   USERS (ADMIN)
========================= */

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const { data } = await api.get("users", { withCredentials: true });
  return data;
});

export const createUser = createAsyncThunk("users/create", async (userData) => {
  const { data } = await api.post("users", userData, {
    withCredentials: true,
  });
  return data;
});

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, userData }) => {
    const { data } = await api.put(`users/${id}`, userData, {
      withCredentials: true,
    });
    return data;
  },
);

export const toggleBlockUser = createAsyncThunk(
  "users/block",
  async ({ id, block }, { dispatch }) => {
    await api.put(`users/${id}/block`, { block }, { withCredentials: true });
    dispatch(fetchUsers());
  },
);

export const deleteUser = createAsyncThunk("users/delete", async (id) => {
  await api.delete(`users/${id}`, { withCredentials: true });
  return id;
});

/* =========================
   MY PROFILE (LOGGED USER)
========================= */

export const fetchMyProfile = createAsyncThunk(
  "users/fetchMyProfile",
  async () => {
    const { data } = await api.get("users/profile", {
      withCredentials: true,
    });
    return data;
  },
);

export const updateMyProfile = createAsyncThunk(
  "users/updateMyProfile",
  async (profileData) => {
    const { data } = await api.put("users/profile", profileData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },
);

/* =========================
   SLICE
========================= */

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    myProfile: null, // ✅ important
    loading: false,
  },
  reducers: {
    clearProfile: (s) => {
      s.myProfile = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* USERS */
      .addCase(fetchUsers.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload;
      })
      .addCase(fetchUsers.rejected, (s) => {
        s.loading = false;
      })

      .addCase(createUser.fulfilled, (s, a) => {
        s.list.unshift(a.payload);
      })

      .addCase(updateUser.fulfilled, (s, a) => {
        const i = s.list.findIndex((u) => u._id === a.payload._id);
        if (i !== -1) s.list[i] = a.payload;
      })

      .addCase(deleteUser.fulfilled, (s, a) => {
        s.list = s.list.filter((u) => u._id !== a.payload);
      })

      /* MY PROFILE */
      .addCase(fetchMyProfile.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchMyProfile.fulfilled, (s, a) => {
        s.loading = false;
        s.myProfile = a.payload;
      })
      .addCase(fetchMyProfile.rejected, (s) => {
        s.loading = false;
      })

      .addCase(updateMyProfile.pending, (s) => {
        s.loading = true;
      })
      .addCase(updateMyProfile.fulfilled, (s, a) => {
        s.loading = false;
        s.myProfile = a.payload;
      })
      .addCase(updateMyProfile.rejected, (s) => {
        s.loading = false;
      });
  },
});

export const { clearProfile } = userSlice.actions;
export default userSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../api/axios";

// /* FETCH USERS */
// export const fetchUsers = createAsyncThunk("users/fetch", async () => {
//   const { data } = await api.get("users", { withCredentials: true });
//   return data;
// });

// /* CREATE USER */
// export const createUser = createAsyncThunk("users/create", async (userData) => {
//   const { data } = await api.post("users", userData, {
//     withCredentials: true,
//   });
//   return data;
// });

// /* UPDATE USER */
// export const updateUser = createAsyncThunk(
//   "users/update",
//   async ({ id, userData }) => {
//     const { data } = await api.put(`users/${id}`, userData, {
//       withCredentials: true,
//     });
//     return data;
//   },
// );

// /* BLOCK USER */
// export const toggleBlockUser = createAsyncThunk(
//   "users/block",
//   async ({ id, block }, { dispatch }) => {
//     await api.put(`users/${id}/block`, { block }, { withCredentials: true });

//     // 🔥 always refetch to stay in sync
//     dispatch(fetchUsers());
//   },
// );

// /* DELETE USER */
// export const deleteUser = createAsyncThunk("users/delete", async (id) => {
//   await api.delete(`users/${id}`, { withCredentials: true });
//   return id;
// });

// /* =========================
//    USER PROFILE (LOGGED IN)
// ========================= */

// /* FETCH MY PROFILE */
// export const fetchMyProfile = createAsyncThunk(
//   "users/fetchMyProfile",
//   async () => {
//     const { data } = await api.get("users/profile", {
//       withCredentials: true,
//     });
//     return data;
//   }
// );

// /* UPDATE MY PROFILE */
// export const updateMyProfile = createAsyncThunk(
//   "users/updateMyProfile",
//   async (profileData) => {
//     const { data } = await api.put("users/profile", profileData, {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return data;
//   }
// );

// const userSlice = createSlice({
//   name: "users",
//   initialState: {
//     list: [],
//     loading: false,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (s) => {
//         s.loading = true;
//       })
//       .addCase(fetchUsers.fulfilled, (s, a) => {
//         s.loading = false;
//         s.list = a.payload;
//       })
//       .addCase(createUser.fulfilled, (s, a) => {
//         s.list.unshift(a.payload);
//       })
//       .addCase(updateUser.fulfilled, (s, a) => {
//         const i = s.list.findIndex((u) => u._id === a.payload._id);
//         if (i !== -1) s.list[i] = a.payload;
//       })
//       // .addCase(toggleBlockUser.fulfilled, (s, a) => {
//       //   const i = s.list.findIndex(u => u._id === a.payload._id);
//       //   if (i !== -1) s.list[i] = a.payload;
//       // })
//       .addCase(deleteUser.fulfilled, (s, a) => {
//         s.list = s.list.filter((u) => u._id !== a.payload);
//       })

//       .addCase(fetchMyProfile.fulfilled, (s, a) => {
//         s.myProfile = a.payload;
//       })
//       .addCase(updateMyProfile.fulfilled, (s, a) => {
//         s.myProfile = a.payload;
//       });
//   },
// });

// export const { clearProfile } = userSlice.actions;
// export default userSlice.reducer;
