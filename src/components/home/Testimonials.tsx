import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Carousel } from '../ui/Carousel';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  content: string;
  condition: string;
}

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Marketing Manager',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      content: 'DermaAssist helped me identify my skin condition quickly and accurately. The AI analysis was spot-on, and connecting with a dermatologist was seamless. My skin has never looked better!',
      condition: 'Acne Treatment'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Software Engineer',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      content: 'As someone who travels frequently, having 24/7 access to dermatology expertise is invaluable. The app is intuitive, secure, and the results are incredibly detailed.',
      condition: 'Eczema Management'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Teacher',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      content: 'The personalized treatment plan I received through DermaAssist transformed my skincare routine. The progress tracking feature keeps me motivated every day.',
      condition: 'Rosacea Care'
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Business Owner',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      content: 'The convenience of getting professional dermatology advice from home is unmatched. DermaAssist saved me time and provided excellent care recommendations.',
      condition: 'Psoriasis Treatment'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Our
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Patients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people who transformed their skin health with DermaAssist.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <Carousel
            autoPlay={true}
            interval={5000}
            showDots={true}
            showArrows={true}
            className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 h-80"
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-12 h-full">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  {/* Avatar and Info */}
                  <div className="flex-shrink-0 text-center lg:text-left">
                    <div className="relative">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-24 h-24 rounded-full object-cover mx-auto lg:mx-0 shadow-lg"
                      />
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-green-600 rounded-full p-2">
                        <Quote className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mt-4">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                    <div className="flex justify-center lg:justify-start mt-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <div className="mt-3 inline-block bg-gradient-to-r from-blue-100 to-green-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {testimonial.condition}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed italic">
                      "{testimonial.content}"
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>

          {/* Additional Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
              <div className="text-3xl font-bold text-blue-600">50K+</div>
              <div className="text-gray-700 mt-2">Happy Patients</div>
            </div>
            <div className="text-center bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
              <div className="text-3xl font-bold text-green-600">4.9/5</div>
              <div className="text-gray-700 mt-2">Average Rating</div>
            </div>
            <div className="text-center bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6">
              <div className="text-3xl font-bold text-purple-600">98.5%</div>
              <div className="text-gray-700 mt-2">Success Rate</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};