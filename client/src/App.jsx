import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";
import { AuthProvider } from "./context/AuthContext";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Product = lazy(() => import("./pages/Product"));
const Cart = lazy(() => import("./pages/Cart"));

axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/auth/login" Component={Login} />
            <Route path="/auth/signup" Component={Signup} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<ProtectedRoute Component={Cart} />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
