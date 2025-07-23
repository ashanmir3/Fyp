import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, MapPin, Phone, Video, MessageCircle, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface Appointment {
  id: string;
  doctorName: string;
  doctorAvatar: string;
  specialization: string;
  date: Date;
  time: string;
  type: 'consultation' | 'follow-up' | 'emergency';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rejected';
  location: string;
  notes?: string;
  meetingLink?: string;
}

export const AppointmentTracking: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const appointments: Appointment[] = [
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      doctorAvatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150',
      specialization: 'General Dermatology',
      date: new Date('2024-01-20'),
      time: '10:00 AM',
      type: 'consultation',
      status: 'confirmed',
      location: '123 Medical Center, New York, NY',
      notes: 'Follow-up for acne treatment progress',
      meetingLink: 'https://meet.dermaassist.com/room/abc123'
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      doctorAvatar: 'https://images.pexels.com/photos/612608/pexels-photo-612608.jpeg?auto=compress&cs=tinysrgb&w=150',
      specialization: 'Cosmetic Dermatology',
      date: new Date('2024-01-18'),
      time: '2:30 PM',
      type: 'consultation',
      status: 'pending',
      location: '456 Health Plaza, Los Angeles, CA',
      notes: 'Initial consultation for skin rejuvenation'
    },
    {
      id: '3',
      doctorName: 'Dr. Emily Rodriguez',
      doctorAvatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150',
      specialization: 'Pediatric Dermatology',
      date: new Date('2024-01-15'),
      time: '11:00 AM',
      type: 'follow-up',
      status: 'completed',
      location: '789 Children\'s Hospital, Chicago, IL',
      notes: 'Treatment review and progress assessment'
    },
    {
      id: '4',
      doctorName: 'Dr. James Wilson',
      doctorAvatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150',
      specialization: 'Dermatologic Surgery',
      date: new Date('2024-01-12'),
      time: '9:00 AM',
      type: 'consultation',
      status: 'rejected',
      location: '321 Surgery Center, Miami, FL',
      notes: 'Doctor unavailable - please reschedule'
    }
  ];

  const filteredAppointments = filterStatus === 'all' 
    ? appointments 
    : appointments.filter(apt => apt.status === filterStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return CheckCircle;
      case 'completed': return CheckCircle;
      case 'cancelled': return XCircle;
      case 'rejected': return XCircle;
      default: return AlertCircle;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'text-blue-600 bg-blue-100';
      case 'follow-up': return 'text-green-600 bg-green-100';
      case 'emergency': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Appointment
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Tracking</span>
          </h1>
          <p className="text-xl text-gray-600">
            Track and manage all your medical appointments in one place.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-wrap items-center gap-4"
        >
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Filter by status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Appointments</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </motion.div>

        {/* Appointments List */}
        <div className="space-y-6">
          {filteredAppointments.map((appointment, index) => {
            const StatusIcon = getStatusIcon(appointment.status);
            return (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={appointment.doctorAvatar}
                        alt={appointment.doctorName}
                        className="w-16 h-16 rounded-full object-cover shadow-lg"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {appointment.doctorName}
                        </h3>
                        <p className="text-blue-600 font-medium mb-2">
                          {appointment.specialization}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{appointment.date.toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getTypeColor(appointment.type)}`}>
                        {appointment.type}
                      </span>
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={`w-5 h-5 ${appointment.status === 'confirmed' || appointment.status === 'completed' ? 'text-green-600' : appointment.status === 'rejected' || appointment.status === 'cancelled' ? 'text-red-600' : 'text-yellow-600'}`} />
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{appointment.location}</span>
                    </div>
                    {appointment.notes && (
                      <div className="flex items-start text-sm text-gray-600">
                        <User className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                        <span>{appointment.notes}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {appointment.status === 'confirmed' && (
                      <>
                        {appointment.meetingLink && (
                          <Button size="sm" icon={Video}>
                            Join Video Call
                          </Button>
                        )}
                        <Button size="sm" variant="outline" icon={Phone}>
                          Call Doctor
                        </Button>
                        <Button size="sm" variant="outline" icon={MessageCircle}>
                          Send Message
                        </Button>
                      </>
                    )}
                    {appointment.status === 'pending' && (
                      <Button size="sm" variant="outline">
                        Cancel Request
                      </Button>
                    )}
                    {appointment.status === 'rejected' && (
                      <Button size="sm" icon={Calendar}>
                        Reschedule
                      </Button>
                    )}
                    {appointment.status === 'completed' && (
                      <Button size="sm" variant="outline">
                        View Report
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredAppointments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-500">
              {filterStatus === 'all' 
                ? 'You don\'t have any appointments yet.' 
                : `No ${filterStatus} appointments found.`}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};