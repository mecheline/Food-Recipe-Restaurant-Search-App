import axios from "axios";

import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import { useRouter } from "next/router";
import data from "./data";

import { useSession } from "next-auth/react";

const Homepage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [USD, setUSD] = useState("");
  const [NGN, setNGN] = useState("");
  const [value, setValue] = useState(null);

  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  console.log(recipes);

  const postRecipe = async () => {
    console.log(query);
    if (!session.user.isAdmin) {
      await axios.post("/api/store", { query });
    }
  };

  const getRecipes = async () => {
    const res = await axios.get(`/api/searchrecipes/${query}`);
    console.log(res.data.hits);
    setRecipes(res.data.hits);
  };

  const getSearch = (e) => {
    e.preventDefault();
    getRecipes();
    postRecipe();
    setQuery("");
  };

  useEffect(() => {
    const dollar = localStorage.getItem("USD");
    if (dollar) {
      setUSD(dollar);
    }
    const naira = localStorage.getItem("NGN");
    if (naira) {
      setNGN(naira);
    }
  });

  useEffect(() => {
    setTimeout(() => {
      getCurrency();
    }, "1000");
  }, []);

  const getCurrency = async () => {
    const res = await axios.get(
      `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.NEXT_PUBLIC_EXCHANGERATES_API_KEY}`
    );
    console.log(res.data.rates.USD, res.data.rates.NGN);
    localStorage.setItem("USD", JSON.stringify(res.data.rates.USD));
    localStorage.setItem("NGN", JSON.stringify(res.data.rates.NGN));
    setUSD(res.data.rates.USD);
    setNGN(res.data.rates.NGN);
  };

  const getPriceInUSD = async (label) => {
    // await getCurrency();
    const filteredRecipe = recipes
      .filter((recipe) => recipe.recipe.label === label)
      .map((item) => item.recipe.totalWeight)
      .toString();
    console.log(USD, NGN);

    const convert = ((USD * filteredRecipe) / NGN).toFixed(2);

    setValue(convert);
    // return convert;
  };
  const getLocalPriceInUSD = (price) => {
    const convert = ((USD * price) / NGN).toFixed(2);
    console.log(convert);
    setValue(convert);
    // return convert;
  };
  return (
    <>
      <div className={styles.spread}>
        <form className={styles.main} onSubmit={getSearch}>
          <div className={styles.form}>
            <input
              type="text"
              class=""
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
        {recipes.length > 0
          ? recipes.map((recipe, index) => {
              return (
                <div key={recipe.label} className={`card ${styles.innerCard}`}>
                  <div className={styles.spread}>
                    <div className={styles.image}>
                      <img
                        src={recipe.recipe.image}
                        class="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className={styles.text}>
                      <div class="card-body">
                        <h5 class="card-title">{recipe.recipe.label}</h5>
                        <p class="card-text">
                          Calories: {recipe.recipe.calories.toFixed(2)}
                        </p>
                        {/* <div className="d-flex flex-column justify-content-start align-items-start"> */}
                        <div className={styles.contain}>
                          <h6 class="text-body-secondary fw-bolder">
                            ₦{Math.floor(recipe.recipe.totalWeight)}.00
                          </h6>
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => getPriceInUSD(recipe.recipe.label)}
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
          : data.map((item) => {
              return (
                <div key={item.name} className={`card ${styles.innerCard}`}>
                  <div className={styles.spread}>
                    <div className={styles.image}>
                      <img
                        src={item.image}
                        class="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className={styles.text}>
                      <div class="card-body">
                        <h5 class="card-title">{item.name}</h5>
                        <p class="card-text">
                          Calories: {item.calories.toFixed(2)}
                        </p>
                        <div className={styles.contain}>
                          <h6 class="text-body-secondary fw-bolder">
                            ₦{Math.floor(item.price)}.00
                          </h6>
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => getLocalPriceInUSD(item.price)}
                          >
                            Price in USD
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Price in Dollar
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <h4>${value && value}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
