import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { MENU_API } from "../utils/constants";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
      MENU_API + resId
    );
    const json = await data.json();
    setResInfo(json.data);
  };

  if (!resInfo) {
    return <Shimmer />;
  }

  // Defensive: find the card with restaurant info
  const infoCard = resInfo?.cards?.find(
    (card) => card?.card?.card?.info
  );
  const restaurantInfo = infoCard?.card?.card?.info;

  if (!restaurantInfo) {
    return <div className="menu"><h2>Restaurant info not found.</h2></div>;
  }

  const { name, cuisines, costForTwoMessage } = restaurantInfo;

  // Find the menu items (dishes)
  let menuItems = [];
  const menuCard = resInfo?.cards?.find(
    (card) =>
      card?.groupedCard?.cardGroupMap?.REGULAR?.cards?.some(
        (c) => c?.card?.card?.itemCards
      )
  );
  if (menuCard) {
    // Find all itemCards arrays and flatten them
    menuItems = menuCard.groupedCard.cardGroupMap.REGULAR.cards
      .filter((c) => c?.card?.card?.itemCards)
      .flatMap((c) => c.card.card.itemCards)
      .map((item) => item.card.info);
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">{name}</h1>
      <p className="text-gray-500 mb-4">{cuisines?.join(", ")} - {costForTwoMessage}</p>
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">Menu</h2>
      <ul className="space-y-4">
        {menuItems.length === 0 ? (
          <li>No menu items found.</li>
        ) : (
          menuItems.map((item, idx) => (
            <li key={item.id + '-' + idx} className="flex items-center gap-4 border-b pb-2">
              {item.imageId ? (
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/w_80,h_80,c_fill/${item.imageId}`}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">No Image</div>
              )}
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{item.name}</div>
                <div className="text-gray-600 text-sm">Rs. {item.price ? item.price / 100 : item.defaultPrice ? item.defaultPrice / 100 : "-"}</div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
