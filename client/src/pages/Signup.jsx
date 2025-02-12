import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { Loader } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { setUser } = useAuth();

  const registerUserHandler = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      return enqueueSnackbar("Password must be atleast 6 characters long.", {
        variant: "warning",
      });
    }
    setLoading(true);
    axios
      .post("/auth/signup", { username, email, password })
      .then((res) => {
        navigate("/");
        enqueueSnackbar("Registration successfull", { variant: "success" });
        setUser(res.data.user);
        setLoading(false);
      })
      .catch((error) => {
        enqueueSnackbar(error.response?.data?.message, { variant: "error" });
        setLoading(false);
      });
  };
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h1 className="mb-4 text-3xl">Signup</h1>
      <form onSubmit={registerUserHandler} className="flex flex-col gap-3 w-96">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="username"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your@email.com"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="password"
        />
        <p className="text-center">
          Already have an account?{" "}
          <Link className="underline font-semibold" to={"/auth/login"}>
            Login
          </Link>
        </p>
        <button
          disabled={loading}
          className="flex justify-center w-full bg-blue-700 cursor-pointer hover:opacity-70 text-white py-3 rounded-2xl font-semibold"
        >
          {loading ? <Loader className="animate-spin" /> : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
