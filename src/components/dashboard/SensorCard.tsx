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
    normal: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
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
    <div className="bg-card text-card-foreground p-6 rounded-lg border shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl p-2 rounded-full flex items-center justify-center bg-muted">
            {iconMap[type]}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {title}
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">
                {value.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">
                {unit}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
            <StatusIcon />
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
            <span className="capitalize">
              {t(`status.${status}`)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="h-2 rounded-full overflow-hidden bg-muted">
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
        <span className="text-sm text-muted-foreground">
          {t('status.lastUpdated')}
        </span>
        <span className="text-sm text-muted-foreground">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}