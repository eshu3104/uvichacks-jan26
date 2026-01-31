import React from 'react';
import { Users, DollarSign, AlertCircle } from 'lucide-react';
import { Button } from '@/app/components/button';

interface RecipeCardProps {
  recipe: {
    id: string;
    name: string;
    photo: string;
    servings: number;
    costPerServing: string;
    totalIngredients: number;
    matchedIngredients: number;
    missingIngredients: string[];
    usesExpiringItems: boolean;
  };
  onViewRecipe: () => void;
}

export function RecipeCard({ recipe, onViewRecipe }: RecipeCardProps) {
  const matchPercentage = (recipe.matchedIngredients / recipe.totalIngredients) * 100;

  return (
    <div className="bg-card rounded-[14px] overflow-hidden shadow-sm hover:shadow-md transition-all border border-border">
      {/* Photo */}
      <div className="relative">
        <img
          src={recipe.photo}
          alt={recipe.name}
          className="w-full h-48 object-cover cursor-pointer"
          onClick={onViewRecipe}
        />
        {recipe.usesExpiringItems && (
          <div className="absolute top-2 right-2 bg-accent/90 text-accent-foreground px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Uses expiring items
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Recipe Name */}
        <h3 className="text-lg font-medium mb-3 cursor-pointer hover:text-primary transition-colors" onClick={onViewRecipe}>
          {recipe.name}
        </h3>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{recipe.costPerServing}/serving</span>
          </div>
        </div>

        {/* Ingredient Match */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium">
              You have {recipe.matchedIngredients}/{recipe.totalIngredients} ingredients
            </span>
            <span className={`font-medium ${matchPercentage === 100 ? 'text-secondary' : 'text-muted-foreground'}`}>
              {Math.round(matchPercentage)}%
            </span>
          </div>
          {/* Progress Bar */}
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${matchPercentage === 100 ? 'bg-secondary' : 'bg-primary'}`}
              style={{ width: `${matchPercentage}%` }}
            />
          </div>
        </div>

        {/* Missing Ingredients */}
        {recipe.missingIngredients.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">Missing:</p>
            <div className="flex flex-wrap gap-1">
              {recipe.missingIngredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* View Recipe Button */}
        <Button
          variant={matchPercentage === 100 ? 'primary' : 'outline'}
          size="sm"
          className="w-full"
          onClick={onViewRecipe}
        >
          View Recipe
        </Button>
      </div>
    </div>
  );
}
