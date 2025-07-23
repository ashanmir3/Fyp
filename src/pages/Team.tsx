import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { Card } from '../components/ui/Card';

interface TeamMember {
  name: string;
  role: string;
  specialization: string;
  image: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

export const Team: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      specialization: 'Dermatology, 15+ years',
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Board-certified dermatologist with expertise in medical and cosmetic dermatology. Leading our medical advisory board.',
      linkedin: '#',
      twitter: '#',
      email: 'sarah.johnson@dermaassist.com'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'AI Research Director',
      specialization: 'Machine Learning, Computer Vision',
      image: 'https://images.pexels.com/photos/612608/pexels-photo-612608.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'PhD in Computer Science with focus on medical AI. Leading the development of our diagnostic algorithms.',
      linkedin: '#',
      twitter: '#',
      email: 'michael.chen@dermaassist.com'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Head of Pediatric Dermatology',
      specialization: 'Pediatric Dermatology, 12+ years',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Specialist in pediatric skin conditions with extensive experience in treating children and adolescents.',
      linkedin: '#',
      twitter: '#',
      email: 'emily.rodriguez@dermaassist.com'
    },
    {
      name: 'James Wilson',
      role: 'Chief Technology Officer',
      specialization: 'Healthcare Technology, 10+ years',
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Technology leader with extensive experience in healthcare platforms and HIPAA-compliant systems.',
      linkedin: '#',
      twitter: '#',
      email: 'james.wilson@dermaassist.com'
    },
    {
      name: 'Dr. Lisa Park',
      role: 'Cosmetic Dermatology Lead',
      specialization: 'Cosmetic Dermatology, 8+ years',
      image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Expert in aesthetic dermatology and anti-aging treatments, helping patients achieve their skin goals.',
      linkedin: '#',
      twitter: '#',
      email: 'lisa.park@dermaassist.com'
    },
    {
      name: 'David Kumar',
      role: 'Head of Product',
      specialization: 'Product Management, UX Design',
      image: 'https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Product strategist focused on creating intuitive healthcare experiences that improve patient outcomes.',
      linkedin: '#',
      twitter: '#',
      email: 'david.kumar@dermaassist.com'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Meet Our
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Expert Team</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our diverse team of medical professionals, AI researchers, and technology experts 
            are dedicated to revolutionizing dermatological care through innovation and expertise.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="p-8 text-center h-full">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-full" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                
                <p className="text-blue-600 font-semibold mb-2">
                  {member.role}
                </p>
                
                <p className="text-sm text-gray-600 mb-4">
                  {member.specialization}
                </p>
                
                <p className="text-gray-700 text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>
                
                {/* Social Links */}
                <div className="flex justify-center space-x-4">
                  {member.linkedin && (
                    <motion.a
                      href={member.linkedin}
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </motion.a>
                  )}
                  {member.twitter && (
                    <motion.a
                      href={member.twitter}
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </motion.a>
                  )}
                  {member.email && (
                    <motion.a
                      href={`mailto:${member.email}`}
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </motion.a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Join Our Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <Card className="p-12 text-center bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              We're always looking for passionate professionals who want to make a difference 
              in healthcare technology and dermatological care.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View Open Positions
            </motion.button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};