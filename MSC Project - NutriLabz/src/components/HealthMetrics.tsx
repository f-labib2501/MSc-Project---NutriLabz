import { useState, useEffect } from 'react';

interface HealthMetricsProps {
  heartRate: number;
  steps: number;
  caloriesBurned: number;
  glucoseLevel: number;
  onGlucoseChange: (glucose: number) => void;
}

export default function HealthMetrics({ 
  heartRate, 
  steps, 
  caloriesBurned, 
  glucoseLevel,
  onGlucoseChange 
}: HealthMetricsProps) {
  const [currentGlucose, setCurrentGlucose] = useState(glucoseLevel);

  // sync local glucose state
  useEffect(() => {
    setCurrentGlucose(glucoseLevel);
  }, [glucoseLevel]);

  const getGlucoseStatus = (glucose: number) => {
    // ADA guidelines: Normal <100, Elevated 100-140, High >140 mg/dL
    if (glucose < 100) return { status: 'Normal', color: 'text-green-500' };
    if (glucose < 140) return { status: 'Elevated', color: 'text-yellow-500' };
    return { status: 'High', color: 'text-red-500' };
  };

  const glucoseStatus = getGlucoseStatus(currentGlucose);
  
  // update both local and parent state when glucose changes
  const handleGlucoseUpdate = (newGlucose: number) => {
    setCurrentGlucose(newGlucose);
    onGlucoseChange(newGlucose);
  };

  return (
    <div className="mb-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Health Metrics</h3>

      <div className="grid grid-cols-2 gap-3 mb-6">

        <div className="bg-red-50 rounded-2xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Heart Rate</span>
          </div>
          <div className="text-2xl font-bold text-red-500">{heartRate}</div>
          <div className="text-gray-600 text-xs">bpm</div>
          <div className="text-xs text-gray-500">
            {heartRate > 85 ? 'Active' : 'Resting'}
          </div>
        </div>

        {/* steps card with goal progress */}
        <div className="bg-blue-50 rounded-2xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Steps</span>
          </div>
          <div className="text-2xl font-bold text-blue-500">{steps.toLocaleString()}</div>
          <div className="text-xs text-gray-500">
            {Math.floor((steps / 10000) * 100)}% of goal
          </div>
        </div>

        {/* calories burned card */}
        <div className="bg-orange-50 rounded-2xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Burned</span>
          </div>
          <div className="text-2xl font-bold text-orange-500">{caloriesBurned}</div>
          <div className="text-gray-600 text-xs">calories</div>
          <div className="text-xs text-gray-500">Today</div>
        </div>

        {/* glucose card */}
        <div className="bg-purple-50 rounded-2xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Glucose</span>
          </div>
          <div className={`text-2xl font-bold ${glucoseStatus.color}`}>{currentGlucose}</div>
          <div className="text-gray-600 text-xs">mg/dL</div>
          <div className={`text-xs ${glucoseStatus.color}`}>{glucoseStatus.status}</div>
        </div>
      </div>

      {/* manual health data entry */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Health Tracking</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Glucose Level</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={currentGlucose}
                onChange={(e) => handleGlucoseUpdate(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <span className="text-gray-600 text-sm whitespace-nowrap">mg/dL</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Insulin Intake</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <span className="text-gray-600 text-sm whitespace-nowrap">units</span>
            </div>
          </div>
        </div>
        
        <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-xl font-medium hover:bg-blue-600 transition-colors">
          Log Health Data
        </button>
      </div>
    </div>
  );
}