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
    <div className="menu">
      <h1>{name}</h1>
      <p>{cuisines?.join(", ")} - {costForTwoMessage}</p>
      <h2>Menu</h2>
      <ul>
        {menuItems.length === 0 ? (
          <li>No menu items found.</li>
        ) : (
          menuItems.map((item, idx) => (
            <li key={item.id + '-' + idx}>
              {item.name} - Rs. {item.price ? (item.price / 100) : (item.defaultPrice ? item.defaultPrice / 100 : "-")}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
