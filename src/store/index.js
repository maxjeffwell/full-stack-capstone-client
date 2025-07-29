import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import studentsReducer from './slices/studentsSlice';
import toggleReducer from './slices/toggleSlice';
import signupReducer from './slices/signupSlice';
import modalReducer from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentsReducer,
    isSidebarToggled: toggleReducer,
    signup: signupReducer,
    modals: modalReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/signin/fulfilled', 'auth/signup/fulfilled'],
        // Ignore these paths in the state
        ignoredPaths: ['modals.modalProps', 'modals.modalProps.children'],
        ignoredActionPaths: [
          'payload.modalProps.children',
          'payload.modalProps.children.$$typeof',
          'meta.arg.callback',
        ],
      },
    }),
});

// For TypeScript projects, you would export these types:
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
