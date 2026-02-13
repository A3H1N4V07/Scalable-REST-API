import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const decoded = jwtDecode(token);
    setRole(decoded.role);

    fetchUserTasks();

    if (decoded.role === "admin") {
      fetchAllTasks();
    }
  }, [navigate]);

  const fetchUserTasks = async () => {
    const res = await axios.get("/tasks");
    setTasks(res.data);
  };

  const fetchAllTasks = async () => {
    const res = await axios.get("/tasks/admin/all");
    setAllTasks(res.data);
  };

  const createTask = async () => {
    if (!title) return;
    await axios.post("/tasks", { title });
    setTitle("");
    fetchUserTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`/tasks/${id}`);
    fetchUserTasks();
    if (role === "admin") fetchAllTasks();
  };

  return (
    <div className="dashboard">
      <h2>
        Dashboard 
        <span style={{
          marginLeft: "10px",
          padding: "4px 10px",
          borderRadius: "6px",
          background: role === "admin" ? "#9333ea" : "#334155",
          fontSize: "12px"
        }}>
          {role.toUpperCase()}
        </span>
      </h2>

      {/* Create task visible for all users */}
      <input
        placeholder="New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={createTask}>Add Task</button>

      {/* USER TASKS */}
      <h3 style={{ marginTop: "30px" }}>My Tasks</h3>
      {tasks.map((task) => (
        <div key={task._id} className="task">
          <span>{task.title}</span>
          <button onClick={() => deleteTask(task._id)}>Delete</button>
        </div>
      ))}

      {/* ADMIN PANEL */}
      {role === "admin" && (
        <div style={{ marginTop: "40px" }}>
          <h3>Admin Panel – All Tasks</h3>
          {allTasks.map((task) => (
            <div key={task._id} className="task">
              <span>
                {task.title} 
                <small style={{ color: "#94a3b8", marginLeft: "8px" }}>
                  (User ID: {task.user})
                </small>
              </span>
            </div>
          ))}
        </div>
      )}

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
