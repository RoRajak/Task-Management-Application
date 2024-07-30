// store.ts
import { configureStore } from '@reduxjs/toolkit';
import taskFormReducer from './features/Task-Form/taskFormSLice';
import taskReducer from './features/Task/taskSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      taskForm: taskFormReducer,
      tasks: taskReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];


