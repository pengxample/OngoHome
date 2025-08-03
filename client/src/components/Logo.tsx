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
        {/* Orange circle (left) - hollow */}
        <div 
          className="w-8 h-8 border-4 border-[#EF6C00] rounded-full relative z-10 ml-[-14px] mr-[-14px] mt-[0px] mb-[0px] pl-[0px] pr-[0px] pt-[0px] pb-[0px]"
          style={{ marginRight: `-${size === 'sm' ? '8' : size === 'md' ? '12' : '16'}px` }}
        ></div>
        {/* Green circle (right, overlapping) - hollow */}
        <div className={`${sizeClasses[size]} border-4 border-[#43A047] rounded-full relative z-0`}></div>
      </div>
      <span className={`${textSizes[size]} font-bold text-foreground`}>ONGO</span>
    </div>
  );
}
