import { useState, useEffect } from "react";

function FristTodo() {
  const [task, setTask] = useState([]);
  const [inputvalue, setInputValue] = useState("");
  const [editId, setEditId] = useState("");
  const storedTask = JSON.parse(localStorage.getItem("task"));
  // useEffect(() => {
  //   if (storedTask) {
  //     setTask(storedTask);
  //   }
  // }, []);
  // useEffect(() => {
  //   localStorage.setItem("task", JSON.stringify(task));
  // }, [task]);

  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);
  // };
  // const handleAddTask = () => {
  //   if (inputvalue.trim() !== "") {
  //     setTask([...task, { id: Date.now(), text: inputvalue }]);
  //     setInputValue("");
  //   }
  // };
  // const handleEditTask = (id) => {
  //   setEditId(id);
  // };
  // const handleEditChange = (newvalue, id) => {
  //   const updatedTaskValue = task.map((task) => {
  //     if (task.id == id) {
  //       return { ...task, text: newvalue };
  //     }
  //     return task;
  //   });
  //   setTask(updatedTaskValue);
  // };
  // const handleUpdateTask = () => {
  //   setEditId("");
  // };
  // const handleDeleteTask = (id) => {
  //   setTask(task.filter((task) => task.id !== id));
  // };
  // return (
  //   <>
  //     <h1>TODO APP</h1>
  //     <div>
  //       <input
  //         type="text"
  //         value={inputvalue}
  //         onChange={handleInputChange}
  //         placeholder="Enter Task"
  //       />
  //       <button onClick={handleAddTask}>Add</button>
  //     </div>
  //     {task?.map((task) => (
  //       <div key={task.id}>
  //         {editId == task.id ? (
  //           <>
  //             <input
  //               type="text"
  //               value={task.text}
  //               onChange={(e) => handleEditChange(e.target.value, task.id)}
  //             />
  //             <button onClick={handleUpdateTask}>Update</button>
  //           </>
  //         ) : (
  //           <>
  //             <span>{task.text}</span>
  //             <button onClick={() => handleEditTask(task.id)}>Edit</button>
  //             <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
  //           </>
  //         )}
  //       </div>
  //     ))}
  //   </>
  // );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleAdd = () => {
    setTask([...task, { id: Date.now(), text: inputvalue }]);
    setInputValue("");
  };
  const handleEdit = (id) => {
    setEditId(id);
  };
  const handleEditInputChange = (newvalue, id) => {
    const UpdatedValue = task.map((item) => {
      if (item.id == id) {
        return { ...task, text: newvalue };
      }
      return task;
    });
    setTask(UpdatedValue);
  };
  const handleUpdateTask = () => {
    setEditId("");
  };
  const handleDelete = (id) => {
    setTask(task.filter((item) => item.id != id));
  };

  console.log(task);

  return (
    <>
      <h1>Todo</h1>
      <div>
        <input type="text" value={inputvalue} onChange={handleInputChange} />
        <button onClick={handleAdd}>Add</button>
      </div>
      {/* map */}
      <div>
        {task.map((item) => (
          <ol key={item.id}>
            {editId == item.id ? (
              <li>
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) =>
                    handleEditInputChange(e.target.value, item.id)
                  }
                />
                <button onClick={handleUpdateTask}>Update</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </li>
            ) : (
              <li>
                task:{item.text}
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </li>
            )}
          </ol>
        ))}
      </div>
    </>
  );
}

export default FristTodo;
