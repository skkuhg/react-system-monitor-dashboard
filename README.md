# System Performance Monitor

A beautiful, real-time system performance monitoring application built with React and Vite. Features an elegant glass-morphism UI design with smooth animations and comprehensive performance tracking.

![System Performance Monitor](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5.1.4-purple.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-cyan.svg)

## ✨ Features

- **Real-time Monitoring**: Live tracking of CPU, Memory, Disk, and Network usage
- **Beautiful UI**: Glass-morphism design with smooth animations and gradients
- **Data Visualization**: 
  - Circular progress indicators with glowing effects
  - Sparkline charts for historical data
  - Performance timeline views
- **Data Logging**: 
  - Start/stop logging functionality
  - Export performance data to CSV
  - Real-time log viewing
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Performance Metrics**:
  - Average and peak usage statistics
  - Historical data tracking (last 50 data points)
  - Network speed monitoring
  - Disk usage monitoring

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone this repository**
   ```bash
   git clone https://github.com/skkuhg/react-system-monitor-dashboard.git
   cd react-system-monitor-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The application will automatically open in your default browser

### Build for Production

```bash
npm run build
```

## 🎯 Usage

### Main Dashboard
- View real-time CPU and Memory usage with beautiful circular progress indicators
- Monitor performance trends with sparkline charts
- Check average and peak usage statistics

### Additional Metrics
- Track disk usage and network speed
- View historical performance data

### Data Logger
- **Start Logging**: Click the "Start Logging" button to begin recording performance data
- **Export Data**: Export logged data as CSV for analysis
- **View Logs**: See recent performance logs in real-time
- **Clear Logs**: Reset all logged data

### Features Overview

#### 🖥️ CPU Monitoring
- Real-time CPU usage percentage
- Historical CPU usage sparkline
- Average and peak CPU statistics

#### 💾 Memory Monitoring
- Current memory usage percentage
- Memory usage trends over time
- Memory performance statistics

#### 💿 Disk Monitoring
- Disk usage percentage
- Disk performance tracking
- Historical disk usage data

#### 🌐 Network Monitoring
- Network speed in MB/s
- Network usage patterns
- Real-time network performance

## 🛠️ Technology Stack

- **React 18.2.0**: Modern React with hooks and functional components
- **Vite**: Lightning-fast build tool and development server
- **TailwindCSS**: Utility-first CSS framework for styling
- **Lucide React**: Beautiful, customizable icon library
- **Context API**: State management for system data

## 📁 Project Structure

```
react-system-monitor-dashboard/
├── src/
│   ├── components/
│   │   ├── SystemMonitor.jsx      # Main dashboard component
│   │   ├── AdditionalMetrics.jsx  # Disk and network metrics
│   │   └── DataLogger.jsx         # Data logging functionality
│   ├── context/
│   │   └── SystemDataContext.jsx  # Global state management
│   ├── App.jsx                    # Root application component
│   ├── main.jsx                   # Application entry point
│   └── index.css                  # Global styles and Tailwind imports
├── public/                        # Static assets
├── package.json                   # Project dependencies and scripts
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── README.md                      # Project documentation
```

## 🎨 UI Design Features

- **Glass-morphism Effect**: Frosted glass appearance with backdrop blur
- **Gradient Backgrounds**: Beautiful color transitions and gradients
- **Smooth Animations**: Fluid transitions and hover effects
- **Responsive Grid**: Adaptive layout for different screen sizes
- **Dark Theme**: Elegant dark mode with vibrant accent colors
- **Glow Effects**: Subtle lighting effects on interactive elements

## 📊 Data Simulation

The application currently uses simulated data for demonstration purposes. In a production environment, you would replace the simulation logic with actual system monitoring APIs or backend services.

### Simulated Metrics:
- **CPU Usage**: 20-80% with smooth transitions
- **Memory Usage**: 40-80% with realistic fluctuations
- **Disk Usage**: 30-80% with slower changes
- **Network Speed**: 0-100 MB/s with dynamic variations

## 🔧 Customization

### Changing Colors
Edit the color schemes in the component files or extend the Tailwind configuration in `tailwind.config.js`.

### Adding New Metrics
1. Add new state variables to `SystemDataContext.jsx`
2. Create simulation logic for the new metric
3. Add visualization components in the appropriate component files

### Modifying Update Frequency
Change the interval in `SystemDataContext.jsx` (currently set to 1000ms = 1 second).

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers (1920px and above)
- Laptops (1024px - 1919px)
- Tablets (768px - 1023px)
- Mobile devices (below 768px)

## 🚀 Performance

- **Lightweight**: Minimal dependencies and optimized bundle size
- **Fast Rendering**: Efficient React components with proper state management
- **Smooth Animations**: Hardware-accelerated CSS transitions
- **Memory Efficient**: Automatic cleanup of intervals and proper state management

## 📈 Future Enhancements

- Real system monitoring integration
- Historical data persistence
- Alert system for threshold breaches
- More detailed system information
- Custom dashboard layouts
- Performance comparison tools

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the port in `vite.config.js` or kill the process using port 3000

2. **Dependencies not installing**
   - Delete `node_modules` and `package-lock.json`, then run `npm install` again

3. **Tailwind styles not working**
   - Ensure PostCSS and Tailwind are properly configured
   - Check that `index.css` is imported in `main.jsx`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🌟 Show your support

Give a ⭐️ if this project helped you!