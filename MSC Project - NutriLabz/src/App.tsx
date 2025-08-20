import React, { useState, useEffect } from 'react';

// import from all the components 
import LoadingScreen from './components/LoadingScreen';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import BottomNavigation from './components/BottomNavigation';
import DiaryPage from './components/DiaryPage';
import SearchPage from './components/SearchPage';
import FoodScanner from './components/FoodScanner';
import MealPlansPage from './components/MealPlansPage';
import FitnessPage from './components/FitnessPage';
import ProfilePage from './components/ProfilePage';

// app state types
type AppState = 'loading' | 'login' | 'signup' | 'main';

function App() {
  // central state management for the entire application
  // main app state
  const [appState, setAppState] = useState<AppState>('loading');
  const [activeTab, setActiveTab] = useState('diary');
  
  // ui state for the overlays
  const [showScanner, setShowScanner] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  // user health settings
  const [userHasDiabetes, setUserHasDiabetes] = useState(false);
  const [diabetesType, setDiabetesType] = useState('Type 2');
  
  // nutrition tracking
  const [totalCalories, setTotalCalories] = useState(0);
  // array to store all the foods that has been logged
  const [addedFoods, setAddedFoods] = useState<Array<{name: string, calories: number}>>([]);
  
  // tracking fitness
  const [caloriesBurned, setCaloriesBurned] = useState(485); // simulated starting value
  const [activeWorkouts, setActiveWorkouts] = useState<string[]>([]);
  const [activeMealPlans, setActiveMealPlans] = useState<string[]>([]);
  
  // simulated health metrics
  const [steps, setSteps] = useState(9247); 
  const [heartRate, setHeartRate] = useState(78);
  const [glucoseLevel, setGlucoseLevel] = useState(142);
  const [workoutProgress, setWorkoutProgress] = useState<{[key: string]: number}>({});

  // navigation handlers
  const handleLoadComplete = () => {
    setAppState('login');
  };

  const handleLogin = () => {
    setAppState('main');
  };

  const handleSignup = () => {
    setAppState('main');
  };

  const handleSwitchToSignup = () => {
    setAppState('signup');
  };

  const handleSwitchToLogin = () => {
    setAppState('login');
  };

  // tab navigation bar
  const handleTabChange = (tab: string) => {
    // handling for the camera scanner - to open as overlay instead of another tab
    if (tab === 'scan') {
      setShowScanner(true);
    } else {
      setActiveTab(tab);
      setShowScanner(false);
      setShowProfile(false);
    }
  };

  // scanner functions
  const handleScanClick = () => {
    setShowScanner(true);
  };

  // food tracking functions
  const handleAddToDiary = (foodName: string, calories: number) => {
    // update the food log and the total calories
    setTotalCalories(prev => prev + calories);
    setAddedFoods(prev => [...prev, { name: foodName, calories }]);
    // simulate glucose response to food intake 
    setGlucoseLevel(prev => Math.min(prev + Math.floor(calories / 20), 180));
  };

  const handleFoodDetected = (detection: { name: string; calories: number; confidence: number }) => {
    // handle ML detection results from the camera scanning
    setTotalCalories(prev => prev + detection.calories);
    setAddedFoods(prev => [...prev, { name: detection.name, calories: detection.calories }]);
    setGlucoseLevel(prev => Math.min(prev + Math.floor(detection.calories / 20) || 0, 180));
  };

  // workout tracking functionality
  const handleWorkoutComplete = (workoutName: string, caloriesBurnedAmount: number) => {
    // update all the health metrics when workout is completed
    setCaloriesBurned(prev => prev + caloriesBurnedAmount);
    // estimate steps based on calories  burned i.e. 15 steps per calories 
    setSteps(prev => prev + Math.floor(caloriesBurnedAmount * 15));
    // simulate any heart rate increase from the workout
    setHeartRate(prev => Math.min(prev + 10, 120));
    // workout theoretically should lower blood glucose
    setGlucoseLevel(prev => Math.max(prev - 5, 80));
    
    setWorkoutProgress(prev => {
      const updated = { ...prev };
      delete updated[workoutName];
      return updated;
    });
  };

  const handleWorkoutProgress = (workoutName: string, progress: number, caloriesPerWorkout: number) => {
    // track the progress and update the calories incrementally
    setWorkoutProgress(prev => {
      const currentProgress = prev || {};
      const newProgress = {...currentProgress, [workoutName]: progress};

      // ensure to update only when 10% milestone is crossed, to avoid duplication
      const progressStep = Math.floor(progress / 10) * 10;
      const previousProgressStep = Math.floor((currentProgress[workoutName] || 0) / 10) * 10;
      
      if (progressStep > previousProgressStep && progressStep > 0) {
        const caloriesPerStep = caloriesPerWorkout / 10;
        setCaloriesBurned(prevBurned => prevBurned + caloriesPerStep);
        setSteps(prevSteps => prevSteps + Math.floor(caloriesPerStep * 15));
      }
      
      return newProgress;
    });
  };

  // meal plan functionality
  const handleMealPlanStart = (planName: string, dailyCalories: number) => {
    // start the meal plan and simulate any health benefits
    setActiveMealPlans(prev => [...prev, planName]);
    // healthy meal plan will reduce the glucose level on the app
    setGlucoseLevel(prev => Math.max(prev - 10, 90));
  };

  // profile functions
  const handleProfileClick = () => {
    setShowProfile(true);
  };

  const handleBackFromProfile = () => {
    setShowProfile(false);
  };
  // render a different screen based on the app state
  if (appState === 'loading') {
    return <LoadingScreen onLoadComplete={handleLoadComplete} />;
  }

  if (appState === 'login') {
    return (
      <LoginPage 
        onLogin={handleLogin}
        onSwitchToSignup={handleSwitchToSignup}
      />
    );
  }

  if (appState === 'signup') {
    return (
      <SignupPage 
        onSignup={handleSignup}
        onSwitchToLogin={handleSwitchToLogin}
      />
    );
  }

  // main app 
  const renderCurrentPage = () => {
    // full-screen overlay over the tab navigation
    if (showScanner) {
      return <FoodScanner onClose={() => setShowScanner(false)} onFoodDetected={handleFoodDetected} />;
    }

    if (showProfile) {
      return <ProfilePage onBack={handleBackFromProfile} onDiabetesChange={setUserHasDiabetes} onDiabetesTypeChange={setDiabetesType} />;
    }

    switch (activeTab) {
      case 'diary':
        return <DiaryPage 
          onProfileClick={handleProfileClick} 
          totalCalories={totalCalories} 
          addedFoods={addedFoods}
          caloriesBurned={caloriesBurned}
          steps={steps}
          heartRate={heartRate}
          glucoseLevel={glucoseLevel}
        />;
      case 'search':
        return <SearchPage onScanClick={handleScanClick} onProfileClick={handleProfileClick} onAddToDiary={handleAddToDiary} />;
      case 'meals':
        return <MealPlansPage 
          onProfileClick={handleProfileClick} 
          userHasDiabetes={userHasDiabetes} 
          diabetesType={diabetesType}
          onMealPlanStart={handleMealPlanStart}
        />;
      case 'fitness':
        return <FitnessPage 
          onProfileClick={handleProfileClick}
          onWorkoutComplete={handleWorkoutComplete}
          onWorkoutProgress={handleWorkoutProgress}
        />;
      default:
        return <DiaryPage 
          onProfileClick={handleProfileClick} 
          totalCalories={totalCalories} 
          addedFoods={addedFoods}
          caloriesBurned={caloriesBurned}
          steps={steps}
          heartRate={heartRate}
          glucoseLevel={glucoseLevel}
        />;
    }
  };

  // layout of the main app
  return (
    <div className="min-h-screen bg-gray-50 w-full relative app-zoom">
      {/* mobile optimised zoom */}
      {renderCurrentPage()}
      
      {/* hide bottom navigation while at full screen */}
      {!showScanner && !showProfile && (
        <BottomNavigation 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}
    </div>
  );
}

export default App;