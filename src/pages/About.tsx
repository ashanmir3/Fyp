import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Award, Target, Heart, Zap } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const About: React.FC = () => {
  const values = [
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your health data is protected with enterprise-grade security and HIPAA compliance.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Expert Care',
      description: 'Board-certified dermatologists providing professional medical expertise.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: '98.5% accuracy rate with cutting-edge AI technology and medical validation.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Target,
      title: 'Personalized Treatment',
      description: 'Customized treatment plans tailored to your unique skin condition and needs.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Heart,
      title: 'Patient-Centered',
      description: 'Compassionate care focused on improving your skin health and confidence.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Continuously advancing dermatology through AI and medical technology.',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Patients Helped' },
    { number: '200+', label: 'Expert Doctors' },
    { number: '98.5%', label: 'Accuracy Rate' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> DermaAssist</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're revolutionizing dermatology care by combining advanced AI technology with expert medical professionals 
            to provide accessible, accurate, and personalized skin health solutions for everyone.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <Card className="p-12 text-center bg-gradient-to-r from-blue-50 to-green-50">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              To democratize access to quality dermatological care through innovative AI technology, 
              connecting patients with expert dermatologists and providing accurate, timely diagnoses 
              that improve skin health outcomes worldwide.
            </p>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card hover className="p-8 h-full">
                    <div className={`w-14 h-14 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <Card className="p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    DermaAssist was founded in 2023 by a team of dermatologists, AI researchers, 
                    and healthcare technology experts who recognized the critical need for accessible, 
                    accurate skin health diagnosis.
                  </p>
                  <p>
                    Seeing long wait times for dermatology appointments and the difficulty many people 
                    face in accessing specialized care, we set out to create a solution that combines 
                    the precision of artificial intelligence with the expertise of board-certified 
                    dermatologists.
                  </p>
                  <p>
                    Today, we're proud to serve over 50,000 patients worldwide, providing instant 
                    AI-powered skin analysis and connecting them with expert dermatologists for 
                    comprehensive care.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Medical team"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Technology */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-12 bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Cutting-Edge Technology</h2>
              <p className="text-xl mb-8 opacity-90 max-w-4xl mx-auto">
                Our AI model has been trained on over 100,000 dermatological images and validated 
                by leading dermatologists to achieve a 98.5% accuracy rate in skin condition identification.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">100K+</div>
                  <div className="opacity-90">Training Images</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">50+</div>
                  <div className="opacity-90">Skin Conditions</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">&lt;3s</div>
                  <div className="opacity-90">Analysis Time</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};