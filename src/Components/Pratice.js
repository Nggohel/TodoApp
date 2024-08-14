import { useState } from "react";

function Pratice() {
  const [task, setTask] = useState([]);
  const [editId, setEditId] = useState("");
  const [inputValue, setInputValue] = useState({
    item: "",
    category: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue((Prevvalue) => ({
      ...Prevvalue,
      [name]: value,
    }));
  };

  const handleAddTask = () => {
    if (
      inputValue.item.trim() != "" &&
      inputValue.category.trim() != "" &&
      inputValue.price.trim() != ""
    ) {
      setTask([
        ...task,
        {
          id: Date.now(),
          item: inputValue.item,
          category: inputValue.category,
          price: inputValue.price,
        },
      ]);
      setInputValue({
        item: "",
        category: "",
        price: "",
      });
    }
  };

  const handleEditTask = (id) => {
    setEditId(id);
    if (id) {
      const Data = task.find((task) => task.id == id);
      setInputValue({
        item: Data.item,
        category: Data.category,
        price: Data.price,
      });
    }
  };
  const handleUpdateTask = (id) => {
    if (editId != "") {
      const updatedTask = task.map((task) => {
        if (task.id == editId) {
          return {
            ...task,
            item: inputValue.item,
            category: inputValue.category,
            price: inputValue.price,
          };
        }
      });
      setTask(updatedTask);
      setEditId("");
      setInputValue({
        item: "",
        category: "",
        price: "",
      });
    }
  };
  const handleDeleteTask = (id) => {
    setTask(task.filter((task) => task.id !== id));
  };

  return (
    <>
      <input
        name="item"
        value={inputValue.item}
        onChange={handleInputChange}
        placeholder="Enter item Name"
      />
      <input
        name="category"
        value={inputValue.category}
        onChange={handleInputChange}
        placeholder="Enter item category"
      />
      <input
        name="price"
        value={inputValue.price}
        onChange={handleInputChange}
        placeholder="Enter item Price"
      />
      {editId == "" ? (
        <button onClick={handleAddTask}>Add</button>
      ) : (
        <button onClick={handleUpdateTask}>Update</button>
      )}

      {/*map  */}
      {task.map((task) => (
        <div key={task.id}>
          <span>{task.item}</span>
          <span>{task.category}</span>
          <span>{task.price}</span>
          <button onClick={() => handleEditTask(task.id)}>Edit</button>
          <button onCanPlay={() => handleDeleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default Pratice;
