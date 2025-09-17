import { 
  MdAir, 
  MdThermostat, 
  MdWaterDrop, 
  MdCloud, 
  MdLightbulb,
  MdCheckCircle,
  MdWarning,
  MdError
} from 'react-icons/md';

interface SensorCardProps {
  title: string;
  value: number;
  unit: string;
  type: 'oxygen' | 'co2' | 'humidity' | 'relativeHumidity' | 'temperature' | 'light';
  status: 'normal' | 'warning' | 'danger';
  t: (key: string) => string; // Add translation function
}

export default function SensorCard({ title, value, unit, type, status, t }: SensorCardProps) {
  const statusClasses = {
    normal: 'md-status-normal',
    warning: 'md-status-warning',
    danger: 'md-status-danger'
  };

  const statusDots = {
    normal: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500'
  };
  
  const iconMap = {
    oxygen: <MdAir className="text-blue-600 text-2xl" />,
    co2: <MdCloud className="text-gray-600 text-2xl" />,
    humidity: <MdWaterDrop className="text-blue-500 text-2xl" />,
    relativeHumidity: <MdWaterDrop className="text-cyan-500 text-2xl" />,
    temperature: <MdThermostat className="text-red-500 text-2xl" />,
    light: <MdLightbulb className="text-yellow-500 text-2xl" />
  };
  
  const StatusIcon = () => {
    switch(status) {
      case 'normal': return <MdCheckCircle className="text-green-500 text-lg" />;
      case 'warning': return <MdWarning className="text-yellow-500 text-lg" />;
      case 'danger': return <MdError className="text-red-500 text-lg" />;
      default: return <MdCheckCircle className="text-green-500 text-lg" />;
    }
  };

  return (
    <div className={`md-card-elevated ${statusClasses[status]} transition-all duration-300 hover:shadow-md-4`}>
      <div className="flex items-start justify-between mb-md-4">
        <div className="flex items-center md-gap-3">
          <div className="text-3xl p-md-2 rounded-full bg-md-surface-container flex items-center justify-center">
            {iconMap[type]}
          </div>
          <div>
            <h3 className="md-title-medium text-md-on-surface mb-md-1">
              {title}
            </h3>
            <div className="flex items-baseline md-gap-1">
              <span className="md-headline-small font-bold text-md-on-surface">
                {value.toFixed(1)}
              </span>
              <span className="md-body-medium text-md-on-surface-variant">
                {unit}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end md-gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-md-surface-container">
            <StatusIcon />
          </div>
          <div className="px-md-2 py-md-1 rounded-full bg-md-surface-container">
            <span className="md-label-small text-md-on-surface capitalize">
              {t(`status.${status}`)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="h-2 bg-md-surface-container rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ${
            status === 'normal' ? 'bg-green-500' :
            status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ 
            width: `${Math.min(100, Math.max(0, 
              status === 'normal' ? 85 : 
              status === 'warning' ? 65 : 35
            ))}%` 
          }}
        />
      </div>
      
      <div className="mt-md-3 flex justify-between items-center">
        <span className="md-body-small text-md-on-surface-variant">
          {t('status.lastUpdated')}
        </span>
        <span className="md-body-small text-md-on-surface-variant">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}