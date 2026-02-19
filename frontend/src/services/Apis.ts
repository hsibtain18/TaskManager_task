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


};