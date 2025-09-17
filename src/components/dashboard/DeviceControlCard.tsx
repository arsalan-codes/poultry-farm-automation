import { DeviceControl } from '@/types';
import { MdAir, MdLightbulb, MdPowerSettingsNew, MdTune } from 'react-icons/md';

interface DeviceControlCardProps {
  device: DeviceControl;
  onToggle: (deviceId: string) => void;
  onIntensityChange: (deviceId: string, intensity: number) => void;
  t: (key: string) => string;
}

export default function DeviceControlCard({ 
  device, 
  onToggle, 
  onIntensityChange, 
  t 
}: DeviceControlCardProps) {
  const icon = device.type === 'fan' ? 
    <MdAir className="text-2xl text-blue-500" /> : 
    <MdLightbulb className="text-2xl text-yellow-500" />;
    
  const deviceTypeLabel = device.type === 'fan' ? t('control.fans') : t('control.lights');
  
  return (
    <div className="md-card-elevated transition-all duration-300 hover:shadow-md-4">
      <div className="flex items-start justify-between mb-md-6">
        <div className="flex items-center md-gap-3">
          <div className="p-md-3 rounded-xl bg-md-primary-container text-md-on-primary-container flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h3 className="md-title-medium text-md-on-surface mb-md-1">
              {device.name}
            </h3>
            <p className="md-body-small text-md-on-surface-variant">
              {deviceTypeLabel}
            </p>
          </div>
        </div>
        
        <div className="flex items-center md-gap-2">
          <MdPowerSettingsNew className={`text-xl ${
            device.status ? 'text-green-500' : 'text-md-outline-variant'
          }`} />
          <div className={`w-3 h-3 rounded-full shadow-md-1 ${
            device.status ? 'bg-green-500' : 'bg-md-outline-variant'
          }`} />
        </div>
      </div>

      <div className="space-y-md-4">
        <div className="flex items-center justify-between">
          <span className="md-label-large text-md-on-surface">
            {t('status.status')}
          </span>
          <button
            onClick={() => onToggle(device.id)}
            className={`md-button-tonal transition-all duration-200 ${
              device.status
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                : 'bg-md-surface-container-high text-md-on-surface-variant'
            }`}
          >
            <span className="md-label-medium">
              {device.status ? t('control.on') : t('control.off')}
            </span>
          </button>
        </div>

        {device.status && (
          <div className="space-y-md-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center md-gap-2">
                <MdTune className="text-md-on-surface text-lg" />
                <span className="md-label-medium text-md-on-surface">
                  {t('status.intensity')}
                </span>
              </div>
              <div className="flex items-center md-gap-2">
                <span className="md-body-small text-md-on-surface-variant min-w-[3rem] text-right">
                  {device.intensity}%
                </span>
                <div className={`w-3 h-3 rounded-full ${
                  (device.intensity || 0) > 80 ? 'bg-red-500' :
                  (device.intensity || 0) > 50 ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
              </div>
            </div>
            
            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={device.intensity || 0}
                onChange={(e) => onIntensityChange(device.id, parseInt(e.target.value))}
                className="w-full h-2 bg-md-surface-container-high rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, hsl(var(--md-primary)) 0%, hsl(var(--md-primary)) ${device.intensity || 0}%, hsl(var(--md-surface-container-high)) ${device.intensity || 0}%, hsl(var(--md-surface-container-high)) 100%)`
                }}
              />
              <style jsx>{`
                .slider::-webkit-slider-thumb {
                  appearance: none;
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: hsl(var(--md-primary));
                  cursor: pointer;
                  box-shadow: var(--md-elevation-2);
                }
                .slider::-moz-range-thumb {
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: hsl(var(--md-primary));
                  cursor: pointer;
                  border: none;
                  box-shadow: var(--md-elevation-2);
                }
              `}</style>
            </div>
            
            <div className="flex justify-between text-xs text-md-on-surface-variant">
              <span>{t('intensity.low')}</span>
              <span>{t('intensity.medium')}</span>
              <span>{t('intensity.high')}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-md-4 pt-md-4 border-t border-md-outline-variant">
        <div className="flex items-center justify-between">
          <span className="md-body-small text-md-on-surface-variant">
            {t('status.lastUpdated')}
          </span>
          <span className="md-body-small text-md-on-surface-variant">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
}