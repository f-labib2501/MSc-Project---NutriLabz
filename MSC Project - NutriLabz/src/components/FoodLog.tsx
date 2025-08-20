// Food diary component displaying daily nutritional intake
// Implements chronological food tracking with calorie summation
// Conditional rendering prevents empty state display issues
interface FoodItem {
  name: string; 
  calories: number;
}

interface FoodLogProps {
  addedFoods: FoodItem[];
}

export default function FoodLog({ addedFoods }: FoodLogProps) {


  if (addedFoods.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Today's Food Log</h3>
      <div className="space-y-2">
        {addedFoods.map((food, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
            <span className="text-gray-700">{food.name}</span>
            <span className="text-orange-500 font-semibold">{food.calories} cal</span>
          </div>
        ))}
      </div>
    </div>
  );
}