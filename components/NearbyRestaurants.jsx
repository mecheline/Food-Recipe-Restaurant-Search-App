import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import styles from "../styles/NearbyRestaurants.module.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function NearbyRestaurants() {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [query, setQuery] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 6.573564199419233,
    longitude: 3.3478241999999994,
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });
  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    handleLocationClick();
  }, [query == ""]);

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  const error = () => {
    console.log("Hi");
  };
  const success = async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setViewport({ ...viewport, latitude: latitude, longitude: longitude });
    setLongitude(longitude);
    setLatitude(latitude);
    //    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    const res = await axios.get(
      `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:${longitude},${latitude},20000&bias=proximity:${longitude},${latitude}&limit=20&apiKey=${process.env.NEXT_PUBLIC_GEOIFY_API_KEY}`
    );
    console.log(res.data.features);
    setRestaurants(res.data.features);
  };

  const searchRestaurant = async (e) => {
    e.preventDefault();
     if (!query || query.trim() == "") {
       return toast.error("Please input any restaurant within your city", {
         position: toast.POSITION.BOTTOM_RIGHT,
       });
     }
    const res = await axios.get(
      `https://api.geoapify.com/v2/places?name=${query}&categories=catering.restaurant&filter=circle:${longitude},${latitude},20000&bias=proximity:${longitude},${latitude}&limit=20&apiKey=${process.env.NEXT_PUBLIC_GEOIFY_API_KEY}`
    );
    console.log(res.data.features);
    if (res.data.features.length <= 0) {
      console.log("Restaurant is no within your city");
      toast.error("Restaurant is not within your city", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }
    setRestaurants(res.data.features);
    postRecipe();
  };

  const postRecipe = async () => {
    console.log(query);
    await axios.post("/api/restaurantstore", { query });
  };

  return (
    <div className={styles.cover}>
      <form className={styles.main} onSubmit={searchRestaurant}>
        <div className={styles.form}>
          <input
            type="text"
            className=""
            placeholder="Search a nearby restaurant"
            aria-describedby="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </div>
      </form>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
        mapStyle="mapbox://styles/mechelin/clob99dyp014101pf3qpm5i5t"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {restaurants &&
          restaurants.map((restaurant) => (
            <Marker
              key={restaurant.properties.name}
              latitude={restaurant.geometry.coordinates[1]}
              longitude={restaurant.geometry.coordinates[0]}
            >
              <button
                className={styles.markerbtn}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedPark(restaurant);
                }}
              >
                <i className="bi bi-geo-alt-fill"></i>
              </button>
            </Marker>
          ))}
        <div className={styles.popup}>
          {selectedPark ? (
            <Popup
              latitude={selectedPark.geometry.coordinates[1]}
              longitude={selectedPark.geometry.coordinates[0]}
              onClose={() => {
                setSelectedPark(null);
              }}
            >
              <div>
                <h2>{selectedPark.properties.name}</h2>
                <p>{selectedPark.properties.address_line2}</p>
                <p>{Number(selectedPark.properties.distance) / 1000} km away</p>
              </div>
            </Popup>
          ) : null}
        </div>
      </ReactMapGL>
    </div>
  );
}
