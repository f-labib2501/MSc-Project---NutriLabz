import { useState } from 'react';
import { Search, ScanLine, User, ChevronDown, Book } from 'lucide-react';
import RecipeModal from './RecipeModal';

// food search interface
// filtering and categories interface
interface SearchPageProps {
  onScanClick: () => void;
  onProfileClick: () => void;
  onAddToDiary?: (foodName: string, calories: number) => void;
}

// food data with nutrition information

interface Food {
  name: string;
  serving: string;
  calories: number;
  category: string; 
  cuisine: string;
  halal: boolean;
  recipe?: {
    ingredients: string[];
    instructions: string[];
    prepTime: string;
    cookTime: string;
  };
}

// food database with information

const foods: Food[] = [
  { 
    name: 'Basmati Rice', 
    serving: '1 cup cooked', 
    calories: 210, 
    category: 'Grains', 
    cuisine: 'South Asian',
    halal: true,
    recipe: {
      ingredients: ['1 cup basmati rice', '2 cups water', '1 tsp salt', '1 tbsp ghee'],
      instructions: ['Rinse rice until water runs clear', 'Boil water with salt and ghee', 'Add rice and cook for 18-20 minutes', 'Let it rest for 5 minutes before serving'],
      prepTime: '5 min',
      cookTime: '25 min'
    }
  },
  { 
    name: 'Chapati', 
    serving: '1 medium', 
    calories: 104, 
    category: 'Grains', 
    cuisine: 'South Asian',
    halal: true,
    recipe: {
      ingredients: ['2 cups whole wheat flour', '3/4 cup water', '1/2 tsp salt', '1 tbsp oil'],
      instructions: ['Mix flour and salt', 'Add water gradually to form dough', 'Knead for 5 minutes', 'Roll into circles and cook on hot griddle'],
      prepTime: '15 min',
      cookTime: '20 min'
    }
  },
  { name: 'Naan', serving: '1 piece', calories: 262, category: 'Grains', cuisine: 'South Asian', halal: true },
  { 
    name: 'Brown Rice', 
    serving: '1 cup cooked', 
    calories: 216, 
    category: 'Grains', 
    cuisine: 'South Asian',
    halal: true,
    recipe: {
      ingredients: ['1 cup brown rice', '2.5 cups water', '1 tsp salt', '1 tbsp oil'],
      instructions: ['Rinse brown rice until water runs clear', 'Bring water to boil with salt and oil', 'Add rice and reduce heat to low', 'Cover and cook for 45-50 minutes', 'Let stand 10 minutes before fluffing'],
      prepTime: '5 min',
      cookTime: '55 min'
    }
  },
  { name: 'Quinoa', serving: '1 cup cooked', calories: 222, category: 'Grains', cuisine: 'Mediterranean', halal: true },
  
  { 
    name: 'Chicken Curry', 
    serving: '1 cup', 
    calories: 285, 
    category: 'Meat & Fish', 
    cuisine: 'South Asian',
    halal: true,
    recipe: {
      ingredients: ['500g chicken', '2 onions', '3 tomatoes', '2 tbsp curry powder', '1 cup coconut milk', 'Ginger-garlic paste'],
      instructions: ['Sauté onions until golden', 'Add ginger-garlic paste and spices', 'Add chicken and cook until sealed', 'Add tomatoes and coconut milk', 'Simmer for 25-30 minutes'],
      prepTime: '15 min',
      cookTime: '45 min'
    }
  },
  { 
    name: 'Jerk Chicken', 
    serving: '100g', 
    calories: 180, 
    category: 'Meat & Fish', 
    cuisine: 'Caribbean',
    halal: true,
    recipe: {
      ingredients: ['500g chicken', '2 tbsp jerk seasoning', '2 tbsp soy sauce', '1 tbsp brown sugar', '2 limes', 'Scotch bonnet pepper'],
      instructions: ['Mix all marinade ingredients', 'Marinate chicken for 2+ hours', 'Grill on medium-high heat', 'Cook 6-8 minutes per side', 'Rest for 5 minutes before serving'],
      prepTime: '10 min + 2h marinating',
      cookTime: '20 min'
    }
  },
  { name: 'Tandoori Chicken', serving: '100g', calories: 150, category: 'Meat & Fish', cuisine: 'South Asian', halal: true },
  { name: 'Sushi (Salmon)', serving: '6 pieces', calories: 250, category: 'Meat & Fish', cuisine: 'East Asian', halal: false },
  
  { name: 'Mango', serving: '1 cup sliced', calories: 107, category: 'Fruits', cuisine: 'South Asian', halal: true },
  { name: 'Banana', serving: '1 medium', calories: 105, category: 'Fruits', cuisine: 'South Asian', halal: true },
  { name: 'Papaya', serving: '1 cup cubed', calories: 55, category: 'Fruits', cuisine: 'South Asian', halal: true },
  { name: 'Apple', serving: '1 medium', calories: 95, category: 'Fruits', cuisine: 'Mediterranean', halal: true },
  { name: 'Plantain', serving: '1 medium', calories: 218, category: 'Fruits', cuisine: 'Caribbean', halal: true },
  
  { 
    name: 'Dal (Lentils)', 
    serving: '1 cup cooked', 
    calories: 230, 
    category: 'Vegetables', 
    cuisine: 'South Asian',
    halal: true,
    recipe: {
      ingredients: ['1 cup lentils (dal)', '3 cups water', '1 tsp turmeric', '1 tsp cumin seeds', '2 cloves garlic', '1 onion', '2 tomatoes', '2 tbsp oil'],
      instructions: ['Wash and boil lentils with turmeric until soft', 'Heat oil and add cumin seeds', 'Add garlic and onions, sauté until golden', 'Add tomatoes and cook until soft', 'Mix with cooked dal and simmer for 10 minutes'],
      prepTime: '10 min',
      cookTime: '30 min'
    }
  },
  { name: 'Palak (Spinach)', serving: '1 cup cooked', calories: 41, category: 'Vegetables', cuisine: 'South Asian', halal: true },
  { name: 'Aloo (Potato)', serving: '1 medium boiled', calories: 161, category: 'Vegetables', cuisine: 'South Asian', halal: true },
  { name: 'Greek Salad', serving: '1 cup', calories: 85, category: 'Vegetables', cuisine: 'Mediterranean', halal: true },
  { name: 'Hummus', serving: '2 tbsp', calories: 70, category: 'Vegetables', cuisine: 'Mediterranean', halal: true },
  { name: 'Black Beans', serving: '1/2 cup', calories: 115, category: 'Vegetables', cuisine: 'Latin American', halal: true }
];

