import { useState } from 'react';
import { User, Clock, ChevronDown, Book, X } from 'lucide-react';

interface MealPlansPageProps {
  onProfileClick: () => void;
  userHasDiabetes?: boolean;
  diabetesType?: string;
  onMealPlanStart?: (planName: string, dailyCalories: number) => void; 
}

interface MealPlan {
  id: string; 
  title: string; 
  description: string;
  image: string;
  calories: number;
  duration: string;
  difficulty: string;
  diabeticFriendly?: boolean;
  category: string;
  cuisine: string;
  foods: string[];
  halal: boolean;
  recipe?: {
    ingredients: string[];
    instructions: string[];
    prepTime: string;
    servings: string;
  };
}

export default function MealPlansPage({ onProfileClick, userHasDiabetes = false, diabetesType = 'Type 2', onMealPlanStart }: MealPlansPageProps) {
  const [activePlans, setActivePlans] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Normal');
  const [selectedCuisine, setSelectedCuisine] = useState('South Asian');
  const [showRecipe, setShowRecipe] = useState<MealPlan | null>(null);
  const [halalOnly, setHalalOnly] = useState(false);

  const cuisines = ['South Asian', 'East Asian', 'Caribbean', 'Mediterranean', 'Latin American', 'Middle Eastern'];

  const mealPlans: MealPlan[] = [
    {
      id: '1', title: 'South Asian Weight Loss', description: 'Traditional recipes with portion control.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      calories: 1400, duration: '7 days', difficulty: 'Easy', diabeticFriendly: false, category: 'Weight Loss', cuisine: 'South Asian', halal: true,
      foods: ['Dal', 'Grilled Chicken', 'Brown Rice', 'Vegetables', 'Chapati', 'Yogurt']
    },
    {
      id: '2', title: 'Desi Muscle Building', description: 'High-protein South Asian meals.',
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      calories: 2100, duration: '14 days', difficulty: 'Medium', diabeticFriendly: false, category: 'Weight Gain', cuisine: 'South Asian', halal: true,
      foods: ['Chicken Tikka', 'Paneer Curry', 'Basmati Rice', 'Dal Makhani', 'Almonds']
    },
    {
      id: '3', title: 'Diabetic-Friendly Desi', description: 'Low-glycemic South Asian meals.',
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      calories: 1600, duration: '10 days', difficulty: 'Easy', diabeticFriendly: true, category: 'Normal', cuisine: 'South Asian', halal: true,
      foods: ['Brown Rice', 'Spinach', 'Grilled Fish', 'Cauliflower', 'Green Beans']
    },
    {
      id: '4', title: 'Pure Vegetarian', description: 'Complete vegetarian nutrition.',
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      calories: 1800, duration: '7 days', difficulty: 'Simple', diabeticFriendly: false, category: 'Normal', cuisine: 'South Asian', halal: true,
      foods: ['Kidney Beans', 'Paneer', 'Quinoa', 'Mixed Dal', 'Vegetables']
    },
    {
      id: '5', title: 'Low Carb Desi', description: 'Reduced carbohydrate meals.',
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      calories: 1700, duration: '14 days', difficulty: 'Medium', diabeticFriendly: true, category: 'Weight Loss', cuisine: 'South Asian', halal: true,
      foods: ['Tandoori Chicken', 'Cauliflower Rice', 'Egg Curry', 'Salad', 'Paneer']
    },
    {
      id: '6', title: 'Japanese Wellness', description: 'Traditional Japanese meals.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      calories: 1500, duration: '7 days', difficulty: 'Simple', diabeticFriendly: true, category: 'Normal', cuisine: 'East Asian', halal: false,
      foods: ['Sushi', 'Miso Soup', 'Vegetables', 'Green Tea', 'Salmon', 'Brown Rice']
    },
    {
      id: '7', title: 'Caribbean Spice', description: 'Flavorful Caribbean dishes.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      calories: 1600, duration: '7 days', difficulty: 'Easy', diabeticFriendly: false, category: 'Normal', cuisine: 'Caribbean', halal: true,
      foods: ['Jerk Chicken', 'Rice and Peas', 'Plantain', 'Callaloo', 'Mango']
    },
    {
      id: '8', title: 'Mediterranean Diet', description: 'Heart-healthy Mediterranean meals.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      calories: 1700, duration: '14 days', difficulty: 'Easy', diabeticFriendly: true, category: 'Normal', cuisine: 'Mediterranean', halal: true,
      foods: ['Grilled Fish', 'Olive Oil', 'Greek Salad', 'Hummus', 'Quinoa']
    }
  ];

  const getFilteredPlans = () => {
    let plans = mealPlans.filter(plan => plan.category === selectedCategory && plan.cuisine === selectedCuisine);
    if (halalOnly) plans = plans.filter(plan => plan.halal);
    if (userHasDiabetes) {
      const diabeticPlans = plans.filter(plan => plan.diabeticFriendly);
      const otherPlans = plans.filter(plan => !plan.diabeticFriendly);
      return [...diabeticPlans, ...otherPlans];
    }
    return plans;
  };

  const filteredPlans = getFilteredPlans();

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === 'Easy' || difficulty === 'Simple') return 'bg-green-100 text-green-700';
    if (difficulty === 'Medium') return 'bg-yellow-100 text-yellow-700';
    return 'bg-blue-100 text-blue-700';
  };

  const handleStartPlan = (planId: string) => {
    const plan = mealPlans.find(p => p.id === planId);
    if (plan) onMealPlanStart && onMealPlanStart(plan.title, plan.calories);
    setActivePlans([...activePlans, planId]);
    setStatusMessage(`${plan?.title} started!`);
    setTimeout(() => setStatusMessage(''), 5000);
  };

  return (
    <>
      {showRecipe && (
        <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
          <div className="bg-orange-500 text-white p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{showRecipe.title} Recipe</h1>
              <button onClick={() => setShowRecipe(null)} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                <X size={24} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <div className="p-4 pb-20">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{showRecipe.title}</h2>
                  <div className="flex gap-4 text-sm text-gray-600 mb-4">
                    <span>Duration: {showRecipe.duration}</span>
                  </div>
                  <div className="text-center mb-4">
                    <span className="text-3xl font-bold text-orange-500">{showRecipe.calories}</span>
                    <span className="text-gray-600 ml-2">calories per day</span>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Foods Included</h3>
                  <div className="flex flex-wrap gap-2">
                    {showRecipe.foods.map((food, index) => (
                      <span key={index} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">{food}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => { handleStartPlan(showRecipe.id); setShowRecipe(null); }} className="flex-1 bg-orange-500 text-white py-3 rounded-2xl font-semibold hover:bg-orange-600 transition-colors">
                    Start Plan
                  </button>
                  <button onClick={() => setShowRecipe(null)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-300 transition-colors">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-orange-500 text-white p-4 flex-shrink-0">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold">N</span>
              </div>
              <h1 className="text-2xl font-bold">NutriLabz</h1>
            </div>
            <button onClick={onProfileClick} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <User size={24} />
            </button>
          </div>
          <div className="flex justify-center">
            <span className="font-semibold">Today</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-20">
          <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Meal Plans</h2>

            {statusMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-green-700 font-medium">{statusMessage}</p>
              </div>
            )}

            {userHasDiabetes && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-blue-800">Recommended for {diabetesType} Diabetes</h3>
                </div>
                <p className="text-blue-700 text-sm">Meals with heart icons are specially selected for diabetes management.</p>
              </div>
            )}

            <div className="flex gap-3 mb-6 flex-wrap">
              {['Normal', 'Weight Loss', 'Weight Gain'].map((category) => (
                <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-full font-medium transition-colors ${selectedCategory === category ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {category}
                </button>
              ))}
              <button onClick={() => setHalalOnly(!halalOnly)} className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${halalOnly ? 'bg-green-500 text-white' : 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200'}`}>
                Halal
              </button>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Explore Different Cuisines</h4>
              <div className="flex gap-2 overflow-x-auto">
                {cuisines.map((cuisine) => (
                  <button key={cuisine} onClick={() => setSelectedCuisine(cuisine)} className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${selectedCuisine === cuisine ? 'bg-green-500 text-white' : 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200'}`}>
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredPlans.map((plan) => (
                <div key={plan.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
                  {!plan.halal && (
                    <div className="bg-yellow-100 px-4 py-2 text-center border-b border-yellow-200">
                      <span className="text-yellow-700 font-medium">Not Halal</span>
                    </div>
                  )}
                  {userHasDiabetes && plan.diabeticFriendly && (
                    <div className="bg-blue-100 px-4 py-2 text-center">
                      <span className="text-blue-700 font-medium">Diabetes-Friendly</span>
                    </div>
                  )}
                  <img src={plan.image} alt={plan.title} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{plan.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{plan.description}</p>
                    <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                      <p className="text-sm font-medium text-gray-700 mb-2">Includes:</p>
                      <div className="flex flex-wrap gap-1">
                        {plan.foods.map((food, index) => (
                          <span key={index} className="text-xs bg-white px-2 py-1 rounded-full text-gray-600 border">{food}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{plan.duration}</span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(plan.difficulty)}`}>
                        {plan.difficulty}
                      </div>
                    </div>
                    <div className="text-center mb-3">
                      <div className="font-bold text-orange-500 text-lg">{plan.calories}</div>
                      <div className="text-gray-600 text-xs">calories per day</div>
                    </div>
                    <button onClick={() => handleStartPlan(plan.id)} className={`w-full py-3 rounded-2xl font-semibold transition-colors ${activePlans.includes(plan.id) ? 'bg-green-500 text-white' : 'bg-orange-500 text-white hover:bg-orange-600'}`}>
                      {activePlans.includes(plan.id) ? 'Plan Active' : 'Start Plan'}
                    </button>
                    <button onClick={() => setShowRecipe(plan)} className="w-full mt-2 py-2 bg-blue-50 text-blue-600 rounded-2xl font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                      <Book size={16} />View Recipe
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredPlans.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-bold text-gray-800 mb-2">No plans found</h3>
                <p className="text-gray-600">Try different cuisine or category filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}