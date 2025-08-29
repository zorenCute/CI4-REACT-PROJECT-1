import { useState, useEffect } from 'react';
import { useConfig } from '../lib/ConfigProvider';
export default function useMaintenance() {
  const { config } = useConfig();
  const [maintenance, setMaintenance] = useState<{
    isActive: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    const checkMaintenance = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/api/maintenance/status`);
        const data = await response.json();
        setMaintenance({
          isActive: data.isMaintenance,
          message: data.message || 'System under maintenance'
        });
      } catch (error) {
        console.error('Maintenance check failed:', error);
        setMaintenance({
          isActive: false,
          message: ''
        });
      }
    };

    checkMaintenance();
    const interval = setInterval(checkMaintenance, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return maintenance;
}