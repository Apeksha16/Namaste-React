import { LOGO_URL } from "../utils/constants";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
import Grocery from "./Grocery";
const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const onlineStatus = useOnlineStatus();
console.log("Header render");

useEffect(()=>{
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
  <li><Link to="/cart" className="cursor-pointer">Cart</Link></li>
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
