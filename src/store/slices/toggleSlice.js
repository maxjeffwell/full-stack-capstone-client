import { createSlice } from '@reduxjs/toolkit';

const toggleSlice = createSlice({
  name: 'toggle',
  initialState: false,
  reducers: {
    toggleSidebar: state => !state,
    setSidebarOpen: (state, action) => action.payload,
    closeSidebar: () => false,
    openSidebar: () => true,
  },
});

// Export actions
export const { toggleSidebar, setSidebarOpen, closeSidebar, openSidebar } =
  toggleSlice.actions;

// Export reducer
export default toggleSlice.reducer;

// Selectors
export const selectIsSidebarToggled = state => state.isSidebarToggled;
