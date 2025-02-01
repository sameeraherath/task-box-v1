import PropTypes from "prop-types";
import { CheckCircle, Trash2 } from "lucide-react";

function TaskItem({ task, deleteTask, toggleTaskCompletion }) {
  return (
    <li
      className={`flex justify-between items-center p-4 mb-2 rounded-2xl ${
        task.completed ? "bg-green-100" : "bg-gray-800"
      } shadow`}
    >
      <span
        className={`flex-1 ${
          task.completed ? "line-through text-gray-600" : ""
        }`}
      >
        {task.title}
      </span>
      <div className="flex space-x-2">
        <button
          onClick={() => toggleTaskCompletion(task._id)}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
        >
          <CheckCircle size={20} />
        </button>
        <button
          onClick={() => deleteTask(task._id)}
          className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </li>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTaskCompletion: PropTypes.func.isRequired,
};

export default TaskItem;
