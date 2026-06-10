'use client';

import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

interface MobileAlertProps {
    isVisible: boolean;
    onDismiss: () => void;
}

export default function MobileAlert({ isVisible, onDismiss }: MobileAlertProps) {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="relative bg-pink-100 dark:bg-slate-800 border-2 border-pink-300 dark:border-sky-300 rounded-xl shadow-2xl max-w-md w-full mx-4 animate-bounce-in">
                {/* Close button */}
                <button
                    onClick={onDismiss}
                    className="absolute top-3 right-3 text-slate-500 dark:text-sky-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200"
                    aria-label="Close alert"
                >
                    <FaTimes size={18} />
                </button>

                {/* Alert content */}
                <div className="p-6 pt-8">
                    {/* Icon and title */}
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-16 h-16 bg-pink-200 dark:bg-sky-900 rounded-full flex items-center justify-center mb-2">
                            <FaExclamationTriangle className="text-2xl text-pink-600 dark:text-sky-300" />
                        </div>
                    </div>

                    <h2 className="text-xl font-comfortaa font-semibold text-center text-slate-700 dark:text-sky-200 mb-3">
                        📱 Mobile Detected!
                    </h2>

                    <div className="text-center space-y-3">
                        <p className="text-base font-comfortaa font-normal text-slate-600 dark:text-pink-200">
                            Hi there, adventurer! 🌸
                        </p>
                        <p className="text-sm font-comfortaa font-light text-slate-600 dark:text-pink-200">
                            This webpage was lovingly crafted for <span className="font-semibold text-pink-500 dark:text-pink-400">desktop browsers</span> and might feel a bit wonky on mobile devices~
                        </p>
                        <p className="text-sm font-comfortaa font-light text-slate-600 dark:text-pink-200">
                            For the best experience, try visiting on a computer! 💻✨
                        </p>
                    </div>

                    {/* Dismiss button */}
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={onDismiss}
                            className="px-6 py-2 bg-pink-500 dark:bg-sky-600 text-white font-comfortaa font-medium rounded-lg hover:bg-pink-600 dark:hover:bg-sky-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                        >
                            Got it! 💖
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0.3) rotate(-10deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.05) rotate(2deg);
          }
          70% {
            transform: scale(0.9) rotate(-1deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
        </div>
    );
}