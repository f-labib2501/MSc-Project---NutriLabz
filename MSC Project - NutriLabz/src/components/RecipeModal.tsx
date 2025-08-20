import { X, Book } from 'lucide-react';

interface Recipe {
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime?: string;
  servings?: string;
}

interface Food {
  name: string;
  calories: number;
  recipe?: Recipe;
}

interface RecipeModalProps {
  food: Food | null;
  onClose: () => void; 
  onAddToDiary: (foodName: string, calories: number) => void;
}

export default function RecipeModal({ food, onClose, onAddToDiary }: RecipeModalProps) {
  if (!food || !food.recipe) return null;

  const handleAddToDiary = () => {
    onAddToDiary(food.name, food.calories);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-orange-500 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{food.name} Recipe</h1>
          <button 
            onClick={onClose}
            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Recipe Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-4 pb-20">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{food.name}</h2>
              <div className="flex gap-4 text-sm text-gray-600 mb-4">
                <span>Prep: {food.recipe.prepTime}</span>
                {food.recipe.cookTime && <span>Cook: {food.recipe.cookTime}</span>}
                <span>Serves: {food.recipe.servings || '4'}</span>
              </div>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-orange-500">{food.calories}</span>
                <span className="text-gray-600 ml-2">calories per serving</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Ingredients</h3>
              <ul className="space-y-2">
                {food.recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Instructions</h3>
              <ol className="space-y-3">
                {food.recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToDiary}
                className="flex-1 bg-orange-500 text-white py-3 rounded-2xl font-semibold hover:bg-orange-600 transition-colors"
              >
                Add to Diary
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}