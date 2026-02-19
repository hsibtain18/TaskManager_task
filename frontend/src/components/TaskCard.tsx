import { Trash2, Edit3, CircleCheckBig, SquarePen, SquircleDashed } from 'lucide-react';
import type { Task } from '../type';

interface Props {
  task: Task;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
  onToggle: (task: Task) => void;
}

export default function TaskCard({ task, onDelete, onEdit, onToggle }: Props) {
  const isDone = task.status === 'completed';

  return (
    <div className="bg-white border border-gray-300 p-4 flex flex-col justify-between shadow-sm">
      <div>
        <div className="flex items-center justify-between mb-3">
          {isDone ?
            <CircleCheckBig /> :
            <SquircleDashed onClick={() => onToggle(task)} />

          }
          <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 border ${isDone ? 'bg-gray-100 border-gray-200 text-gray-500' : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}>
            {task.status}
          </span>
        </div>

        <h3 className={`font-semibold text-gray-900 ${isDone ? 'line-through text-gray-400' : ''}`}>
          {task.title}
        </h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {task.description}
        </p>
      </div>

      <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
        {isDone ||
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-500 hover:bg-gray-100 rounded"
            title="Edit"
          >
            <SquarePen size={16} />
          </button>
        }

        <button
          onClick={() => onDelete(task.id)}
          className="p-1.5 text-red-500 hover:bg-red-50 rounded"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}