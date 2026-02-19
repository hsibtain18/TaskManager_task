export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  created_at?: string;
}

export type TaskFormData = Omit<Task, 'id' | 'created_at'>;
export type ViewMode = 'grid' | 'table';