import logoPath from "@assets/image_1754244568073.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const logoSizes = {
    sm: "h-8",
    md: "h-12", 
    lg: "h-16"
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