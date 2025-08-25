import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Upload, 
  Camera, 
  Leaf, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Download
} from "lucide-react";

const DiseaseDetection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setResult(null);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setProgress(0);

    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call
    setTimeout(() => {
      setProgress(100);
      setIsAnalyzing(false);
      
      // Mock result
      setResult({
        disease: "Late Blight",
        confidence: 92,
        severity: "Moderate",
        description: "Late blight is a serious disease caused by Phytophthora infestans that affects tomatoes and potatoes.",
        treatments: [
          "Apply copper-based fungicide every 7-10 days",
          "Improve air circulation around plants",
          "Remove affected leaves immediately",
          "Avoid overhead watering"
        ],
        prevention: [
          "Use resistant varieties when available",
          "Ensure proper plant spacing",
          "Apply preventive fungicide sprays",
          "Monitor weather conditions"
        ]
      });
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "low": return "text-green-600";
      case "moderate": return "text-yellow-600";
      case "high": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Crop Disease Detection
          </h1>
          <p className="text-xl text-muted-foreground">
            Upload a photo of your crop's leaves to identify diseases and get treatment recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                Upload Leaf Image
              </CardTitle>
              <CardDescription>
                Take a clear photo of the affected leaves in good lighting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Upload className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">
                      Drag and drop your image here
                    </p>
                    <p className="text-muted-foreground">
                      or click to browse files
                    </p>
                  </div>
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <Input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleFileSelect(e.target.files[0]);
                        }
                      }}
                    />
                    <Button variant="outline" className="mt-2">
                      <Camera className="h-4 w-4 mr-2" />
                      Choose Image
                    </Button>
                  </Label>
                </div>
              </div>

              {/* Selected File */}
              {selectedFile && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </AlertDescription>
                </Alert>
              )}

              {/* Analyze Button */}
              <Button 
                onClick={analyzeImage} 
                disabled={!selectedFile || isAnalyzing}
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Leaf className="h-4 w-4 mr-2" />
                    Detect Disease
                  </>
                )}
              </Button>

              {/* Progress */}
              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Analysis Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Analysis Results
              </CardTitle>
              <CardDescription>
                Disease identification and treatment recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  {/* Disease Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-foreground">
                        {result.disease}
                      </h3>
                      <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                        {result.confidence}% confidence
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`h-4 w-4 ${getSeverityColor(result.severity)}`} />
                      <span className={`font-medium ${getSeverityColor(result.severity)}`}>
                        {result.severity} Severity
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {result.description}
                    </p>
                  </div>

                  {/* Treatments */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-primary" />
                      Recommended Treatments
                    </h4>
                    <ul className="space-y-2">
                      {result.treatments.map((treatment: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{treatment}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Prevention */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">
                      Prevention Tips
                    </h4>
                    <ul className="space-y-2">
                      {result.prevention.map((tip: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Leaf className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Upload an image to see analysis results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="mt-8 shadow-card">
          <CardHeader>
            <CardTitle>Photography Tips for Best Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium">Good Lighting</h4>
                <p className="text-sm text-muted-foreground">
                  Take photos in natural daylight for better clarity
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium">Close-up View</h4>
                <p className="text-sm text-muted-foreground">
                  Capture affected areas clearly with minimal background
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium">Multiple Angles</h4>
                <p className="text-sm text-muted-foreground">
                  Take 2-3 photos from different angles if possible
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiseaseDetection;