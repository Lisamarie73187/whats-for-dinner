# 🥘 What Should I Make For Dinner?

**What Should I Make For Dinner?** is a random recipe generator with a bit of attitude, designed to help users decide what to cook by fetching creative recipe suggestions from the Open AI. This app makes the decision-making process simple by allowing users to set filters like cuisine, dietary preferences, and ingredients to exclude and include. It’s straightforward, no-nonsense, and adds a little spice to your recipe search.

## Features
- **Random Recipe Generator**: Instantly get recipe inspiration with a random suggestion from the OPENAI API.
- **Customizable Filters**: Tailor results based on:
  - **Cuisine**: Filter by a variety of cuisines.
  - **Diet Preferences**: Choose from dietary filters like vegetarian, diary-free, and gluten-free.
  - **Exclude Ingredients**: Omit recipes with specific ingredients to accommodate allergies or preferences.
  - **Include Ingredients**: features a "What's In My Fridge" list of ingredients to search with.
- **Recipe Details**: Displays each recipe’s title and direct link to full instructions.
- **Smooth Animations**: Framer Motion is used for seamless transitions and animations, enhancing the user experience.


**Technologies Used**
- **React (with TypeScript)**
- **Framer Motion**
- **Node.js**
- **Express.js**
- **OpenAI API for recipe generation**
- **Custom CSS with Flexbox**

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/whats-for-dinner.git
   cd whats-for-dinner

2. **Install Dependencies:**:
   ```bash
   npm install

3. **Environment Variables:**:
    **Create a `.env` file** in the root of your backend folder.
   **Add your OPENAI API credentials**:
   ```env
   OPENAI_API_KEY=your_app_id

4. **Start the server**:
   ```bash
   npm run dev

5. **Start the frontend**:
   ```bash
   npm start

5. **Access the Application:**:
   Open your browser and navigate to http://localhost:3000.


![App Demo](/assets/demo.gif)


