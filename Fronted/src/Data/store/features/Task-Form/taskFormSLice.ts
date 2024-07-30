// taskFormSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const taskFormSlice = createSlice({
  name: 'taskForm',
  initialState: {
    isVisible: false,
  },
  reducers: {
    showForm: (state) => {
      state.isVisible = true;
    },
    hideForm: (state) => {
      state.isVisible = false;
    },
  },
});

export const { showForm, hideForm } = taskFormSlice.actions;

export default taskFormSlice.reducer;
