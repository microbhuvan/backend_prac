import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useAuth } from "../auth/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [blocked, setBlocked] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

 
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  
  useEffect(() => {
    if (timeLeft === 0 && blocked) {
      setBlocked(false);
      setError("");
    }
  }, [timeLeft, blocked]);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${BASE_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      if (err.response?.status === 429) {
        setBlocked(true);

      
        const retryAfter =
          err.response?.headers["retry-after"] ||
          err.response?.data?.retryAfter;

        const waitTime = retryAfter
          ? parseInt(retryAfter, 10)
          : 60;

        setTimeLeft(waitTime);
        setError(`Too many attempts. Try again in ${waitTime}s`);
      } else if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Something went wrong");
      }
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={blocked}
      />

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={blocked}
      />

      <input
        type="submit"
        disabled={blocked}
        value={blocked ? `Wait ${timeLeft}s` : "Login"}
      />

      {error && <p>{error}</p>}
    </form>
  );
}

export default Login;