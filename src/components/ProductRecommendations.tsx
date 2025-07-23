import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, ExternalLink, Filter } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface RecommendedProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  suitableFor: string[];
  benefits: string[];
  recommendationReason: string;
  externalUrl: string;
}

interface ProductRecommendationsProps {
  condition?: string;
  severity?: 'mild' | 'moderate' | 'severe';
}

export const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  condition = 'acne',
  severity = 'mild'
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const recommendedProducts: RecommendedProduct[] = [
    {
      id: '1',
      name: 'Gentle Foaming Cleanser',
      brand: 'CeraVe',
      price: 24.99,
      rating: 4.8,
      reviews: 1250,
      image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Gentle, non-comedogenic cleanser with ceramides and hyaluronic acid.',
      suitableFor: ['acne', 'sensitive skin', 'dry skin'],
      benefits: ['Removes excess oil', 'Maintains skin barrier', 'Non-irritating'],
      recommendationReason: 'Perfect for your mild acne condition. Gentle enough for daily use.',
      externalUrl: 'https://example.com/product1'
    },
    {
      id: '2',
      name: 'Salicylic Acid Treatment',
      brand: 'Paula\'s Choice',
      price: 32.99,
      rating: 4.9,
      reviews: 2100,
      image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: '2% BHA liquid exfoliant that unclogs pores and reduces blackheads.',
      suitableFor: ['acne', 'oily skin', 'blackheads'],
      benefits: ['Unclogs pores', 'Reduces inflammation', 'Prevents breakouts'],
      recommendationReason: 'Highly effective for treating acne and preventing future breakouts.',
      externalUrl: 'https://example.com/product2'
    },
    {
      id: '3',
      name: 'Niacinamide Serum',
      brand: 'The Ordinary',
      price: 18.99,
      rating: 4.6,
      reviews: 890,
      image: 'https://images.pexels.com/photos/4465829/pexels-photo-4465829.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: '10% Niacinamide + 1% Zinc serum for oil control and pore refinement.',
      suitableFor: ['acne', 'oily skin', 'large pores'],
      benefits: ['Controls oil production', 'Minimizes pores', 'Reduces redness'],
      recommendationReason: 'Excellent for controlling oil and reducing acne-related inflammation.',
      externalUrl: 'https://example.com/product3'
    },
    {
      id: '4',
      name: 'Lightweight Moisturizer',
      brand: 'Neutrogena',
      price: 19.99,
      rating: 4.7,
      reviews: 1560,
      image: 'https://images.pexels.com/photos/4465832/pexels-photo-4465832.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Oil-free, non-comedogenic moisturizer with hyaluronic acid.',
      suitableFor: ['acne', 'oily skin', 'combination skin'],
      benefits: ['Hydrates without clogging', 'Lightweight formula', 'Long-lasting moisture'],
      recommendationReason: 'Essential for maintaining skin hydration without aggravating acne.',
      externalUrl: 'https://example.com/product4'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'cleansers', name: 'Cleansers' },
    { id: 'treatments', name: 'Treatments' },
    { id: 'moisturizers', name: 'Moisturizers' },
    { id: 'serums', name: 'Serums' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? recommendedProducts 
    : recommendedProducts.filter(product => 
        product.name.toLowerCase().includes(selectedCategory.slice(0, -1))
      );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Recommended Products</h2>
          <p className="text-gray-600">
            Personalized product recommendations based on your {condition} condition
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Recommendation Banner */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Star className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Personalized for Your Condition
            </h3>
            <p className="text-gray-700">
              These products are specifically recommended for {severity} {condition} based on your 
              diagnosis and skin analysis. Each product has been selected to work synergistically 
              with your treatment plan.
            </p>
          </div>
        </div>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover className="p-6 h-full">
              <div className="flex space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-blue-600 font-medium">{product.brand}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                    <span className="text-lg font-bold text-green-600">${product.price}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-yellow-800 mb-1">Why recommended:</p>
                    <p className="text-xs text-yellow-700">{product.recommendationReason}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium text-gray-700">Key Benefits:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {product.benefits.slice(0, 3).map((benefit, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      icon={ShoppingCart}
                      onClick={() => window.open(product.externalUrl, '_blank')}
                    >
                      Buy Now
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      icon={ExternalLink}
                      onClick={() => window.open(product.externalUrl, '_blank')}
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Disclaimer */}
      <Card className="p-4 bg-gray-50">
        <p className="text-xs text-gray-600 text-center">
          <strong>Disclaimer:</strong> These are general product recommendations based on your condition. 
          Individual results may vary. Please consult with your dermatologist before starting any new 
          skincare products, especially if you have sensitive skin or allergies.
        </p>
      </Card>
    </div>
  );
};