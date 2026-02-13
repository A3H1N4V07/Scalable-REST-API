import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await axios.post("/auth/register", { name, email, password });
      setMessage("Registration successful! You can login now.");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>

      {message && <div className="message">{message}</div>}
      {error && <div className="error">{error}</div>}

      <div className="link" onClick={() => navigate("/")}>
        Already have an account? Login
      </div>
    </div>
  );
}

export default Register;
