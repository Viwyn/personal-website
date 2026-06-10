"use client";

import { useState, useEffect } from 'react';

export const useMusicFiles = () => {
    const [musicFiles, setMusicFiles] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMusicFiles = async () => {
            try {
                // Try to fetch a manifest file that lists all music files
                const response = await fetch('/api/music-files');
                if (response.ok) {
                    const files = await response.json();
                    setMusicFiles(files);
                } else {
                    // Fallback to predefined list
                    const defaultFiles = [
                        '/music/background.mp3',
                        '/music/song1.mp3',
                        '/music/song2.mp3',
                        '/music/song3.mp3'
                    ];
                    
                    // Filter out files that don't exist
                    const existingFiles = [];
                    for (const file of defaultFiles) {
                        try {
                            const fileResponse = await fetch(file, { method: 'HEAD' });
                            if (fileResponse.ok) {
                                existingFiles.push(file);
                            }
                        } catch {
                            // File doesn't exist, skip it
                        }
                    }
                    setMusicFiles(existingFiles);
                }
            } catch (error) {
                console.error(error);
                console.log('Could not load music files list, using fallback');
                setMusicFiles(['/music/background.mp3']);
            } finally {
                setLoading(false);
            }
        };

        loadMusicFiles();
    }, []);

    return { musicFiles, loading };
};