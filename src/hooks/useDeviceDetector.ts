import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export function useDeviceDetector(): DeviceType {
    const [device, setDevice] = useState<DeviceType>('desktop');

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setDevice('mobile');
            } else if (width >= 768 && width < 1024) {
                setDevice('tablet');
            } else {
                setDevice('desktop');
            }
        };

        // Initial measurement
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return device;
}
