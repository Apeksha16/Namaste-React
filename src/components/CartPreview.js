import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartPreview = ({ isVisible }) => {
  const cartItems = useSelector((store) => store.cart.items);
  
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.price ? item.price / 100 : item.defaultPrice / 100;
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (!isVisible || cartItems.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-900">Cart ({getTotalItems()} items)</h3>
          <Link to="/cart" className="text-green-600 text-sm font-medium hover:text-green-700">
            View Cart
          </Link>
        </div>
        
        <div className="max-h-64 overflow-y-auto">
          {cartItems.slice(0, 3).map((item) => (
            <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-b-0">
              {/* Item Image */}
              <div className="flex-shrink-0">
                {item.imageId ? (
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/w_60,h_60,c_fit/${item.imageId}`}
                    className="w-10 h-10 object-cover rounded"
                    alt={item.name}
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-400 text-xs">🍽️</span>
                  </div>
                )}
              </div>
              
              {/* Item Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  <div className={`w-3 h-3 border flex items-center justify-center ${
                    item.isVeg ? 'border-green-600' : 'border-red-600'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      item.isVeg ? 'bg-green-600' : 'bg-red-600'
                    }`}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {item.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">
                    Qty: {item.quantity}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    ₹{((item.price ? item.price / 100 : item.defaultPrice / 100) * item.quantity).toFixed(0)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {cartItems.length > 3 && (
            <div className="text-center py-2">
              <span className="text-sm text-gray-500">
                +{cartItems.length - 3} more items
              </span>
            </div>
          )}
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-900">Total:</span>
            <span className="font-bold text-lg text-gray-900">₹{getTotalPrice().toFixed(0)}</span>
          </div>
          <Link 
            to="/cart"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium text-center block hover:bg-green-700 transition-colors"
          >
            View Cart & Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPreview;