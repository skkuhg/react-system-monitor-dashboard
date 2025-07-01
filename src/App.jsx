import React from 'react'
import { SystemDataProvider } from './context/SystemDataContext'
import SystemMonitor from './components/SystemMonitor'
import AdditionalMetrics from './components/AdditionalMetrics'
import DataLogger from './components/DataLogger'

function App() {
  return (
    <SystemDataProvider>
      <div className="App">
        <SystemMonitor />
      </div>
    </SystemDataProvider>
  )
}

export default App