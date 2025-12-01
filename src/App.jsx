import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    { id: 0, name: "Eat", completed: true },
    { id: 1, name: "Sleep", completed: false },
    { id: 2, name: "Repeat", completed: false },
  ]);

  const [filter, setFilter] = useState("All"); // All | Active | Completed
  const [input, setInput] = useState("");

  // FILTER LOGIC ----------------------
  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };

  const FILTER_NAMES = Object.keys(FILTER_MAP);

  const filteredTasks = tasks.filter(FILTER_MAP[filter]);

  // ADD TASK --------------------------
  function handleAdd(e) {
    e.preventDefault();
    if (input.trim() === "") return;

    const newTask = {
      id: Date.now(),
      name: input,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  }

  // TOGGLE COMPLETE -------------------
  function toggleTask(id) {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  }

  // DELETE TASK -----------------------
  function deleteTask(id) {
    const remaining = tasks.filter((task) => task.id !== id);
    setTasks(remaining);
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      {/* ADD A TASK */}
      <form onSubmit={handleAdd}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>

      {/* FILTER BUTTONS */}
      <div className="filters btn-group stack-exception">
        {FILTER_NAMES.map((name) => (
          <button
            key={name}
            type="button"
            className="btn toggle-btn"
            aria-pressed={filter === name}
            onClick={() => setFilter(name)}
          >
            <span className="visually-hidden">Show </span>
            <span>{name}</span>
            <span className="visually-hidden"> tasks</span>
          </button>
        ))}
      </div>

      {/* TASK COUNT */}
      <h2 id="list-heading">
        {filteredTasks.length} task{filteredTasks.length !== 1 && "s"} remaining
      </h2>

      {/* TODO LIST */}
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {filteredTasks.map((task) => (
          <li className="todo stack-small" key={task.id}>
            <div className="c-cb">
              <input
                id={`todo-${task.id}`}
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <label className="todo-label" htmlFor={`todo-${task.id}`}>
                {task.name}
              </label>
            </div>

            <div className="btn-group">
              <button type="button" className="btn btn__danger" onClick={() => deleteTask(task.id)}>
                Delete <span className="visually-hidden">{task.name}</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
