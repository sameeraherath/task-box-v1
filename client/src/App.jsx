import { useState } from "react";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = async (credential) => {
    try {
      const response = await axios.post(`${API_URL}/auth/google`, {
        credential,
      });
      if (response.data.success) {
        setIsAuthenticated(true);
        // Fetch tasks or perform other actions after successful login
        const tasksResponse = await axios.get(`${API_URL}/tasks`);
        setTasks(tasksResponse.data);
      } else {
        console.error("Login failed on the server");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <TaskList tasks={tasks} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