export default function SearchPage({ onScanClick, onProfileClick, onAddToDiary }: SearchPageProps) {
  // search and filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusMessage, setStatusMessage] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Food | null>(null);
  const [halalOnly, setHalalOnly] = useState(false);

  // food categorisation for cultural prefrences
  const categories = ['All', 'South Asian', 'East Asian', 'Caribbean', 'Mediterranean', 'Latin American', 'Middle Eastern', 'Grains', 'Meat & Fish', 'Fruits', 'Vegetables'];

  // food diary
  const handleAddToDiary = (foodName: string, calories: number) => {
    setStatusMessage(`${foodName} added to diary!`);
    onAddToDiary?.(foodName, calories);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  // multi-criteria food filtering
  const getFilteredFoods = () => {
    let filteredFoods = foods;
    
    // halal dietary restriction filter
    if (halalOnly) {
      filteredFoods = filteredFoods.filter(food => food.halal);
    }
    
    if (selectedCategory === 'All') {
      return filteredFoods;
    }
    
    // cuisine based filtering 
    const cuisineCategories = ['South Asian', 'East Asian', 'Caribbean', 'Mediterranean', 'Latin American', 'Middle Eastern'];
    if (cuisineCategories.includes(selectedCategory)) {
      return filteredFoods.filter(food => food.cuisine === selectedCategory);
    }
    
    // food type category filtering
    return filteredFoods.filter(food => food.category === selectedCategory);
  };

  // search functionality with text matches
  const searchResults = searchQuery 
    ? foods.filter(food => food.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : getFilteredFoods();

  return (
    <>
      {/* recipe display*/}
      <RecipeModal 
        food={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        onAddToDiary={handleAddToDiary}
      />

      <div className="min-h-screen bg-gray-50 flex flex-col">
      
        <div className="bg-orange-500 text-white p-4 flex-shrink-0">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold">N</span>
              </div>
              <h1 className="text-2xl font-bold">NutriLabz</h1>
            </div>
            <button 
              onClick={onProfileClick}
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <User size={24} />
            </button>
          </div>

          <div className="flex justify-center">
            <span className="font-semibold">Today</span>
          </div>
        </div>

        {/* main content area*/}
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="p-4">

            {statusMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-green-700 font-medium">{statusMessage}</p>
              </div>
            )}

  
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search foods..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
              />
            </div>

        
            <div className="flex gap-3 mb-6">
              <button
                onClick={onScanClick}
                className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-3 rounded-2xl font-medium border border-blue-200"
              >
                <ScanLine size={20} />
                Scan
              </button>
              <button
                onClick={() => setHalalOnly(!halalOnly)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-medium border transition-colors ${
                  halalOnly 
                    ? 'bg-green-500 text-white border-green-500' 
                    : 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100'
                }`}
              >
                Halal
              </button>
            </div>

  
            {!searchQuery && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Explore Food Categories</h4>
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-700">{selectedCategory}</span>
                    <ChevronDown size={20} className={`text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setShowDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                            selectedCategory === category ? 'bg-orange-50 text-orange-600 font-medium' : 'text-gray-700'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* food search results*/}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {searchQuery ? `Search Results (${searchResults.length})` : selectedCategory}
              </h3>
              
              {searchResults.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">🔍</div>
                  <p className="text-gray-600">
                    No foods found in {selectedCategory}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {searchResults.map((food, index) => (
                    <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                      {/* halal status indicator */}
                      {!food.halal && (
                        <div className="mb-2 px-2 py-1 bg-yellow-100 border border-yellow-200 rounded-lg">
                          <span className="text-yellow-700 text-sm font-medium">⚠️ Not Halal</span>
                        </div>
                      )}
                      
                      {/* food information display with nutrition information */}
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 text-lg">{food.name}</h4>
                          <p className="text-gray-600 text-sm">{food.serving}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-800">{food.calories}</div>
                          <div className="text-gray-600 text-sm">cal</div>
                        </div>
                      </div>
                      
        
                      <div className="flex gap-2 mt-3">
                        <button 
                          onClick={() => handleAddToDiary(food.name, food.calories)}
                          className="flex-1 bg-orange-500 text-white py-2 rounded-xl font-medium hover:bg-orange-600 transition-colors"
                        >
                          Add to Diary
                        </button>
                        {food.recipe && (
                          <button 
                            onClick={() => setSelectedRecipe(food)}
                            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors flex items-center gap-1"
                          >
                            <Book size={16} />
                            Recipe
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}