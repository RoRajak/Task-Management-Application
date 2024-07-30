import {
  createSlice,
  createAsyncThunk,
  Draft,
  PayloadAction,
} from "@reduxjs/toolkit";


// Define the Task and TaskState types
interface Task {
  _id?:string;
  title: string;
  description: string;
  priority: string;
  deadline: string;
  status: string;
}

interface TaskState {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Define the async thunk for adding a task
export const addTask = createAsyncThunk<Task ,Task>(
  "tasks/addTask",
  async (taskData) => {
    const response = await fetch("https://task-management-application-vj6i.onrender.com/todo/create-todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(taskData),
    });
    return (await response.json()) as Task;
  }
);

//defining updateTask

export const updateTask = createAsyncThunk<Task, Task>(
  "tasks/updateTask",
  async (taskData) => {
    const response = await fetch(`https://task-management-application-vj6i.onrender.com/todo/update/${taskData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(taskData),
    });
    return (await response.json()) as Task;
  }
);

// Create the task slice
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  } as TaskState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = "succeeded";
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })
      .addCase(updateTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = "succeeded";
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export default taskSlice.reducer;
