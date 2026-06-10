'use client';

import { useState, useEffect } from 'react';

export const useMobileAlert = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [hasShownAlert, setHasShownAlert] = useState(false);

    useEffect(() => {
        // check if alert has been shown before
        const alertShown = localStorage.getItem('mobile-alert-shown');
        if (alertShown) {
            setHasShownAlert(true);
        }

        // check if device is mobile
        const checkMobile = () => {
            const isMobileDevice = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            setIsMobile(isMobileDevice);

            if (isMobileDevice && !alertShown) {
                setShowAlert(true);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const dismissAlert = () => {
        setShowAlert(false);
        setHasShownAlert(true);
        localStorage.setItem('mobile-alert-shown', 'true');
    };

    return {
        isMobile,
        showAlert,
        dismissAlert,
        hasShownAlert
    };
};