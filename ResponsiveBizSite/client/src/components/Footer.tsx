import { Link } from "wouter";
import { Facebook, Instagram, Send } from "lucide-react";
import { SiTiktok } from "react-icons/si";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              LaserCut.pk
            </h3>
            <p className="text-sm text-white/60">
              Precision laser cutting services in Islamabad. Acrylic, MDF, wood & metal cutting, 3D LED signboards, custom home décor.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-white/60 hover:text-primary transition-colors" data-testid="link-footer-home">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-white/60 hover:text-primary transition-colors" data-testid="link-footer-products">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/configurator" className="text-sm text-white/60 hover:text-primary transition-colors" data-testid="link-footer-configurator">
                  Configurator
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-white/60 hover:text-primary transition-colors" data-testid="link-footer-about">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Services</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Acrylic Cutting</li>
              <li>3D LED Signboards</li>
              <li>Custom Home Décor</li>
              <li>Acrylic Nameplates</li>
              <li>Corporate Gifts</li>
              <li>MDF & Wood Cutting</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Contact</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>📞 +92 321 7000586</li>
              <li>✉️ autoc639@gmail.com</li>
              <li>📍 Islamabad, Pakistan</li>
            </ul>
            <div className="flex gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-colors hover-elevate"
                data-testid="link-facebook"
              >
                <Facebook className="w-4 h-4 text-primary" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-colors hover-elevate"
                data-testid="link-instagram"
              >
                <Instagram className="w-4 h-4 text-primary" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-colors hover-elevate"
                data-testid="link-tiktok"
              >
                <SiTiktok className="w-4 h-4 text-primary" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/40">
              © {currentYear} LaserCut.pk - All rights reserved
            </p>
            <p className="text-xs text-white/30 text-center">
              Laser Cutting in Islamabad | Acrylic Décor | 3D LED Sign Boards Pakistan | Custom Laser Engraving Services
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
