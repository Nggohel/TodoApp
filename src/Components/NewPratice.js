import { useState } from "react";

function NewPratice() {
  const [task, setTask] = useState([]);
  const [inputvalue, setInputValue] = useState("");
  const [editId, setEditId] = useState("");
  const handleinputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleAdd = () => {
    if (inputvalue.trim() != "") {
      setTask([...task, { id: Date.now(), text: inputvalue }]);
      setInputValue("");
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleEditChange = (id, newvalue) => {
    if (editId != "") {
      const newData = task.map((task) => {
        if (task.id == id) {
          return {
            ...task,
            text: newvalue,
          };
          return task;
        }
      });
      setTask(newData);
    }
  };

  const handleUpdate = () => {
    setEditId("");
  };
  const handleDelete = (id) => {
    setTask(task.filter((task) => task.id !== id));
  };
  return (
    <>
      <h1>TODO</h1>
      <input type="text" value={inputvalue} onChange={handleinputChange} />
      <button onClick={handleAdd}>Add</button>

      {/* map */}
      {task.map((task) => (
        <div key={task.id}>
          {editId == task.id ? (
            <>
              <input
                type="text"
                value={task.text}
                onChange={(e) => handleEditChange(task.id, e.target.value)}
              />
              <button onClick={handleUpdate}>Update</button>
            </>
          ) : (
            <>
              <span>{task.text}</span>
              <button onClick={() => handleEdit(task.id)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </>
  );
}

export default NewPratice;
