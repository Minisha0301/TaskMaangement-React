import './CreateForm.css';
import { useTaskForm } from "./useTaskForm";

export default function CreateTask({ triggerRefresh }) {
  const {
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
  } = useTaskForm({ triggerRefresh });

  return (
    <div className="task-container">
      <h2>Create Task</h2>

      <input
        type="text"
        placeholder="Title"
        className="input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="input"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="row">
        <select
          className="input"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="1">Daily</option>
          <option value="2">Weekly</option>
          <option value="3">Monthly</option>
        </select>

        <input
          type="text"
          className="input"
          value={`${totalTime} min`}
          readOnly
        />
      </div>

      <div className="subtask-section">
        <div className="subtask-header">
          <h3>Subtasks</h3>
          <button onClick={addSubtask} className="btn add-btn">
            + Add
          </button>
        </div>

        {subtasks.map((subtask, index) => (
          <div key={index} className="subtask-row">
            <input
              type="text"
              value={subtask.title}
              onChange={(e) =>
                handleSubtaskChange(index, "title", e.target.value)
              }
              placeholder={`Subtask ${index + 1}`}
              className="input"
            />

            <input
              type="text"
              value={subtask.time}
              placeholder="Time (min)"
              onChange={(e) =>
                handleSubtaskChange(index, "time", e.target.value)
              }
              className="input"
            />

            {subtasks.length > 1 && (
              <button
                onClick={() => removeSubtask(index)}
                className="btn delete-btn"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      <button className="btn submit-btn" onClick={handleSubmit}>
        Create Task
      </button>
    </div>
  );
}