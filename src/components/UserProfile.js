import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { userInfo } = useSelector((store) => store.user);
  const cartItems = useSelector((store) => store.cart.items);

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to login to view your profile</p>
          <Link 
            to="/" 
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              {userInfo.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{userInfo.name}</h1>
              <p className="text-gray-600">{userInfo.email}</p>
              <p className="text-gray-600">{userInfo.phone}</p>
            </div>
          </div>
        </div>

        {/* Profile Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Account Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <p className="font-medium text-gray-900">{userInfo.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email Address</label>
                <p className="font-medium text-gray-900">{userInfo.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Phone Number</label>
                <p className="font-medium text-gray-900">{userInfo.phone}</p>
              </div>
            </div>
            <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              Edit Profile
            </button>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Cart</h2>
            {cartItems.length > 0 ? (
              <div>
                <p className="text-gray-600 mb-3">{cartItems.length} items in cart</p>
                <div className="space-y-2 mb-4">
                  {cartItems.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.name}</span>
                      <span className="text-gray-900">×{item.quantity}</span>
                    </div>
                  ))}
                  {cartItems.length > 3 && (
                    <p className="text-sm text-gray-500">+{cartItems.length - 3} more items</p>
                  )}
                </div>
                <Link 
                  to="/cart"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors inline-block"
                >
                  View Cart
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🛒</div>
                <p className="text-gray-600 mb-4">Your cart is empty</p>
                <Link 
                  to="/"
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <div className="text-2xl mb-2">📋</div>
              <span className="text-sm text-gray-700">My Orders</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <div className="text-2xl mb-2">📍</div>
              <span className="text-sm text-gray-700">Addresses</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <div className="text-2xl mb-2">💳</div>
              <span className="text-sm text-gray-700">Payments</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <div className="text-2xl mb-2">🎁</div>
              <span className="text-sm text-gray-700">Offers</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;