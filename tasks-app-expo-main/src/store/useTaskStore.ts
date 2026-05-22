import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  addTask as apiAddTask,
  deleteTask as apiDeleteTask,
  getAllTasks as apiGetAllTasks,
  updateTask as apiUpdateTask,
  TaskItem,
} from '../utils/handle-api';

interface TaskState {
  tasks: TaskItem[];
  loading: boolean;

  fetchTasks: () => void;

  addTask: (
    text: string,
    completed: boolean,
    dueDate: string | null,
    resetForm?: () => void
  ) => void;

  updateTask: (
    id: string,
    text: string,
    completed: boolean,
    dueDate: string | null,
    resetForm?: () => void
  ) => void;

  deleteTask: (id: string) => void;
  clearTasks: () => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      loading: false,

      fetchTasks: async () => {
        set({ loading: true });

        await apiGetAllTasks(
          (tasks) => set({ tasks }),
          (loading) => set({ loading })
        );
      },

      addTask: async (text, completed, dueDate, resetForm) => {
        await apiAddTask(
          text,
          completed,
          dueDate,
          (tasks) => set({ tasks }),
          resetForm || (() => {})
        );
      },

      updateTask: async (id, text, completed, dueDate, resetForm) => {
        await apiUpdateTask(
          id,
          text,
          completed,
          dueDate,
          (tasks) => set({ tasks }),
          resetForm || (() => {})
        );
      },

      deleteTask: async (id) => {
        await apiDeleteTask(
          id,
          (tasks) => set({ tasks })
        );
      },

      clearTasks: () => set({ tasks: [] }),
    }),
    {
      name: 'task-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
