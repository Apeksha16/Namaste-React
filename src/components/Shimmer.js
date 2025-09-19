const Shimmer = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Shimmer */}
      <div className="bg-gray-300 animate-pulse h-48"></div>
      
      {/* Filter Shimmer */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-12 bg-gray-300 rounded-lg animate-pulse mb-4"></div>
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-24 bg-gray-300 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Shimmer */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-48 bg-gray-300 animate-pulse"></div>
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shimmer;