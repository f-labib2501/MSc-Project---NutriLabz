import { Calendar, Search, Camera, ChefHat, Dumbbell, Heart } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'diary', label: 'Health', icon: Heart },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'scan', label: 'Scan', icon: Camera},
    { id: 'meals', label: 'Meals', icon: ChefHat }, 
    { id: 'fitness', label: 'Fitness', icon: Dumbbell }, 
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb">
      <div className="flex justify-around items-center max-w-md mx-auto px-2 py-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isScan = tab.id === 'scan';
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 py-1 px-2 transition-colors ${
                isScan
                  ? 'bg-orange-500 text-white p-3 rounded-2xl'
                  : isActive
                  ? 'text-orange-500 font-medium'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon size={isScan ? 24 : 22} />
              {!isScan && (
                <span className="text-xs">{tab.label}</span>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Home indicator */}
      <div className="flex justify-center mt-2">
        <div className="w-32 h-1 bg-gray-800 rounded-full"></div>
      </div>
    </div>
  );
}