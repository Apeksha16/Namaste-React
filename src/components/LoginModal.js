import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../utils/userSlice";

const LoginModal = ({ isOpen, onClose }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const users = useSelector((store) => store.user.users);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLoginMode) {
      if (!formData.name) {
        newErrors.name = "Name is required";
      }
      if (!formData.phone) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "Phone number must be 10 digits";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (isLoginMode) {
      // Login logic
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        dispatch(login({
          name: user.name,
          email: user.email,
          phone: user.phone,
        }));
        
        // Save to localStorage
        localStorage.setItem('userSession', JSON.stringify({
          isLoggedIn: true,
          userInfo: {
            name: user.name,
            email: user.email,
            phone: user.phone,
          }
        }));
        
        onClose();
        resetForm();
      } else {
        setErrors({ email: "Invalid email or password" });
      }
    } else {
      // Register logic
      const existingUser = users.find(u => u.email === formData.email);
      
      if (existingUser) {
        setErrors({ email: "User already exists with this email" });
        return;
      }

      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      };

      dispatch(register(newUser));
      
      // Save users to localStorage
      const updatedUsers = [...users, newUser];
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

      // Auto login after registration
      dispatch(login({
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      }));

      // Save session
      localStorage.setItem('userSession', JSON.stringify({
        isLoggedIn: true,
        userInfo: {
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
        }
      }));

      onClose();
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
    });
    setErrors({});
  };

  const switchMode = () => {
    setIsLoginMode(!isLoginMode);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLoginMode ? "Login" : "Sign Up"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {!isLoginMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            {isLoginMode ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLoginMode ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={switchMode}
              className="text-orange-500 hover:text-orange-600 font-medium ml-1"
            >
              {isLoginMode ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>

        {/* Demo Credentials */}
        {isLoginMode && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-500">Email: demo@swiggy.com</p>
            <p className="text-xs text-gray-500">Password: demo123</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;