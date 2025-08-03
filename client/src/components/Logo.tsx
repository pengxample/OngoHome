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
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className="relative">
        {/* Orange circle */}
        <div className={`${sizeClasses[size]} bg-primary rounded-full`}></div>
        {/* Green circle overlapping */}
        <div className={`${sizeClasses[size]} bg-secondary rounded-full absolute top-0 left-4 -ml-2`}></div>
      </div>
      <span className={`${textSizes[size]} font-bold text-foreground ml-2`}>ONGO</span>
    </div>
  );
}
