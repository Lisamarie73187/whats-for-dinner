export enum CuisineType {
	American = 'American',
	Asian = 'Asian',
	British = 'British',
	Caribbean = 'Caribbean',
	CentralEurope = 'Central Europe',
	Chinese = 'Chinese',
	EasternEurope = 'Eastern Europe',
	French = 'French',
	Indian = 'Indian',
	Italian = 'Italian',
	Japanese = 'Japanese',
	Kosher = 'Kosher',
	Mediterranean = 'Mediterranean',
	Mexican = 'Mexican',
	MiddleEastern = 'Middle Eastern',
	SouthAmerican = 'South American',
	SouthEastAsian = 'South East Asian',
}

export enum MealType {
	Chicken = 'Chicken',
	Beef = 'Beef',
	Pork = 'Pork',
	Turkey = 'Turkey',
	Seafood = 'Seafood',
	Pasta = 'Pasta',
	Lamb = 'Lamb',
	Pizza = 'Pizza',
}

export enum health {
	Vegan = 'vegan',
	Vegetarian = 'vegetarian',
	DiaryFree = 'dairy-free',
	GlutenFree = 'gluten-free',
}

export interface recipeResponse {
	params: {
		cuisineTypeString?: string;
		mainIngredientString?: string;
		ingredients?: string;
		dietaryRestrictions?: string;
	};
	recipe: Recipe;
}
export interface Recipe {
	title: string;
	cuisine: promptProps;
	mainIngredient: promptProps;
	ingredients: Ingredient[];
	instructions: string[];
}

export interface Ingredient {
	item: string;
	amount: string;
}

export interface promptProps {
	type: string;
	prompt: string;
}
