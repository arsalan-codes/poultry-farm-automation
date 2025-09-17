'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'fa';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

// Translation dictionaries
const translations = {
  en: {
    'app.title': 'Poultry Farm Automation',
    'auth.login': 'Login',
    'auth.username': 'Username',
    'auth.password': 'Password',
    'auth.logout': 'Logout',
    'nav.dashboard': 'Dashboard',
    'nav.analytics': 'Analytics',
    'nav.control': 'Device Control',
    'sensors.oxygen': 'Oxygen',
    'sensors.co2': 'CO2',
    'sensors.humidity': 'Humidity',
    'sensors.relativeHumidity': 'Relative Humidity',
    'sensors.temperature': 'Temperature',
    'sensors.light': 'Light',
    'control.fans': 'Ventilation Fans',
    'control.lights': 'Lighting System',
    'control.on': 'On',
    'control.off': 'Off',
    'analytics.realtime': 'Real-time',
    'analytics.daily': 'Daily',
    'analytics.weekly': 'Weekly',
    'analytics.monthly': 'Monthly',
    'demo.accounts': 'Demo Accounts',
    'demo.admin': 'Admin',
    'demo.manager': 'Manager',
    'demo.user': 'User',
    'status.normal': 'Normal',
    'status.warning': 'Warning',
    'status.danger': 'Danger',
    'status.status': 'Status',
    'status.intensity': 'Intensity',
    'status.lastUpdated': 'Last updated',
    'dashboard.sensorTitle': 'Real-time Sensor Monitoring',
    'dashboard.sensorDesc': 'Monitor environmental conditions in real-time with automatic updates every 2 seconds.',
    'dashboard.controlTitle': 'Device Control Panel',
    'dashboard.controlDesc': 'Control ventilation fans and lighting systems with real-time intensity adjustment.',
    'dashboard.analyticsTitle': 'Analytics Dashboard',
    'dashboard.analyticsDesc': 'Analyze historical data and trends across different time periods.',
    'analytics.export': 'Export',
    'analytics.chartType': 'Chart Type',
    'analytics.dataPoints': 'data points',
    'analytics.trends': 'Sensor Data Trends',
    'analytics.recentReadings': 'Recent Readings',
    'analytics.average': 'Average',
    'analytics.visualization': 'Real-time data visualization and export capabilities',
    'analytics.point': 'point',
    'analytics.points': 'points',
    'chart.line': 'Line',
    'chart.area': 'Area',
    'chart.bar': 'Bar',
    'loading': 'Loading...',
    'units.percent': '%',
    'units.ppm': 'ppm',
    'units.celsius': '°C',
    'units.lux': 'lux',
    'intensity.low': 'Low',
    'intensity.medium': 'Medium',
    'intensity.high': 'High',
    'device.intakeFan1': 'Intake Fan 1',
    'device.intakeFan2': 'Intake Fan 2',
    'device.exhaustFan1': 'Exhaust Fan 1',
    'device.ledLightArray1': 'LED Light Array 1',
    'device.ledLightArray2': 'LED Light Array 2'
  },
  fa: {
    'app.title': 'سیستم اتوماسیون مرغداری',
    'auth.login': 'ورود',
    'auth.username': 'نام کاربری',
    'auth.password': 'رمز عبور',
    'auth.logout': 'خروج',
    'nav.dashboard': 'داشبورد',
    'nav.analytics': 'گزارشات و آنالیز',
    'nav.control': 'کنترل دستگاه‌ها',
    'sensors.oxygen': 'اکسیژن',
    'sensors.co2': 'دی اکسید کربن',
    'sensors.humidity': 'رطوبت بستر',
    'sensors.relativeHumidity': 'رطوبت نسبی هوا',
    'sensors.temperature': 'دمای سالن',
    'sensors.light': 'نور',
    'control.fans': 'فن‌های ورودی هوا',
    'control.lights': 'سیستم روشنایی',
    'control.on': 'روشن',
    'control.off': 'خاموش',
    'analytics.realtime': 'لحظه‌ای',
    'analytics.daily': 'روزانه',
    'analytics.weekly': 'هفتگی',
    'analytics.monthly': 'ماهانه',
    'demo.accounts': 'حساب‌های نمونه',
    'demo.admin': 'مدیر کل',
    'demo.manager': 'مدیر',
    'demo.user': 'کاربر',
    'status.normal': 'عادی',
    'status.warning': 'هشدار',
    'status.danger': 'خطر',
    'status.status': 'وضعیت',
    'status.intensity': 'شدت',
    'status.lastUpdated': 'آخرین بروزرسانی',
    'dashboard.sensorTitle': 'مانیتورینگ سنسورها به صورت زنده',
    'dashboard.sensorDesc': 'مانیتورینگ شرایط محیطی به صورت لحظه‌ای با بروزرسانی خودکار هر ۲ ثانیه.',
    'dashboard.controlTitle': 'پنل کنترل دستگاه‌ها',
    'dashboard.controlDesc': 'کنترل فن‌های تهویه و سیستم‌های روشنایی با امکان تنظیم شدت به صورت لحظه‌ای.',
    'dashboard.analyticsTitle': 'داشبورد گزارشات',
    'dashboard.analyticsDesc': 'تجزیه و تحلیل داده‌های تاریخی و روندها در دوره‌های زمانی مختلف.',
    'analytics.export': 'دریافت خروجی',
    'analytics.chartType': 'نوع نمودار',
    'analytics.dataPoints': 'نقطه داده',
    'analytics.trends': 'روند داده‌های سنسورها',
    'analytics.recentReadings': 'آخرین خوانش‌ها',
    'analytics.average': 'میانگین',
    'analytics.visualization': 'تجسم داده‌های زنده و قابلیت دریافت خروجی',
    'analytics.point': 'نقطه',
    'analytics.points': 'نقطه',
    'chart.line': 'خطی',
    'chart.area': 'سطحی',
    'chart.bar': 'ستونی',
    'loading': 'در حال بارگذاری...',
    'units.percent': '٪',
    'units.ppm': 'پی‌پی‌ام',
    'units.celsius': '°س',
    'units.lux': 'لوکس',
    'intensity.low': 'کم',
    'intensity.medium': 'متوسط',
    'intensity.high': 'زیاد',
    'device.intakeFan1': 'فن ورودی ۱',
    'device.intakeFan2': 'فن ورودی ۲',
    'device.exhaustFan1': 'فن خروجی ۱',
    'device.ledLightArray1': 'آرایه نور LED ۱',
    'device.ledLightArray2': 'آرایه نور LED ۲'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'fa'>('en');

  useEffect(() => {
    // Check for saved language preference
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as 'en' | 'fa' | null;
      const initialLang = savedLang || 'en';
      setLanguage(initialLang);
      
      // Set document direction and language
      document.documentElement.dir = initialLang === 'fa' ? 'rtl' : 'ltr';
      document.documentElement.lang = initialLang;
      
      // Also set the dir attribute on html element
      document.documentElement.setAttribute('dir', initialLang === 'fa' ? 'rtl' : 'ltr');
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'fa' : 'en';
    setLanguage(newLang);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLang);
      
      // Update document direction and language
      document.documentElement.dir = newLang === 'fa' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLang;
      document.documentElement.setAttribute('dir', newLang === 'fa' ? 'rtl' : 'ltr');
    }
  };

  const t = (key: string): string => {
    const langTranslations = translations[language];
    return langTranslations[key as keyof typeof langTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}