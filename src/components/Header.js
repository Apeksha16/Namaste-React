import { LOGO_URL } from "../utils/constants";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector, useDispatch } from "react-redux";
import CartPreview from "./CartPreview";
import LoginModal from "./LoginModal";
import { logout, loadUsers, loadUserSession } from "../utils/userSlice";

const Header = () => {
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const onlineStatus = useOnlineStatus();
  
  const dispatch = useDispatch();
  
  // Subscribe to the store using a Selector
  const cartItems = useSelector((store) => store.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // User state
  const { isLoggedIn, userInfo } = useSelector((store) => store.user);

  useEffect(() => {
    // Load users from localStorage on component mount
    const savedUsers = localStorage.getItem('registeredUsers');
    if (savedUsers) {
      dispatch(loadUsers(JSON.parse(savedUsers)));
    } else {
      // Add demo user if no users exist
      const demoUsers = [{
        name: "Demo User",
        email: "demo@swiggy.com",
        password: "demo123",
        phone: "9876543210"
      }];
      localStorage.setItem('registeredUsers', JSON.stringify(demoUsers));
      dispatch(loadUsers(demoUsers));
    }

    // Load user session from localStorage
    const savedSession = localStorage.getItem('userSession');
    if (savedSession) {
      const session = JSON.parse(savedSession);
      dispatch(loadUserSession(session));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('userSession');
    setShowUserMenu(false);
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      setShowUserMenu(!showUserMenu);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <>
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
        <li className="relative">
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition cursor-pointer flex items-center gap-2"
            onClick={handleLoginClick}
          >
            {isLoggedIn ? (
              <>
                <span className="w-6 h-6 bg-white text-orange-500 rounded-full flex items-center justify-center text-sm font-bold">
                  {userInfo?.name?.charAt(0).toUpperCase()}
                </span>
                <span>{userInfo?.name?.split(' ')[0]}</span>
                <span className="text-xs">▼</span>
              </>
            ) : (
              "Login"
            )}
          </button>
          
          {/* User Dropdown Menu */}
          {isLoggedIn && showUserMenu && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-3 border-b border-gray-200">
                <div className="font-semibold text-gray-900">{userInfo?.name}</div>
                <div className="text-sm text-gray-600">{userInfo?.email}</div>
              </div>
              <div className="py-2">
                <Link 
                  to="/profile" 
                  className="block w-full text-left px-3 py-2 hover:bg-gray-50 text-gray-700"
                  onClick={() => setShowUserMenu(false)}
                >
                  My Profile
                </Link>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-50 text-gray-700">
                  My Orders
                </button>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-50 text-gray-700">
                  Addresses
                </button>
                <hr className="my-2" />
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </li>
      </ul>
      </div>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
};

export default Header;
