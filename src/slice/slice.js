import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const BASE_URL = 'https://reqres.in/api'

export const getAll = createAsyncThunk(
  "get/getAll",
  async () => {
    const response = await fetch(`${BASE_URL}/unknown`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // access_token: token,
      },
    });
    if (response.ok) {
      const responseJson = await response.json();
      // console.log(responseJson.data);
      return responseJson;

    }
  }
);

export const getDetail = createAsyncThunk(
  "detail/getDetail",
  async (id) => {
    const response = await fetch(`${BASE_URL}/unknown/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // access_token: token,
      },
    });
    if (response.ok) {
      const responseJson = await response.json();
      // console.log(responseJson, "ahhaahahahah");
      return responseJson;

    }
  }
);

export const getAllUser = createAsyncThunk(
  "getUser/getAllUser",
  async () => {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // access_token: token,
      },
    });
    if (response.ok) {
      const responseJson = await response.json();
      // console.log(responseJson, 'slice');
      return responseJson;

    }
  }
);

export const getUserDetail = createAsyncThunk(
  "detailUser/getUserDetail",
  async ({id, move}) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // access_token: token,
      },
    });
    if (response.ok) {
      const responseJson = await response.json();
      move()
      return responseJson;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser/getDeleteUser",
  async ({id, move, AlertSuccess, AlertFailed}) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // access_token: token,
      },
    });
    if (response.ok) {
      AlertSuccess()
      move()
    }else{
      AlertFailed()
    }
  }
);

export const addUser = createAsyncThunk(
  "add/addUser",
  async ({
    userName,
    email,
    move,
    AlertSuccess,
    AlertFailed,
  }) => {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // access_token: token,
      },
      body: JSON.stringify({ userName, email }),
    });
    const data = await response.json();
    if (response.ok) {
      AlertSuccess();
      // dispatch(fetchDataUser(data.data));
      move();
    } else {
      AlertFailed();
    }
  }
)

export const editUser = createAsyncThunk(
  "add/addUser",
  async ({
    userName,
    jobs,
    move,
    AlertSuccess,
    AlertFailed,
  }) => {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // access_token: token,
      },
      body: JSON.stringify({ userName, jobs }),
    });
    const data = await response.json();
    if (response.ok) {
      AlertSuccess();
      // dispatch(fetchDataUser(data.data));
      move();
    } else {
      AlertFailed();
    }
  }
)

export const doLogin = createAsyncThunk(
  "login/postLogin",
  async ({
    email,
    password,
    move,
    AlertSuccess,
    AlertFailed,
    storeData
  }) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    // console.log(data, 'yaoi');
    if (response.ok) {
      AlertSuccess();
      // dispatch(fetchDataUser(data.data));
      storeData(data.token);
      move();
    } else {
      AlertFailed();
    }
  }
)

export const doRegister = createAsyncThunk(
  "register/postRegister",
  async ({
    email,
    password,
    move,
    AlertSuccess,
    AlertFailed
  }) => {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      AlertSuccess();
      move();
    } else {
      AlertFailed();
    }
  }
)

const initialState = {
  data: [],
  detail: [],
  dataUser: [],
  detailUser: []
};

export const actionCreator = createSlice({
  name: "user",
  initialState,
  reducers: [],
  extraReducers: {
    [getAll.pending]: (state) => {
      state.loading = true;
    },
    [getAll.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getAll.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // detail
    [getDetail.pending]: (state) => {
      state.loading = true;
    },
    [getDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.detail = action.payload;
    },
    [getDetail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // get user
    [getAllUser.pending]: (state) => {
      state.loading = true;
    },
    [getAllUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataUser = action.payload;
    },
    [getAllUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // user detail
    [getUserDetail.pending]: (state) => {
      state.loading = true;
    },
    [getUserDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.detailUser = action.payload;
    },
    [getUserDetail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});


export default actionCreator.reducer;