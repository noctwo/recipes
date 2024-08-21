import supabaseClient from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import { Recipes } from "../../types/supabase-own-types";
import { Link } from "react-router-dom";


const Home = () => {

const [recipes, setRecipes] = useState<Recipes[]>();
const [recipeSearch, setRecipeSearch] = useState<string>("");
const [ratingFilter, setRatingFilter] = useState<string>("");

 useEffect(() => {
    const fetchRecipes = async () => {
        let selectQuery = supabaseClient.from("Recipes").select("*");

        if (recipeSearch){
            selectQuery = selectQuery.ilike("name", `%${recipeSearch}%`);
        }

        if (ratingFilter){
            selectQuery = selectQuery.eq("rating", ratingFilter);
        }

        const result = await selectQuery;

        if (result.error) {
            console.error(result.error)
        } else{
            setRecipes(result.data);
            console.log(recipes)
        }
    };

    fetchRecipes();
 }, [recipeSearch, ratingFilter]);

    return ( 
        <main className="recipe-list-container">
            <div className="search-bar">
                <input type="text" id="recipe-search" placeholder="search for recipe" value={recipeSearch} onChange={(event) => setRecipeSearch(event.target.value)}/>
            </div>
            <div className="rating">
                <select value={ratingFilter} onChange={(event) => setRatingFilter(event.target.value)}>
                    <option value="">apply rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            {recipes?.length === 0 && <p>no recipes found</p>}
            <div className="recipes-wrapper">
                {recipes && recipes.length > 0 && recipes.map((recipe) => (
                    <div className="recipe-card" key={recipe.id}>
                        <Link to={`recipe/${recipe.id}`} >
                        <div className="recipe-img-wrapper">
                            <img src={`${recipe.img_url}`} />
                        </div>
                        <h3>{recipe.name}</h3>
                        <p>{recipe.rating}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </main>
     );
}
 
export default Home;