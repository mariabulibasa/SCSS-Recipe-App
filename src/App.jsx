import { useMemo, useState } from "react";
import recipes from "./data/recipes";
import "./styles/main.scss";

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert"];

export default function App() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch = recipe.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || recipe.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="page">
      <header className="hero">
        <h1 className="hero__title">Smart Recipe Finder</h1>
        <p className="hero__text">
          Discover quick recipes by category, search by name, and save your
          favorites.
        </p>
      </header>

      <section className="controls">
        <input
          className="search-input"
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${
                selectedCategory === category ? "filter-btn--active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="recipe-grid">
        {filteredRecipes.map((recipe) => (
          <article className="recipe-card" key={recipe.id}>
            <img
              className="recipe-card__image"
              src={recipe.image}
              alt={recipe.title}
            />

            <div className="recipe-card__content">
              <div className="recipe-card__top">
                <h2 className="recipe-card__title">{recipe.title}</h2>

                <button
                  className={`favorite-btn ${
                    favorites.includes(recipe.id) ? "favorite-btn--active" : ""
                  }`}
                  onClick={() => toggleFavorite(recipe.id)}
                >
                  ♥
                </button>
              </div>

              <p className="recipe-card__description">{recipe.description}</p>

              <div className="recipe-card__tags">
                <span>{recipe.category}</span>
                <span>{recipe.time}</span>
                <span>{recipe.protein} protein</span>
                <span>{recipe.calories} kcal</span>
              </div>

              <button className="btn btn--primary">View Recipe</button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
