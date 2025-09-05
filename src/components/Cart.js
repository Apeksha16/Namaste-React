const Cart = () => (
  <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 mt-8 text-center animate-fade-in">
    <h1 className="text-4xl font-extrabold mb-4 text-orange-600 animate-bounce">Your Cart</h1>
    <div className="flex flex-col items-center gap-2 mb-4">
      <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm animate-pulse">🛒 Fast Checkout</span>
      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm animate-pulse">🍔 Add Food Items</span>
      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm animate-pulse">💳 Secure Payment</span>
    </div>
    <p className="text-gray-700 mb-2 text-lg">Your cart is currently empty.</p>
    <p className="text-gray-500">Add some delicious food to your cart and enjoy fast delivery!</p>
    <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition cursor-pointer animate-bounce">Start Shopping</button>
  </div>
);

export default Cart;
