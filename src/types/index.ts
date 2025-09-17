export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
}

export interface SensorData {
  id: string;
  timestamp: Date;
  oxygen: number;
  co2: number;
  humidity: number;
  relativeHumidity: number;
  temperature: number;
  light: number;
}

export interface DeviceControl {
  id: string;
  name: string;
  type: 'fan' | 'light';
  status: boolean;
  intensity?: number;
}

export interface AnalyticsData {
  period: 'realtime' | 'daily' | 'weekly' | 'monthly';
  data: SensorData[];
  averages: {
    oxygen: number;
    co2: number;
    humidity: number;
    relativeHumidity: number;
    temperature: number;
    light: number;
  };
}