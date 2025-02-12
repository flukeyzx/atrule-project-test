import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCart = async () => {
    try {
      const res = await axios.get("/cart");
      const items = res.data.cart[0]?.products || [];
      setCartItems(items);

      const total = items.reduce(
        (acc, item) => acc + item.productId.price * item.quantity,
        0
      );
      setTotalPrice(total);
    } catch (error) {
      console.log("Error while fetching cart:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (cartItems.length === 0) {
    return <h2 className="text-center text-2xl mt-10">Your cart is empty.</h2>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      <div className="space-y-6">
        {cartItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{item.productId.name}</h2>
              <p className="text-gray-600">Price: ${item.productId.price}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <p className="text-xl font-bold text-green-600">
              ${item.productId.price * item.quantity}
            </p>
          </div>
        ))}
        <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
          <h2 className="text-2xl font-bold">Total Price</h2>
          <p className="text-2xl font-bold text-blue-600">${totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
