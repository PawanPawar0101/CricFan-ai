import React from 'react';

interface TeamFlagProps {
  teamCode: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const TeamFlag: React.FC<TeamFlagProps> = ({ teamCode, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const code = teamCode.toUpperCase();

  // Custom high-definition circular SVG flags
  if (code === 'IND') {
    return (
      <div className={`relative rounded-full overflow-hidden shrink-0 border border-white/20 shadow-sm ${sizeClasses[size]} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect y="0" width="100" height="33.3" fill="#FF9933" />
          <rect y="33.3" width="100" height="33.4" fill="#FFFFFF" />
          <rect y="66.7" width="100" height="33.3" fill="#138808" />
          <circle cx="50" cy="50" r="14" fill="none" stroke="#000080" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="2.5" fill="#000080" />
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            const rad = (angle * Math.PI) / 180;
            const x = 50 + 13 * Math.cos(rad);
            const y = 50 + 13 * Math.sin(rad);
            return <line key={i} x1="50" y1="50" x2={x} y2={y} stroke="#000080" strokeWidth="1" />;
          })}
        </svg>
      </div>
    );
  }

  if (code === 'AUS') {
    return (
      <div className={`relative rounded-full overflow-hidden shrink-0 border border-white/20 shadow-sm ${sizeClasses[size]} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full bg-[#00008B]">
          {/* Union Jack in top canton */}
          <rect width="50" height="50" fill="#00247D" />
          <path d="M 0,0 L 50,50 M 50,0 L 0,50" stroke="#FFF" strokeWidth="6" />
          <path d="M 0,0 L 50,50 M 50,0 L 0,50" stroke="#CF142B" strokeWidth="3" />
          <path d="M 25,0 L 25,50 M 0,25 L 50,25" stroke="#FFF" strokeWidth="10" />
          <path d="M 25,0 L 25,50 M 0,25 L 50,25" stroke="#CF142B" strokeWidth="6" />
          {/* Commonwealth Star */}
          <polygon points="25,65 27,72 35,72 29,77 31,84 25,79 19,84 21,77 15,72 23,72" fill="#FFF" />
          {/* Southern cross dots */}
          <circle cx="80" cy="25" r="3" fill="#FFF" />
          <circle cx="90" cy="45" r="3" fill="#FFF" />
          <circle cx="80" cy="70" r="3" fill="#FFF" />
          <circle cx="65" cy="50" r="3" fill="#FFF" />
          <circle cx="73" cy="58" r="2" fill="#FFF" />
        </svg>
      </div>
    );
  }

  if (code === 'ENG') {
    return (
      <div className={`relative rounded-full overflow-hidden shrink-0 border border-white/20 shadow-sm ${sizeClasses[size]} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full bg-white">
          <rect x="42" y="0" width="16" height="100" fill="#CF142B" />
          <rect x="0" y="42" width="100" height="16" fill="#CF142B" />
        </svg>
      </div>
    );
  }

  if (code === 'SA') {
    return (
      <div className={`relative rounded-full overflow-hidden shrink-0 border border-white/20 shadow-sm ${sizeClasses[size]} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full bg-[#001489]">
          <rect y="0" width="100" height="50" fill="#E03C31" />
          <rect y="50" width="100" height="50" fill="#001489" />
          <polygon points="0,0 50,50 0,100" fill="#007749" />
          <polygon points="0,15 35,50 0,85" fill="#000" />
          <polygon points="0,10 40,50 0,90" fill="none" stroke="#FFB81C" strokeWidth="4" />
        </svg>
      </div>
    );
  }

  if (code === 'NZ') {
    return (
      <div className={`relative rounded-full overflow-hidden shrink-0 border border-white/20 shadow-sm ${sizeClasses[size]} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full bg-[#00247D]">
          <circle cx="75" cy="30" r="4" fill="#CF142B" stroke="#FFF" strokeWidth="1" />
          <circle cx="85" cy="50" r="4" fill="#CF142B" stroke="#FFF" strokeWidth="1" />
          <circle cx="75" cy="75" r="4" fill="#CF142B" stroke="#FFF" strokeWidth="1" />
          <circle cx="62" cy="52" r="3" fill="#CF142B" stroke="#FFF" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  if (code === 'PAK') {
    return (
      <div className={`relative rounded-full overflow-hidden shrink-0 border border-white/20 shadow-sm ${sizeClasses[size]} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full bg-[#115E59]">
          <rect x="0" y="0" width="28" height="100" fill="#FFFFFF" />
          {/* Crescent & star */}
          <circle cx="62" cy="50" r="22" fill="#FFFFFF" />
          <circle cx="69" cy="46" r="19" fill="#115E59" />
          <polygon points="68,36 71,43 78,43 73,47 75,54 69,50 63,54 65,47 60,43 67,43" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`rounded-full bg-slate-800 text-white flex items-center justify-center font-bold ${sizeClasses[size]} ${className}`}>
      {code}
    </div>
  );
};
