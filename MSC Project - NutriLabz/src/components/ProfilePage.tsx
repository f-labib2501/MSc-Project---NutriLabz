import { useState } from 'react';
import { ArrowLeft, Edit3, User, Camera, Settings, Bell, Shield, HelpCircle, LogOut, Activity, Target } from 'lucide-react';

interface ProfilePageProps {
  onBack: () => void;
  onDiabetesChange?: (hasDiabetes: boolean) => void;
  onDiabetesTypeChange?: (type: string) => void;
}

export default function ProfilePage({ onBack, onDiabetesChange, onDiabetesTypeChange }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [hasDiabetes, setHasDiabetes] = useState(true);
  const [diabetesType, setDiabetesType] = useState('Type 2');

  const handleDiabetesToggle = (value: boolean) => {
    setHasDiabetes(value);
    onDiabetesChange?.(value);
  };

  const handleDiabetesTypeChange = (type: string) => {
    setDiabetesType(type);
    onDiabetesTypeChange?.(type);
  };

  const [userInfo, setUserInfo] = useState({
    name: 'Fatin Labib',
    email: 'labz.f10@gmail.com',
    ethnicity: 'South Asian',
    age: '24',
    height: '170',
    weight: '65',
    goalWeight: '60',
    activityLevel: 'Moderately Active',
    goal: 'Lose Weight'
  });

  const ethnicities = ['South Asian', 'East Asian', 'Southeast Asian', 'Middle Eastern', 'African', 'Caribbean', 'Latin American', 'Mediterranean', 'European', 'North American', 'Other'];

  const handleSave = () => setIsEditing(false);
  const handleCancel = () => setIsEditing(false);

  if (showSettings) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-orange-500 text-white p-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowSettings(false)} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 pb-20">
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Notifications</h3>
              <div className="space-y-3">
                {[
                  { label: 'Meal Reminders', active: true },
                  { label: 'Water Reminders', active: false },
                  { label: 'Weekly Reports', active: true }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700">{item.label}</span>
                    <div className={`w-12 h-6 ${item.active ? 'bg-orange-500' : 'bg-gray-300'} rounded-full relative`}>
                      <div className={`w-5 h-5 bg-white rounded-full absolute ${item.active ? 'right-0.5' : 'left-0.5'} top-0.5`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Privacy</h3>
              <div className="space-y-3">
                {[
                  { label: 'Share Data with Devices', active: true },
                  { label: 'Analytics', active: false }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700">{item.label}</span>
                    <div className={`w-12 h-6 ${item.active ? 'bg-orange-500' : 'bg-gray-300'} rounded-full relative`}>
                      <div className={`w-5 h-5 bg-white rounded-full absolute ${item.active ? 'right-0.5' : 'left-0.5'} top-0.5`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4">App Preferences</h3>
              <div className="space-y-3">
                {[
                  { label: 'Dark Mode', active: false },
                  { label: 'Metric Units', active: true }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700">{item.label}</span>
                    <div className={`w-12 h-6 ${item.active ? 'bg-orange-500' : 'bg-gray-300'} rounded-full relative`}>
                      <div className={`w-5 h-5 bg-white rounded-full absolute ${item.active ? 'right-0.5' : 'left-0.5'} top-0.5`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-orange-500 text-white p-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-20">
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center overflow-hidden">
                <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face" alt="Profile" className="w-full h-full object-cover" />
              </div>
              {isEditing && (
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
                  <Camera size={16} />
                </button>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{userInfo.name}</h2>
              <p className="text-gray-600">{userInfo.email}</p>
            </div>
            <button onClick={() => setIsEditing(!isEditing)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
              <Edit3 size={18} className="text-gray-600" />
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Age', key: 'age', suffix: 'years' },
                { label: 'Height', key: 'height', suffix: 'cm' },
                { label: 'Current Weight', key: 'weight', suffix: 'kg' },
                { label: 'Goal Weight', key: 'goalWeight', suffix: 'kg' }
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  {isEditing ? (
                    <input type="number" value={userInfo[field.key as keyof typeof userInfo]} onChange={(e) => setUserInfo({...userInfo, [field.key]: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                  ) : (
                    <p className="text-gray-800 font-medium">{userInfo[field.key as keyof typeof userInfo]} {field.suffix}</p>
                  )}
                </div>
              ))}
            </div>

            {[
              { label: 'Ethnicity', key: 'ethnicity', options: ethnicities },
              { label: 'Activity Level', key: 'activityLevel', options: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extremely Active'] },
              { label: 'Goal', key: 'goal', options: ['Lose Weight', 'Maintain Weight', 'Gain Weight', 'Build Muscle'] }
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                {isEditing ? (
                  <select value={userInfo[field.key as keyof typeof userInfo]} onChange={(e) => setUserInfo({...userInfo, [field.key]: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white">
                    {field.options.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-800 font-medium">{userInfo[field.key as keyof typeof userInfo]}</p>
                )}
              </div>
            ))}

            {isEditing && (
              <div className="flex gap-3 pt-4">
                <button onClick={handleSave} className="flex-1 bg-orange-500 text-white py-2 rounded-xl font-medium hover:bg-orange-600 transition-colors">Save Changes</button>
                <button onClick={handleCancel} className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-xl font-medium hover:bg-gray-300 transition-colors">Cancel</button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Health Conditions</h3>
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => handleDiabetesToggle(!hasDiabetes)} className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${hasDiabetes ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-gray-400'}`}>
              {hasDiabetes && <span className="text-white text-sm">✓</span>}
            </button>
            <span className="text-gray-800 font-medium">I have diabetes</span>
          </div>
          {hasDiabetes && (
            <div className="ml-9">
              <select value={diabetesType} onChange={(e) => handleDiabetesTypeChange(e.target.value)} className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 border-none outline-none cursor-pointer">
                <option value="Type 1">Type 1</option>
                <option value="Type 2">Type 2</option>
              </select>
              <div className="mt-3 p-3 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-700">Meal plans will be adjusted for diabetes management.</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: Activity, color: 'blue', value: '7', label: 'Days Active' },
            { icon: Target, color: 'green', value: '85%', label: 'Goal Progress' },
            { icon: 'kg', color: 'orange', value: '-5', label: 'Weight Lost' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 text-center shadow-sm">
              <div className={`w-8 h-8 bg-${stat.color}-100 rounded-full flex items-center justify-center mx-auto mb-2`}>
                {typeof stat.icon === 'string' ? (
                  <span className={`text-${stat.color}-600 font-bold text-sm`}>{stat.icon}</span>
                ) : (
                  <stat.icon size={16} className={`text-${stat.color}-600`} />
                )}
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Settings</h3>
          <div className="space-y-2">
            {[
              { icon: Settings, label: 'App Settings', onClick: () => setShowSettings(true) },
              { icon: Bell, label: 'Notifications' },
              { icon: Shield, label: 'Privacy & Security' },
              { icon: HelpCircle, label: 'Help & Support' },
              { icon: LogOut, label: 'Sign Out', color: 'text-red-600' }
            ].map((item, index) => (
              <button key={index} onClick={item.onClick} className={`w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors ${item.color || 'text-gray-800'}`}>
                <item.icon size={20} className={item.color || 'text-gray-600'} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}