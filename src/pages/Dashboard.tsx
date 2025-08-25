import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  Thermometer, 
  TrendingUp, 
  TrendingDown, 
  IndianRupee,
  MapPin,
  Calendar,
  Activity,
  Wheat,
  Apple,
  Carrot
} from "lucide-react";

const Dashboard = () => {
  const weatherData = {
    location: "Pune, Maharashtra",
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    condition: "Partly Cloudy",
    forecast: [
      { day: "Today", high: 32, low: 22, condition: "Sunny", icon: "☀️" },
      { day: "Tomorrow", high: 30, low: 20, condition: "Cloudy", icon: "☁️" },
      { day: "Day 3", high: 29, low: 19, condition: "Rainy", icon: "🌧️" },
      { day: "Day 4", high: 31, low: 21, condition: "Sunny", icon: "☀️" },
      { day: "Day 5", high: 33, low: 23, condition: "Hot", icon: "🔥" }
    ]
  };

  const marketPrices = [
    { 
      crop: "Wheat", 
      price: 2150, 
      change: +50, 
      unit: "quintal", 
      icon: <Wheat className="h-5 w-5" />,
      color: "text-amber-600" 
    },
    { 
      crop: "Rice", 
      price: 3200, 
      change: -25, 
      unit: "quintal", 
      icon: <Wheat className="h-5 w-5" />,
      color: "text-green-600" 
    },
    { 
      crop: "Onion", 
      price: 1800, 
      change: +120, 
      unit: "quintal", 
      icon: <Apple className="h-5 w-5" />,
      color: "text-purple-600" 
    },
    { 
      crop: "Tomato", 
      price: 2500, 
      change: -80, 
      unit: "quintal", 
      icon: <Carrot className="h-5 w-5" />,
      color: "text-red-600" 
    },
    { 
      crop: "Potato", 
      price: 1200, 
      change: +30, 
      unit: "quintal", 
      icon: <Apple className="h-5 w-5" />,
      color: "text-orange-600" 
    },
    { 
      crop: "Sugarcane", 
      price: 3500, 
      change: +75, 
      unit: "ton", 
      icon: <Wheat className="h-5 w-5" />,
      color: "text-green-700" 
    }
  ];

  const farmingTips = [
    {
      title: "Monsoon Preparation",
      description: "Ensure proper drainage in fields before monsoon arrives",
      priority: "high",
      icon: <Droplets className="h-5 w-5" />
    },
    {
      title: "Pest Control",
      description: "Regular monitoring needed for wheat crops this season",
      priority: "medium",
      icon: <Activity className="h-5 w-5" />
    },
    {
      title: "Soil Testing",
      description: "Test soil pH and nutrient levels for better yield",
      priority: "low",
      icon: <TrendingUp className="h-5 w-5" />
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            कृषि डैशबोर्ड
          </h1>
          <p className="text-xl text-muted-foreground">
            Weather updates and market prices at your fingertips
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weather Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Weather */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CloudSun className="h-5 w-5 text-primary" />
                  Current Weather
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {weatherData.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-1">
                      {weatherData.temperature}°C
                    </div>
                    <p className="text-sm text-muted-foreground">{weatherData.condition}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Droplets className="h-8 w-8 text-blue-500" />
                    </div>
                    <div className="text-2xl font-semibold">{weatherData.humidity}%</div>
                    <p className="text-sm text-muted-foreground">Humidity</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Wind className="h-8 w-8 text-gray-500" />
                    </div>
                    <div className="text-2xl font-semibold">{weatherData.windSpeed}</div>
                    <p className="text-sm text-muted-foreground">km/h Wind</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Thermometer className="h-8 w-8 text-red-500" />
                    </div>
                    <div className="text-lg font-semibold">Good</div>
                    <p className="text-sm text-muted-foreground">For Farming</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 5-Day Forecast */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  5-Day Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {weatherData.forecast.map((day, index) => (
                    <div key={index} className="text-center p-3 rounded-lg bg-muted/50">
                      <div className="text-sm font-medium text-foreground mb-1">{day.day}</div>
                      <div className="text-2xl mb-1">{day.icon}</div>
                      <div className="text-sm space-y-1">
                        <div className="font-semibold">{day.high}°</div>
                        <div className="text-muted-foreground">{day.low}°</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Prices */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IndianRupee className="h-5 w-5 text-primary" />
                  मंडी भाव (Market Prices)
                </CardTitle>
                <CardDescription>
                  Latest prices from local mandis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {marketPrices.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full bg-muted ${item.color}`}>
                          {item.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{item.crop}</div>
                          <div className="text-sm text-muted-foreground">per {item.unit}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-foreground">
                          ₹{item.price.toLocaleString()}
                        </div>
                        <div className={`text-sm flex items-center gap-1 ${
                          item.change > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.change > 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {Math.abs(item.change)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Activities */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Today's Activities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Watering Schedule</span>
                  <Badge variant="secondary">6:00 AM</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Fertilizer Application</span>
                  <Badge variant="secondary">10:00 AM</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pest Inspection</span>
                  <Badge variant="secondary">4:00 PM</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Farming Tips */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Farming Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {farmingTips.map((tip, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {tip.icon}
                        <span className="font-medium text-sm">{tip.title}</span>
                      </div>
                      <Badge className={`${getPriorityColor(tip.priority)} border text-xs`}>
                        {tip.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Farm Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Crop Health</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Irrigation Level</span>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Season Progress</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;