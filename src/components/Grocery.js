const Grocery = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 mt-8 text-center animate-fade-in">
      <h1 className="text-4xl font-extrabold mb-4 text-orange-600 animate-bounce">Grocery</h1>
      <p className="text-gray-700 mb-4 text-lg">Order fresh groceries delivered to your doorstep with lightning-fast delivery and best prices!</p>
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm animate-pulse">🥦 Fresh Veggies</span>
        <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm animate-pulse">🍎 Fruits</span>
        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm animate-pulse">🥛 Dairy</span>
        <span className="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm animate-pulse">🍞 Bakery</span>
      </div>
      <p className="text-gray-500">Feature coming soon! Stay tuned for amazing grocery deals.</p>
    </div>
  );
};

export default Grocery;