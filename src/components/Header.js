import { LOGO_URL } from "../utils/constants";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
import CartPreview from "./CartPreview";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const [showCartPreview, setShowCartPreview] = useState(false);
  const onlineStatus = useOnlineStatus();
  
  // Subscribe to the store using a Selector
  const cartItems = useSelector((store) => store.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  console.log("Header render");

  useEffect(() => {
    console.log("useEffect called");
  });

  return (
    <div className="flex justify-between items-center bg-white shadow-md px-8 py-4 sticky top-0 z-10">
      <Link to="/">
        <img className="w-24 rounded-full cursor-pointer" src={LOGO_URL} alt="logo" />
      </Link>
      <ul className="flex gap-8 font-semibold text-gray-700">
        <li>Online Status: {onlineStatus ? "✅" : "🔴"}</li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/grocery">Grocery</Link></li>
        <li className="relative">
          <div
            onMouseEnter={() => setShowCartPreview(true)}
            onMouseLeave={() => setShowCartPreview(false)}
            className="cursor-pointer"
          >
            <Link to="/cart" className="flex items-center gap-1">
              🛒 Cart
              {totalItems > 0 && (
                <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <CartPreview isVisible={showCartPreview} />
          </div>
        </li>
        <li>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition cursor-pointer"
            onClick={() => {
              btnNameReact === "Login"
                ? setBtnNameReact("Logout")
                : setBtnNameReact("Login");
            }}
          >
            {btnNameReact}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
