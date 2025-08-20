// Color-coded macronutrient tracking with mathematical precision
interface CalorieCircle{
  calroies: number;
  netCalories: number;
  carbs: number;
  protein: number;
  fat: number;
}

export default function CalorieCircle({
  calories,
  netCalories,
  carbs,
  protein,
  fat
}: CalorieCircleProps) {

  return (
    <div className="bg-white/20 rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <div className="relative">
          <div className="w-32 h-32 relative">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              {/* Base circle for visuals */}
              <circle 
                cx="60"
                cy="60"
                r="50"
                stroke="rgba(255,255,255,0.2"
                strokeWidth="8"
                fill="none"
              />
              
            {/* progress ring*/}
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#fbbf24"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(carbs/45) * 314} 314`}
              strokeDashoffset="0"
              className="transition-all duration-500"
            />
            {/* protein progress */}
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#ef4444"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(protein/135) * 314} 314`}
              strokeDashoffset={`-${(carbs/45) * 314}`}
              className="transition-all duration-500"
            />
            {/* fat progress */}
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#8b5cf6"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(fat/60) * 314} 314`}
              strokeDashoffset={`-${((carbs/45) + (protein/135)) * 314}`}
              className="transition-all duration-500"
            />
          </svg>
          {/* calorie display with positioning*/}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-white">{calories}</div>
            <div className="text-white/80 text-sm">calories</div>
          </div>
        </div>
      </div>

        {/* Nutrition summary with calories calculation */ }
        <div className="text-right">
          <div className="text-white/80 text-lb mb-4">
            {1800 - netCalories > 0 ? `+${1800 - netCalories} remaining` : `${Math.abs(1800 - netCalories)} over`}
          </div>
          <div className="text-white/60 text-sm mb-4">
            Net: {netCalories > 0 ? `+${netCalories}` : netCalories} cal
          </div>
          <div className="space-y-2">
          {/* macronutrients indicators */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span className="text-white">Carbs</span>
            <span className="text-white font-bold ml-auto">{carbs}g</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-white">Protein</span>
            <span className="text-white font-bold ml-auto">{protein}g</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-white">Fat</span>
            <span className="text-white font-bold ml-auto">{fat.toFixed(1)}g</span>
          </div>
        </div>
      </div>
     </div>
    </div>
  );
}
