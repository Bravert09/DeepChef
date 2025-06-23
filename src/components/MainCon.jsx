import React from "react";
import DeepRecipe from "./DeepRecipe";
import IngredientsList from "./IngredientsList";

export default function MainCon() {
  const [ingredients, setList] = React.useState([]);

  const ingredientsListItems = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setList((preList) => [...preList, newIngredient]);
  }

  const [recipe, setRecipe] = React.useState("");
  
  async function getRecipe() {
    try {
      const res = await fetch("http://localhost:5000/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("响应失败：", res.status, text);
        return;
      }
      const recipeMarkdown = await res.json();
      setRecipe(recipeMarkdown.recipe);
    } catch (err) {
      console.error("请求出错：", err.message);
    }
  }
  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. tomato"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>&#x2B; Add ingredient</button>
      </form>
      <IngredientsList
        
        ingredientsListItems={ingredientsListItems}
        getRecipe={getRecipe}
      />
      {recipe && <DeepRecipe recipe={recipe} />}
    </main>
  );
}
