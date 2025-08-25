import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Leaf, 
  MessageCircle, 
  ShoppingCart, 
  Wrench, 
  CloudSun, 
  TrendingUp,
  Smartphone,
  Globe,
  Shield
} from "lucide-react";
import farmHero from "@/assets/farm-hero.jpg";

const Home = () => {
  const features = [
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: "Crop Disease Detection",
      description: "Upload leaf images and get instant AI-powered disease identification with treatment recommendations.",
      link: "/disease-detection"
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-primary" />,
      title: "AI Assistant",
      description: "Get farming advice in your local language through our intelligent chatbot with voice support.",
      link: "/chatbot"
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-primary" />,
      title: "Marketplace",
      description: "Buy, sell, and barter crops and tools directly with other farmers in your region.",
      link: "/marketplace"
    },
    {
      icon: <Wrench className="h-8 w-8 text-primary" />,
      title: "Machinery Rental",
      description: "Rent tractors, harvesters, and other equipment with easy UPI payment integration.",
      link: "/rental"
    },
    {
      icon: <CloudSun className="h-8 w-8 text-primary" />,
      title: "Weather & Market",
      description: "Stay updated with live weather forecasts and current market prices for your crops.",
      link: "/dashboard"
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Multilingual Support",
      description: "Access all features in Hindi, Marathi, English, and other regional languages.",
      link: "/chatbot"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Farmers Connected" },
    { number: "500+", label: "Crops Identified" },
    { number: "50+", label: "Machinery Partners" },
    { number: "24/7", label: "AI Support" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={farmHero} 
            alt="Modern farming landscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-farm-green/80 to-farm-green/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Smart Farming,
            <span className="block text-harvest-gold">Simple Solutions</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Empowering farmers with AI-powered tools for crop management, marketplace access, and modern agricultural solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-harvest-gold hover:bg-harvest-gold/90 text-farm-green-dark font-semibold px-8 py-4 text-lg">
              <Link to="/disease-detection">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-farm-green px-8 py-4 text-lg">
              <Link to="/chatbot">Try AI Assistant</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Complete Farm Management Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to modernize your farming operations and increase productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-2 bg-card border-border">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-primary-soft rounded-full w-fit group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-muted-foreground mb-4 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Link to={feature.link}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-farm text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-white">
                  {stat.number}
                </div>
                <div className="text-white/80 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-8">
              Why Choose FARM CONNECT?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-sky-blue/20 rounded-full flex items-center justify-center">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Mobile First</h3>
                <p className="text-muted-foreground">
                  Designed for smartphones with simple, large interfaces perfect for field use.
                </p>
              </div>
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-leaf-green/20 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Farmer Focused</h3>
                <p className="text-muted-foreground">
                  Built by understanding real farmer needs with local language support.
                </p>
              </div>
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-harvest-gold/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Growth Oriented</h3>
                <p className="text-muted-foreground">
                  Tools and insights to help you increase yield and farm profitability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;