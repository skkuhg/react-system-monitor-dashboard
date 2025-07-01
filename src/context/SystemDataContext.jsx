import React, { createContext, useContext, useState, useEffect } from 'react';

const SystemDataContext = createContext();

export const useSystemData = () => {
  const context = useContext(SystemDataContext);
  if (!context) {
    throw new Error('useSystemData must be used within a SystemDataProvider');
  }
  return context;
};

export const SystemDataProvider = ({ children }) => {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [diskUsage, setDiskUsage] = useState(0);
  const [networkSpeed, setNetworkSpeed] = useState(0);
  const [cpuHistory, setCpuHistory] = useState(Array(50).fill(0));
  const [memoryHistory, setMemoryHistory] = useState(Array(50).fill(0));
  const [diskHistory, setDiskHistory] = useState(Array(50).fill(0));
  const [networkHistory, setNetworkHistory] = useState(Array(50).fill(0));
  const [timestamp, setTimestamp] = useState(new Date());
  const [isLogging, setIsLogging] = useState(false);
  const [logs, setLogs] = useState([]);

  // Simulate system data
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      
      // Simulate CPU usage with some randomness and smoothing
      setCpuUsage(prev => {
        const target = 20 + Math.random() * 60;
        return prev + (target - prev) * 0.3;
      });
      
      // Simulate memory usage
      setMemoryUsage(prev => {
        const target = 40 + Math.random() * 40;
        return prev + (target - prev) * 0.3;
      });

      // Simulate disk usage
      setDiskUsage(prev => {
        const target = 30 + Math.random() * 50;
        return prev + (target - prev) * 0.2;
      });

      // Simulate network speed (MB/s)
      setNetworkSpeed(prev => {
        const target = Math.random() * 100;
        return prev + (target - prev) * 0.4;
      });
      
      setTimestamp(now);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Update history arrays
  useEffect(() => {
    setCpuHistory(prev => [...prev.slice(1), cpuUsage]);
    setMemoryHistory(prev => [...prev.slice(1), memoryUsage]);
    setDiskHistory(prev => [...prev.slice(1), diskUsage]);
    setNetworkHistory(prev => [...prev.slice(1), networkSpeed]);

    // Log data if logging is enabled
    if (isLogging) {
      const logEntry = {
        timestamp: timestamp.toISOString(),
        cpu: Math.round(cpuUsage * 100) / 100,
        memory: Math.round(memoryUsage * 100) / 100,
        disk: Math.round(diskUsage * 100) / 100,
        network: Math.round(networkSpeed * 100) / 100
      };
      
      setLogs(prev => [...prev, logEntry].slice(-1000)); // Keep last 1000 entries
    }
  }, [cpuUsage, memoryUsage, diskUsage, networkSpeed, isLogging, timestamp]);

  const toggleLogging = () => {
    setIsLogging(prev => !prev);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const exportLogs = () => {
    const csvContent = [
      'timestamp,cpu,memory,disk,network',
      ...logs.map(log => `${log.timestamp},${log.cpu},${log.memory},${log.disk},${log.network}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-performance-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const value = {
    cpuUsage,
    memoryUsage,
    diskUsage,
    networkSpeed,
    cpuHistory,
    memoryHistory,
    diskHistory,
    networkHistory,
    timestamp,
    isLogging,
    logs,
    toggleLogging,
    clearLogs,
    exportLogs
  };

  return (
    <SystemDataContext.Provider value={value}>
      {children}
    </SystemDataContext.Provider>
  );
};