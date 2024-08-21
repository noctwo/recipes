import { useParams } from "react-router-dom";
import supabaseClient from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import { Recipes } from "../../types/supabase-own-types";


const Detail = () => {

    const {id} = useParams<{id:string}>();
    const [recipeDetail, setRecipeDetail] = useState<Recipes | null>(null);

    useEffect(() => {
        const fetchSingleRecipe = async () => {
            if(!id){
                console.error("No Recipe id found");
                return;
            }

            const supabaseResponse = await supabaseClient
            .from("Recipes")
            .select("*")
            .eq("id", id)
            .single();

            if (supabaseResponse.error){
                console.error("recipe not found", supabaseResponse.error);
                return;
            }

            if (supabaseResponse.data){
                setRecipeDetail(supabaseResponse.data);
                console.log(supabaseResponse.data);
            }
        };
        fetchSingleRecipe();
    
    }, []);

    if (!recipeDetail){
        return<p>no result</p>
    }


    return ( 
        <div className="detail-page-wrapper">
            <p>hello from detail</p>
        </div>
     );
}
 
export default Detail;