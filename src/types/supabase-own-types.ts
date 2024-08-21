import { Tables } from "./supabase";

export type Categories = Tables<"Categories">;
export type Recipes = Tables<"Recipes">;
export type Ingredients = Tables<"Ingredients">;

export type RecipeAndIngredients = Recipes & {
    ingridients: Ingredients;
}

export type CategoriesComplete = Categories & {
    recipes: (Recipes & {
        ingredients: Ingredients})
    }
