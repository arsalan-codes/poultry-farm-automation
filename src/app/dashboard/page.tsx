'use client';

import { useAuth } from '@/lib/auth';
import { useLanguage } from '@/lib/language';
import { useTheme } from '@/lib/theme';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SensorData, DeviceControl } from '@/types';
import SensorCard from '@/components/dashboard/SensorCard';
import DeviceControlCard from '@/components/dashboard/DeviceControlCard';
import AnalyticsChart from '@/components/dashboard/AnalyticsChart';
import { 
  MdDarkMode, 
  MdLightMode, 
  MdLanguage, 
  MdLogout, 
  MdDashboard, 
  MdSettings, 
  MdAnalytics,
  MdPets
} from 'react-icons/md';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [devices, setDevices] = useState<DeviceControl[]>([]);
  const [activeTab, setActiveTab] = useState<'sensors' | 'control' | 'analytics'>('sensors');

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }

    // Simulate real-time sensor data
    const interval = setInterval(() => {
      setSensorData({
        id: Date.now().toString(),
        timestamp: new Date(),
        oxygen: 18 + Math.random() * 4, // 18-22%
        co2: 2000 + Math.random() * 1000, // 2000-3000 ppm
        humidity: 60 + Math.random() * 20, // 60-80%
        relativeHumidity: 50 + Math.random() * 30, // 50-80%
        temperature: 18 + Math.random() * 12, // 18-30°C
        light: 200 + Math.random() * 300, // 200-500 lux
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [user, router]);

  // Update device names when language changes
  useEffect(() => {
    // Initialize device controls with translated names
    setDevices([
      { id: '1', name: t('device.intakeFan1'), type: 'fan', status: true, intensity: 75 },
      { id: '2', name: t('device.intakeFan2'), type: 'fan', status: false, intensity: 0 },
      { id: '3', name: t('device.exhaustFan1'), type: 'fan', status: true, intensity: 60 },
      { id: '4', name: t('device.ledLightArray1'), type: 'light', status: true, intensity: 80 },
      { id: '5', name: t('device.ledLightArray2'), type: 'light', status: false, intensity: 0 },
    ]);
  }, [t, language]);

  const handleDeviceToggle = (deviceId: string) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { ...device, status: !device.status, intensity: device.status ? 0 : 50 }
        : device
    ));
  };

  const handleDeviceIntensity = (deviceId: string, intensity: number) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { ...device, intensity, status: intensity > 0 }
        : device
    ));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <MdPets className="text-2xl text-primary" />
              <h1 className="text-xl font-bold text-foreground">
                {t('app.title')}
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md border hover:bg-accent transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <MdDarkMode className="text-lg" /> : <MdLightMode className="text-lg" />}
              </button>
              
              <button
                onClick={toggleLanguage}
                className="flex items-center px-3 py-2 rounded-md border hover:bg-accent transition-colors"
              >
                <MdLanguage className="text-lg mr-2" />
                <span className="text-sm font-medium">{language === 'en' ? 'فا' : 'EN'}</span>
              </button>
              
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{user.username}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </div>
              </div>
              
              <button
                onClick={logout}
                className="flex items-center px-3 py-2 rounded-md border hover:bg-accent transition-colors"
              >
                <MdLogout className="text-lg mr-2" />
                <span className="text-sm font-medium">{t('auth.logout')}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2">
            {(['sensors', 'control', 'analytics'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="text-lg">
                  {tab === 'sensors' && <MdDashboard />}
                  {tab === 'control' && <MdSettings />}
                  {tab === 'analytics' && <MdAnalytics />}
                </span>
                <span>
                  {tab === 'sensors' && t('nav.dashboard')}
                  {tab === 'control' && t('nav.control')}
                  {tab === 'analytics' && t('nav.analytics')}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {activeTab === 'sensors' && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <MdDashboard className="text-lg" />
                  {t('dashboard.sensorTitle')}
                </h2>
                <p className="text-muted-foreground">
                  {t('dashboard.sensorDesc')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sensorData && (
                  <>
                    <SensorCard
                      title={t('sensors.oxygen')}
                      value={sensorData.oxygen}
                      unit="%"
                      type="oxygen"
                      status={sensorData.oxygen >= 19 && sensorData.oxygen <= 21 ? 'normal' : 'warning'}
                      t={t}
                    />
                    <SensorCard
                      title={t('sensors.co2')}
                      value={sensorData.co2}
                      unit="ppm"
                      type="co2"
                      status={sensorData.co2 <= 2500 ? 'normal' : 'warning'}
                      t={t}
                    />
                    <SensorCard
                      title={t('sensors.humidity')}
                      value={sensorData.humidity}
                      unit="%"
                      type="humidity"
                      status={sensorData.humidity >= 65 && sensorData.humidity <= 75 ? 'normal' : 'warning'}
                      t={t}
                    />
                    <SensorCard
                      title={t('sensors.relativeHumidity')}
                      value={sensorData.relativeHumidity}
                      unit="%"
                      type="relativeHumidity"
                      status={sensorData.relativeHumidity >= 60 && sensorData.relativeHumidity <= 70 ? 'normal' : 'warning'}
                      t={t}
                    />
                    <SensorCard
                      title={t('sensors.temperature')}
                      value={sensorData.temperature}
                      unit="°C"
                      type="temperature"
                      status={sensorData.temperature >= 20 && sensorData.temperature <= 26 ? 'normal' : 'warning'}
                      t={t}
                    />
                    <SensorCard
                      title={t('sensors.light')}
                      value={sensorData.light}
                      unit="lux"
                      type="light"
                      status={sensorData.light >= 300 && sensorData.light <= 400 ? 'normal' : 'warning'}
                      t={t}
                    />
                  </>
                )}
              </div>
            </>
          )}

          {activeTab === 'control' && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <MdSettings className="text-lg" />
                  {t('dashboard.controlTitle')}
                </h2>
                <p className="text-muted-foreground">
                  {t('dashboard.controlDesc')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {devices.map((device) => (
                  <DeviceControlCard
                    key={device.id}
                    device={device}
                    onToggle={handleDeviceToggle}
                    onIntensityChange={handleDeviceIntensity}
                    t={t}
                  />
                ))}
              </div>
            </>
          )}

          {activeTab === 'analytics' && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <MdAnalytics className="text-lg" />
                  {t('dashboard.analyticsTitle')}
                </h2>
                <p className="text-muted-foreground">
                  {t('dashboard.analyticsDesc')}
                </p>
              </div>
              
              <div className="space-y-6">
                <AnalyticsChart sensorData={sensorData} t={t} />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}