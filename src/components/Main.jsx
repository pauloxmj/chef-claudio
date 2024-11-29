import { useState } from "react";
import styles from "./Main.module.css";
import Recipe from "./Recipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "../ai.js";


export default function Main() {
    // Initializing state for ingredients
    const [ingredients, setIngredients] = useState([]);

    // Adding ingredients to state array using React 18 handling of form data:
    function handleSubmit(event) {
        event.preventDefault(); // Prevents page refresh when submitting form
        const formData = new FormData(event.currentTarget);
        const newIngredient = formData.get("ingredient").trim(); //Get form data and trim input from any whitespaces
        // Statement to only add ingredients when form is not empty
        if (newIngredient) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
        }
        event.currentTarget.reset() // Clear the input field after adding ingredient
    }

      // Generate recipe
    const [recipe, setRecipe] = useState("");
    async function getRecipe() {
        const generateRecipe = await getRecipeFromMistral(ingredients);
        setRecipe(generateRecipe);
    }

    // Adding ingredients to state array using React 19 handling of form data:
    // function addIngredient(formData) {
    //     const newIngredient = formData.get("ingredient")
    //     setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    // }
    // <main>
    //  <form action={addIngredient} className={styles.addIngredientForm}>

    return(
        <main>
            <div>
                <form onSubmit={handleSubmit} className={styles.addIngredientForm}>
                    <input 
                        type="text" 
                        placeholder="e.g. Chicken" 
                        aria-label="Add ingredient"
                        name="ingredient" 
                    />
                    <button>Add ingredient</button>
                </form>

                {ingredients.length > 0 ? <IngredientsList 
                    ingredients= {ingredients}
                    getRecipe= {getRecipe}
                /> : <h2>Add at least 4 ingredients to your list to get your recipe.</h2>}
                {recipe ? <Recipe recipe={recipe} /> : null}
            </div>
        </main>
    );
}