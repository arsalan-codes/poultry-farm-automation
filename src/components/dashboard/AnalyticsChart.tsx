import { SensorData } from '@/types';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { MdDownload, MdInsertChart, MdTableChart, MdTrendingUp, MdSchedule } from 'react-icons/md';

interface AnalyticsChartProps {
  sensorData: SensorData | null;
  t: (key: string) => string;
}

// Excel export utility
const exportToExcel = (data: SensorData[], period: string) => {
  // Create CSV content (simple approach)
  const headers = ['Timestamp', 'Oxygen (%)', 'CO2 (ppm)', 'Temperature (°C)', 'Humidity (%)', 'Relative Humidity (%)', 'Light (lux)'];
  const csvContent = [
    headers.join(','),
    ...data.map(row => [
      new Date(row.timestamp).toLocaleString(),
      row.oxygen.toFixed(1),
      row.co2.toFixed(0),
      row.temperature.toFixed(1),
      row.humidity.toFixed(1),
      row.relativeHumidity.toFixed(1),
      row.light.toFixed(0)
    ].join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `sensor_data_${period}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

interface AnalyticsChartProps {
  sensorData: SensorData | null;
  t: (key: string) => string;
}

export default function AnalyticsChart({ sensorData, t }: AnalyticsChartProps) {
  const [period, setPeriod] = useState<'realtime' | 'daily' | 'weekly' | 'monthly'>('realtime');
  const [chartData, setChartData] = useState<SensorData[]>([]);
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('line');

  useEffect(() => {
    if (sensorData) {
      setChartData(prev => {
        const newData = [...prev, sensorData].slice(-20); // Keep last 20 readings
        return newData;
      });
    }
  }, [sensorData]);

  const calculateAverages = () => {
    if (chartData.length === 0) return null;
    
    const totals = chartData.reduce((acc, data) => ({
      oxygen: acc.oxygen + data.oxygen,
      co2: acc.co2 + data.co2,
      humidity: acc.humidity + data.humidity,
      relativeHumidity: acc.relativeHumidity + data.relativeHumidity,
      temperature: acc.temperature + data.temperature,
      light: acc.light + data.light,
    }), {
      oxygen: 0,
      co2: 0,
      humidity: 0,
      relativeHumidity: 0,
      temperature: 0,
      light: 0,
    });

    const count = chartData.length;
    return {
      oxygen: (totals.oxygen / count).toFixed(1),
      co2: (totals.co2 / count).toFixed(0),
      humidity: (totals.humidity / count).toFixed(1),
      relativeHumidity: (totals.relativeHumidity / count).toFixed(1),
      temperature: (totals.temperature / count).toFixed(1),
      light: (totals.light / count).toFixed(0),
    };
  };

  const averages = calculateAverages();
  
  // Prepare chart data
  const chartDataFormatted = chartData.map((data, index) => ({
    time: new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    oxygen: data.oxygen,
    co2: data.co2 / 100, // Scale down for better visualization
    temperature: data.temperature,
    humidity: data.humidity,
    relativeHumidity: data.relativeHumidity,
    light: data.light / 10, // Scale down for better visualization
  }));
  
  const handleExport = () => {
    if (chartData.length > 0) {
      exportToExcel(chartData, period);
    }
  };
  
  const renderChart = () => {
    const commonProps = {
      width: '100%',
      height: 300,
      data: chartDataFormatted,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };
    
    switch (chartType) {
      case 'area':
        return (
          <ResponsiveContainer {...commonProps}>
            <AreaChart data={chartDataFormatted}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="oxygen" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="temperature" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
              <Area type="monotone" dataKey="humidity" stackId="3" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer {...commonProps}>
            <BarChart data={chartDataFormatted}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="oxygen" fill="#3b82f6" />
              <Bar dataKey="temperature" fill="#ef4444" />
              <Bar dataKey="humidity" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <ResponsiveContainer {...commonProps}>
            <LineChart data={chartDataFormatted}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="oxygen" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="co2" stroke="#6b7280" strokeWidth={2} />
              <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="humidity" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="relativeHumidity" stroke="#06b6d4" strokeWidth={2} />
              <Line type="monotone" dataKey="light" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="space-y-md-6">
      {/* Control Panel */}
      <div className="md-card-elevated">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-md-4">
          <div>
            <h2 className="md-title-large text-md-on-surface mb-md-2 flex items-center md-gap-2">
              <MdInsertChart className="text-xl" />
              {t('nav.analytics')}
            </h2>
            <p className="md-body-medium text-md-on-surface-variant">
              {t('analytics.visualization')}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-md-2">
            {/* Period Selector */}
            {(['realtime', 'daily', 'weekly', 'monthly'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`md-button ${
                  period === p
                    ? 'md-button-filled'
                    : 'md-button-outlined'
                }`}
              >
                <MdSchedule className="text-sm mr-1" />
                <span className="md-label-medium">{t(`analytics.${p}`)}</span>
              </button>
            ))}
            
            {/* Export Button */}
            <button
              onClick={handleExport}
              disabled={chartData.length === 0}
              className="md-button-tonal flex items-center md-gap-2"
              title="Export data to Excel/CSV"
            >
              <MdDownload className="text-lg" />
              <span className="md-label-medium">{t('analytics.export')}</span>
            </button>
          </div>
        </div>
        
        {/* Chart Type Selector */}
        <div className="mt-md-4 flex gap-md-2">
          <span className="md-label-medium text-md-on-surface-variant flex items-center md-gap-1">
            <MdTableChart className="text-sm" />
            Chart Type:
          </span>
          {(['line', 'area', 'bar'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`px-md-3 py-md-1 rounded-full text-sm ${
                chartType === type
                  ? 'bg-md-primary text-md-on-primary'
                  : 'bg-md-surface-container text-md-on-surface-variant hover:bg-md-surface-container-high'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Main Chart */}
      {chartData.length > 0 && (
        <div className="md-card-elevated">
          <div className="flex items-center justify-between mb-md-4">
            <h3 className="md-title-medium text-md-on-surface flex items-center md-gap-2">
              <MdTrendingUp className="text-lg" />
              Sensor Data Trends ({chartData.length} data points)
            </h3>
            <div className="md-body-small text-md-on-surface-variant">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
          <div className="h-80">
            {renderChart()}
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      {averages && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md-6">
          <div className="md-card-filled">
            <div className="flex items-center md-gap-3 mb-md-3">
              <div className="text-2xl p-md-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                🫁
              </div>
              <div>
                <h3 className="md-title-small text-md-on-surface">
                  {t('sensors.oxygen')} Average
                </h3>
                <p className="md-headline-medium font-bold text-blue-600">{averages.oxygen}%</p>
              </div>
            </div>
          </div>
          
          <div className="md-card-filled">
            <div className="flex items-center md-gap-3 mb-md-3">
              <div className="text-2xl p-md-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                🌬️
              </div>
              <div>
                <h3 className="md-title-small text-md-on-surface">
                  {t('sensors.co2')} Average
                </h3>
                <p className="md-headline-medium font-bold text-yellow-600">{averages.co2} ppm</p>
              </div>
            </div>
          </div>
          
          <div className="md-card-filled">
            <div className="flex items-center md-gap-3 mb-md-3">
              <div className="text-2xl p-md-2 rounded-full bg-red-100 dark:bg-red-900/30">
                🌡️
              </div>
              <div>
                <h3 className="md-title-small text-md-on-surface">
                  {t('sensors.temperature')} Average
                </h3>
                <p className="md-headline-medium font-bold text-red-600">{averages.temperature}°C</p>
              </div>
            </div>
          </div>
          
          <div className="md-card-filled">
            <div className="flex items-center md-gap-3 mb-md-3">
              <div className="text-2xl p-md-2 rounded-full bg-green-100 dark:bg-green-900/30">
                💧
              </div>
              <div>
                <h3 className="md-title-small text-md-on-surface">
                  {t('sensors.humidity')} Average
                </h3>
                <p className="md-headline-medium font-bold text-green-600">{averages.humidity}%</p>
              </div>
            </div>
          </div>
          
          <div className="md-card-filled">
            <div className="flex items-center md-gap-3 mb-md-3">
              <div className="text-2xl p-md-2 rounded-full bg-purple-100 dark:bg-purple-900/30">
                🌫️
              </div>
              <div>
                <h3 className="md-title-small text-md-on-surface">
                  {t('sensors.relativeHumidity')} Average
                </h3>
                <p className="md-headline-medium font-bold text-purple-600">{averages.relativeHumidity}%</p>
              </div>
            </div>
          </div>
          
          <div className="md-card-filled">
            <div className="flex items-center md-gap-3 mb-md-3">
              <div className="text-2xl p-md-2 rounded-full bg-orange-100 dark:bg-orange-900/30">
                💡
              </div>
              <div>
                <h3 className="md-title-small text-md-on-surface">
                  {t('sensors.light')} Average
                </h3>
                <p className="md-headline-medium font-bold text-orange-600">{averages.light} lux</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Readings */}
      <div className="md-card-outlined">
        <h3 className="md-title-medium text-md-on-surface mb-md-4">
          🔄 Recent Readings ({chartData.length} points)
        </h3>
        <div className="space-y-md-4">
          {chartData.slice(-5).map((data, index) => (
            <div key={data.id} className="md-card bg-md-surface-container-low border-l-4 border-md-primary">
              <div className="flex items-center justify-between mb-md-2">
                <span className="md-body-small text-md-on-surface-variant">
                  {new Date(data.timestamp).toLocaleTimeString()}
                </span>
                <span className="md-label-small bg-md-primary-container text-md-on-primary-container px-md-2 py-md-1 rounded-full">
                  #{index + 1}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-md-3">
                <div className="text-center p-md-2 bg-md-surface-container rounded-lg">
                  <div className="md-label-small text-md-on-surface-variant">O₂</div>
                  <div className="md-body-medium font-bold text-md-on-surface">{data.oxygen.toFixed(1)}%</div>
                </div>
                <div className="text-center p-md-2 bg-md-surface-container rounded-lg">
                  <div className="md-label-small text-md-on-surface-variant">CO₂</div>
                  <div className="md-body-medium font-bold text-md-on-surface">{data.co2.toFixed(0)}ppm</div>
                </div>
                <div className="text-center p-md-2 bg-md-surface-container rounded-lg">
                  <div className="md-label-small text-md-on-surface-variant">Temp</div>
                  <div className="md-body-medium font-bold text-md-on-surface">{data.temperature.toFixed(1)}°C</div>
                </div>
                <div className="text-center p-md-2 bg-md-surface-container rounded-lg">
                  <div className="md-label-small text-md-on-surface-variant">Humidity</div>
                  <div className="md-body-medium font-bold text-md-on-surface">{data.humidity.toFixed(1)}%</div>
                </div>
                <div className="text-center p-md-2 bg-md-surface-container rounded-lg">
                  <div className="md-label-small text-md-on-surface-variant">RH</div>
                  <div className="md-body-medium font-bold text-md-on-surface">{data.relativeHumidity.toFixed(1)}%</div>
                </div>
                <div className="text-center p-md-2 bg-md-surface-container rounded-lg">
                  <div className="md-label-small text-md-on-surface-variant">Light</div>
                  <div className="md-body-medium font-bold text-md-on-surface">{data.light.toFixed(0)}lux</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}