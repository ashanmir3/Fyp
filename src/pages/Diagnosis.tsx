import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Camera, FileImage, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const Diagnosis: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalysis = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        condition: 'Mild Acne',
        confidence: 92,
        severity: 'Mild',
        recommendations: [
          'Use a gentle cleanser twice daily',
          'Apply benzoyl peroxide treatment',
          'Avoid touching or picking at affected areas',
          'Consider consulting with a dermatologist'
        ],
        description: 'The analysis indicates mild acne with some inflammatory papules. This condition is common and treatable with proper skincare routine.'
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Skin
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Analysis</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload a clear photo of your skin concern and get instant AI-powered analysis with personalized recommendations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload Your Image</h2>
              
              {!imagePreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 transition-colors">
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Upload a photo
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Choose a clear, well-lit photo of the skin area you'd like analyzed
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Button icon={FileImage}>
                          Choose File
                        </Button>
                      </label>
                      <p className="text-sm text-gray-500">
                        Supported formats: JPG, PNG, HEIC (Max 10MB)
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Uploaded skin image"
                      className="w-full h-64 object-cover rounded-2xl"
                    />
                    <button
                      onClick={resetAnalysis}
                      className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button
                      onClick={handleAnalysis}
                      disabled={isAnalyzing}
                      className="flex-1"
                      loading={isAnalyzing}
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
                    </Button>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button variant="outline">
                        Change Image
                      </Button>
                    </label>
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                <h4 className="font-medium text-blue-900 mb-2">Tips for best results:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Use natural lighting when possible</li>
                  <li>• Keep the camera steady and in focus</li>
                  <li>• Fill the frame with the affected area</li>
                  <li>• Avoid shadows or reflections</li>
                </ul>
              </div>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 h-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Analysis Results</h2>
              
              {!selectedImage && !isAnalyzing && !analysisResult && (
                <div className="flex items-center justify-center h-64 text-center">
                  <div>
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">Upload an image to see analysis results</p>
                  </div>
                </div>
              )}

              {isAnalyzing && (
                <div className="flex items-center justify-center h-64 text-center">
                  <div>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Loader className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Analyzing your image...</h3>
                    <p className="text-gray-600">Our AI is examining your skin condition</p>
                  </div>
                </div>
              )}

              {analysisResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Condition */}
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <div>
                        <h3 className="font-semibold text-green-900">
                          Detected: {analysisResult.condition}
                        </h3>
                        <p className="text-sm text-green-700">
                          Confidence: {analysisResult.confidence}% | Severity: {analysisResult.severity}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {analysisResult.description}
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Recommendations</h4>
                    <div className="space-y-2">
                      {analysisResult.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm text-gray-600">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <Button className="w-full" icon={Calendar}>
                      Book Consultation
                    </Button>
                    <Button variant="outline" className="w-full">
                      Save Results
                    </Button>
                  </div>

                  {/* Disclaimer */}
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-yellow-800">
                        This AI analysis is for informational purposes only and should not replace professional medical advice. 
                        Please consult with a qualified dermatologist for proper diagnosis and treatment.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};