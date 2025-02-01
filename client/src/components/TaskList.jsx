import TaskItem from "./TaskItem";
import PropTypes from "prop-types";

function TaskList({ tasks, deleteTask, toggleTaskCompletion }) {
  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          deleteTask={deleteTask}
          toggleTaskCompletion={toggleTaskCompletion}
        />
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTaskCompletion: PropTypes.func.isRequired,
};

export default TaskList;
