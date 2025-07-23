import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { Card } from '../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Users, Activity, TrendingUp, Camera, MessageCircle, ShoppingCart, Clock, UserCheck, FileText, Bell, Settings, DollarSign, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProgressTracking } from '../components/ProgressTracking';
import { TreatmentPlans } from '../components/TreatmentPlans';
import { ProductRecommendations } from '../components/ProductRecommendations';
import { DoctorDashboard } from '../components/DoctorDashboard';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // If user is a doctor, show doctor dashboard
  if (user?.role === 'doctor') {
    return <DoctorDashboard />;
  }

  // Patient dashboard content below
  // Mock data for charts
  const weeklyProgress = [
    { day: 'Mon', severity: 3 },
    { day: 'Tue', severity: 2 },
    { day: 'Wed', severity: 2 },
    { day: 'Thu', severity: 1 },
    { day: 'Fri', severity: 1 },
    { day: 'Sat', severity: 1 },
    { day: 'Sun', severity: 0 }
  ];

  const conditionDistribution = [
    { name: 'Acne', value: 40, color: '#3B82F6' },
    { name: 'Eczema', value: 25, color: '#10B981' },
    { name: 'Rosacea', value: 20, color: '#F59E0B' },
    { name: 'Other', value: 15, color: '#8B5CF6' }
  ];

  const stats = [
    { 
      title: 'Total Scans', 
      value: '24', 
      change: '+12%', 
      icon: Camera, 
      color: 'from-blue-500 to-blue-600' 
    },
    { 
      title: 'Appointments', 
      value: '8', 
      change: '+5%', 
      icon: Calendar, 
      color: 'from-green-500 to-green-600' 
    },
    { 
      title: 'Messages', 
      value: '16', 
      change: '+23%', 
      icon: MessageCircle, 
      color: 'from-purple-500 to-purple-600' 
    },
    { 
      title: 'Products', 
      value: '5', 
      change: '+8%', 
      icon: ShoppingCart, 
      color: 'from-orange-500 to-orange-600' 
    }
  ];

  const recentActivities = [
    { 
      id: 1, 
      type: 'scan', 
      title: 'New skin analysis completed', 
      time: '2 hours ago',
      icon: Camera,
      color: 'text-blue-600'
    },
    { 
      id: 2, 
      type: 'appointment', 
      title: 'Appointment with Dr. Smith scheduled', 
      time: '1 day ago',
      icon: Calendar,
      color: 'text-green-600'
    },
    { 
      id: 3, 
      type: 'message', 
      title: 'New message from Dr. Johnson', 
      time: '2 days ago',
      icon: MessageCircle,
      color: 'text-purple-600'
    },
    { 
      id: 4, 
      type: 'product', 
      title: 'Skincare product delivered', 
      time: '3 days ago',
      icon: ShoppingCart,
      color: 'text-orange-600'
    }
  ];

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
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                Here's your skin health overview for today
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Last updated: 5 minutes ago</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
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
          {/* Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  Weekly Progress
                </h3>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                </select>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="severity" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Lower severity scores indicate improved skin condition
              </p>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-green-600" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Condition Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2 text-purple-600" />
              Condition Distribution
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={conditionDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
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
              <div className="flex flex-col justify-center space-y-4">
                {conditionDistribution.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
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

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Link to="/diagnosis" className="p-4 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-center block">
                <Camera className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700">New Scan</span>
              </Link>
              <Link to="/doctors" className="p-4 border border-gray-200 rounded-xl hover:bg-green-50 hover:border-green-300 transition-all duration-200 text-center block">
                <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700">Book Appointment</span>
              </Link>
              <Link to="/chat" className="p-4 border border-gray-200 rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 text-center block">
                <MessageCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700">Chat with Doctor</span>
              </Link>
              <Link to="/store" className="p-4 border border-gray-200 rounded-xl hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 text-center block">
                <ShoppingCart className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700">Shop Products</span>
              </Link>
              <Link to="/reports" className="p-4 border border-gray-200 rounded-xl hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 text-center block">
                <Activity className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700">View Reports</span>
              </Link>
              <Link to="/appointments" className="p-4 border border-gray-200 rounded-xl hover:bg-pink-50 hover:border-pink-300 transition-all duration-200 text-center block">
                <Clock className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700">Track Appointments</span>
              </Link>
            </div>
          </Card>
        </motion.div>

        {/* Enhanced Dashboard Sections */}
        <div className="space-y-8">
          {/* Progress Tracking Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <ProgressTracking />
          </motion.div>

          {/* Treatment Plans Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <TreatmentPlans />
          </motion.div>

          {/* Product Recommendations Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <ProductRecommendations condition="acne" severity="mild" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};