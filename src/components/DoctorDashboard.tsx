import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { 
  Calendar, 
  Users, 
  Activity, 
  TrendingUp, 
  UserCheck, 
  FileText, 
  Bell, 
  Settings, 
  DollarSign, 
  Star,
  Clock,
  MessageCircle,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Download,
  Phone,
  Video
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface AppointmentRequest {
  id: string;
  patientName: string;
  patientAvatar: string;
  condition: string;
  requestedDate: Date;
  requestedTime: string;
  status: 'pending' | 'accepted' | 'rejected';
  urgency: 'low' | 'medium' | 'high';
  notes: string;
}

interface Patient {
  id: string;
  name: string;
  avatar: string;
  lastVisit: Date;
  condition: string;
  status: 'stable' | 'improving' | 'needs_attention';
  nextAppointment?: Date;
}

export const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock data for doctor dashboard
  const doctorStats = [
    { 
      title: 'Total Patients', 
      value: '156', 
      change: '+12%', 
      icon: Users, 
      color: 'from-blue-500 to-blue-600' 
    },
    { 
      title: 'Today\'s Appointments', 
      value: '8', 
      change: '+2', 
      icon: Calendar, 
      color: 'from-green-500 to-green-600' 
    },
    { 
      title: 'Pending Requests', 
      value: '5', 
      change: '+3', 
      icon: Clock, 
      color: 'from-orange-500 to-orange-600' 
    },
    { 
      title: 'Monthly Revenue', 
      value: '$12,450', 
      change: '+18%', 
      icon: DollarSign, 
      color: 'from-purple-500 to-purple-600' 
    }
  ];

  const appointmentRequests: AppointmentRequest[] = [
    {
      id: '1',
      patientName: 'Sarah Johnson',
      patientAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      condition: 'Acne Treatment',
      requestedDate: new Date('2024-01-20'),
      requestedTime: '10:00 AM',
      status: 'pending',
      urgency: 'medium',
      notes: 'Experiencing increased breakouts, needs consultation'
    },
    {
      id: '2',
      patientName: 'Michael Chen',
      patientAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      condition: 'Eczema Follow-up',
      requestedDate: new Date('2024-01-21'),
      requestedTime: '2:30 PM',
      status: 'pending',
      urgency: 'high',
      notes: 'Urgent follow-up needed, treatment not responding well'
    },
    {
      id: '3',
      patientName: 'Emily Rodriguez',
      patientAvatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150',
      condition: 'Routine Check-up',
      requestedDate: new Date('2024-01-22'),
      requestedTime: '11:00 AM',
      status: 'pending',
      urgency: 'low',
      notes: 'Regular skin health check-up'
    }
  ];

  const recentPatients: Patient[] = [
    {
      id: '1',
      name: 'Alice Thompson',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastVisit: new Date('2024-01-15'),
      condition: 'Psoriasis',
      status: 'improving',
      nextAppointment: new Date('2024-01-25')
    },
    {
      id: '2',
      name: 'David Wilson',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastVisit: new Date('2024-01-12'),
      condition: 'Rosacea',
      status: 'stable'
    },
    {
      id: '3',
      name: 'Lisa Park',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastVisit: new Date('2024-01-10'),
      condition: 'Acne',
      status: 'needs_attention'
    }
  ];

  const weeklyAppointments = [
    { day: 'Mon', appointments: 6 },
    { day: 'Tue', appointments: 8 },
    { day: 'Wed', appointments: 5 },
    { day: 'Thu', appointments: 9 },
    { day: 'Fri', appointments: 7 },
    { day: 'Sat', appointments: 3 },
    { day: 'Sun', appointments: 2 }
  ];

  const conditionDistribution = [
    { name: 'Acne', value: 35, color: '#3B82F6' },
    { name: 'Eczema', value: 25, color: '#10B981' },
    { name: 'Psoriasis', value: 20, color: '#F59E0B' },
    { name: 'Rosacea', value: 15, color: '#8B5CF6' },
    { name: 'Other', value: 5, color: '#EF4444' }
  ];

  const handleAppointmentAction = (requestId: string, action: 'accept' | 'reject') => {
    // Handle appointment request action
    console.log(`${action} appointment request ${requestId}`);
    // In a real app, this would make an API call
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'improving': return 'text-green-600 bg-green-100';
      case 'stable': return 'text-blue-600 bg-blue-100';
      case 'needs_attention': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, Dr. {user?.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                Here's your practice overview for today
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" icon={Bell}>
                Notifications
              </Button>
              <Button icon={Settings}>
                Settings
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {doctorStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {stat.value}
                      </p>
                      <p className="text-sm text-green-600 mt-1">
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Appointment Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-orange-600" />
                  Pending Appointment Requests
                </h3>
                <Link to="/appointments">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {appointmentRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={request.patientAvatar}
                          alt={request.patientName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">{request.patientName}</h4>
                          <p className="text-sm text-gray-600">{request.condition}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                        {request.urgency} priority
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-3">
                      <p><strong>Requested:</strong> {request.requestedDate.toLocaleDateString()} at {request.requestedTime}</p>
                      <p><strong>Notes:</strong> {request.notes}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleAppointmentAction(request.id, 'accept')}
                        icon={CheckCircle}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAppointmentAction(request.id, 'reject')}
                        icon={XCircle}
                      >
                        Decline
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        icon={MessageCircle}
                      >
                        Message
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Recent Patients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Recent Patients
              </h3>
              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <img
                      src={patient.avatar}
                      alt={patient.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{patient.name}</h4>
                      <p className="text-sm text-gray-600">{patient.condition}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                          {patient.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" icon={Eye} />
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Weekly Appointments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Weekly Appointments
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyAppointments}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="appointments" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Condition Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-purple-600" />
                Patient Conditions
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={conditionDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {conditionDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center space-y-2">
                  {conditionDistribution.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {item.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Link to="/appointments" className="p-4 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-center block">
                <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700">Calendar</span>
              </Link>
              <Link to="/chat" className="p-4 border border-gray-200 rounded-xl hover:bg-green-50 hover:border-green-300 transition-all duration-200 text-center block">
                <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700">Messages</span>
              </Link>
              <Link to="/history" className="p-4 border border-gray-200 rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 text-center block">
                <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700">Patient Records</span>
              </Link>
              <Link to="/reports" className="p-4 border border-gray-200 rounded-xl hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 text-center block">
                <Download className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700">Export Data</span>
              </Link>
              <button className="p-4 border border-gray-200 rounded-xl hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 text-center">
                <Phone className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700">Call Patient</span>
              </button>
              <button className="p-4 border border-gray-200 rounded-xl hover:bg-pink-50 hover:border-pink-300 transition-all duration-200 text-center">
                <Video className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700">Video Call</span>
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};