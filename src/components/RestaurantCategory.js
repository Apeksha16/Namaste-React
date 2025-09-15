

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex();
  };

  // Handle different data structures
  const title = data?.title || "Menu Items";
  const items = data?.itemCards || [];

  return (
    <div className="bg-white shadow-sm mb-6">
      {/* Accordion Header - Swiggy Style */}
      <div
        className="flex justify-between items-center cursor-pointer p-5 border-b border-gray-100"
        onClick={handleClick}
      >
        <h3 className="text-lg font-bold text-gray-900">
          {title} ({items.length})
        </h3>
        <svg
          className={`w-5 h-5 text-gray-600 transition-transform ${
            showItems ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Accordion Body */}
      {showItems && <ItemList items={items} />}
    </div>
  );
};

const ItemList = ({ items }) => {
  return (
    <div className="divide-y divide-gray-100">
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-5 flex justify-between items-start"
        >
          {/* Left side - Item details */}
          <div className="flex-1 pr-4">
            {/* Veg/Non-veg indicator */}
            <div className="flex items-center mb-2">
              <div className={`w-4 h-4 border-2 flex items-center justify-center ${
                item.card.info.isVeg ? 'border-green-600' : 'border-red-600'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  item.card.info.isVeg ? 'bg-green-600' : 'bg-red-600'
                }`}></div>
              </div>
              {item.card.info.isBestseller && (
                <span className="ml-2 text-xs text-orange-600 font-medium">★ Bestseller</span>
              )}
            </div>

            {/* Item name */}
            <h4 className="font-semibold text-gray-900 text-lg mb-1">
              {item.card.info.name}
            </h4>

            {/* Price */}
            <div className="flex items-center mb-2">
              <span className="text-gray-900 font-medium">
                ₹{item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
              {item.card.info.finalPrice && item.card.info.finalPrice !== item.card.info.price && (
                <span className="ml-2 text-gray-500 line-through text-sm">
                  ₹{item.card.info.finalPrice / 100}
                </span>
              )}
            </div>

            {/* Rating */}
            {item.card.info.ratings?.aggregatedRating?.rating && (
              <div className="flex items-center mb-2">
                <span className="text-green-600 text-sm">
                  ★ {item.card.info.ratings.aggregatedRating.rating}
                </span>
                <span className="text-gray-500 text-sm ml-1">
                  ({item.card.info.ratings.aggregatedRating.ratingCountV2})
                </span>
              </div>
            )}

            {/* Description */}
            {item.card.info.description && (
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.card.info.description.length > 150
                  ? `${item.card.info.description.substring(0, 150)}...`
                  : item.card.info.description}
              </p>
            )}
          </div>

          {/* Right side - Image and Add button */}
          <div className="relative flex-shrink-0">
            {item.card.info.imageId ? (
              <div className="relative">
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/w_208,h_208,c_fit/${item.card.info.imageId}`}
                  className="w-32 h-32 object-cover rounded-lg"
                  alt={item.card.info.name}
                />
                <button className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 text-green-600 font-bold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  ADD
                </button>
              </div>
            ) : (
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center relative">
                <span className="text-gray-400 text-xs">No Image</span>
                <button className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 text-green-600 font-bold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  ADD
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantCategory;