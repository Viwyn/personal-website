'use client';

import { useState } from 'react';

export const useClipboard = (text: string, duration: number = 2000) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), duration);
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
        }
    };

    return {
        copied,
        copyToClipboard
    };
};