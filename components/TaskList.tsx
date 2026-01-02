
import React from 'react';
import { Task } from '../types';
import { ChevronDown, ChevronRight, Clock, Trash2, Search } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  searchQuery?: string;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete, searchQuery = '' }) => {
  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);
  const [showCompleted, setShowCompleted] = React.useState(false);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold text-gray-900">
          {searchQuery ? 'Results' : 'Tasks'}
        </h2>
        {searchQuery && (
          <div className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs font-bold animate-in fade-in zoom-in duration-300">
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        {activeTasks.map((task) => (
          <div key={task.id} className="flex items-start gap-4 group animate-in slide-in-from-left-4 duration-300">
            <button 
              onClick={() => onToggle(task.id)}
              className="w-6 h-6 rounded-full border-2 border-gray-200 mt-1 flex-shrink-0 flex items-center justify-center hover:border-yellow-400 transition-colors"
            >
              <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-0 group-hover:opacity-20" />
            </button>
            <div className="flex flex-col gap-1 flex-1">
              <span className="text-lg text-gray-800">{task.text}</span>
              {task.reminder && (
                <div className="flex items-center gap-1 text-yellow-600 text-sm">
                  <Clock size={12} />
                  <span>{task.reminder}</span>
                </div>
              )}
            </div>
            <button 
              onClick={() => onDelete(task.id)}
              className="opacity-0 group-hover:opacity-100 p-1 text-gray-300 hover:text-red-400 transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}

        {activeTasks.length === 0 && (
          <div className="py-12 flex flex-col items-center justify-center text-center text-gray-400 opacity-60">
            {searchQuery ? (
              <>
                <Search size={48} className="mb-4 text-gray-200" />
                <p className="font-medium">No tasks match "{searchQuery}"</p>
                <p className="text-sm mt-1">Try a different keyword</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <CheckCircleIcon className="text-gray-300" />
                </div>
                <p className="font-medium">No active tasks. Take a breath!</p>
              </>
            )}
          </div>
        )}

        {completedTasks.length > 0 && (
          <div className="pt-4">
            <button 
              onClick={() => setShowCompleted(!showCompleted)}
              className="flex items-center justify-between w-full text-gray-500 py-4 hover:bg-gray-50 px-2 rounded-xl transition-colors"
            >
              <span className="font-medium">Completed ({completedTasks.length})</span>
              {showCompleted ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            
            {showCompleted && (
              <div className="space-y-6 mt-4 opacity-100 transition-all duration-300">
                {completedTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-4 group">
                    <button 
                      onClick={() => onToggle(task.id)}
                      className="w-6 h-6 rounded-full bg-gray-100 border-2 border-transparent mt-1 flex-shrink-0 flex items-center justify-center"
                    >
                      <div className="w-2 h-2 rounded-full bg-gray-400" />
                    </button>
                    <span className="text-lg text-gray-400 line-through flex-1">{task.text}</span>
                    <button 
                      onClick={() => onDelete(task.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-300 hover:text-red-400 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Simple icon for empty state
const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

export default TaskList;
