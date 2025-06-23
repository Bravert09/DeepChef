import React from "react";

export default function ({ ingredientsListItems, getRecipe }) {
  return (
    <div>
      {ingredientsListItems.length > 0 && (
        <section>
          <h2>Ingredients on hand(at least 3 items):</h2>
          <ul className="ingredients-list" aria-live="polite">
            {ingredientsListItems}
          </ul>
          {ingredientsListItems.length > 2 && (
            <div className="get-recipe-container">
              <div >
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
              </div>
              <button onClick={getRecipe}>Get a recipe</button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
