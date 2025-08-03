import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Hem", href: "/" },
    { name: "Kategorier", href: "/kategorier" },
    { name: "Om oss", href: "/om-oss" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a className={`font-medium transition-colors ${
                  location === item.href
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}>
                  {item.name}
                </a>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Link href="/butiker">
              <Button className="bg-primary text-primary-foreground hover:bg-orange-600">
                Hitta butik
              </Button>
            </Link>

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden p-2">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a 
                        className={`font-medium text-lg transition-colors ${
                          location === item.href
                            ? 'text-primary'
                            : 'text-foreground hover:text-primary'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                  <Link href="/butiker">
                    <Button 
                      className="bg-primary text-primary-foreground hover:bg-orange-600 mt-4"
                      onClick={() => setIsOpen(false)}
                    >
                      Hitta butik
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
