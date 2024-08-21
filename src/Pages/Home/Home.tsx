import supabaseClient from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import { CategoriesComplete } from "../../types/supabase-own-types";
const Home = () => {

const [recipes, setRecipes] = useState<CategoriesComplete>();

 useEffect(() => {
    const fetchRecipes = async () => {
        let selectQuery = supabaseClient.from("Recipes").select("*");

        const result = await selectQuery;

        if (result.error) {
            console.error(result.error)
        } else{
            setRecipes(result.data);
            console.log(recipes)
        }
    };

    fetchRecipes();
 }, []);

    return ( 
        <main>
            <p>home</p>
        </main>
     );
}
 
export default Home;