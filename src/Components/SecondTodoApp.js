import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, ListGroup } from "react-bootstrap";

function SecondTodoApp() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState({
    name: "",
    category: "",
  });
  const [editId, setEditId] = useState("");
  const [errors, setErrors] = useState({});
  const [filter, setFilter] = useState("all");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("users"));
    if (storedUser) {
      console.log("dsf", storedUser);
      setUser(storedUser);
    }

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (storedTasks.length > 0) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setTaskInput((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const filteredTasks = tasks.filter((task) =>
    filter === "completed"
      ? task.completed
      : filter === "incomplete"
      ? !task.completed
      : true
  );

  const handleAddTask = () => {
    let newErrors = {};
    if (taskInput.name.trim() === "") newErrors.name = "Task name is required";
    if (taskInput.category.trim() === "")
      newErrors.category = "Category is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (user) {
      console.log(user);
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          task: taskInput.name,
          category: taskInput.category,
          userId: user.email,
        },
      ]);
      console.log("task", tasks);
      setTaskInput({ name: "", category: "" });
    }
  };

  const handleEditTask = (id) => {
    setEditId(id);
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setTaskInput({
        name: taskToEdit.task,
        category: taskToEdit.category,
      });
    }
  };

  const handleUpdateTask = () => {
    if (editId !== "") {
      const updatedTasks = tasks.map((task) => {
        if (task.id === editId) {
          return {
            ...task,
            task: taskInput.name,
            category: taskInput.category,
          };
        }
        return task;
      });
      setTasks(updatedTasks);
      setEditId("");
      setTaskInput({ name: "", category: "" });
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <>
      <h2 className="text-center">TODO APP</h2>
      {errors.name && <p className="text-danger">{errors.name}</p>}
      {errors.category && <p className="text-danger">{errors.category}</p>}
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Control
              type="text"
              name="name"
              value={taskInput.name}
              onChange={handleTaskInputChange}
              placeholder="Enter Task"
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              name="category"
              value={taskInput.category}
              onChange={handleTaskInputChange}
              placeholder="Enter Description"
            />
          </Col>

          <Col>
            {editId === "" ? (
              <Button variant="primary" onClick={handleAddTask}>
                Add
              </Button>
            ) : (
              <Button variant="success" onClick={handleUpdateTask}>
                Update
              </Button>
            )}
          </Col>
        </Row>
      </Form>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          marginBottom: "20px",
        }}
      >
        <div>
          <b>Filter by :</b>
        </div>
        <Button variant="secondary" onClick={() => setFilter("all")}>
          All
        </Button>
        <Button variant="secondary" onClick={() => setFilter("completed")}>
          Completed
        </Button>
        <Button variant="secondary" onClick={() => setFilter("incomplete")}>
          Incomplete
        </Button>
      </div>
      {filteredTasks.length > 0 && (
        <ListGroup className="mb-4">
          <ListGroup.Item>
            <Row>
              <Col className="text-center">
                <strong>Task</strong>
              </Col>
              <Col className="text-center">
                <strong>Category</strong>
              </Col>
              <Col className="text-center">
                <strong>Actions</strong>
              </Col>
              <Col className="text-center">
                <strong>Status</strong>
              </Col>
            </Row>
          </ListGroup.Item>
          {filteredTasks.map((task) => (
            <ListGroup.Item
              key={task.id}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              <Row>
                <Col className="text-center">{task.task}</Col>
                <Col className="text-center">{task.category}</Col>
                <Col className="text-center">
                  <Button
                    variant="warning"
                    onClick={() => handleEditTask(task.id)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </Col>
                <Col className="text-center">
                  <Button
                    variant="info"
                    onClick={() => handleToggleComplete(task.id)}
                  >
                    {task.completed ? "Complete" : "In Complete"}
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
}

export default SecondTodoApp;
