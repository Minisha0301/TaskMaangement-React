import { useState } from "react";
import { createTask } from "../../Services/taskApi";

export const useTaskForm = ({triggerRefresh}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState(1);

  const [subtasks, setSubtasks] = useState([
    { title: "", time: "" }
  ]);

  // total time
  const totalTime = subtasks.reduce((sum, task) => {
    return sum + (parseInt(task.time) || 0);
  }, 0);

  // add/remove
  const addSubtask = () => {
    setSubtasks([...subtasks, { title: "", time: "" }]);
  };

  const removeSubtask = (index) => {
    const updated = subtasks.filter((_, i) => i !== index);
    setSubtasks(updated);
  };

  // handle change
  const handleSubtaskChange = (index, field, value) => {
    const updated = [...subtasks];

    if (field === "time") {
      value = value.replace(/[^0-9]/g, "");
    }

    updated[index][field] = value;
    setSubtasks(updated);
  };

  // submit
  const handleSubmit = async () => {
    try {
      const payload = {
        title,
        description,
        frequency_type_id: frequency,
        total_time: totalTime,
        subtasks
      };

      const res = await createTask(payload);

      triggerRefresh();

      setTitle("");
      setDescription("");
      setFrequency(1);
      setSubtasks([{ title: "", time: "" }]);

      
      alert("Task created successfully");

    } catch (error) {
        console.log(error.response);

        if (error.response && error.response.status === 422) {
            const errors = error.response.data.errors;
            let errorMessages = "";
            Object.keys(errors).forEach((key) => {
              errorMessages += errors[key][0] + "\n";
            });
            alert(errorMessages); 
        } else {
            console.error(error);
            alert("Something went wrong");
        }
    
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    frequency,
    setFrequency,
    subtasks,
    addSubtask,
    removeSubtask,
    handleSubtaskChange,
    totalTime,
    handleSubmit
  };
};