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
    normal: 'status-normal',
    warning: 'status-warning',
    danger: 'status-danger'
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
    <div className="md-card hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center md-gap-3">
          <div className="text-3xl p-2 rounded-full flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--md-surface-container))' }}>
            {iconMap[type]}
          </div>
          <div>
            <h3 className="md-title-medium md-mb-1" style={{ color: 'hsl(var(--md-on-surface))' }}>
              {title}
            </h3>
            <div className="flex items-baseline md-gap-1">
              <span className="md-headline-small font-bold" style={{ color: 'hsl(var(--md-on-surface))' }}>
                {value.toFixed(1)}
              </span>
              <span className="md-body-medium" style={{ color: 'hsl(var(--md-on-surface-variant))' }}>
                {unit}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end md-gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full" style={{ backgroundColor: 'hsl(var(--md-surface-container))' }}>
            <StatusIcon />
          </div>
          <div className={`px-2 py-1 rounded-full ${statusClasses[status]}`}>
            <span className="text-xs font-medium capitalize">
              {t(`status.${status}`)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'hsl(var(--md-surface-container))' }}>
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
      
      <div className="mt-3 flex justify-between items-center">
        <span className="text-sm" style={{ color: 'hsl(var(--md-on-surface-variant))' }}>
          {t('status.lastUpdated')}
        </span>
        <span className="text-sm" style={{ color: 'hsl(var(--md-on-surface-variant))' }}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}