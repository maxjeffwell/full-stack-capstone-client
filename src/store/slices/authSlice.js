import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import authService from '../../utils/auth';

// Initial state
const initialState = {
  authenticated: authService.isAuthenticated() ? authService.getToken() : '',
  errorMessage: '',
  loading: false,
};

// Async thunks
export const signin = createAsyncThunk(
  'auth/signin',
  async ({ formData, callback }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signin`, formData);
      const { token, refreshToken } = response.data;

      // Store tokens securely
      authService.setToken(token);
      if (refreshToken) {
        authService.setTokens(token, refreshToken);
      }

      // Execute callback if provided
      if (callback) callback();

      return { token };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          'Invalid login email or password. Please try logging in again.'
      );
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ formData, callback }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, formData);
      const { token, refreshToken } = response.data;

      // Store tokens securely
      authService.setToken(token);
      if (refreshToken) {
        authService.setTokens(token, refreshToken);
      }

      // Execute callback if provided
      if (callback) callback();

      return { token };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          'This email is in use. Please register using a different email.'
      );
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signout: state => {
      authService.clearTokens();
      state.authenticated = '';
      state.errorMessage = '';
    },
    clearError: state => {
      state.errorMessage = '';
    },
    setError: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Signin cases
      .addCase(signin.pending, state => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = action.payload.token;
        state.errorMessage = '';
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      // Signup cases
      .addCase(signup.pending, state => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = action.payload.token;
        state.errorMessage = '';
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

// Export actions
export const { signout, clearError, setError } = authSlice.actions;

// Export reducer
export default authSlice.reducer;

// Selectors
export const selectAuth = state => state.auth.authenticated;
export const selectAuthError = state => state.auth.errorMessage;
export const selectAuthLoading = state => state.auth.loading;
