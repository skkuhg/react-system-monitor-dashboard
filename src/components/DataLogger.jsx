import React from 'react';
import { Download, Play, Pause, Trash2, Database } from 'lucide-react';
import { useSystemData } from '../context/SystemDataContext';

const DataLogger = () => {
  const { 
    isLogging, 
    logs, 
    toggleLogging, 
    clearLogs, 
    exportLogs 
  } = useSystemData();

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white flex items-center">
          <Database className="w-6 h-6 mr-2 text-green-400" />
          Data Logger
        </h2>
        <div className="flex items-center space-x-2">
          <span className={`w-3 h-3 rounded-full ${isLogging ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></span>
          <span className="text-sm text-gray-300">
            {isLogging ? 'Recording' : 'Stopped'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900/50 rounded-xl p-4">
          <div className="text-green-400 text-sm">Total Logs</div>
          <div className="text-2xl font-bold text-white">{logs.length}</div>
        </div>
        <div className="bg-gray-900/50 rounded-xl p-4">
          <div className="text-blue-400 text-sm">Storage Used</div>
          <div className="text-2xl font-bold text-white">
            {Math.round(logs.length * 0.1 * 100) / 100} KB
          </div>
        </div>
        <div className="bg-gray-900/50 rounded-xl p-4">
          <div className="text-yellow-400 text-sm">Duration</div>
          <div className="text-2xl font-bold text-white">
            {Math.floor(logs.length / 60)}:{(logs.length % 60).toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={toggleLogging}
          className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
            isLogging 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isLogging ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Stop Logging
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Start Logging
            </>
          )}
        </button>

        <button
          onClick={exportLogs}
          disabled={logs.length === 0}
          className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-300"
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </button>

        <button
          onClick={clearLogs}
          disabled={logs.length === 0}
          className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-300"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear Logs
        </button>
      </div>

      {logs.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Logs</h3>
          <div className="bg-gray-900/70 rounded-xl p-4 max-h-64 overflow-y-auto">
            <div className="space-y-2">
              {logs.slice(-10).reverse().map((log, index) => (
                <div key={index} className="text-sm font-mono text-gray-300 grid grid-cols-5 gap-4">
                  <span className="text-blue-300">{new Date(log.timestamp).toLocaleTimeString()}</span>
                  <span className="text-cyan-400">CPU: {log.cpu}%</span>
                  <span className="text-purple-400">MEM: {log.memory}%</span>
                  <span className="text-orange-400">DISK: {log.disk}%</span>
                  <span className="text-green-400">NET: {log.network} MB/s</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataLogger;