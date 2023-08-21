import React, { useState, useEffect } from "react";
import "../styles/styles.css";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Recipe from "../Components/Recipe";
const HomePage = () => {
  const [isLeftDivOpen, setIsLeftDivOpen] = useState(false);
  const [userRecipes, setAllRecipes] = useState([]);

  const handleBurgerClick = () => {
    setIsLeftDivOpen(!isLeftDivOpen);
  };

  const handleHome = () => {
    window.location.replace("/Home");
  };

  const handleRecipe = () => {
    window.location.replace("/MyRecipes");
  };

  if (!localStorage.getItem("token")) {
    window.location.replace("/");
  }
  const fetchAllRecipes = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/user/getallrecipes",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const recipes = response.data.recipes;

      setAllRecipes(recipes);
    } catch (error) {
      console.error("Error fetching user recipes:", error);
    }
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  return (
    <>
      <div className="home-body">
        <Navbar onBurgerClick={handleBurgerClick} />
        <div
          className="burger-open-div"
          style={{ display: isLeftDivOpen ? "block" : "none" }}
        >
          <button className="burger-close-btn" onClick={handleBurgerClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="burgermenu-buttons-wrapper">
            <span className="logo-text burger-span" onClick={handleHome}>
              RECIPE REALM
            </span>
            <button className="burgerbuttons" onClick={handleHome}>
              {" "}
              Home{" "}
            </button>
            <button className="burgerbuttons">Shopping List</button>
            <button className="burgerbuttons">Meal Planner</button>
            <button className="burgerbuttons" onClick={handleRecipe}>
              My Recipes
            </button>
          </div>
        </div>
        <div className="Search">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="search-icon"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <div className="Recipes">
            {userRecipes.map((recipe, index) => (
              <Recipe key={index} recipe={recipe} user={recipe.user} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
