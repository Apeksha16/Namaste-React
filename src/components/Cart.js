import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, clearCart } from "../utils/cartSlice";
import { Link } from "react-router";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const restaurantInfo = useSelector((store) => store.cart.restaurantInfo);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleAddItem = (item) => {
    dispatch(addItem({
      item: item,
      restaurantInfo: restaurantInfo
    }));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.price ? item.price / 100 : item.defaultPrice / 100;
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 mt-8 text-center">
        <div className="mb-6">
          <img 
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" 
            alt="Empty Cart" 
            className="w-64 h-64 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">You can go to home page to view more restaurants</p>
          <Link 
            to="/" 
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            SEE RESTAURANTS NEAR YOU
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Cart Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        {/* Restaurant Info */}
        {restaurantInfo && (
          <div className="mb-4 pb-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-1">{restaurantInfo.name}</h2>
            <p className="text-sm text-gray-600">{restaurantInfo.cuisines?.join(", ")}</p>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Cart ({getTotalItems()} items)</h1>
          <button 
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-800 font-medium cursor-pointer"
          >
            Clear Cart
          </button>
        </div>
        
        {/* Cart Items */}
        <div className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <div key={item.id} className="py-4 flex items-center gap-4">
              {/* Item Image */}
              <div className="flex-shrink-0">
                {item.imageId ? (
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/w_100,h_100,c_fit/${item.imageId}`}
                    className="w-16 h-16 object-cover rounded-lg"
                    alt={item.name}
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-xs">No Image</span>
                  </div>
                )}
              </div>

              {/* Item Details */}
              <div className="flex-1">
                {/* Veg/Non-veg indicator */}
                <div className="flex items-center mb-2">
                  <div className={`w-4 h-4 border-2 flex items-center justify-center ${
                    item.isVeg ? 'border-green-600' : 'border-red-600'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      item.isVeg ? 'bg-green-600' : 'bg-red-600'
                    }`}></div>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-gray-600 font-medium">
                  ₹{item.price ? item.price / 100 : item.defaultPrice / 100}
                </p>
              </div>
              
              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    onClick={() => handleRemoveItem(item)}
                    className="px-3 py-2 text-green-600 font-bold hover:bg-gray-50 cursor-pointer"
                  >
                    −
                  </button>
                  <span className="px-3 py-2 font-bold text-green-600">
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => handleAddItem(item)}
                    className="px-3 py-2 text-green-600 font-bold hover:bg-gray-50 cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span className="font-semibold text-gray-900 w-20 text-right">
                  ₹{((item.price ? item.price / 100 : item.defaultPrice / 100) * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bill Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Bill Details</h2>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Item Total</span>
            <span>₹{getTotalPrice().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>₹40</span>
          </div>
          <div className="flex justify-between">
            <span>Platform fee</span>
            <span>₹5</span>
          </div>
          <div className="flex justify-between">
            <span>GST and Restaurant Charges</span>
            <span>₹{(getTotalPrice() * 0.05).toFixed(2)}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-bold text-lg">
            <span>TO PAY</span>
            <span>₹{(getTotalPrice() + 40 + 5 + (getTotalPrice() * 0.05)).toFixed(2)}</span>
          </div>
        </div>
        
        <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors cursor-pointer">
          PROCEED TO PAY
        </button>
      </div>
    </div>
  );
};

export default Cart;
