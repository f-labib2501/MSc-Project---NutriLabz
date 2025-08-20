import React, { useState } from 'react';
import { Watch, Plus, Bluetooth, Battery, Wifi, Check, X } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  type: string;
  battery: number;
  connected: boolean;
  lastSync: string;
}

export default function WearableDevices() {
  const [showDeviceList, setShowDeviceList] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'Apple Watch Series 9',
      type: 'smartwatch',
      battery: 78,
      connected: true,
      lastSync: '2 min ago'
    }
  ]);

  const [availableDevices, setAvailableDevices] = useState<Device[]>([
    {
      id: '2',
      name: 'Fitbit Charge 6',
      type: 'fitness-tracker',
      battery: 85,
      connected: false,
      lastSync: 'Never'
    }
  ]);

  const handleScanDevices = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  };

  const handleConnectDevice = (deviceId: string) => {
    const device = availableDevices.find(d => d.id === deviceId);
    if (device) {
      const updatedDevice = { ...device, connected: true, lastSync: 'Just now' };
      setConnectedDevices([...connectedDevices, updatedDevice]);
      setAvailableDevices(availableDevices.filter(d => d.id !== deviceId));
    }
  };

  const handleDisconnectDevice = (deviceId: string) => {
    const device = connectedDevices.find(d => d.id === deviceId);
    if (device) {
      const updatedDevice = { ...device, connected: false, lastSync: 'Never' };
      setAvailableDevices([...availableDevices, updatedDevice]);
      setConnectedDevices(connectedDevices.filter(d => d.id !== deviceId));
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'smartwatch':
        return '⌚';
      case 'fitness-tracker':
        return '📱';
      default:
        return '⌚';
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 50) return 'text-green-500';
    if (battery > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (showDeviceList) {
    return (
      <div className="fixed inset-0 bg-gray-50 z-50">
      
        <div className="bg-orange-500 text-white p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Wearable Devices</h1>
            <button 
              onClick={() => setShowDeviceList(false)}
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* connected devices */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Connected Devices</h3>
            {connectedDevices.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No devices connected</p>
            ) : (
              <div className="space-y-3">
                {connectedDevices.map((device) => (
                  <div key={device.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div>
                          <h4 className="font-semibold text-gray-800">{device.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span>Connected</span>
                            </div>
                            <span>•</span>
                            <span>Synced {device.lastSync}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <button
                          onClick={() => handleDisconnectDevice(device.id)}
                          className="text-red-500 text-sm hover:text-red-600 transition-colors"
                        >
                          Disconnect
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* show available devices */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Available Devices</h3>
              <button
                onClick={handleScanDevices}
                disabled={isScanning}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-2xl font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                <Bluetooth size={16} />
                {isScanning ? 'Scanning...' : 'Scan'}
              </button>
            </div>
            
            {isScanning && (
              <div className="text-center py-4">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-gray-600">Searching for devices...</p>
              </div>
            )}

            <div className="space-y-3">
              {availableDevices.map((device) => (
                <div key={device.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <h4 className="font-semibold text-gray-800">{device.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Bluetooth size={12} />
                            <span>Available</span>
                          </div>
                          <span>•</span>
                          <div className={`flex items-center gap-1 ${getBatteryColor(device.battery)}`}>
                            <span className="text-gray-600">Ready</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => handleConnectDevice(device.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-2xl font-medium hover:bg-green-600 transition-colors"
                      >
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Devices</h3>
            <p className="text-sm text-gray-600">{connectedDevices.length} connected</p>
          </div>
        </div>
        <button 
          onClick={() => setShowDeviceList(true)}
          className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
        >
          <Plus size={18} className="text-white" />
        </button>
      </div>
      
      {connectedDevices.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{connectedDevices[0].name} - Connected</span>
          </div>
        </div>
      )}
    </div>
  );
}