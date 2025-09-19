import { useState } from "react";

const SearchAndFilter = ({ 
  searchText, 
  setSearchText, 
  onSearch, 
  onFilter, 
  onSort,
  totalRestaurants 
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    rating: '',
    deliveryTime: '',
    costForTwo: '',
    cuisines: []
  });
  const [sortBy, setSortBy] = useState('relevance');

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);
    onFilter(newFilters);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
    onSort(sortOption);
  };

  const clearFilters = () => {
    const emptyFilters = {
      rating: '',
      deliveryTime: '',
      costForTwo: '',
      cuisines: []
    };
    setActiveFilters(emptyFilters);
    onFilter(emptyFilters);
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Search Bar */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search for restaurants and food"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            />
            <button
              onClick={onSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500"
            >
              🔍
            </button>
          </div>
        </div>

        {/* Filter and Sort Options */}
        <div className="flex items-center gap-4 overflow-x-auto">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap"
          >
            <span>Filters</span>
            <span className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`}>
              ⌄
            </span>
          </button>

          {/* Quick Filters */}
          <button
            onClick={() => handleFilterChange('rating', '4.0+')}
            className={`px-4 py-2 rounded-lg border whitespace-nowrap ${
              activeFilters.rating === '4.0+' 
                ? 'bg-orange-500 text-white border-orange-500' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            Ratings 4.0+
          </button>

          <button
            onClick={() => handleFilterChange('deliveryTime', 'fast')}
            className={`px-4 py-2 rounded-lg border whitespace-nowrap ${
              activeFilters.deliveryTime === 'fast' 
                ? 'bg-orange-500 text-white border-orange-500' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            Fast Delivery
          </button>

          <button
            onClick={() => handleFilterChange('costForTwo', 'low')}
            className={`px-4 py-2 rounded-lg border whitespace-nowrap ${
              activeFilters.costForTwo === 'low' 
                ? 'bg-orange-500 text-white border-orange-500' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            Less than ₹300
          </button>

          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="relevance">Sort by: Relevance</option>
            <option value="deliveryTime">Delivery Time</option>
            <option value="rating">Rating</option>
            <option value="costLowToHigh">Cost: Low to High</option>
            <option value="costHighToLow">Cost: High to Low</option>
          </select>

          {/* Clear Filters */}
          {(activeFilters.rating || activeFilters.deliveryTime || activeFilters.costForTwo) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-orange-500 hover:text-orange-600 whitespace-nowrap"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-3 text-sm text-gray-600">
          {totalRestaurants} restaurants found
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cuisines
                </label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {['North Indian', 'South Indian', 'Chinese', 'Italian', 'Fast Food', 'Desserts'].map((cuisine) => (
                    <label key={cuisine} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={activeFilters.cuisines.includes(cuisine)}
                        onChange={(e) => {
                          const newCuisines = e.target.checked
                            ? [...activeFilters.cuisines, cuisine]
                            : activeFilters.cuisines.filter(c => c !== cuisine);
                          handleFilterChange('cuisines', newCuisines);
                        }}
                      />
                      <span className="text-sm">{cuisine}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;