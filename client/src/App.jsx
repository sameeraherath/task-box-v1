import { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch all tasks from the server
  useEffect(() => {
    axios
      .get("http://localhost:5002/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log("Error fetching tasks", error);
      });
  }, []);
  // Add a new task
  const addTask = (newTask) => {
    axios
      .post("http://localhost:5002/tasks", newTask)
      .then((response) => {
        setTasks([...tasks, response.data]);
      })
      .catch((error) => {
        console.log("Error adding task", error);
      });
  };

  // Delete a task
  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:5002/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id));
      })
      .catch((error) => {
        console.log("Error deleting task", error);
      });
  };

  // Mark task as completed (Placeholder function)
  const toggleTaskCompletion = (id) => {
    const task = tasks.find((t) => t._id === id);
    axios
      .put(`http://localhost:5002/tasks/${id}`, {
        ...task,
        completed: !task.completed,
      })
      .then((response) => {
        setTasks(tasks.map((t) => (t._id === id ? response.data : t)));
      })
      .catch((error) => {
        console.log("Error updating task", error);
      });
  };

  return (
    <div className="app max-w-lg mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 mt-8">TaskBox</h1>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleTaskCompletion={toggleTaskCompletion}
      />
    </div>
  );
}

export default App;
