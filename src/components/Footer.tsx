import { Link } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-farm-green text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <Leaf className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">FARM CONNECT</span>
            </div>
            <p className="text-white/80">
              Empowering farmers with smart digital solutions for modern agriculture.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/disease-detection" className="block text-white/80 hover:text-white transition-colors">
                Disease Detection
              </Link>
              <Link to="/chatbot" className="block text-white/80 hover:text-white transition-colors">
                AI Assistant
              </Link>
              <Link to="/marketplace" className="block text-white/80 hover:text-white transition-colors">
                Marketplace
              </Link>
              <Link to="/rental" className="block text-white/80 hover:text-white transition-colors">
                Machinery Rental
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-white/80">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <Mail className="h-4 w-4" />
                <span>support@farmconnect.in</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <MapPin className="h-4 w-4" />
                <span>Rural Innovation Hub, India</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/80">
          <p>&copy; 2024 FARM CONNECT. All rights reserved. Built with ❤️ for farmers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;