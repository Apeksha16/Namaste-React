import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { MENU_API } from "../utils/constants";
import Shimmer from "./Shimmer";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [showIndex, setShowIndex] = useState(0); // Set first category as default open
  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();
    setResInfo(json.data);
  };

  if (!resInfo) {
    return <Shimmer />;
  }

  // Defensive: find the card with restaurant info
  const infoCard = resInfo?.cards?.find((card) => card?.card?.card?.info);
  const restaurantInfo = infoCard?.card?.card?.info;

  if (!restaurantInfo) {
    return (
      <div className="menu">
        <h2>Restaurant info not found.</h2>
      </div>
    );
  }

  const { name, cuisines, costForTwoMessage } = restaurantInfo;

  // Get actual categories from Swiggy API (exactly like Swiggy)
  let categories = [];
  let regularCards = [];

  if (resInfo?.cards) {
    for (let i = 0; i < resInfo.cards.length; i++) {
      if (resInfo.cards[i]?.groupedCard?.cardGroupMap?.REGULAR?.cards) {
        regularCards = resInfo.cards[i].groupedCard.cardGroupMap.REGULAR.cards;
        break;
      }
    }
  }

  console.log("All REGULAR cards:", regularCards);

  if (regularCards.length > 0) {
    // First try ItemCategory type
    categories = regularCards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

    // If no ItemCategory found, try NestedItemCategory
    if (categories.length === 0) {
      categories = regularCards.filter(
        (c) =>
          c.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
      );
    }

    // If still no categories, try any card with itemCards
    if (categories.length === 0) {
      categories = regularCards.filter(
        (c) => c.card?.card?.itemCards && c.card?.card?.title
      );
    }

    // Last resort: any card with itemCards (add default titles)
    if (categories.length === 0) {
      categories = regularCards
        .filter((c) => c.card?.card?.itemCards)
        .map((cat, index) => ({
          ...cat,
          card: {
            ...cat.card,
            card: {
              ...cat.card.card,
              title: cat.card.card.title || `Menu Section ${index + 1}`,
            },
          },
        }));
    }
  }

  console.log("Final categories found:", categories);
  console.log("Categories count:", categories.length);
  console.log(
    "Category titles:",
    categories.map((c) => c.card?.card?.title)
  );

  // Fallback: Find the menu items (dishes) if categories don't exist
  let menuItems = [];
  if (!categories || categories.length === 0) {
    const menuCard = resInfo?.cards?.find((card) =>
      card?.groupedCard?.cardGroupMap?.REGULAR?.cards?.some(
        (c) => c?.card?.card?.itemCards
      )
    );
    if (menuCard) {
      menuItems = menuCard.groupedCard.cardGroupMap.REGULAR.cards
        .filter((c) => c?.card?.card?.itemCards)
        .flatMap((c) => c.card.card.itemCards)
        .map((item) => item.card.info);
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 min-h-screen">
      {/* Restaurant Header - Swiggy Style */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{name}</h1>
              <p className="text-gray-600 text-sm mb-2">
                {cuisines?.join(", ")}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <span className="text-green-600">★</span>
                  {restaurantInfo.avgRating || "4.0"}
                </span>
                <span>•</span>
                <span>{restaurantInfo.sla?.deliveryTime || "30-35"} mins</span>
                <span>•</span>
                <span>{costForTwoMessage}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="p-6">
        {/* Categories accordions */}
        {categories && categories.length > 0 ? (
          <div className="space-y-6">
            {categories.map((category, index) => (
              <RestaurantCategory
                key={category?.card?.card?.title || index}
                data={category?.card?.card}
                showItems={index === showIndex}
                setShowIndex={() =>
                  setShowIndex(index === showIndex ? null : index)
                }
              />
            ))}
          </div>
        ) : (
          /* Fallback to old menu display */
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Menu</h2>
            <ul className="space-y-4">
              {menuItems.length === 0 ? (
                <li>No menu items found.</li>
              ) : (
                menuItems.map((item, idx) => (
                  <li
                    key={item.id + "-" + idx}
                    className="flex items-center gap-4 border-b pb-2"
                  >
                    {item.imageId ? (
                      <img
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/w_80,h_80,c_fill/${item.imageId}`}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">
                        {item.name}
                      </div>
                      <div className="text-gray-600 text-sm">
                        Rs.{" "}
                        {item.price
                          ? item.price / 100
                          : item.defaultPrice
                          ? item.defaultPrice / 100
                          : "-"}
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
