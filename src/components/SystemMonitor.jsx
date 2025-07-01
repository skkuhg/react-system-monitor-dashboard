import React, { useState, useEffect, useRef } from 'react';
import { Activity, Cpu, HardDrive, TrendingUp, Clock, Zap } from 'lucide-react';
import { useSystemData } from '../context/SystemDataContext';
import AdditionalMetrics from './AdditionalMetrics';
import DataLogger from './DataLogger';

const SystemMonitor = () => {
  const {
    cpuUsage,
    memoryUsage,
    cpuHistory,
    memoryHistory,
    timestamp
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
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
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
          fill={`url(#gradient-${color})`}
          stroke="none"
          points={`0,100 ${points} 100,100`}
        />
      </svg>
    );
  };

  // Render circular progress
  const renderCircularProgress = (value, color, icon) => {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div className="relative w-48 h-48">
        <svg className="transform -rotate-90 w-48 h-48">
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="#1a1a2e"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke={color}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out drop-shadow-lg"
            style={{
              filter: `drop-shadow(0 0 10px ${color}40)`
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {icon}
          <div className="text-3xl font-bold text-white mt-2">
            {Math.round(value)}%
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">System Monitor</h1>
              <p className="text-blue-300 mt-1">Real-time performance tracking</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-blue-300">
            <Clock className="w-5 h-5" />
            <span className="font-mono">{timestamp.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Main metrics cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* CPU Card */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <Cpu className="w-6 h-6 mr-2 text-cyan-400" />
                CPU Usage
              </h2>
              <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div className="flex justify-center mb-6">
              {renderCircularProgress(cpuUsage, '#00bcd4', <Cpu className="w-8 h-8 text-cyan-400" />)}
            </div>
            <div className="h-24">
              {renderSparkline(cpuHistory, '#00bcd4')}
            </div>
          </div>

          {/* Memory Card */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <HardDrive className="w-6 h-6 mr-2 text-purple-400" />
                Memory Usage
              </h2>
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <div className="flex justify-center mb-6">
              {renderCircularProgress(memoryUsage, '#9c27b0', <HardDrive className="w-8 h-8 text-purple-400" />)}
            </div>
            <div className="h-24">
              {renderSparkline(memoryHistory, '#9c27b0')}
            </div>
          </div>
        </div>

        {/* History Chart */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
          <h2 className="text-2xl font-semibold text-white mb-6">Performance History</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg text-cyan-400 mb-4 flex items-center">
                <Cpu className="w-5 h-5 mr-2" />
                CPU Timeline
              </h3>
              <div className="h-32 bg-gray-900/50 rounded-xl p-4">
                {renderSparkline(cpuHistory, '#00bcd4')}
              </div>
            </div>
            <div>
              <h3 className="text-lg text-purple-400 mb-4 flex items-center">
                <HardDrive className="w-5 h-5 mr-2" />
                Memory Timeline
              </h3>
              <div className="h-32 bg-gray-900/50 rounded-xl p-4">
                {renderSparkline(memoryHistory, '#9c27b0')}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="mb-8">
          <AdditionalMetrics />
        </div>

        {/* Data Logger */}
        <div className="mb-8">
          <DataLogger />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 backdrop-blur-lg rounded-2xl p-4 border border-cyan-500/30">
            <div className="text-cyan-400 text-sm">Avg CPU</div>
            <div className="text-2xl font-bold text-white">
              {Math.round(cpuHistory.reduce((a, b) => a + b, 0) / cpuHistory.length)}%
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-lg rounded-2xl p-4 border border-purple-500/30">
            <div className="text-purple-400 text-sm">Avg Memory</div>
            <div className="text-2xl font-bold text-white">
              {Math.round(memoryHistory.reduce((a, b) => a + b, 0) / memoryHistory.length)}%
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-lg rounded-2xl p-4 border border-green-500/30">
            <div className="text-green-400 text-sm">Peak CPU</div>
            <div className="text-2xl font-bold text-white">
              {Math.round(Math.max(...cpuHistory))}%
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-lg rounded-2xl p-4 border border-orange-500/30">
            <div className="text-orange-400 text-sm">Peak Memory</div>
            <div className="text-2xl font-bold text-white">
              {Math.round(Math.max(...memoryHistory))}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitor;