import { useState } from "react";
import { CirclePlus } from "lucide-react";
import PropTypes from "prop-types";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState(""); // State to hold the task title

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (title.trim()) {
      // Check if the title is not empty
      addTask({ title, description: "", completed: false }); // Call the addTask function with the title and default completed status
      setTitle(""); // Reset the title input field
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 mb-4 ">
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Update the title state on input change
        className="p-4 w-full   border border-gray-800 rounded-2xl focus:outline-none "
      />
      <button
        type="submit"
        className="p-2 rounded-full text-white border-2 border-gray-800 "
      >
        <CirclePlus size={28} />
      </button>
    </form>
  );
}

TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired, // Prop type validation for addTask function
};

export default TaskForm;
