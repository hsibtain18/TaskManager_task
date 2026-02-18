import React, { useState } from 'react';
import type { Task, TaskFormData } from '../type';

interface Props {
  initialData?: Task | null;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
}

export default function TaskForm({ initialData, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<TaskFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    status: initialData?.status || 'pending',
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <form 
        onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}
        className="bg-white w-full max-w-md p-6 border border-gray-300"
      >
        <h2 className="text-lg font-bold mb-5 text-gray-800 border-b pb-2">
          {initialData ? 'Update Task' : 'Create New Task'}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Title</label>
            <input 
              required
              className="w-full border border-gray-300 p-2 text-sm outline-none focus:border-blue-500"
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Description</label>
            <textarea 
              className="w-full border border-gray-300 p-2 text-sm outline-none focus:border-blue-500 h-24 resize-none"
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button 
            type="button" 
            onClick={onCancel} 
            className="text-sm font-medium px-4 py-2 border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="text-sm font-medium bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
          >
            {initialData ? 'Save Changes' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
}