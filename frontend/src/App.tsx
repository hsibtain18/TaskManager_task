import { useEffect, useState } from 'react';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import type { Task, TaskFormData } from './type';
import { taskService } from './services/Apis';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await taskService.getAll();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
    }
  };
  const deleteTask = async (id: number) => {
    try {
      await taskService.deleteTask(id)
      setTasks(tasks.filter(x => x.id !== id))
    } catch (error) {
      console.log("Failed to delete");
      
    }
  }
   const ChangeStatus = async (data: Task) => {
    try {
      await taskService.toggleStatus(data)
      await loadTasks()
    } catch (error) {
      console.log("Failed to delete");
      
    }
  }
  const saveTask = async (data: TaskFormData) => {
    try {
      debugger
      if (editTask) {
        await taskService.updateTask(editTask.id,data)
      } else {
         await taskService.createTask(data);
      }
      
      await loadTasks()
      closeModal();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const closeModal = () => {
    setShowForm(false);
    setEditTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-6">
          <h1 className="text-xl font-bold">Task Management System</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700"
          >
            + Add Task
          </button>
        </div>

        {tasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map(t => (
              <TaskCard
                key={t.id}
                task={t}
                onDelete={(id) => deleteTask(id)}
                onEdit={(t) => { setEditTask(t); setShowForm(true); }}
                onToggle={(t) => ChangeStatus(t)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white border border-gray-200">
            <p className="text-gray-500">No tasks found. Click "+ Add Task" to begin.</p>
          </div>
        )}
      </div>

      {showForm && (
        <TaskForm
          initialData={editTask}
          onSubmit={saveTask}
          onCancel={closeModal}
        />
      )}
    </div>
  );
}