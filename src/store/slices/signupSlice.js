import { createSlice } from '@reduxjs/toolkit';
import { signup } from './authSlice';

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    loading: false,
    errorMessage: '',
  },
  reducers: {
    registerUserRequest: state => {
      state.loading = true;
      state.errorMessage = '';
    },
    registerUserError: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    clearSignupError: state => {
      state.errorMessage = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signup.pending, state => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(signup.fulfilled, state => {
        state.loading = false;
        state.errorMessage = '';
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

// Export actions
export const { registerUserRequest, registerUserError, clearSignupError } =
  signupSlice.actions;

// Export reducer
export default signupSlice.reducer;

// Selectors
export const selectSignupLoading = state => state.signup.loading;
export const selectSignupError = state => state.signup.errorMessage;
