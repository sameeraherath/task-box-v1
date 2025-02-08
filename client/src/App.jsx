import { useState, useEffect } from "react";
import { SquareArrowOutUpLeft } from "lucide-react";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Login from "./components/Login";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tasks, setTasks] = useState([]);

  // Handle successful login
  const handleLoginSuccess = (tokenId) => {
    console.log("Token Received: ", tokenId);
    setIsAuthenticated(true);
  };

  // Handle logout to reset the authentication status
  const handleLogout = () => {
    setIsAuthenticated(false);
    setTasks([]); // Clear tasks when logged out
  };

  // Fetch tasks only if the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(`${API_URL}/tasks`)
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.log("Error fetching tasks", error);
        });
    }
  }, [isAuthenticated]);

  // Add a new task
  const addTask = (newTask) => {
    axios
      .post(`${API_URL}/tasks`, newTask)
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
      .delete(`${API_URL}/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id));
      })
      .catch((error) => {
        console.log("Error deleting task", error);
      });
  };

  // Mark task as completed
  const toggleTaskCompletion = (id) => {
    const task = tasks.find((t) => t._id === id);
    axios
      .put(`${API_URL}/tasks/${id}`, {
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
      {/* Conditional rendering based on login state */}
      {!isAuthenticated ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className=" text-gray-200 p-4 rounded mb-4 block"
          >
            <SquareArrowOutUpLeft />
          </button>

          {/* Task Management Components */}
          <TaskForm addTask={addTask} />
          <TaskList
            tasks={tasks}
            deleteTask={deleteTask}
            toggleTaskCompletion={toggleTaskCompletion}
          />
        </>
      )}
    </div>
  );
}

export default App;
