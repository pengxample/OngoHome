import logoPath from "@assets/image_1754244568073.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const logoSizes = {
    sm: "h-12",
    md: "h-16", 
    lg: "h-20"
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoPath} 
        alt="ONGO Logo" 
        className={`${logoSizes[size]} w-auto`}
      />
    </div>
  );
}