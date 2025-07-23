import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, TrendingDown, Camera, Target } from 'lucide-react';
import { Card } from './ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface ProgressData {
  date: string;
  severity: number;
  improvement: number;
  photos: number;
}

export const ProgressTracking: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  const progressData: ProgressData[] = [
    { date: '2024-01-01', severity: 8, improvement: 0, photos: 1 },
    { date: '2024-01-07', severity: 7, improvement: 12.5, photos: 2 },
    { date: '2024-01-14', severity: 6, improvement: 25, photos: 3 },
    { date: '2024-01-21', severity: 4, improvement: 50, photos: 4 },
    { date: '2024-01-28', severity: 3, improvement: 62.5, photos: 5 },
    { date: '2024-02-04', severity: 2, improvement: 75, photos: 6 },
    { date: '2024-02-11', severity: 2, improvement: 75, photos: 7 },
    { date: '2024-02-18', severity: 1, improvement: 87.5, photos: 8 }
  ];

  const beforeAfterImages = [
    {
      before: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400',
      after: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2024-01-01 to 2024-02-18',
      improvement: '87.5%'
    }
  ];

  const currentSeverity = progressData[progressData.length - 1]?.severity || 0;
  const initialSeverity = progressData[0]?.severity || 0;
  const overallImprovement = ((initialSeverity - currentSeverity) / initialSeverity) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Progress Tracking</h2>
          <p className="text-gray-600">Monitor your skin health improvement over time</p>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 3 months</option>
          <option value="365">Last year</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Improvement</p>
              <p className="text-3xl font-bold text-green-600">{overallImprovement.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Severity</p>
              <p className="text-3xl font-bold text-blue-600">{currentSeverity}/10</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Photos Taken</p>
              <p className="text-3xl font-bold text-purple-600">{progressData.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Progress Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Severity Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis domain={[0, 10]} />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value: number, name: string) => [
                  name === 'severity' ? `${value}/10` : `${value}%`,
                  name === 'severity' ? 'Severity Level' : 'Improvement'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="severity" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
                name="severity"
              />
              <Line 
                type="monotone" 
                dataKey="improvement" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                name="improvement"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Before/After Comparison */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Before & After Comparison</h3>
        <div className="space-y-6">
          {beforeAfterImages.map((comparison, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Before</h4>
                <div className="relative group">
                  <img
                    src={comparison.before}
                    alt="Before treatment"
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                    <span className="text-white font-medium">Initial Condition</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">After</h4>
                <div className="relative group">
                  <img
                    src={comparison.after}
                    alt="After treatment"
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                    <span className="text-white font-medium">{comparison.improvement} Improvement</span>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2 text-center">
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">{comparison.improvement} improvement over {comparison.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Treatment Timeline */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Treatment Timeline</h3>
        <div className="space-y-4">
          {progressData.map((data, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4"
            >
              <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0" />
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    {new Date(data.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Severity: {data.severity}/10 • Photos: {data.photos}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {data.improvement > 0 && (
                    <span className="text-sm font-medium text-green-600">
                      +{data.improvement}% improvement
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};