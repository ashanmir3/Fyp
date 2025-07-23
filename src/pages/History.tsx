import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Camera, FileText, Download, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MedicalRecord } from '../types';

export const History: React.FC = () => {
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const medicalHistory: MedicalRecord[] = [
    {
      id: '1',
      patientId: 'user-1',
      images: [
        'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      diagnosis: 'Mild Acne Vulgaris',
      treatment: 'Topical retinoid therapy with benzoyl peroxide. Daily gentle cleansing routine recommended.',
      date: new Date('2024-01-15'),
      doctorId: 'dr-1',
      severity: 'mild'
    },
    {
      id: '2',
      patientId: 'user-1',
      images: [
        'https://images.pexels.com/photos/4465829/pexels-photo-4465829.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      diagnosis: 'Seborrheic Dermatitis',
      treatment: 'Antifungal shampoo and topical corticosteroid. Avoid harsh skincare products.',
      date: new Date('2024-01-08'),
      doctorId: 'dr-2',
      severity: 'moderate'
    },
    {
      id: '3',
      patientId: 'user-1',
      images: [
        'https://images.pexels.com/photos/4465832/pexels-photo-4465832.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      diagnosis: 'Contact Dermatitis',
      treatment: 'Topical corticosteroid and identification of allergen triggers. Patch testing recommended.',
      date: new Date('2023-12-20'),
      doctorId: 'dr-1',
      severity: 'severe'
    },
    {
      id: '4',
      patientId: 'user-1',
      images: [
        'https://images.pexels.com/photos/4465833/pexels-photo-4465833.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      diagnosis: 'Routine Skin Check',
      treatment: 'No treatment required. Continue current skincare routine and sun protection.',
      date: new Date('2023-11-10'),
      doctorId: 'dr-3',
      severity: 'mild'
    }
  ];

  const filteredHistory = filterSeverity === 'all' 
    ? medicalHistory 
    : medicalHistory.filter(record => record.severity === filterSeverity);

  const toggleExpanded = (recordId: string) => {
    setExpandedRecord(expandedRecord === recordId ? null : recordId);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'severe': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Medical
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> History</span>
          </h1>
          <p className="text-xl text-gray-600">
            View your complete dermatological history, diagnoses, and treatment records.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-wrap items-center gap-4"
        >
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Filter by severity:</span>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Severities</option>
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          </div>
          <Button variant="outline" size="sm" icon={Download}>
            Export History
          </Button>
        </motion.div>

        {/* History Timeline */}
        <div className="space-y-6">
          {filteredHistory.map((record, index) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="p-6">
                  {/* Record Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {record.diagnosis}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{record.date.toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Camera className="w-4 h-4" />
                            <span>{record.images.length} image{record.images.length !== 1 ? 's' : ''}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getSeverityColor(record.severity)}`}>
                        {record.severity}
                      </span>
                      <button
                        onClick={() => toggleExpanded(record.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {expandedRecord === record.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Images Preview */}
                  <div className="flex space-x-3 mb-4">
                    {record.images.slice(0, 3).map((image, imgIndex) => (
                      <div key={imgIndex} className="relative group">
                        <img
                          src={image}
                          alt={`Medical record ${imgIndex + 1}`}
                          className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Eye className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    ))}
                    {record.images.length > 3 && (
                      <div className="w-20 h-20 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                        <span className="text-sm text-gray-600">+{record.images.length - 3}</span>
                      </div>
                    )}
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedRecord === record.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-gray-200 space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Treatment Plan</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {record.treatment}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2">Doctor Information</h5>
                              <p className="text-sm text-gray-600">Dr. Sarah Johnson</p>
                              <p className="text-sm text-gray-500">Dermatologist</p>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2">Follow-up</h5>
                              <p className="text-sm text-gray-600">
                                {record.severity === 'severe' ? 'Required in 2 weeks' : 'As needed'}
                              </p>
                            </div>
                          </div>

                          <div className="flex space-x-3 pt-4">
                            <Button size="sm" variant="outline" icon={Eye}>
                              View Full Report
                            </Button>
                            <Button size="sm" variant="outline" icon={Download}>
                              Download
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No records found</h3>
            <p className="text-gray-500">
              {filterSeverity === 'all' 
                ? 'You don\'t have any medical records yet.' 
                : `No records found with ${filterSeverity} severity.`}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};