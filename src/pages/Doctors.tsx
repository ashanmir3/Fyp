import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Star, Clock, Video, MessageCircle, Phone } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Doctor } from '../types';

export const Doctors: React.FC = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const specialties = [
    { id: 'all', name: 'All Specialties' },
    { id: 'dermatology', name: 'General Dermatology' },
    { id: 'cosmetic', name: 'Cosmetic Dermatology' },
    { id: 'pediatric', name: 'Pediatric Dermatology' },
    { id: 'surgical', name: 'Dermatologic Surgery' }
  ];

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@dermaassist.com',
      role: 'doctor',
      specialization: 'General Dermatology',
      experience: 12,
      rating: 4.9,
      avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300',
      location: {
        address: '123 Medical Center, New York, NY',
        lat: 40.7128,
        lng: -74.0060
      },
      availability: [
        { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { day: 'Wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true }
      ],
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      email: 'michael.chen@dermaassist.com',
      role: 'doctor',
      specialization: 'Cosmetic Dermatology',
      experience: 8,
      rating: 4.8,
      avatar: 'https://images.pexels.com/photos/612608/pexels-photo-612608.jpeg?auto=compress&cs=tinysrgb&w=300',
      location: {
        address: '456 Health Plaza, Los Angeles, CA',
        lat: 34.0522,
        lng: -118.2437
      },
      availability: [
        { day: 'Monday', startTime: '10:00', endTime: '18:00', isAvailable: true },
        { day: 'Thursday', startTime: '10:00', endTime: '18:00', isAvailable: true },
        { day: 'Friday', startTime: '10:00', endTime: '18:00', isAvailable: true }
      ],
      createdAt: new Date()
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@dermaassist.com',
      role: 'doctor',
      specialization: 'Pediatric Dermatology',
      experience: 15,
      rating: 4.9,
      avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300',
      location: {
        address: '789 Children\'s Hospital, Chicago, IL',
        lat: 41.8781,
        lng: -87.6298
      },
      availability: [
        { day: 'Tuesday', startTime: '08:00', endTime: '16:00', isAvailable: true },
        { day: 'Wednesday', startTime: '08:00', endTime: '16:00', isAvailable: true },
        { day: 'Thursday', startTime: '08:00', endTime: '16:00', isAvailable: true }
      ],
      createdAt: new Date()
    }
  ];

  const filteredDoctors = selectedSpecialty === 'all' 
    ? doctors 
    : doctors.filter(doctor => doctor.specialization.toLowerCase().includes(selectedSpecialty));

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const BookingModal = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [appointmentType, setAppointmentType] = useState('consultation');
    const [notes, setNotes] = useState('');

    const handleBooking = () => {
      // Here you would typically make an API call to send appointment request
      alert(`Appointment request sent to ${selectedDoctor?.name} for ${selectedDate} at ${selectedTime}. You will receive a confirmation once the doctor accepts your request.`);
      setShowBookingModal(false);
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => setShowBookingModal(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Book Appointment with {selectedDoctor?.name}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Type
              </label>
              <select
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="consultation">Consultation</option>
                <option value="follow-up">Follow-up</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Time
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Describe your condition or any specific concerns..."
              />
            </div>
          </div>

          <div className="flex space-x-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setShowBookingModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime}
              className="flex-1"
            >
              Send Request
            </Button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Dermatologist</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with board-certified dermatologists for professional consultations and personalized treatment plans.
          </p>
        </motion.div>

        {/* Specialty Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {specialties.map((specialty) => (
            <button
              key={specialty.id}
              onClick={() => setSelectedSpecialty(specialty.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                selectedSpecialty === specialty.id
                  ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-md'
              }`}
            >
              {specialty.name}
            </button>
          ))}
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="p-6 h-full">
                <div className="text-center mb-6">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-lg"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {doctor.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-2">
                    {doctor.specialization}
                  </p>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-gray-600">{doctor.rating}</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {doctor.experience} years experience
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{doctor.location.address}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-green-500" />
                    <span>Available {doctor.availability.length} days/week</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => handleBookAppointment(doctor)}
                    className="w-full"
                    icon={Calendar}
                  >
                    Book Appointment
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Video}
                      className="text-xs"
                    >
                      Video Call
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={MessageCircle}
                      className="text-xs"
                    >
                      Message
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Booking Modal */}
        {showBookingModal && <BookingModal />}
      </div>
    </div>
  );
};