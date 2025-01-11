import { createSlice,createAction } from '@reduxjs/toolkit';
import { login } from './LogInThuck';
import { logout } from './LogOutThuck';
import { initializeAuth } from './IntializeAuthThunk';
import { signUp } from './SignUpThunck';
import { updateProfileThunk } from './UpdateProfileThunk';
// export const setInitialState = createAction('auth/setInitialState');

const initialState = {
  user: null,
  role:'',
  isLoggedIn: false,
  loading: false,
  error: null,
};
// export const setInitialState = createAction('auth/setInitialState');

 const authSlice = createSlice({
  name: 'auth',
  initialState,
//    reducers: {
//     // clearError: (state) => {
//     //   state.error = null;
//     // },
//     // setInitialState: (state) => {
//     //   state.user = null;
//     //   state.isLoggedIn = false;
//     //   state.loading = false;
//     //   state.error = null;
//     //   state.role='';
//     // }
// } ,
   extraReducers: (builder) => {
    builder
     .addCase(signUp.pending, (state) =>{
         state.loading = true;
         state.error = null;
     })
     .addCase(signUp.fulfilled, (state, action) => {
            state.loading = false;
            state.isLoggedIn = true;
            state.user = action.payload;
            state.error = null;
            state.role = 'learner';
     })
     .addCase(signUp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.error || 'Sign-up failed';;
     })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.role = action.payload.role;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload?.error || 'Login failed';
         state.isLoggedIn = false;
         state.user = null;
         state.role = '';
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.role='';
        state.user = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error.message || 'Logout failed';
      })
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {         
        state.loading = false;
        state.isLoggedIn = true;
        state.role=action.payload.role;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Intialization failed';     
      })
      .addCase(updateProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })  
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })  
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Update failed';
      })
      // .addCase(setInitialState, (state) => {
      //   state.user = null;
      //   state.role = '';
      //   state.isLoggedIn = false;
      //   state.loading = false;
      //   state.error = null;
      // });
   }
});

export default authSlice.reducer;
