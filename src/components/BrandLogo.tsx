import React from 'react';
import { BrandType } from '../types';

interface BrandLogoProps {
  brand: BrandType;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  brand,
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-11 h-11 rounded-xl',
    lg: 'w-14 h-14 rounded-2xl',
  }[size];

  switch (brand) {
    case 'claude':
      return (
        <div
          className={`${sizeClasses} bg-[#d97757] flex items-center justify-center shadow-sm flex-shrink-0 ${className}`}
        >
          {/* Claude 8-pointed starburst / asterisk */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="w-3/5 h-3/5 text-white"
          >
            <line x1="12" y1="2" x2="12" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
          </svg>
        </div>
      );

    case 'google':
      return (
        <div
          className={`${sizeClasses} bg-[#1a73e8] flex items-center justify-center shadow-sm flex-shrink-0 ${className}`}
        >
          {/* Google AI 4-point sparkle */}
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3/5 h-3/5 text-white"
          >
            <path d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4772 12 22C12 16.4772 16.4772 12 22 12C16.4772 12 12 7.52285 12 2Z" />
          </svg>
        </div>
      );

    case 'chatgpt':
      return (
        <div
          className={`${sizeClasses} bg-[#10a37f] flex items-center justify-center shadow-sm flex-shrink-0 ${className}`}
        >
          {/* OpenAI Swirl */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3/5 h-3/5 text-white"
          >
            <path d="M19.34 9.5a5.5 5.5 0 0 0-.49-3.9 5.57 5.57 0 0 0-4.9-2.76 5.8 5.8 0 0 0-2.31.48 5.53 5.53 0 0 0-4.3-2.18 5.6 5.6 0 0 0-5.32 3.86 5.52 5.52 0 0 0 .91 5.48 5.5 5.5 0 0 0-.49 3.9 5.57 5.57 0 0 0 4.9 2.76c.79 0 1.57-.16 2.31-.48a5.53 5.53 0 0 0 4.3 2.18 5.6 5.6 0 0 0 5.32-3.86 5.52 5.52 0 0 0-.91-5.48Z" />
          </svg>
        </div>
      );

    case 'kiro':
      return (
        <div
          className={`${sizeClasses} bg-[#7c3aed] flex items-center justify-center shadow-sm flex-shrink-0 ${className}`}
        >
          {/* Kiro Cute Ghost Icon */}
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3/5 h-3/5 text-white"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9v11c0 .55.45 1 1 1 .28 0 .53-.11.71-.29L9 18.41l2.29 2.29c.39.39 1.02.39 1.41 0L15 18.41l2.29 2.29c.18.18.43.29.71.29.55 0 1-.45 1-1V9c0-3.87-3.13-7-7-7zm-3 8c-.83 0-1.5-.67-1.5-1.5S8.17 7 9 7s1.5.67 1.5 1.5S9.83 10 9 10zm6 0c-.83 0-1.5-.67-1.5-1.5S14.17 7 15 7s1.5.67 1.5 1.5S15.83 10 15 10z" />
          </svg>
        </div>
      );

    case 'cursor':
      return (
        <div
          className={`${sizeClasses} bg-[#171717] flex items-center justify-center shadow-sm flex-shrink-0 ${className}`}
        >
          {/* 3D Isometric Cube Cursor Icon */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3/5 h-3/5 text-white"
          >
            <path d="m21 16-9 5-9-5V8l9-5 9 5v8Z" />
            <path d="m3 8 9 5 9-5" />
            <path d="M12 13v8" />
          </svg>
        </div>
      );

    case 'qoder':
      return (
        <div
          className={`${sizeClasses} bg-[#0b1320] flex items-center justify-center shadow-sm flex-shrink-0 relative overflow-hidden ${className}`}
        >
          <div className="w-4 h-4 rounded-full border-2 border-emerald-400 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full opacity-60" />
        </div>
      );

    case 'leonardo':
      return (
        <div
          className={`${sizeClasses} bg-[#181528] border border-purple-900/40 flex items-center justify-center shadow-sm flex-shrink-0 ${className}`}
        >
          {/* Leonardo Portrait Avatar Mask */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3/5 h-3/5 text-amber-200"
          >
            <circle cx="12" cy="8" r="5" />
            <path d="M20 21a8 8 0 1 0-16 0" />
            <path d="M12 13v3" />
            <path d="M9 18h6" />
          </svg>
        </div>
      );

    case 'deepseek':
      return (
        <div
          className={`${sizeClasses} bg-[#3b82f6] flex items-center justify-center shadow-sm flex-shrink-0 ${className}`}
        >
          {/* DeepSeek Whale / Wave */}
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3/5 h-3/5 text-white"
          >
            <path d="M12 3C7.03 3 3 7.03 3 12c0 3.86 2.45 7.15 5.92 8.39.51.09.7-.22.7-.49 0-.24-.01-.88-.01-1.72-2.39.52-2.89-1.15-2.89-1.15-.39-.99-.95-1.25-.95-1.25-.78-.53.06-.52.06-.52.86.06 1.31.88 1.31.88.77 1.32 2.01.94 2.5.72.08-.56.3-.94.55-1.16-1.91-.22-3.92-.95-3.92-4.24 0-.94.34-1.7 89-2.3-.09-.22-.39-1.09.08-2.27 0 0 .72-.23 2.36.88.68-.19 1.42-.29 2.15-.29.73 0 1.47.1 2.15.29 1.64-1.11 2.36-.88 2.36-.88.47 1.18.17 2.05.08 2.27.55.6 89 1.36.89 2.3 0 3.3-2.01 4.02-3.93 4.24.31.27.59.8.59 1.61 0 1.16-.01 2.1-.01 2.38 0 .27.19.59.71.49C18.55 19.15 21 15.86 21 12c0-4.97-4.03-9-9-9z" />
          </svg>
        </div>
      );

    case 'openai':
      return (
        <div
          className={`${sizeClasses} bg-[#10a37f] flex items-center justify-center shadow-sm flex-shrink-0 ${className}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3/5 h-3/5 text-white"
          >
            <circle cx="7.5" cy="15.5" r="4.5" />
            <path d="m21 2-9.6 9.6" />
            <path d="m15.5 7.5 3 3L22 7l-3-3-3.5 3.5Z" />
          </svg>
        </div>
      );

    default:
      return (
        <div
          className={`${sizeClasses} bg-neutral-900 flex items-center justify-center shadow-sm flex-shrink-0 ${className}`}
        >
          <span className="text-white font-bold text-sm">AI</span>
        </div>
      );
  }
};
