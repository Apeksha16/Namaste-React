import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    sla,
    costForTwo,
    aggregatedDiscountInfoV3,
    promoted
  } = props?.resData;
  
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer group">
      <div className="relative">
        <img
          src={CDN_URL + cloudinaryImageId}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent h-20"></div>
        
        {/* Discount/Offer Badge */}
        {aggregatedDiscountInfoV3?.header && (
          <div className="absolute bottom-2 left-2 right-2">
            <div className="text-white font-bold text-lg">
              {aggregatedDiscountInfoV3.header}
            </div>
            {aggregatedDiscountInfoV3.subHeader && (
              <div className="text-white text-sm">
                {aggregatedDiscountInfoV3.subHeader}
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 truncate mb-1">{name}</h3>
        
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-1">
            <span className="text-green-600 font-medium">★ {avgRating || "4.0"}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600 text-sm font-medium">{sla?.deliveryTime || "30-35"} mins</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm truncate mb-1">{cuisines?.join(", ")}</p>
        <p className="text-gray-600 text-sm">{costForTwo}</p>
        
        {/* Quick Add Button on Hover */}
        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
            Quick Add
          </button>
        </div>
      </div>
    </div>
  );
};

//Higher Order Component
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <div className="absolute top-2 left-2 z-10 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded-sm shadow-md">
          PROMOTED
        </div>
        <RestaurantCard {...props} />
      </div>
    );
  };
};



export default RestaurantCard;