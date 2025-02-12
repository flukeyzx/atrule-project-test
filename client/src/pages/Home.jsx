import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { ShoppingCart } from "lucide-react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProductsAndCartCount = async () => {
    try {
      const res = await axios.get("/products");
      setProducts(res.data.products);
    } catch (error) {
      console.log("Error while fetching products:", error.message);
    }

    try {
      const res = await axios.get("/cart");
      setCartCount(res.data.cart[0].products?.length || 0);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setCartCount(0);
      } else {
        console.log("Error while fetching cart:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsAndCartCount();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="absolute top-10 right-8 cursor-pointer">
        <Link to={"/cart"} className="relative">
          <ShoppingCart className="w-8 h-8 text-gray-700" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
      <h1 className="text-4xl font-bold text-center mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 &&
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <h3 className="text-xl font-bold text-blue-600">
                ${product.price}
              </h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
