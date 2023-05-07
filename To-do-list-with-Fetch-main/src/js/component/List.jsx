import React, { useState, useEffect } from "react";
import "./List.css";

const List = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/rafalebre");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("There was a problem fetching the list:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (todos.length === 0) return;

    const updateData = async () => {
      try {
        await fetch("https://assets.breatheco.de/apis/fake/todos/user/rafalebre", {
          method: "PUT",
          body: JSON.stringify(todos),
          headers: {
            "Content-Type": "application/json"
          }
        });
      } catch (error) {
        console.error("There was a problem updating the list:", error);
      }
    };
    updateData();
  }, [todos]);

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      const newTodo = { label: inputValue, done: false };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const handleDelete = index => {
    const newTodos = todos.filter((todo, i) => i !== index);
    setTodos(newTodos);
  };

  const handleClearAll = () => {
    setTodos([]);
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <ul>
        <li>
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a task"
          />
        </li>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.label}{" "}
            {index !== -1 && (
              <i
                className="fas fa-trash"
                onClick={() => handleDelete(index)}
              ></i>
            )}
          </li>
        ))}
      </ul>
      <div>
        <p>
          {!todos.length ? (
            <h5>No tasks, add a task</h5>
          ) : (
            todos.length + " jobs to do"
          )}
        </p>
        <button className="clear-all-btn" onClick={handleClearAll}>
          Clear all tasks
        </button>
      </div>
    </div>
  );
};

export default List;