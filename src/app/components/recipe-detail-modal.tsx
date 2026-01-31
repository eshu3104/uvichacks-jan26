import React from 'react';
import { X, Check, Plus, Printer, Users, DollarSign } from 'lucide-react';
import { Button } from '@/app/components/button';

interface RecipeDetailModalProps {
  recipe: {
    id: string;
    name: string;
    photo: string;
    servings: number;
    costPerServing: string;
    totalIngredients: number;
    matchedIngredients: number;
    ingredients: { name: string; amount: string; inInventory: boolean }[];
    instructions: string[];
    nutrition?: { calories: string; protein: string; carbs: string; fat: string };
  };
  onClose: () => void;
}

export function RecipeDetailModal({ recipe, onClose }: RecipeDetailModalProps) {
  const missingIngredients = recipe.ingredients.filter(i => !i.inInventory);

  const handlePrint = () => {
    window.print();
  };

  const handleAddToShoppingList = () => {
    console.log('Add missing ingredients to shopping list:', missingIngredients);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto bg-card rounded-[16px] shadow-2xl border border-border">
          {/* Header */}
          <div className="relative">
            <img
              src={recipe.photo}
              alt={recipe.name}
              className="w-full h-64 md:h-80 object-cover rounded-t-[16px]"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-card/90 backdrop-blur-sm hover:bg-card rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Title and Stats */}
            <div className="mb-6">
              <h2 className="text-3xl mb-4" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                {recipe.name}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>Makes {recipe.servings} servings</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Estimated {recipe.costPerServing} per serving</span>
                </div>
              </div>
            </div>

            {/* Print Button */}
            <div className="mb-6">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Print Recipe
              </Button>
            </div>

            {/* Missing Ingredients Alert */}
            {missingIngredients.length > 0 && (
              <div className="mb-6 bg-accent/10 border border-accent/20 rounded-[14px] p-4">
                <p className="font-medium mb-2">
                  You're missing {missingIngredients.length} ingredient{missingIngredients.length !== 1 ? 's' : ''}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {missingIngredients.map((ingredient) => (
                    <span
                      key={ingredient.name}
                      className="px-3 py-1 bg-card rounded-full text-sm border border-border"
                    >
                      {ingredient.name}
                    </span>
                  ))}
                </div>
                <button
                  onClick={handleAddToShoppingList}
                  className="text-sm text-secondary hover:text-secondary/80 font-medium transition-colors"
                >
                  Add to shopping list →
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Ingredients */}
              <div>
                <h3 className="text-xl mb-4 font-medium">Ingredients</h3>
                <div className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
                        ingredient.inInventory
                          ? 'bg-secondary/10'
                          : 'bg-muted/30 border border-dashed border-border'
                      }`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {ingredient.inInventory ? (
                          <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                            <Check className="w-3 h-3 text-secondary-foreground" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-border flex items-center justify-center">
                            <Plus className="w-3 h-3 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${!ingredient.inInventory && 'text-muted-foreground'}`}>
                          {ingredient.name}
                        </p>
                        <p className="text-sm text-muted-foreground">{ingredient.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="text-xl mb-4 font-medium">Instructions</h3>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                        {index + 1}
                      </div>
                      <p className="text-foreground/80 leading-relaxed pt-0.5">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Nutrition Info */}
            {recipe.nutrition && (
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-lg font-medium mb-4">Nutrition Information (per serving)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted/30 rounded-lg p-4 text-center">
                    <p className="text-2xl font-medium text-primary mb-1">{recipe.nutrition.calories}</p>
                    <p className="text-sm text-muted-foreground">Calories</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4 text-center">
                    <p className="text-2xl font-medium text-primary mb-1">{recipe.nutrition.protein}</p>
                    <p className="text-sm text-muted-foreground">Protein</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4 text-center">
                    <p className="text-2xl font-medium text-primary mb-1">{recipe.nutrition.carbs}</p>
                    <p className="text-sm text-muted-foreground">Carbs</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4 text-center">
                    <p className="text-2xl font-medium text-primary mb-1">{recipe.nutrition.fat}</p>
                    <p className="text-sm text-muted-foreground">Fat</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
