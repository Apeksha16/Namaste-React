import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import SearchAndFilter from "./SearchAndFilter";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
      );

      const json = await data.json();
      console.log(json);
      const restaurants = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      setListOfRestaurants(restaurants);
      setFilteredRestaurant(restaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    const filtered = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase()) ||
      res.info.cuisines.some(cuisine => 
        cuisine.toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFilteredRestaurant(filtered);
  };

  const handleFilter = (filters) => {
    let filtered = [...listOfRestaurants];

    if (filters.rating === '4.0+') {
      filtered = filtered.filter(res => Number(res.info.avgRating) >= 4.0);
    }

    if (filters.deliveryTime === 'fast') {
      filtered = filtered.filter(res => res.info.sla.deliveryTime <= 30);
    }

    if (filters.costForTwo === 'low') {
      filtered = filtered.filter(res => {
        const cost = parseInt(res.info.costForTwo.replace(/[^\d]/g, ''));
        return cost < 300;
      });
    }

    if (filters.cuisines.length > 0) {
      filtered = filtered.filter(res =>
        res.info.cuisines.some(cuisine =>
          filters.cuisines.includes(cuisine)
        )
      );
    }

    setFilteredRestaurant(filtered);
  };

  const handleSort = (sortBy) => {
    let sorted = [...filteredRestaurant];

    switch (sortBy) {
      case 'rating':
        sorted.sort((a, b) => Number(b.info.avgRating) - Number(a.info.avgRating));
        break;
      case 'deliveryTime':
        sorted.sort((a, b) => a.info.sla.deliveryTime - b.info.sla.deliveryTime);
        break;
      case 'costLowToHigh':
        sorted.sort((a, b) => {
          const costA = parseInt(a.info.costForTwo.replace(/[^\d]/g, ''));
          const costB = parseInt(b.info.costForTwo.replace(/[^\d]/g, ''));
          return costA - costB;
        });
        break;
      case 'costHighToLow':
        sorted.sort((a, b) => {
          const costA = parseInt(a.info.costForTwo.replace(/[^\d]/g, ''));
          const costB = parseInt(b.info.costForTwo.replace(/[^\d]/g, ''));
          return costB - costA;
        });
        break;
      default:
        // relevance - keep original order
        break;
    }

    setFilteredRestaurant(sorted);
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return (
      <h1>
        Looks like you're offline!! Please check your internet connection;{" "}
      </h1>
    );

  if (isLoading) {
    return <Shimmer />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Order food online from your favorite restaurants</h1>
          <p className="text-xl opacity-90">Discover the best food & drinks in your city</p>
        </div>
      </div>

      {/* Search and Filter */}
      <SearchAndFilter
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onSort={handleSort}
        totalRestaurants={filteredRestaurant.length}
      />

      {/* Restaurant Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredRestaurant.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No restaurants found</h2>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredRestaurant.map((restaurant) => (
              <Link
                key={restaurant.info.id}
                to={"/restaurant/" + restaurant.info.id}
                className="transform hover:scale-105 transition-transform duration-200"
              >
                {restaurant.info.avgRating > 4.3 ? (
                  <RestaurantCardPromoted resData={restaurant.info} />
                ) : (
                  <RestaurantCard resData={restaurant.info} />
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
