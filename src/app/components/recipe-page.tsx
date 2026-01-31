import React, { useState } from 'react';
import { DashboardNavbar } from '@/app/components/dashboard-navbar';
import { RecipeCard } from '@/app/components/recipe-card';
import { RecipeDetailModal } from '@/app/components/recipe-detail-modal';
import { SlidersHorizontal, ChefHat } from 'lucide-react';

interface Recipe {
  id: string;
  name: string;
  photo: string;
  servings: number;
  costPerServing: string;
  totalIngredients: number;
  matchedIngredients: number;
  missingIngredients: string[];
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  dietary: string[];
  ingredients: { name: string; amount: string; inInventory: boolean }[];
  instructions: string[];
  nutrition?: { calories: string; protein: string; carbs: string; fat: string };
  usesExpiringItems: boolean;
}

export function RecipePage() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [mealTypeFilter, setMealTypeFilter] = useState<string>('all');
  const [servingsNeeded, setServingsNeeded] = useState(40);
  const [dietaryFilters, setDietaryFilters] = useState<string[]>([]);
  const [useExpiringFirst, setUseExpiringFirst] = useState(false);

  // Mock data
  const recipes: Recipe[] = [
    {
      id: '1',
      name: 'Hearty Vegetable Stew',
      photo: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
      servings: 40,
      costPerServing: '$0.35',
      totalIngredients: 10,
      matchedIngredients: 8,
      missingIngredients: ['Bay leaves', 'Thyme'],
      mealType: 'dinner',
      dietary: ['vegetarian', 'vegan'],
      usesExpiringItems: true,
      ingredients: [
        { name: 'Carrots', amount: '5 lbs', inInventory: true },
        { name: 'Potatoes', amount: '8 lbs', inInventory: true },
        { name: 'Celery', amount: '2 lbs', inInventory: true },
        { name: 'Onions', amount: '3 lbs', inInventory: true },
        { name: 'Canned Tomatoes', amount: '6 cans', inInventory: true },
        { name: 'Vegetable Broth', amount: '4 quarts', inInventory: true },
        { name: 'Garlic', amount: '1 bulb', inInventory: true },
        { name: 'Olive Oil', amount: '1/4 cup', inInventory: true },
        { name: 'Bay Leaves', amount: '3 leaves', inInventory: false },
        { name: 'Thyme', amount: '2 tsp', inInventory: false },
      ],
      instructions: [
        'Heat olive oil in a large pot over medium heat.',
        'Add diced onions and minced garlic, sauté until fragrant (3-4 minutes).',
        'Add chopped carrots, celery, and potatoes. Cook for 5 minutes.',
        'Pour in canned tomatoes and vegetable broth.',
        'Add bay leaves and thyme. Bring to a boil.',
        'Reduce heat and simmer for 30-40 minutes until vegetables are tender.',
        'Season with salt and pepper to taste.',
        'Remove bay leaves before serving.',
      ],
      nutrition: {
        calories: '145',
        protein: '4g',
        carbs: '28g',
        fat: '3g',
      },
    },
    {
      id: '2',
      name: 'Classic Chicken Rice Bowl',
      photo: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop',
      servings: 50,
      costPerServing: '$0.42',
      totalIngredients: 8,
      matchedIngredients: 7,
      missingIngredients: ['Soy Sauce'],
      mealType: 'lunch',
      dietary: [],
      usesExpiringItems: true,
      ingredients: [
        { name: 'Chicken Breast', amount: '15 lbs', inInventory: true },
        { name: 'Rice', amount: '10 lbs', inInventory: true },
        { name: 'Carrots', amount: '3 lbs', inInventory: true },
        { name: 'Peas', amount: '2 lbs', inInventory: true },
        { name: 'Onions', amount: '2 lbs', inInventory: true },
        { name: 'Garlic', amount: '1 bulb', inInventory: true },
        { name: 'Oil', amount: '1/2 cup', inInventory: true },
        { name: 'Soy Sauce', amount: '1/2 cup', inInventory: false },
      ],
      instructions: [
        'Cook rice according to package directions.',
        'Season chicken with salt and pepper, dice into bite-sized pieces.',
        'Heat oil in large skillet, cook chicken until golden (6-8 minutes).',
        'Remove chicken, set aside.',
        'In the same pan, sauté diced onions, carrots, and garlic.',
        'Add peas and cooked rice, stir to combine.',
        'Return chicken to pan, add soy sauce, mix well.',
        'Cook for additional 3-4 minutes until heated through.',
      ],
      nutrition: {
        calories: '285',
        protein: '18g',
        carbs: '35g',
        fat: '6g',
      },
    },
    {
      id: '3',
      name: 'Breakfast Oatmeal Bar',
      photo: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=600&h=400&fit=crop',
      servings: 30,
      costPerServing: '$0.28',
      totalIngredients: 6,
      matchedIngredients: 6,
      missingIngredients: [],
      mealType: 'breakfast',
      dietary: ['vegetarian'],
      usesExpiringItems: false,
      ingredients: [
        { name: 'Oats', amount: '8 cups', inInventory: true },
        { name: 'Milk', amount: '4 cups', inInventory: true },
        { name: 'Eggs', amount: '8 eggs', inInventory: true },
        { name: 'Brown Sugar', amount: '1 cup', inInventory: true },
        { name: 'Butter', amount: '1/2 cup', inInventory: true },
        { name: 'Cinnamon', amount: '2 tsp', inInventory: true },
      ],
      instructions: [
        'Preheat oven to 350°F (175°C).',
        'Mix oats, brown sugar, and cinnamon in a large bowl.',
        'In another bowl, whisk together eggs and milk.',
        'Combine wet and dry ingredients, stir until well mixed.',
        'Melt butter and fold into the mixture.',
        'Pour into greased baking pans.',
        'Bake for 35-40 minutes until golden and set.',
        'Cool slightly, cut into bars and serve.',
      ],
      nutrition: {
        calories: '195',
        protein: '7g',
        carbs: '30g',
        fat: '5g',
      },
    },
    {
      id: '4',
      name: 'Simple Pasta Marinara',
      photo: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop',
      servings: 45,
      costPerServing: '$0.25',
      totalIngredients: 7,
      matchedIngredients: 5,
      missingIngredients: ['Basil', 'Oregano'],
      mealType: 'dinner',
      dietary: ['vegetarian', 'vegan'],
      usesExpiringItems: false,
      ingredients: [
        { name: 'Pasta', amount: '10 lbs', inInventory: true },
        { name: 'Canned Tomatoes', amount: '8 cans', inInventory: true },
        { name: 'Garlic', amount: '2 bulbs', inInventory: true },
        { name: 'Onions', amount: '2 lbs', inInventory: true },
        { name: 'Olive Oil', amount: '1/2 cup', inInventory: true },
        { name: 'Fresh Basil', amount: '1 bunch', inInventory: false },
        { name: 'Oregano', amount: '2 tbsp', inInventory: false },
      ],
      instructions: [
        'Cook pasta according to package directions, drain and set aside.',
        'Heat olive oil in large pot over medium heat.',
        'Sauté diced onions and minced garlic until softened.',
        'Add canned tomatoes, crushing with a spoon.',
        'Season with salt, pepper, basil, and oregano.',
        'Simmer sauce for 20-25 minutes, stirring occasionally.',
        'Toss pasta with marinara sauce.',
        'Serve hot.',
      ],
      nutrition: {
        calories: '210',
        protein: '7g',
        carbs: '42g',
        fat: '2g',
      },
    },
    {
      id: '5',
      name: 'Ground Beef Tacos',
      photo: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&h=400&fit=crop',
      servings: 35,
      costPerServing: '$0.48',
      totalIngredients: 9,
      matchedIngredients: 6,
      missingIngredients: ['Tortillas', 'Cheese', 'Lettuce'],
      mealType: 'dinner',
      dietary: [],
      usesExpiringItems: true,
      ingredients: [
        { name: 'Ground Beef', amount: '10 lbs', inInventory: true },
        { name: 'Onions', amount: '2 lbs', inInventory: true },
        { name: 'Garlic', amount: '1 bulb', inInventory: true },
        { name: 'Tomatoes', amount: '3 lbs', inInventory: true },
        { name: 'Taco Seasoning', amount: '1/2 cup', inInventory: true },
        { name: 'Oil', amount: '2 tbsp', inInventory: true },
        { name: 'Tortillas', amount: '70 count', inInventory: false },
        { name: 'Cheese', amount: '3 lbs', inInventory: false },
        { name: 'Lettuce', amount: '2 heads', inInventory: false },
      ],
      instructions: [
        'Heat oil in large skillet over medium-high heat.',
        'Add ground beef, breaking it apart as it cooks.',
        'Once browned, drain excess fat.',
        'Add diced onions and minced garlic, cook until softened.',
        'Stir in taco seasoning and diced tomatoes.',
        'Simmer for 10 minutes.',
        'Warm tortillas according to package.',
        'Serve beef mixture in tortillas with desired toppings.',
      ],
      nutrition: {
        calories: '245',
        protein: '15g',
        carbs: '18g',
        fat: '12g',
      },
    },
  ];

  const filterRecipes = (recipes: Recipe[]) => {
    return recipes.filter(recipe => {
      const hasAllIngredients = recipe.matchedIngredients === recipe.totalIngredients;
      const matchesAvailability = !showOnlyAvailable || hasAllIngredients;
      const matchesMealType = mealTypeFilter === 'all' || recipe.mealType === mealTypeFilter;
      const matchesServings = recipe.servings >= servingsNeeded * 0.8; // Allow 20% variance
      const matchesDietary = dietaryFilters.length === 0 || dietaryFilters.every(filter => recipe.dietary.includes(filter));
      const matchesExpiring = !useExpiringFirst || recipe.usesExpiringItems;

      return matchesAvailability && matchesMealType && matchesServings && matchesDietary && matchesExpiring;
    });
  };

  const filteredRecipes = filterRecipes(recipes);

  const toggleDietaryFilter = (filter: string) => {
    setDietaryFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl mb-2">Recipe Ideas</h1>
              <p className="text-muted-foreground">Based on what's in your inventory</p>
            </div>

            {/* Toggle */}
            <div className="bg-card rounded-full p-1 shadow-sm border border-border flex gap-1">
              <button
                onClick={() => setShowOnlyAvailable(false)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !showOnlyAvailable
                    ? 'bg-secondary text-secondary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Show all
              </button>
              <button
                onClick={() => setShowOnlyAvailable(true)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  showOnlyAvailable
                    ? 'bg-secondary text-secondary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Only ingredients I have
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-[14px] p-6 shadow-sm border border-border sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
                <h3 className="font-medium">Filters</h3>
              </div>

              {/* Meal Type */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block">Meal Type</label>
                <div className="space-y-2">
                  {['all', 'breakfast', 'lunch', 'dinner', 'snack'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setMealTypeFilter(type)}
                      className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-all ${
                        mealTypeFilter === type
                          ? 'bg-secondary/10 text-secondary font-medium'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Servings Needed */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block">
                  Servings Needed: {servingsNeeded}
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={servingsNeeded}
                  onChange={(e) => setServingsNeeded(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>10</span>
                  <span>100</span>
                </div>
              </div>

              {/* Dietary Preferences */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block">Dietary</label>
                <div className="space-y-2">
                  {['vegetarian', 'vegan', 'gluten-free'].map((diet) => (
                    <label key={diet} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={dietaryFilters.includes(diet)}
                        onChange={() => toggleDietaryFilter(diet)}
                        className="w-4 h-4 rounded border-border text-secondary focus:ring-secondary"
                      />
                      <span className="text-sm capitalize">{diet.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Use Expiring Items First */}
              <div className="pt-4 border-t border-border">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useExpiringFirst}
                    onChange={(e) => setUseExpiringFirst(e.target.checked)}
                    className="w-4 h-4 rounded border-border text-accent-foreground focus:ring-accent"
                  />
                  <span className="text-sm font-medium">Use expiring items first</span>
                </label>
              </div>
            </div>
          </div>

          {/* Recipe Grid */}
          <div className="lg:col-span-3">
            {/* Results Count */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onViewRecipe={() => setSelectedRecipe(recipe)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-[14px] border border-border">
                <ChefHat className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl mb-2">No recipes found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to see more recipes
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Legal Footer */}
      <div className="mt-16 bg-muted/30 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            FoodBridge is an intermediary platform facilitating connections between donors and shelters. 
            FoodBridge does not handle, transport, or guarantee the safety of donated food. All parties 
            are responsible for compliance with local food safety regulations.
          </p>
        </div>
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}
