import React from 'react';

interface LogoProps {
  className?: string;
}

export function BreadBridgeLogo({ className = '' }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Bread loaf shape forming a bridge */}
      <path 
        d="M8 28 C8 24, 10 22, 14 22 L20 22 C20 18, 22 16, 24 16 C26 16, 28 18, 28 22 L34 22 C38 22, 40 24, 40 28 L40 32 C40 34, 38 36, 34 36 L14 36 C10 36, 8 34, 8 32 Z" 
        fill="#E07A5F"
      />
      {/* Texture lines on bread */}
      <path 
        d="M12 26 Q14 24, 16 26" 
        stroke="#FAF3E0" 
        strokeWidth="1.5" 
        strokeLinecap="round"
        fill="none"
      />
      <path 
        d="M18 24 Q20 22, 22 24" 
        stroke="#FAF3E0" 
        strokeWidth="1.5" 
        strokeLinecap="round"
        fill="none"
      />
      <path 
        d="M26 24 Q28 22, 30 24" 
        stroke="#FAF3E0" 
        strokeWidth="1.5" 
        strokeLinecap="round"
        fill="none"
      />
      <path 
        d="M32 26 Q34 24, 36 26" 
        stroke="#FAF3E0" 
        strokeWidth="1.5" 
        strokeLinecap="round"
        fill="none"
      />
      {/* Bridge arch underneath */}
      <path 
        d="M10 32 L10 34 L38 34 L38 32" 
        stroke="#E07A5F" 
        strokeWidth="2" 
        fill="none"
      />
    </svg>
  );
}
