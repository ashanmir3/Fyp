export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor';
  avatar?: string;
  phone?: string;
  createdAt: Date;
}

export interface Doctor extends User {
  specialization: string;
  experience: number;
  rating: number;
  availability: AvailabilitySlot[];
  location: {
    address: string;
    lat: number;
    lng: number;
  };
}

export interface Patient extends User {
  medicalHistory: MedicalRecord[];
  appointments: Appointment[];
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  images: string[];
  diagnosis: string;
  treatment: string;
  date: Date;
  doctorId?: string;
  severity: 'mild' | 'moderate' | 'severe';
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'consultation' | 'follow-up';
  notes?: string;
}

export interface AvailabilitySlot {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'image';
}