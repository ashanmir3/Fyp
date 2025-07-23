import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, User, Mail, Lock, Phone, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';

interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  role: 'patient' | 'doctor';
  terms: boolean;
}

export const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError
  } = useForm<SignupForm>();

  const password = watch('password');

  const onSubmit = async (data: SignupForm) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match'
      });
      return;
    }

    try {
      await signup(data);
      navigate('/dashboard');
    } catch (error) {
      setError('email', {
        type: 'manual',
        message: 'Failed to create account. Please try again.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center"
            >
              <User className="w-7 h-7 text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              DermaAssist
            </span>
          </Link>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
          <p className="text-gray-600">Join thousands of users improving their skin health</p>
        </motion.div>

        <Card glass className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <motion.label
                  whileHover={{ scale: 1.02 }}
                  className="relative cursor-pointer"
                >
                  <input
                    type="radio"
                    value="patient"
                    {...register('role', { required: 'Please select your role' })}
                    className="sr-only"
                  />
                  <div className="p-4 border-2 border-gray-200 rounded-xl text-center transition-all duration-200 hover:border-blue-300 peer-checked:border-blue-500 peer-checked:bg-blue-50">
                    <User className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <span className="text-sm font-medium">Patient</span>
                  </div>
                </motion.label>
                
                <motion.label
                  whileHover={{ scale: 1.02 }}
                  className="relative cursor-pointer"
                >
                  <input
                    type="radio"
                    value="doctor"
                    {...register('role', { required: 'Please select your role' })}
                    className="sr-only"
                  />
                  <div className="p-4 border-2 border-gray-200 rounded-xl text-center transition-all duration-200 hover:border-green-300 peer-checked:border-green-500 peer-checked:bg-green-50">
                    <User className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <span className="text-sm font-medium">Doctor</span>
                  </div>
                </motion.label>
              </div>
              {errors.role && (
                <p className="text-sm text-red-600">{errors.role.message}</p>
              )}
            </div>

            {/* Name */}
            <Input
              label="Full Name"
              icon={User}
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
              error={errors.name?.message}
            />

            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              error={errors.email?.message}
            />

            {/* Phone */}
            <Input
              label="Phone Number (Optional)"
              type="tel"
              icon={Phone}
              {...register('phone')}
              error={errors.phone?.message}
            />

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Password must be at least 8 characters' },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message: 'Password must contain uppercase, lowercase, and number'
                    }
                  })}
                  className={`
                    w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl
                    ${errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}
                    focus:border-transparent focus:outline-none focus:ring-2
                    transition-all duration-200 bg-white/50 backdrop-blur-sm
                  `}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                  className={`
                    w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl
                    ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}
                    focus:border-transparent focus:outline-none focus:ring-2
                    transition-all duration-200 bg-white/50 backdrop-blur-sm
                  `}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                {...register('terms', { required: 'You must accept the terms and conditions' })}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="text-sm">
                <label className="text-gray-700">
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-800 font-medium">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
                    Privacy Policy
                  </Link>
                </label>
                {errors.terms && (
                  <p className="text-red-600 mt-1">{errors.terms.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full group"
              loading={loading}
              disabled={loading}
            >
              Create Account
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};