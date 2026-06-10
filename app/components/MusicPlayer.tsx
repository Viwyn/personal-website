"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaVolumeUp, FaVolumeMute, FaStepForward, FaStepBackward } from 'react-icons/fa';
import { useMusicFiles } from '../hooks/useMusicFiles';

interface MusicPlayerProps {
    musicFiles?: string[];
    volume?: number;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
    musicFiles: propMusicFiles,
    volume = 0.3
}) => {
    const { musicFiles: dynamicMusicFiles, loading } = useMusicFiles();
    const musicFiles = propMusicFiles || dynamicMusicFiles;

    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const nextTrack = () => {
        setCurrentTrackIndex((prevIndex) =>
            (prevIndex + 1) % musicFiles.length
        );
    };

    const previousTrack = () => {
        setCurrentTrackIndex((prevIndex) =>
            prevIndex === 0 ? musicFiles.length - 1 : prevIndex - 1
        );
    };

    const toggleMute = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isMuted) {
            audio.muted = false;
            if (!isPlaying) {
                try {
                    await audio.play();
                    setIsPlaying(true);
                } catch (error) {
                    console.log('Failed to play audio:', error);
                }
            }
        } else {
            audio.muted = true;
        }
        setIsMuted(!isMuted);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || musicFiles.length === 0) return;

        audio.volume = volume;
        audio.src = musicFiles[currentTrackIndex];

        // Auto-play when component mounts or track changes
        const playAudio = async () => {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (error) {
                console.error(error)
                console.log('Auto-play prevented. User interaction required.');
            }
        };

        playAudio();

        // Handle track ending - move to next track
        const handleTrackEnd = () => {
            nextTrack();
        };

        audio.addEventListener('ended', handleTrackEnd);

        return () => {
            audio.removeEventListener('ended', handleTrackEnd);
            audio.pause();
        };
    }, [currentTrackIndex, musicFiles, volume, nextTrack]);

    // Handle first user interaction to start playing
    useEffect(() => {
        const handleFirstInteraction = async () => {
            const audio = audioRef.current;
            if (audio && !isPlaying && !isMuted) {
                try {
                    await audio.play();
                    setIsPlaying(true);
                } catch (error) {
                    console.log('Failed to play audio on interaction:', error);
                }
            }
        };

        // Add event listeners for first user interaction
        document.addEventListener('click', handleFirstInteraction, { once: true });
        document.addEventListener('keydown', handleFirstInteraction, { once: true });
        document.addEventListener('touchstart', handleFirstInteraction, { once: true });

        return () => {
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
        };
    }, [isPlaying, isMuted]);

    // Don't render if still loading or no music files
    if (loading || musicFiles.length === 0) {
        return null;
    }

    return (
        <>
            <audio ref={audioRef} preload="auto" />
            <div
                className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
            >
                {/* Track controls - only show when hovering and there are multiple tracks */}
                {showControls && musicFiles.length > 1 && (
                    <div className="flex gap-2 bg-black/50 backdrop-blur-sm rounded-lg p-2">
                        <button
                            onClick={previousTrack}
                            className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                            title="Previous Track"
                        >
                            <FaStepBackward size={16} />
                        </button>
                        <button
                            onClick={nextTrack}
                            className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                            title="Next Track"
                        >
                            <FaStepForward size={16} />
                        </button>
                    </div>
                )}

                {/* Mute button */}
                <button
                    onClick={toggleMute}
                    className="bg-pink-500 hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 group"
                    title={isMuted ? "Unmute Music" : "Mute Music"}
                >
                    {isMuted ? (
                        <FaVolumeMute size={20} className="group-hover:animate-pulse" />
                    ) : (
                        <FaVolumeUp size={20} className="group-hover:animate-pulse" />
                    )}
                </button>

                {/* Track info - only show when hovering and there are multiple tracks */}
                {showControls && musicFiles.length > 1 && (
                    <div className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                        {currentTrackIndex + 1} / {musicFiles.length}
                    </div>
                )}
            </div>
        </>
    );
};

export default MusicPlayer;