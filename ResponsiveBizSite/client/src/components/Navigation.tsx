import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/configurator", label: "Configurator" },
    { href: "/upload-quote", label: "Get Quote" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" data-testid="link-home">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent cursor-pointer">
              LaserCut.pk
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`${
                    location === link.href
                      ? "text-primary"
                      : "text-white/80 hover:text-white"
                  }`}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* CTA Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link href="/upload-quote">
              <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10" data-testid="button-upload-design">
                Upload Design
              </Button>
            </Link>
            <Link href="/configurator">
              <Button className="bg-primary hover:bg-primary/90" data-testid="button-instant-quote">
                Get Instant Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    location === link.href
                      ? "text-primary bg-primary/10"
                      : "text-white/80"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Link href="/upload-quote">
                <Button
                  variant="outline"
                  className="w-full border-primary/50 text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="button-mobile-upload"
                >
                  Upload Design
                </Button>
              </Link>
              <Link href="/configurator">
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="button-mobile-quote"
                >
                  Get Instant Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
