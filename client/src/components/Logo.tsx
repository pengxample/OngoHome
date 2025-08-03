interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl"
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative flex items-center">
        {/* Orange circle (left) - hollow with thicker border */}
        <div 
          className={`${sizeClasses[size]} border-8 border-[#EF6C00] rounded-full relative z-10`}
          style={{ marginRight: `-${size === 'sm' ? '8' : size === 'md' ? '12' : '16'}px` }}
        >
          {/* Horizontal transparent line through center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-2 bg-white ml-[0px] mr-[0px] pl-[40px] pr-[40px] mt-[0px] mb-[0px] pt-[0px] pb-[0px]"></div>
          </div>
        </div>
        {/* Green circle (right, overlapping) - hollow with thicker border */}
        <div className={`${sizeClasses[size]} border-8 border-[#43A047] rounded-full relative z-0`}>
          {/* Horizontal transparent line through center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-2 bg-white"></div>
          </div>
        </div>
      </div>
      <span className={`${textSizes[size]} font-bold text-foreground`}>ONGO</span>
    </div>
  );
}
