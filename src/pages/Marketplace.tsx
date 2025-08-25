import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Filter, 
  Plus, 
  MapPin, 
  User, 
  Phone, 
  ShoppingCart, 
  ArrowLeftRight,
  Star,
  Heart
} from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'buy' | 'sell' | 'barter';
  category: string;
  location: string;
  seller: string;
  phone: string;
  image: string;
  rating: number;
  quantity: string;
  quality: string;
}

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddProduct, setShowAddProduct] = useState(false);

  const mockProducts: Product[] = [
    {
      id: '1',
      title: 'Organic Wheat - Premium Quality',
      description: 'Fresh harvest, premium quality wheat from my farm. No chemicals used.',
      price: 2500,
      type: 'sell',
      category: 'grains',
      location: 'Pune, Maharashtra',
      seller: 'राजेश पाटील',
      phone: '+91 98765 43210',
      image: '/api/placeholder/300/200',
      rating: 4.8,
      quantity: '100 quintals',
      quality: 'A Grade'
    },
    {
      id: '2',
      title: 'Tractor - John Deere 5042D',
      description: 'Well-maintained tractor for sale. Only 500 hours used.',
      price: 650000,
      type: 'sell',
      category: 'machinery',
      location: 'Nashik, Maharashtra',
      seller: 'सुरेश शर्मा',
      phone: '+91 87654 32109',
      image: '/api/placeholder/300/200',
      rating: 4.5,
      quantity: '1 unit',
      quality: 'Excellent'
    },
    {
      id: '3',
      title: 'Rice Seeds - High Yield Variety',
      description: 'Looking to buy high-quality rice seeds for next season.',
      price: 80,
      type: 'buy',
      category: 'seeds',
      location: 'Solapur, Maharashtra',
      seller: 'विकास जाधव',
      phone: '+91 76543 21098',
      image: '/api/placeholder/300/200',
      rating: 4.6,
      quantity: '50 kg',
      quality: 'Premium'
    },
    {
      id: '4',
      title: 'Onions for Wheat Exchange',
      description: 'Have surplus onions, willing to exchange for wheat or other grains.',
      price: 0,
      type: 'barter',
      category: 'vegetables',
      location: 'Kolhapur, Maharashtra',
      seller: 'अनिल देसाई',
      phone: '+91 65432 10987',
      image: '/api/placeholder/300/200',
      rating: 4.7,
      quantity: '20 quintals',
      quality: 'Premium'
    },
    {
      id: '5',
      title: 'Fertilizer - NPK Complex',
      description: 'Bulk purchase needed for NPK fertilizer. Looking for best rates.',
      price: 1200,
      type: 'buy',
      category: 'fertilizer',
      location: 'Ahmednagar, Maharashtra',
      seller: 'मनोज कुलकर्णी',
      phone: '+91 54321 09876',
      image: '/api/placeholder/300/200',
      rating: 4.4,
      quantity: '100 bags',
      quality: 'Standard'
    },
    {
      id: '6',
      title: 'Fresh Tomatoes - Direct from Farm',
      description: 'Fresh red tomatoes harvested today. Perfect for markets and wholesale.',
      price: 15,
      type: 'sell',
      category: 'vegetables',
      location: 'Satara, Maharashtra',
      seller: 'गीता भोसले',
      phone: '+91 43210 98765',
      image: '/api/placeholder/300/200',
      rating: 4.9,
      quantity: '50 crates',
      quality: 'A Grade'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'grains', label: 'Grains' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'seeds', label: 'Seeds' },
    { value: 'fertilizer', label: 'Fertilizer' },
    { value: 'machinery', label: 'Machinery' },
    { value: 'tools', label: 'Tools' }
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || product.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sell': return 'bg-green-100 text-green-800 border-green-200';
      case 'buy': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'barter': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sell': return <ShoppingCart className="h-3 w-3" />;
      case 'buy': return <Search className="h-3 w-3" />;
      case 'barter': return <ArrowLeftRight className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            कृषि मार्केटप्लेस
          </h1>
          <p className="text-xl text-muted-foreground">
            Buy, Sell & Barter with fellow farmers
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, sellers, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="sell">Selling</SelectItem>
              <SelectItem value="buy">Buying</SelectItem>
              <SelectItem value="barter">Barter</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  List your product in the marketplace
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Product Title</Label>
                  <Input id="title" placeholder="e.g., Fresh Tomatoes" />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sell">Selling</SelectItem>
                      <SelectItem value="buy">Buying</SelectItem>
                      <SelectItem value="barter">Barter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input id="price" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe your product..." />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  List Product
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="aspect-video bg-muted rounded-lg mb-3 overflow-hidden">
                  <div className="w-full h-full bg-gradient-earth flex items-center justify-center">
                    <span className="text-white/80 text-sm">Product Image</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg leading-tight">{product.title}</CardTitle>
                    <Button variant="ghost" size="sm" className="p-1 h-auto text-muted-foreground hover:text-red-500">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getTypeColor(product.type)} border`}>
                      {getTypeIcon(product.type)}
                      <span className="ml-1 capitalize">{product.type}</span>
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                      {product.rating}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-3 line-clamp-2">
                  {product.description}
                </CardDescription>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Price:</span>
                    <span className="font-semibold text-primary">
                      {product.type === 'barter' ? 'Exchange' : `₹${product.price.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Quantity:</span>
                    <span className="text-sm font-medium">{product.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Quality:</span>
                    <span className="text-sm font-medium text-green-600">{product.quality}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4 pb-3 border-b">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="h-3 w-3 mr-1" />
                    {product.seller}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {product.location}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-primary hover:bg-primary/90">
                    Contact Seller
                  </Button>
                  <Button variant="outline" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or add a new product to get started.
            </p>
            <Button onClick={() => setShowAddProduct(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Product
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;