// src/services/taskService.ts
import type { Task, TaskFormData } from '../type';
import DBConnect from './DBConnect';

export const taskService = {
  // Fetch all tasks default in order of created date 
  getAll: async (): Promise<Task[]> => {
    const response = await DBConnect.get('/tasks');
    return response.data;
  },

  // Insert a new task
  createTask: async (data: TaskFormData): Promise<Task> => {
    const response = await DBConnect.post('/tasks', data);
    return response.data;
  },

  deleteTask: async (id: number): Promise<void> => {
    await DBConnect.delete(`/tasks/${id}`);
  },

  // Toggle status
  toggleStatus: async (task: Task): Promise<Task> => {
    const newStatus = 'completed';
    const response = await DBConnect.patch(`/tasks/${task.id}`, { status: newStatus });
    return response.data;
  },
  updateTask: async (id: number, data: TaskFormData): Promise<Task> => {
    const response = await DBConnect.put(`/tasks/${id}`, data);
    return response.data;
  },

};