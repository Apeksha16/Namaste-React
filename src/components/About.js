const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About Swiggy Clone</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing food delivery by connecting food lovers with their favorite restaurants, 
            making great food accessible to everyone, everywhere.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center bg-white p-6 rounded-lg shadow-sm">
            <div className="text-4xl font-bold text-orange-500 mb-2">1M+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center bg-white p-6 rounded-lg shadow-sm">
            <div className="text-4xl font-bold text-green-500 mb-2">10K+</div>
            <div className="text-gray-600">Restaurant Partners</div>
          </div>
          <div className="text-center bg-white p-6 rounded-lg shadow-sm">
            <div className="text-4xl font-bold text-blue-500 mb-2">500+</div>
            <div className="text-gray-600">Cities Served</div>
          </div>
          <div className="text-center bg-white p-6 rounded-lg shadow-sm">
            <div className="text-4xl font-bold text-purple-500 mb-2">24/7</div>
            <div className="text-gray-600">Service Available</div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                To deliver happiness by transforming the way the world eats. We connect people with great food 
                from their favorite local restaurants.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Created by <span className="font-bold text-orange-500">Apeksha Verma</span>, this project showcases 
                modern React development with Redux, React Router, and Tailwind CSS.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span>Lightning-fast delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span>Wide restaurant selection</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span>Real-time order tracking</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-9xl mb-4">🍽️</div>
              <h3 className="text-2xl font-semibold text-gray-800">Bringing Food to Your Doorstep</h3>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Speed</h3>
            <p className="text-gray-600">
              We deliver your favorite food in record time, ensuring it reaches you hot and fresh.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality</h3>
            <p className="text-gray-600">
              We partner only with the best restaurants to ensure you get the highest quality food.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="text-5xl mb-4">💝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Care</h3>
            <p className="text-gray-600">
              Every order is handled with care, from preparation to delivery, ensuring your satisfaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
