import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export default function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadComplete, 800);
          return 100;
        }
        return prev + 8;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className="min-h-screen bg-orange-500 flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center mb-12">
        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-4">
          <span className="text-3xl font-bold text-orange-500">N</span>
        </div>
        <h1 className="text-3xl font-bold">NutriLabz</h1>
      </div>

      <div className="w-48">
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-center text-white/80 mt-3 text-sm">Loading...</p>
      </div>
    </div>
  );
}