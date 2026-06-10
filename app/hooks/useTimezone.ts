'use client';

import { useState } from 'react';

export const useTimezone = (myTimezone: string = 'Asia/Singapore') => {
    const [showTimezone, setShowTimezone] = useState(false);

    const getTimezoneInfo = () => {
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const userTime = new Date().toLocaleTimeString('en-US', {
            timeZone: userTimezone,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
        const myTime = new Date().toLocaleTimeString('en-US', {
            timeZone: myTimezone, // GMT+8
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
        return { userTime, myTime, userTimezone };
    };

    const toggleTimezone = () => {
        setShowTimezone(!showTimezone);
    };

    return {
        showTimezone,
        toggleTimezone,
        getTimezoneInfo
    };
};