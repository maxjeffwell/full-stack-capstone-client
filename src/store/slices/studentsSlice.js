import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import authService from '../../utils/auth';
import { setError } from './authSlice';

// Create entity adapter for normalized state
const studentsAdapter = createEntityAdapter({
  // Assuming students have an 'id' field
  selectId: student => student.id || student._id,
});

// Initial state
const initialState = studentsAdapter.getInitialState({
  loading: false,
  error: null,
  selectedStudent: null,
});

// Async thunks
export const fetchStudents = createAsyncThunk(
  'students/fetchAll',
  async (_, { dispatch, getState, rejectWithValue }) => {
    console.log('fetchStudents thunk called');

    // Check both authService and Redux state
    const token = authService.getToken();
    const reduxAuth = getState().auth.authenticated;

    console.log('Auth check:', {
      hasToken: !!token,
      isAuthenticated: authService.isAuthenticated(),
      reduxAuth: !!reduxAuth,
    });

    // If we have a token, try to use it regardless of validation
    if (!token && !reduxAuth) {
      console.log('Not authenticated - no token found');
      dispatch(setError('No authentication token found'));
      return rejectWithValue('Not authenticated');
    }

    // Log that we're proceeding with the request
    console.log('Proceeding with API request despite validation issues');

    try {
      console.log('Making API request to:', `${API_BASE_URL}/students`);
      const response = await axios.get(`${API_BASE_URL}/students`);
      console.log('API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API request failed:', error);
      if (error.response?.status === 401) {
        authService.clearTokens();
        dispatch(setError('Session expired. Please log in again.'));
      }
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch students'
      );
    }
  }
);

export const fetchStudent = createAsyncThunk(
  'students/fetchOne',
  async (id, { dispatch, rejectWithValue }) => {
    if (!authService.isAuthenticated()) {
      dispatch(setError('No authentication token found'));
      return rejectWithValue('Not authenticated');
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/students/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        authService.clearTokens();
        dispatch(setError('Session expired. Please log in again.'));
      }
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch student'
      );
    }
  }
);

export const createStudent = createAsyncThunk(
  'students/create',
  async (studentData, { dispatch, getState, rejectWithValue }) => {
    console.log('createStudent thunk called with:', studentData);

    // Check authentication similar to fetchStudents
    const token = authService.getToken();
    const reduxAuth = getState().auth.authenticated;

    console.log('Create student auth check:', {
      hasToken: !!token,
      reduxAuth: !!reduxAuth,
    });

    if (!token && !reduxAuth) {
      console.log('Not authenticated - no token found');
      dispatch(setError('No authentication token found'));
      return rejectWithValue('Not authenticated');
    }

    try {
      console.log('Making POST request to:', `${API_BASE_URL}/students`);
      const response = await axios.post(
        `${API_BASE_URL}/students`,
        studentData
      );
      console.log('Create student response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Create student failed:', error);
      console.error('Error response:', error.response);

      if (error.response?.status === 401) {
        authService.clearTokens();
        dispatch(setError('Session expired. Please log in again.'));
      }
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to create student'
      );
    }
  }
);

export const updateStudent = createAsyncThunk(
  'students/update',
  async ({ id, ...studentData }, { dispatch, rejectWithValue }) => {
    if (!authService.isAuthenticated()) {
      dispatch(setError('No authentication token found'));
      return rejectWithValue('Not authenticated');
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/students/${id}`,
        studentData
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        authService.clearTokens();
        dispatch(setError('Session expired. Please log in again.'));
      }
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update student'
      );
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'students/delete',
  async (id, { dispatch, rejectWithValue }) => {
    if (!authService.isAuthenticated()) {
      dispatch(setError('No authentication token found'));
      return rejectWithValue('Not authenticated');
    }

    try {
      await axios.delete(`${API_BASE_URL}/students/${id}`);
      return id;
    } catch (error) {
      if (error.response?.status === 401) {
        authService.clearTokens();
        dispatch(setError('Session expired. Please log in again.'));
      }
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete student'
      );
    }
  }
);

// Students slice
const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    clearSelectedStudent: state => {
      state.selectedStudent = null;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch all students
      .addCase(fetchStudents.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        studentsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch one student
      .addCase(fetchStudent.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedStudent = action.payload;
        studentsAdapter.upsertOne(state, action.payload);
      })
      .addCase(fetchStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create student
      .addCase(createStudent.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading = false;
        studentsAdapter.addOne(state, action.payload);
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update student
      .addCase(updateStudent.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        studentsAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete student
      .addCase(deleteStudent.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        studentsAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearSelectedStudent, clearError } = studentsSlice.actions;

// Export reducer
export default studentsSlice.reducer;

// Export selectors
export const {
  selectAll: selectAllStudents,
  selectById: selectStudentById,
  selectIds: selectStudentIds,
} = studentsAdapter.getSelectors(state => state.students);

export const selectStudentsLoading = state => state.students.loading;
export const selectStudentsError = state => state.students.error;
export const selectSelectedStudent = state => state.students.selectedStudent;
