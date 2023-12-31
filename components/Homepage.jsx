import axios from "axios";

import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import { useRouter } from "next/router";
import data from "./data";

import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import Image from "next/image";
import Loading from "./Loading";

const Homepage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [value, setValue] = useState(null);

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);

  console.log(recipes);

  useEffect(() => {
    const localItem = localStorage.getItem("searchedItem");
    if (localItem) {
      setLoading(true);
      getRecipes(localItem);
    }
  }, []);

  const postRecipe = async () => {
    localStorage.setItem("searchedItem", JSON.stringify(query));
    console.log(query);
    if (!session.user.isAdmin) {
      await axios.post("/api/store", { query });
    }
  };

  const getRecipes = async (localItem) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/searchrecipes/${query ? query : localItem}`
      );
      console.log(res.data.hits);
      setRecipes(res.data.hits);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearch = (e) => {
    e.preventDefault();
    if (!query || query.trim() == "") {
      return toast.error("Please input your favorite recipe ", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    getRecipes();
    postRecipe();
    setQuery("");
  };

  const convertAmount = (amount) => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      `https://api.fastforex.io/convert?from=NGN&to=USD&amount=${amount}&api_key=${process.env.NEXT_PUBLIC_FAST_FOREX}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setValue(response.result.USD);
        console.log(response);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className={styles.spread}>
        <form className={styles.main} onSubmit={getSearch}>
          <div className={styles.form}>
            <input
              type="text"
              className=""
              placeholder="Enter your favorite recipe"
              aria-describedby="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </div>
        </form>
        <div className={styles.restaurantButton}>
          <button onClick={() => router.push("/nearbyrestaurants")}>
            View Restaurants near me
          </button>
        </div>
      </div>
      <div className={styles.cards}>
        {loading ? (
          <Loading />
        ) : recipes.length > 0 ? (
          recipes.map((recipe, index) => {
            return (
              <div key={index} className={`card ${styles.innerCard}`}>
                <div className={styles.spread}>
                  <div className={styles.image}>
                    <Image
                      width={200}
                      height={200}
                      src={recipe.recipe.image}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className={styles.text}>
                    <div className="card-body">
                      <h5 className="card-title">{recipe.recipe.label}</h5>
                      <p className="card-text">
                        Calories: {recipe.recipe.calories.toFixed(2)}
                      </p>

                      <div className={styles.contain}>
                        <h6 className="text-body-secondary fw-bolder">
                          ₦{Math.floor(recipe.recipe.totalWeight)}.00
                        </h6>
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() =>
                            convertAmount(recipe.recipe.totalWeight)
                          }
                        >
                          Price in USD
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          data.map((item, index) => {
            return (
              <div key={index} className={`card ${styles.innerCard}`}>
                <div className={styles.spread}>
                  <div className={styles.image}>
                    <Image
                      width={200}
                      height={200}
                      src={item.image}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className={styles.text}>
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">
                        Calories: {item.calories.toFixed(2)}
                      </p>
                      <div className={styles.contain}>
                        <h6 className="text-body-secondary fw-bolder">
                          ₦{Math.floor(item.price)}.00
                        </h6>
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => convertAmount(item.price)}
                        >
                          Price in USD
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Price in Dollar
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h4>${value}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
