import React from 'react';

interface HandsIllustrationProps {
  className?: string;
}

export function HandsIllustration({ className = '' }: HandsIllustrationProps) {
  return (
    <svg 
      viewBox="0 0 400 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle decoration */}
      <circle cx="200" cy="200" r="180" fill="#F4D35E" opacity="0.1" />
      <circle cx="200" cy="200" r="140" fill="#81B29A" opacity="0.1" />
      
      {/* Left hand (passing) */}
      <path 
        d="M80 200 Q90 180, 110 180 L130 180 Q140 180, 140 190 L140 220 Q140 230, 130 230 L100 230 Q85 230, 80 220 Z" 
        fill="#E07A5F"
      />
      <ellipse cx="120" cy="205" rx="8" ry="12" fill="#D06A4F" />
      
      {/* Center hand (middle person) */}
      <path 
        d="M170 190 Q180 170, 200 170 L220 170 Q230 170, 230 180 L230 210 Q230 220, 220 220 L190 220 Q175 220, 170 210 Z" 
        fill="#81B29A"
      />
      <ellipse cx="210" cy="195" rx="8" ry="12" fill="#71A28A" />
      
      {/* Right hand (receiving) */}
      <path 
        d="M260 200 Q270 180, 290 180 L310 180 Q320 180, 320 190 L320 220 Q320 230, 310 230 L280 230 Q265 230, 260 220 Z" 
        fill="#F4D35E"
      />
      <ellipse cx="300" cy="205" rx="8" ry="12" fill="#E4C34E" />
      
      {/* Food items being passed */}
      {/* Bread */}
      <ellipse cx="150" cy="200" rx="20" ry="15" fill="#F4D35E" />
      <path d="M135 195 Q140 192, 145 195" stroke="#E4C34E" strokeWidth="2" fill="none" />
      <path d="M155 195 Q160 192, 165 195" stroke="#E4C34E" strokeWidth="2" fill="none" />
      
      {/* Apple */}
      <circle cx="240" cy="195" r="12" fill="#E07A5F" />
      <path d="M240 183 Q240 180, 243 178" stroke="#81B29A" strokeWidth="2" strokeLinecap="round" fill="none" />
      
      {/* Vegetables */}
      <ellipse cx="190" cy="210" rx="10" ry="6" fill="#81B29A" />
      <ellipse cx="200" cy="208" rx="8" ry="5" fill="#71A28A" />
      
      {/* Connection arrows/flow */}
      <path 
        d="M145 195 L165 190" 
        stroke="#E07A5F" 
        strokeWidth="2" 
        strokeDasharray="4 4" 
        opacity="0.5"
      />
      <path 
        d="M235 190 L255 195" 
        stroke="#81B29A" 
        strokeWidth="2" 
        strokeDasharray="4 4" 
        opacity="0.5"
      />
      
      {/* Heart symbols */}
      <path 
        d="M140 250 C140 245, 145 242, 148 245 C151 242, 156 245, 156 250 C156 255, 148 262, 148 262 C148 262, 140 255, 140 250 Z" 
        fill="#E07A5F" 
        opacity="0.6"
      />
      <path 
        d="M240 260 C240 255, 245 252, 248 255 C251 252, 256 255, 256 260 C256 265, 248 272, 248 272 C248 272, 240 265, 240 260 Z" 
        fill="#81B29A" 
        opacity="0.6"
      />
      
      {/* Decorative dots */}
      <circle cx="100" cy="150" r="4" fill="#F4D35E" opacity="0.5" />
      <circle cx="300" cy="160" r="4" fill="#E07A5F" opacity="0.5" />
      <circle cx="120" cy="280" r="3" fill="#81B29A" opacity="0.5" />
      <circle cx="280" cy="270" r="3" fill="#F4D35E" opacity="0.5" />
    </svg>
  );
}
