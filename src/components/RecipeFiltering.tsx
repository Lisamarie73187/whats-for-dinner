import React from 'react';

interface RecipeFilteringProps {
	params: {
		ingredients?: string;
		dietaryRestrictions?: string;
	};
}

const RecipeFiltering: React.FC<RecipeFilteringProps> = ({ params }) => {
	const { ingredients, dietaryRestrictions } = params;
	console.log('ingredients:', ingredients);
	console.log('dietaryRestrictions:', dietaryRestrictions);

	return (
		<div className="recipe-filtering-container">
			{ingredients && (
				<p className="recipe-filtering-item">Ingredients: {ingredients}</p>
			)}
			{dietaryRestrictions && (
				<p className="recipe-filtering-item">
					Dietary restrictions: {dietaryRestrictions}
				</p>
			)}
		</div>
	);
};

export default RecipeFiltering;
