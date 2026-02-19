import { useEffect, useState } from 'react';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import type { Task, TaskFormData } from './type';
import { taskService } from './services/Apis';
import { CircleCheckBig, LayoutGrid, SquircleDashed, Table } from 'lucide-react';

type ViewMode = 'grid' | 'table';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await taskService.getAll();
      setTasks(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const deleteTask = async (id: number) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(x => x.id !== id));
    } catch (error) {
      console.log("Delete failed");
    }
  };

  const ChangeStatus = async (data: Task) => {
    try {
      await taskService.toggleStatus(data);
      await loadTasks();
    } catch (error) {
      console.log("Status update failed");
    }
  };

  const saveTask = async (data: TaskFormData) => {
    try {
      if (editTask) {
        await taskService.updateTask(editTask.id, data);
      } else {
        await taskService.createTask(data);
      }
      await loadTasks();
      closeModal();
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  const closeModal = () => {
    setShowForm(false);
    setEditTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header with Toggle Logic */}
        <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-6">
          <h1 className="text-xl font-bold">Task Management</h1>

          <div className="flex items-center gap-4">
            <div className="flex border border-gray-300 rounded bg-white overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100 text-blue-600' : 'text-gray-400'}`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 border-l border-gray-300 ${viewMode === 'table' ? 'bg-gray-100 text-blue-600' : 'text-gray-400'}`}
              >
                <Table size={18} />
              </button>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 rounded"
            >
              + Add Task
            </button>
          </div>
        </div>

        {tasks.length > 0 ? (
          viewMode === 'grid' ? (
            /* GRID VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map(t => (
                <TaskCard
                  key={t.id}
                  task={t}
                  onDelete={deleteTask}
                  onEdit={(t) => { setEditTask(t); setShowForm(true); }}
                  onToggle={ChangeStatus}
                />
              ))}
            </div>
          ) : (
            /* TABLE VIEW */
            <div className="bg-white border border-gray-300 rounded shadow-sm overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-300">
                  <tr>
                    <th className="p-3 text-xs font-bold uppercase text-gray-600">Status</th>
                    <th className="p-3 text-xs font-bold uppercase text-gray-600">Title</th>
                    <th className="p-3 text-xs font-bold uppercase text-gray-600">Description</th>
                    <th className="p-3 text-xs font-bold uppercase text-gray-600 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(t => {
                    const done = t.status === 'completed';
                    return (
                      <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-3">
                          {done ? <CircleCheckBig /> :
                            <SquircleDashed onClick={() => ChangeStatus(t)} />}
                          {/* <input
                            type="checkbox"
                            checked={done}
                            onChange={() => ChangeStatus(t)}
                            className="accent-blue-600"
                          /> */}
                        </td>
                        <td className={`p-3 font-medium ${done ? 'line-through text-gray-400' : ''}`}>
                          {t.title}
                        </td>
                        <td className="p-3 text-gray-500 text-sm truncate max-w-xs">
                          {t.description}
                        </td>
                        <td className="p-3 text-right space-x-3">
                          {!done && (
                            <button
                              onClick={() => { setEditTask(t); setShowForm(true); }}
                              className="text-blue-600 hover:underline text-sm"
                            >
                              Edit
                            </button>
                          )}
                          <button
                            onClick={() => deleteTask(t.id)}
                            className="text-red-600 hover:underline text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="text-center py-12 bg-white border border-gray-200">
            <p className="text-gray-500">No tasks found.</p>
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