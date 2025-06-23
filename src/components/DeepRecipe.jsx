import React from "react";
import ReactMarkdown from 'react-markdown'

export default function DeepRecipe({ recipe }) {
  return (
    
      <section className="suggested-recipe-containe">
        <h2>Deep Chef Recommends:</h2>
        <ReactMarkdown>{recipe}</ReactMarkdown>
        </section>
   
  );
}
