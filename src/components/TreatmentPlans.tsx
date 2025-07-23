import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle, AlertCircle, Pill, Droplets, Sun } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Checkbox } from './ui/Checkbox';

interface TreatmentStep {
  id: string;
  title: string;
  description: string;
  frequency: string;
  duration: string;
  completed: boolean;
  type: 'medication' | 'topical' | 'lifestyle';
  icon: React.ComponentType<any>;
}

interface TreatmentPlan {
  id: string;
  title: string;
  condition: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
  doctorName: string;
  createdDate: Date;
  steps: TreatmentStep[];
  progress: number;
}

export const TreatmentPlans: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('1');
  const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>([
    {
      id: '1',
      title: 'Acne Treatment Plan',
      condition: 'Mild Acne Vulgaris',
      severity: 'mild',
      duration: '8 weeks',
      doctorName: 'Dr. Sarah Johnson',
      createdDate: new Date('2024-01-15'),
      progress: 65,
      steps: [
        {
          id: '1',
          title: 'Morning Cleanser',
          description: 'Use gentle foaming cleanser with salicylic acid',
          frequency: 'Once daily (morning)',
          duration: '8 weeks',
          completed: true,
          type: 'topical',
          icon: Droplets
        },
        {
          id: '2',
          title: 'Benzoyl Peroxide Treatment',
          description: 'Apply 2.5% benzoyl peroxide gel to affected areas',
          frequency: 'Once daily (evening)',
          duration: '8 weeks',
          completed: true,
          type: 'topical',
          icon: Droplets
        },
        {
          id: '3',
          title: 'Moisturizer',
          description: 'Apply non-comedogenic moisturizer',
          frequency: 'Twice daily',
          duration: '8 weeks',
          completed: false,
          type: 'topical',
          icon: Droplets
        },
        {
          id: '4',
          title: 'Sun Protection',
          description: 'Apply broad-spectrum SPF 30+ sunscreen',
          frequency: 'Daily (morning)',
          duration: '8 weeks',
          completed: false,
          type: 'lifestyle',
          icon: Sun
        }
      ]
    }
  ]);

  const currentPlan = treatmentPlans.find(plan => plan.id === selectedPlan);

  const toggleStepCompletion = (planId: string, stepId: string) => {
    setTreatmentPlans(prevPlans =>
      prevPlans.map(plan =>
        plan.id === planId
          ? {
              ...plan,
              steps: plan.steps.map(step =>
                step.id === stepId
                  ? { ...step, completed: !step.completed }
                  : step
              ),
              progress: Math.round(
                (plan.steps.filter(s => s.id === stepId ? !s.completed : s.completed).length / plan.steps.length) * 100
              )
            }
          : plan
      )
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'severe': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'medication': return 'text-purple-600 bg-purple-100';
      case 'topical': return 'text-blue-600 bg-blue-100';
      case 'lifestyle': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!currentPlan) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Treatment Plans</h2>
          <p className="text-gray-600">Follow your personalized treatment plan for optimal results</p>
        </div>
        <select
          value={selectedPlan}
          onChange={(e) => setSelectedPlan(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {treatmentPlans.map(plan => (
            <option key={plan.id} value={plan.id}>{plan.title}</option>
          ))}
        </select>
      </div>

      {/* Plan Overview */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{currentPlan.title}</h3>
            <p className="text-gray-600">{currentPlan.condition}</p>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize mt-2 ${getSeverityColor(currentPlan.severity)}`}>
              {currentPlan.severity}
            </span>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-700">Duration</p>
            <p className="text-lg font-semibold text-blue-600">{currentPlan.duration}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-700">Prescribed by</p>
            <p className="text-lg font-semibold text-gray-900">{currentPlan.doctorName}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-700">Progress</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${currentPlan.progress}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <span className="text-sm font-medium text-gray-900">{currentPlan.progress}%</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Treatment Steps */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Treatment Steps</h3>
        <div className="space-y-4">
          {currentPlan.steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                  step.completed 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-white hover:border-blue-200'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Checkbox
                      checked={step.completed}
                      onChange={() => toggleStepCompletion(currentPlan.id, step.id)}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(step.type)}`}>
                          <StepIcon className="w-4 h-4" />
                        </div>
                        <h4 className={`font-medium ${step.completed ? 'text-green-800 line-through' : 'text-gray-900'}`}>
                          {step.title}
                        </h4>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getTypeColor(step.type)}`}>
                        {step.type}
                      </span>
                    </div>
                    
                    <p className={`text-sm mb-3 ${step.completed ? 'text-green-700' : 'text-gray-600'}`}>
                      {step.description}
                    </p>
                    
                    <div className="flex items-center space-x-6 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{step.frequency}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{step.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Reminders & Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Reminders</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Consistency is Key</p>
                <p className="text-xs text-yellow-700">Follow your treatment plan daily for best results</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">Track Progress</p>
                <p className="text-xs text-blue-700">Take weekly photos to monitor improvement</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button className="w-full" size="sm">
              Schedule Follow-up
            </Button>
            <Button variant="outline" className="w-full" size="sm">
              Contact Doctor
            </Button>
            <Button variant="outline" className="w-full" size="sm">
              Export Plan
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};