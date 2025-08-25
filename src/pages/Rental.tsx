import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { 
  Search, 
  MapPin, 
  Star, 
  Calendar as CalendarIcon, 
  Clock, 
  Wrench, 
  Truck, 
  Tractor,
  CreditCard,
  QrCode,
  Phone,
  User,
  CheckCircle
} from "lucide-react";

interface Machine {
  id: string;
  name: string;
  type: string;
  description: string;
  dailyRate: number;
  weeklyRate: number;
  location: string;
  owner: string;
  phone: string;
  rating: number;
  totalRentals: number;
  availability: string;
  features: string[];
  image: string;
}

const Rental = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [bookingDate, setBookingDate] = useState<Date>();
  const [rentalDays, setRentalDays] = useState('1');
  const [showBooking, setShowBooking] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const mockMachines: Machine[] = [
    {
      id: '1',
      name: 'John Deere 5042D Tractor',
      type: 'tractor',
      description: 'Powerful 42 HP tractor perfect for plowing, cultivation, and harvesting. Well-maintained and fuel-efficient.',
      dailyRate: 1200,
      weeklyRate: 7000,
      location: 'Pune, Maharashtra',
      owner: 'राजेश पाटील',
      phone: '+91 98765 43210',
      rating: 4.8,
      totalRentals: 156,
      availability: 'available',
      features: ['42 HP Engine', 'Power Steering', 'PTO', 'Hydraulic Lift'],
      image: '/api/placeholder/400/250'
    },
    {
      id: '2',
      name: 'Mahindra ARJUN 605 DI',
      type: 'tractor',
      description: 'Robust 60 HP tractor with advanced features. Ideal for heavy farming operations.',
      dailyRate: 1500,
      weeklyRate: 9000,
      location: 'Nashik, Maharashtra',
      owner: 'सुरेश शर्मा',
      phone: '+91 87654 32109',
      rating: 4.6,
      totalRentals: 89,
      availability: 'available',
      features: ['60 HP Engine', 'Oil Immersed Brakes', '2000 kg Lifting', 'Comfortable Cabin'],
      image: '/api/placeholder/400/250'
    },
    {
      id: '3',
      name: 'Mini Combine Harvester',
      type: 'harvester',
      description: 'Compact harvester perfect for small to medium farms. Efficient grain collection system.',
      dailyRate: 2500,
      weeklyRate: 15000,
      location: 'Kolhapur, Maharashtra',
      owner: 'विकास जाधव',
      phone: '+91 76543 21098',
      rating: 4.7,
      totalRentals: 34,
      availability: 'busy',
      features: ['3.5 ft Cutting Width', 'Grain Tank', 'Easy Operation', 'Low Maintenance'],
      image: '/api/placeholder/400/250'
    },
    {
      id: '4',
      name: 'Rotary Tiller',
      type: 'tiller',
      description: 'Heavy-duty rotary tiller for soil preparation. Suitable for all soil types.',
      dailyRate: 800,
      weeklyRate: 4500,
      location: 'Solapur, Maharashtra',
      owner: 'अनिल देसाई',
      phone: '+91 65432 10987',
      rating: 4.5,
      totalRentals: 78,
      availability: 'available',
      features: ['6 ft Working Width', '32 Blades', 'Heavy Frame', 'Adjustable Depth'],
      image: '/api/placeholder/400/250'
    },
    {
      id: '5',
      name: 'Water Pump Set',
      type: 'pump',
      description: 'High-efficiency water pump for irrigation. Diesel engine with low fuel consumption.',
      dailyRate: 400,
      weeklyRate: 2200,
      location: 'Ahmednagar, Maharashtra',
      owner: 'मनोज कुलकर्णी',
      phone: '+91 54321 09876',
      rating: 4.4,
      totalRentals: 145,
      availability: 'available',
      features: ['5 HP Diesel Engine', '3 inch Outlet', 'High Discharge', 'Portable'],
      image: '/api/placeholder/400/250'
    },
    {
      id: '6',
      name: 'Seed Drill Machine',
      type: 'planter',
      description: 'Precision seed drill for uniform sowing. Adjustable row spacing and seed rate.',
      dailyRate: 600,
      weeklyRate: 3500,
      location: 'Satara, Maharashtra',
      owner: 'गीता भोसले',
      phone: '+91 43210 98765',
      rating: 4.6,
      totalRentals: 67,
      availability: 'available',
      features: ['9 Row Planting', 'Fertilizer Box', 'Depth Control', 'Marker Arms'],
      image: '/api/placeholder/400/250'
    }
  ];

  const machineTypes = [
    { value: 'all', label: 'All Machinery', icon: <Wrench className="h-4 w-4" /> },
    { value: 'tractor', label: 'Tractors', icon: <Tractor className="h-4 w-4" /> },
    { value: 'harvester', label: 'Harvesters', icon: <Truck className="h-4 w-4" /> },
    { value: 'tiller', label: 'Tillers', icon: <Wrench className="h-4 w-4" /> },
    { value: 'pump', label: 'Pumps', icon: <Wrench className="h-4 w-4" /> },
    { value: 'planter', label: 'Planters', icon: <Wrench className="h-4 w-4" /> }
  ];

  const filteredMachines = mockMachines.filter(machine => {
    const matchesSearch = machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         machine.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || machine.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const handleBooking = (machine: Machine) => {
    setSelectedMachine(machine);
    setShowBooking(true);
  };

  const proceedToPayment = () => {
    setShowBooking(false);
    setShowPayment(true);
  };

  const calculateTotal = () => {
    if (!selectedMachine || !rentalDays) return 0;
    const days = parseInt(rentalDays);
    if (days >= 7) {
      const weeks = Math.floor(days / 7);
      const remainingDays = days % 7;
      return (weeks * selectedMachine.weeklyRate) + (remainingDays * selectedMachine.dailyRate);
    }
    return days * selectedMachine.dailyRate;
  };

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'busy': return 'bg-red-100 text-red-800 border-red-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            मशीनरी रेंटल
          </h1>
          <p className="text-xl text-muted-foreground">
            Rent farm equipment with easy UPI payments
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search machinery, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Machine Type" />
            </SelectTrigger>
            <SelectContent>
              {machineTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center gap-2">
                    {type.icon}
                    {type.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Machines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMachines.map((machine) => (
            <Card key={machine.id} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="aspect-video bg-muted rounded-lg mb-3 overflow-hidden">
                  <div className="w-full h-full bg-gradient-farm flex items-center justify-center">
                    <Tractor className="h-12 w-12 text-white/80" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg leading-tight">{machine.name}</CardTitle>
                    <Badge className={`${getAvailabilityColor(machine.availability)} border text-xs`}>
                      {machine.availability}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                      {machine.rating} ({machine.totalRentals} rentals)
                    </div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {machine.type}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-3 line-clamp-2">
                  {machine.description}
                </CardDescription>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Daily Rate:</span>
                    <span className="font-semibold text-primary">₹{machine.dailyRate}/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Weekly Rate:</span>
                    <span className="font-semibold text-green-600">₹{machine.weeklyRate}/week</span>
                  </div>
                </div>

                <div className="space-y-1 mb-4">
                  <h4 className="text-sm font-medium text-foreground">Key Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {machine.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {machine.features.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{machine.features.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-4 pb-3 border-b">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="h-3 w-3 mr-1" />
                    {machine.owner}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {machine.location}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={() => handleBooking(machine)}
                    disabled={machine.availability !== 'available'}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                  <Button variant="outline" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Booking Dialog */}
        <Dialog open={showBooking} onOpenChange={setShowBooking}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Book {selectedMachine?.name}</DialogTitle>
              <DialogDescription>
                Select your rental period and confirm booking
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {bookingDate ? format(bookingDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={bookingDate}
                      onSelect={setBookingDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label htmlFor="rental-days">Rental Duration (Days)</Label>
                <Select value={rentalDays} onValueChange={setRentalDays}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 14, 21, 30].map((days) => (
                      <SelectItem key={days} value={days.toString()}>
                        {days} day{days > 1 ? 's' : ''}
                        {days >= 7 && ` (${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? 's' : ''})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 p-3 bg-muted rounded-lg">
                <div className="flex justify-between">
                  <span>Daily Rate:</span>
                  <span>₹{selectedMachine?.dailyRate}/day</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{rentalDays} days</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span className="text-primary">₹{calculateTotal().toLocaleString()}</span>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90" onClick={proceedToPayment}>
                <CreditCard className="h-4 w-4 mr-2" />
                Proceed to Payment
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Payment Dialog */}
        <Dialog open={showPayment} onOpenChange={setShowPayment}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>UPI Payment</DialogTitle>
              <DialogDescription>
                Scan QR code or pay using UPI ID
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 text-center">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Amount to Pay</h3>
                <p className="text-3xl font-bold text-primary">₹{calculateTotal().toLocaleString()}</p>
              </div>

              <div className="bg-white p-6 rounded-lg border-2 border-dashed border-border">
                <QrCode className="h-32 w-32 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Scan with any UPI app</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">UPI ID:</p>
                <p className="font-mono text-lg bg-muted p-2 rounded">
                  farmconnect@upi
                </p>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle className="h-4 w-4 mr-2" />
                Payment Completed
              </Button>

              <p className="text-xs text-muted-foreground">
                Click "Payment Completed" after successful UPI payment
              </p>
            </div>
          </DialogContent>
        </Dialog>

        {filteredMachines.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Tractor className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No machinery found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria to find available machinery.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rental;