import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { Loader } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { setUser } = useAuth();

  const loginUserHandler = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      return enqueueSnackbar("Password must be atleast 6 characters long.", {
        variant: "warning",
      });
    }
    setLoading(true);
    axios
      .post("/auth/login", {
        username: usernameOrEmail,
        email: usernameOrEmail,
        password,
      })
      .then((res) => {
        navigate("/");
        enqueueSnackbar("User Logged In Successfully", { variant: "success" });
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
      <h1 className="mb-4 text-3xl">Login</h1>
      <form onSubmit={loginUserHandler} className="flex flex-col gap-3 w-96">
        <input
          type="text"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          required
          placeholder="username or email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="password"
        />
        <p className="text-center">
          Don't have an account?{" "}
          <Link className="underline font-semibold" to={"/auth/signup"}>
            Signup
          </Link>
        </p>
        <button
          disabled={loading}
          className="flex justify-center w-full bg-blue-700 cursor-pointer hover:opacity-70 text-white py-3 rounded-2xl font-semibold"
        >
          {loading ? <Loader className="animate-spin" /> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
