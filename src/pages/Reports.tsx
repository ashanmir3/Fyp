import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Calendar, User, Activity, TrendingUp } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface Report {
  id: string;
  title: string;
  date: Date;
  type: 'diagnosis' | 'consultation' | 'treatment';
  doctor: string;
  status: 'completed' | 'pending' | 'in-progress';
  summary: string;
  downloadUrl: string;
}

export const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const reports: Report[] = [
    {
      id: '1',
      title: 'Skin Analysis Report - Acne Treatment',
      date: new Date('2024-01-15'),
      type: 'diagnosis',
      doctor: 'Dr. Sarah Johnson',
      status: 'completed',
      summary: 'Comprehensive analysis showing mild acne with recommended treatment plan including topical retinoids.',
      downloadUrl: '#'
    },
    {
      id: '2',
      title: 'Follow-up Consultation Report',
      date: new Date('2024-01-08'),
      type: 'consultation',
      doctor: 'Dr. Michael Chen',
      status: 'completed',
      summary: 'Progress evaluation showing 70% improvement in skin condition after 4 weeks of treatment.',
      downloadUrl: '#'
    },
    {
      id: '3',
      title: 'Treatment Progress Report',
      date: new Date('2023-12-20'),
      type: 'treatment',
      doctor: 'Dr. Emily Rodriguez',
      status: 'in-progress',
      summary: 'Ongoing treatment monitoring with weekly progress photos and symptom tracking.',
      downloadUrl: '#'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'diagnosis': return Activity;
      case 'consultation': return User;
      case 'treatment': return TrendingUp;
      default: return FileText;
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
            Medical
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Reports</span>
          </h1>
          <p className="text-xl text-gray-600">
            View and download your comprehensive medical reports and analysis results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reports List */}
          <div className="lg:col-span-2 space-y-6">
            {reports.map((report, index) => {
              const TypeIcon = getTypeIcon(report.type);
              return (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card hover className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                          <TypeIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {report.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{report.date.toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{report.doctor}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm">
                            {report.summary}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(report.status)}`}>
                        {report.status.replace('-', ' ')}
                      </span>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button
                        size="sm"
                        icon={Eye}
                        onClick={() => setSelectedReport(report)}
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        icon={Download}
                      >
                        Download PDF
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Report Details */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              {selectedReport ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Report Details
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Title:</span>
                        <p className="text-sm text-gray-600 mt-1">{selectedReport.title}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Date:</span>
                        <p className="text-sm text-gray-600 mt-1">{selectedReport.date.toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Doctor:</span>
                        <p className="text-sm text-gray-600 mt-1">{selectedReport.doctor}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Type:</span>
                        <p className="text-sm text-gray-600 mt-1 capitalize">{selectedReport.type}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Status:</span>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize mt-1 ${getStatusColor(selectedReport.status)}`}>
                          {selectedReport.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full" icon={Download}>
                      Download Full Report
                    </Button>
                    <Button variant="outline" className="w-full" icon={Eye}>
                      View in Browser
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Select a report to view details</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};