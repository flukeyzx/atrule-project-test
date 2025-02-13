import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useSnackbar } from "notistack";
import { useAuth } from "../context/AuthContext";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/products/${productId}`);
      setProduct(res.data.product);
      setLoading(false);
    } catch (error) {
      console.log("Error while fetching product.", error.message);
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/auth/login");
    }
    if (addingToCart) return;
    setAddingToCart(true);
    try {
      await axios.post("/cart", { productId, quantity });
      enqueueSnackbar("Item added to cart successfully.", {
        variant: "success",
      });
      navigate("/");
    } catch (error) {
      console.log("Error while adding item to the cart.", error.message);
    } finally {
      setAddingToCart(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <h3 className="text-2xl font-bold text-blue-600">${product.price}</h3>

      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
        >
          <Minus className="w-5 h-5" />
        </button>

        <span className="text-xl font-bold">{quantity}</span>

        <button
          onClick={() => setQuantity((prev) => prev + 1)}
          className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className={`bg-blue-500 text-white py-2 px-6 mt-6 rounded-lg hover:bg-blue-600 flex items-center gap-2 ${
          addingToCart ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={addingToCart}
      >
        <ShoppingCart className="w-5 h-5" />
        {addingToCart ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
};

export default Product;
