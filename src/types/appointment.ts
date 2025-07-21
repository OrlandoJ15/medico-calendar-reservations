export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  available: boolean;
  schedule: DoctorSchedule;
}

export interface DoctorSchedule {
  [day: string]: TimeSlot[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
  patientName?: string;
}

export interface Appointment {
  id: string;
  doctorId: number;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface Specialty {
  id: number;
  name: string;
  description: string;
  active: boolean;
}