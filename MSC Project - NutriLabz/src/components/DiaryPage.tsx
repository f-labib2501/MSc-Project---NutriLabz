import { User } from 'lucide-react';
import { useState, useEffect } from 'react';
import WearableDevices from './WearableDevices';
import HealthMetrics from './HealthMetrics';
import CalorieCircle from './CalorieCircle';
import FoodLog from './FoodLog';

interface DiaryPageProps {
  onProfileClick: () => void;
  totalCalories?: number;
  addedFoods?: Array<{name: string, calories: number}>;
  caloriesBurned?: number; 
  steps?: number;
  heartRate?: number;
  glucoseLevel?: number;
}

export default function DiaryPage({ 

  onProfileClick,
  // default values for props
  totalCalories = 0, 
  addedFoods = [],
  caloriesBurned = 485,
  steps = 9247,
  heartRate = 78,
  glucoseLevel = 142
}: DiaryPageProps) {

  const [calories, setCalories] = useState(totalCalories);
  const [carbs, setCarbs] = useState(20);
  const [protein, setProtein] = useState(9);
  const [fat, setFat] = useState(0.4);
  
  // Health metrics state
  const [currentGlucose, setCurrentGlucose] = useState(glucoseLevel);
  // health monitor variables
  // simulate data from wearables and sensors
  const [currentHeartRate, setCurrentHeartRate] = useState(heartRate);
  const [currentSteps, setCurrentSteps] = useState(steps);
  const [currentCaloriesBurned, setCurrentCaloriesBurned] = useState(caloriesBurned);

  // glucose level changes
  const handleGlucoseChange = (newGlucose: number) => {
    setCurrentGlucose(newGlucose);
  };

  // update calories when the prop changes

  useEffect(() => {
    setCalories(totalCalories);
  }, [totalCalories]);

  // change health metrics when prop changes
  useEffect(() => {
    setCurrentGlucose(glucoseLevel);
    setCurrentHeartRate(heartRate);
    setCurrentSteps(steps);
    setCurrentCaloriesBurned(caloriesBurned);
  }, [glucoseLevel, heartRate, steps, caloriesBurned]);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentHeartRate(prev => {
        const variation = Math.floor(Math.random() * 6) - 3;
        return Math.max(65, Math.min(prev + variation, 100));
      });
      
      // steps increases gradually
      setCurrentSteps(prev => prev + Math.floor(Math.random() * 5));
      

      setCurrentGlucose(prev => {
        const variation = Math.floor(Math.random() * 4) - 2;
        return Math.max(80, Math.min(prev + variation, 180));
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);


  const netCalories = calories - currentCaloriesBurned;
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-orange-500 text-white p-4 rounded-b-3xl flex-shrink-0">
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

        <div className="flex justify-center mb-6">
          <span className="font-semibold">Today</span>
        </div>


        <h2 className="text-2xl font-bold mb-6">Welcome!</h2>


        <CalorieCircle 
          calories={calories}
          netCalories={netCalories}
          carbs={carbs}
          protein={protein}
          fat={fat}
        />
      </div>


      <div className="flex-1 overflow-y-auto pb-20">
        <div className="p-4">
       
          <HealthMetrics 
            heartRate={currentHeartRate}
            steps={currentSteps}
            caloriesBurned={currentCaloriesBurned}
            glucoseLevel={currentGlucose}
            onGlucoseChange={handleGlucoseChange}
          />

          <WearableDevices />


          <FoodLog addedFoods={addedFoods} />
        </div>
      </div>
    </div>
  );
}