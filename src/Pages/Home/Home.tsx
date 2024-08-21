import supabaseClient from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import { Recipes } from "../../types/supabase-own-types";
const Home = () => {

const [recipes, setRecipes] = useState<Recipes[]>();
const [recipeSearch, setRecipeSearch] = useState<string>("");

 useEffect(() => {
    const fetchRecipes = async () => {
        let selectQuery = supabaseClient.from("Recipes").select("*");

        if (recipeSearch){
            selectQuery = selectQuery.ilike("name", `%${recipeSearch}%`);
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
 }, [recipeSearch]);

    return ( 
        <main className="recipe-list-container">
            <div className="search-bar">
                <input type="text" id="recipe-search" placeholder="search for recipe" value={recipeSearch} onChange={(event) => setRecipeSearch(event.target.value)}/>
            </div>
            {recipes?.length === 0 && <p>no recipes found</p>}
            <div className="recipes-wrapper">
                {recipes && recipes.length > 0 && recipes.map((recipe) => (
                    <div className="recipe-card" key={recipe.id}>
                        <div className="recipe-img-wrapper">
                            <img src={`${recipe.img_url}`} />
                        </div>
                        <h3>{recipe.name}</h3>
                        <p>{recipe.rating}</p>
                    </div>
                ))}
            </div>
        </main>
     );
}
 
export default Home;