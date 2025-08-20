import React, { useState } from 'react';
import { User, Plus, Clock, Flame, Play, X } from 'lucide-react';


interface FitnessPageProps {
  onProfileClick?: () => void;
  onWorkoutComplete?: (workoutName: string, caloriesBurned: number) => void;
  onWorkoutProgress?: (workoutName: string, progress: number, caloriesPerWorkout: number) => void;
}


interface CustomWorkout {
  id: string;

  name: string;
  exercises: string[];
  duration: number;
  calories: number;
}

export default function FitnessPage({ onProfileClick, onWorkoutComplete, onWorkoutProgress }: FitnessPageProps) {

  const [activeWorkout, setActiveWorkout] = useState<number | null>(null);
  const [workoutProgress, setWorkoutProgress] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [workoutCompleted, setWorkoutCompleted] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [customWorkouts, setCustomWorkouts] = useState<CustomWorkout[]>([]);


  const workoutPlans = [
    {
      id: 1,
      title: 'Morning Cardio',
      image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      duration: '20 min',
      calories: '200 cal',
      description: 'Start your day with energizing cardio exercises to boost metabolism.',
      exercises: ['Jumping Jacks', 'High Knees', 'Butt Kicks', 'Mountain Climbers', 'Burpees']
    },
    {
      id: 2,
      title: 'Strength Training',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      duration: '30 min',
      calories: '300 cal',
      description: 'Build muscle strength with bodyweight exercises.',
      exercises: ['Push-ups', 'Squats', 'Lunges', 'Planks', 'Pull-ups', 'Dips']
    },
    {
      id: 3,
      title: 'HIIT Workout',
      image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      duration: '15 min',
      calories: '250 cal',
      description: 'High-intensity interval training for maximum calorie burn.',
      exercises: ['Burpees', 'Jump Squats', 'High Knees', 'Push-ups', 'Mountain Climbers']
    }
  ];

  const availableExercises = [
    'Jumping Jacks', 'High Knees', 'Crunches', 'Leg Raises', 
    'Pull-ups', 'Dips', 'Push-ups', 'Squats', 'Lunges', 'Planks'
  ];

  // combined workout list 
  const allWorkouts = [
    ...workoutPlans.map(plan => ({ ...plan, isCustom: false })),
    ...customWorkouts.map(workout => ({
      id: parseInt(workout.id),
      title: workout.name,
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      duration: `${workout.duration} min`,
      calories: `${workout.calories} cal`,
      isCustom: true,
      exercises: workout.exercises
    }))
  ];

  const handleStartWorkout = (workoutId: number) => {
    setActiveWorkout(workoutId);
    setWorkoutProgress(0);
    setCurrentExerciseIndex(0);
    setWorkoutCompleted(null);
    setStatusMessage('');
    
    const workout = allWorkouts.find(w => w.id === workoutId);
    
    const interval = setInterval(() => {
      setWorkoutProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setActiveWorkout(null);
          setWorkoutCompleted(workoutId);
          setStatusMessage(`🎉 Great job! You completed ${workout?.title}!`);
          
          setTimeout(() => {
            setWorkoutCompleted(null);
            setStatusMessage('');
          }, 5000);
          
          if (workout && onWorkoutComplete) {
            const calories = parseInt(workout.calories.replace(' cal', ''));
            onWorkoutComplete(workout.title, calories);
          }
          
          return 100;
        }
        
        if (workout?.exercises) {
          const newExerciseIndex = Math.floor((prev / 100) * workout.exercises.length);
          setCurrentExerciseIndex(Math.min(newExerciseIndex, workout.exercises.length - 1));
        }
        
        if (workout && onWorkoutProgress) {
          const calories = parseInt(workout.calories.replace(' cal', ''));
          onWorkoutProgress(workout.title, prev + 2, calories);
        }
        
        return prev + 2;
      });
    }, 800);
  };

  const handleStopWorkout = () => {
    setActiveWorkout(null);
    setWorkoutProgress(0);
    setCurrentExerciseIndex(0);
    setStatusMessage('Workout stopped. You can restart anytime!');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleExerciseToggle = (exercise: string) => {
    setSelectedExercises(prev => 
      prev.includes(exercise) 
        ? prev.filter(e => e !== exercise)
        : [...prev, exercise]
    );
  };

  const handleCreatePlan = () => {
    if (selectedExercises.length > 0) {
      const newWorkout: CustomWorkout = {
        id: `custom-${Date.now()}`,
        name: `Custom Plan ${customWorkouts.length + 1}`,
        exercises: selectedExercises,
        duration: selectedExercises.length * 5,
        calories: selectedExercises.length * 50
      };
      
      setCustomWorkouts(prev => [...prev, newWorkout]);
      setSelectedExercises([]);
      setShowCreatePlan(false);
    }
  };

  // custom workout creation interface
  if (showCreatePlan) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-orange-500 text-white p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Create Workout Plan</h1>
            <button 
              onClick={() => setShowCreatePlan(false)}
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* exercise selection */}
        <div className="flex-1 overflow-y-auto p-4 pb-20">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Select Exercises</h3>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            {availableExercises.map((exercise) => (
              <button
                key={exercise}
                onClick={() => handleExerciseToggle(exercise)}
                className={`p-4 rounded-2xl font-medium transition-colors ${
                  selectedExercises.includes(exercise)
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {exercise}
              </button>
            ))}
          </div>

          {/* workout with metrics */}
          {selectedExercises.length > 0 && (
            <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
              <h4 className="text-lg font-bold text-gray-800 mb-4">Plan Preview</h4>
              <p className="text-gray-600 mb-2">Duration: {selectedExercises.length * 5} minutes</p>
              <p className="text-gray-600 mb-2">Estimated Calories: {selectedExercises.length * 50}</p>
              <p className="text-gray-600 mb-4">Exercises: {selectedExercises.length}</p>
              <p className="text-sm text-gray-500">
                <strong>Selected exercises:</strong> {selectedExercises.join(', ')}
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setShowCreatePlan(false)}
              className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleCreatePlan}
              disabled={selectedExercises.length === 0}
              className="flex-1 bg-orange-500 text-white py-4 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Plan
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
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

      <div className="flex-1 overflow-y-auto pb-20">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Fitness</h2>

          {/* status messaging for user feedback*/}
          {statusMessage && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-2xl">
              <p className="text-green-700 font-medium text-center">{statusMessage}</p>
            </div>
          )}

          {/* custom workout interface */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Create Custom Plan</h3>
                <p className="text-sm text-gray-600">
                  {customWorkouts.length > 0 ? `${customWorkouts.length} custom plans created` : 'Design your own workout'}
                </p>
              </div>
              <button 
                onClick={() => setShowCreatePlan(true)}
                className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <Plus size={24} className="text-white" />
              </button>
            </div>
          </div>

          {/* Workout cards display */}
          <div className="space-y-4">
            {allWorkouts.map((workout) => (
              <div key={workout.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
                <img 
                  src={workout.image}
                  alt={workout.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{workout.title}</h4>
                  
                  <p className="text-gray-600 text-sm mb-3">{workout.description || 'Custom workout plan'}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{workout.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame size={16} />
                      <span>{workout.calories}</span>
                    </div>
                  </div>

                  {workout.exercises && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">
                        {workout.isCustom ? 'Your Exercises:' : 'Includes:'}
                      </p>
                      <p className="text-sm font-medium text-gray-800">
                        {workout.exercises.join(', ')}
                      </p>
                    </div>
                  )}

                  {activeWorkout === workout.id ? (
                    <div className="space-y-3">
                      {/* Active workout progress display */}
                      <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-orange-700 font-semibold">Now Doing:</span>
                          <span className="text-orange-600 text-sm font-medium">{Math.round(workoutProgress)}%</span>
                        </div>
                        <p className="text-orange-800 font-bold text-lg">
                          {workout.exercises?.[currentExerciseIndex] || 'Getting Ready...'}
                        </p>
                        <p className="text-orange-600 text-sm mt-1">
                          Exercise {currentExerciseIndex + 1} of {workout.exercises?.length || 0}
                        </p>
                      </div>
                      
                      {/* Progress visualization */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${workoutProgress}%` }}
                        ></div>
                      </div>
                      
                      <button 
                        onClick={handleStopWorkout}
                        className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <X size={20} />
                        Stop Workout
                      </button>
                    </div>
                  ) : workoutCompleted === workout.id ? (
                    <div className="space-y-3">
                      {/* Completion celebration interface */}
                      <div className="bg-green-50 rounded-xl p-4 border border-green-200 text-center">
                        <div className="text-4xl mb-2">🎉</div>
                        <p className="text-green-700 font-bold text-lg">Workout Completed!</p>
                        <p className="text-green-600 text-sm">Great job finishing {workout.title}</p>
                      </div>
                      <button 
                        onClick={() => handleStartWorkout(workout.id)}
                        className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <Play size={20} />
                        Do Again
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleStartWorkout(workout.id)}
                      className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Play size={20} />
                      Start Workout
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}