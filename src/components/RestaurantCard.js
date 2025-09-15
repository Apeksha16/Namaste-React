import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    sla,
    costForTwo,
  } = props?.resData;
  
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer">
      <div className="relative">
        <img
          src={CDN_URL + cloudinaryImageId}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-16"></div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 truncate mb-1">{name}</h3>
        <div className="flex items-center gap-1 mb-2">
          <span className="text-green-600 font-medium">★ {avgRating}</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-600 text-sm">{sla.deliveryTime} mins</span>
        </div>
        <p className="text-gray-500 text-sm truncate mb-1">{cuisines.join(", ")}</p>
        <p className="text-gray-600 text-sm">{costForTwo}</p>
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