import React from 'react';
import { Wifi, HardDrive as Disk } from 'lucide-react';
import { useSystemData } from '../context/SystemDataContext';

const AdditionalMetrics = () => {
  const { 
    diskUsage, 
    networkSpeed, 
    diskHistory, 
    networkHistory 
  } = useSystemData();

  // Render sparkline chart
  const renderSparkline = (data, color) => {
    const max = Math.max(...data, 100);
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (value / max) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: color, stopOpacity: 0.8}} />
            <stop offset="100%" style={{stopColor: color, stopOpacity: 0.1}} />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
          className="drop-shadow-sm"
        />
        <polyline
          fill={`url(#gradient-${color.replace('#', '')})`}
          stroke="none"
          points={`0,100 ${points} 100,100`}
        />
      </svg>
    );
  };

  // Render circular progress
  const renderCircularProgress = (value, color, icon, unit = '%') => {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (Math.min(value, 100) / 100) * circumference;

    return (
      <div className="relative w-40 h-40">
        <svg className="transform -rotate-90 w-40 h-40">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#1a1a2e"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={color}
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out drop-shadow-lg"
            style={{
              filter: `drop-shadow(0 0 8px ${color}40)`
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {icon}
          <div className="text-2xl font-bold text-white mt-1">
            {Math.round(value)}{unit}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Disk Usage Card */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white flex items-center">
            <Disk className="w-6 h-6 mr-2 text-orange-400" />
            Disk Usage
          </h2>
          <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
        </div>
        <div className="flex justify-center mb-6">
          {renderCircularProgress(diskUsage, '#ff9800', <Disk className="w-7 h-7 text-orange-400" />)}
        </div>
        <div className="h-20">
          {renderSparkline(diskHistory, '#ff9800')}
        </div>
      </div>

      {/* Network Speed Card */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white flex items-center">
            <Wifi className="w-6 h-6 mr-2 text-green-400" />
            Network Speed
          </h2>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div className="flex justify-center mb-6">
          {renderCircularProgress(networkSpeed, '#4caf50', <Wifi className="w-7 h-7 text-green-400" />, ' MB/s')}
        </div>
        <div className="h-20">
          {renderSparkline(networkHistory, '#4caf50')}
        </div>
      </div>
    </div>
  );
};

export default AdditionalMetrics;