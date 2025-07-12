// Re-export all actions from slices for backward compatibility
// This allows components to continue using the same import paths

export {
  signin,
  signup,
  signout,
  clearError as clearAuthError,
  setError as setAuthError,
} from './slices/authSlice';

export {
  fetchStudents,
  fetchStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  clearSelectedStudent,
  clearError as clearStudentsError,
} from './slices/studentsSlice';

export {
  toggleSidebar,
  setSidebarOpen,
  closeSidebar,
  openSidebar,
} from './slices/toggleSlice';

export { showModal, hideModal } from './slices/modalSlice';

export {
  registerUserRequest,
  registerUserError,
  clearSignupError,
} from './slices/signupSlice';
