import { Doctor, Specialty } from '@/types/appointment';

export const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Ana García",
    specialty: "Cardiología",
    available: true,
    schedule: {
      "monday": [
        { time: "09:00", available: true },
        { time: "09:30", available: true },
        { time: "10:00", available: false, patientName: "Juan Pérez" },
        { time: "10:30", available: true },
        { time: "11:00", available: true },
        { time: "14:00", available: true },
        { time: "14:30", available: true },
        { time: "15:00", available: true },
        { time: "15:30", available: true },
        { time: "16:00", available: true }
      ],
      "tuesday": [
        { time: "09:00", available: true },
        { time: "09:30", available: true },
        { time: "10:00", available: true },
        { time: "10:30", available: true },
        { time: "11:00", available: true },
        { time: "14:00", available: true },
        { time: "14:30", available: true },
        { time: "15:00", available: true },
        { time: "15:30", available: true },
        { time: "16:00", available: true }
      ],
      "wednesday": [
        { time: "09:00", available: true },
        { time: "09:30", available: true },
        { time: "10:00", available: true },
        { time: "10:30", available: true },
        { time: "11:00", available: true },
        { time: "14:00", available: true },
        { time: "14:30", available: true },
        { time: "15:00", available: true },
        { time: "15:30", available: true },
        { time: "16:00", available: true }
      ],
      "thursday": [
        { time: "09:00", available: true },
        { time: "09:30", available: true },
        { time: "10:00", available: true },
        { time: "10:30", available: true },
        { time: "11:00", available: true },
        { time: "14:00", available: true },
        { time: "14:30", available: true },
        { time: "15:00", available: true },
        { time: "15:30", available: true },
        { time: "16:00", available: true }
      ],
      "friday": [
        { time: "09:00", available: true },
        { time: "09:30", available: true },
        { time: "10:00", available: true },
        { time: "10:30", available: true },
        { time: "11:00", available: true },
        { time: "14:00", available: true },
        { time: "14:30", available: true },
        { time: "15:00", available: true },
        { time: "15:30", available: true },
        { time: "16:00", available: true }
      ]
    }
  },
  {
    id: 2,
    name: "Dr. Carlos Rodríguez",
    specialty: "Neurología",
    available: true,
    schedule: {
      "monday": [
        { time: "08:00", available: true },
        { time: "08:30", available: true },
        { time: "09:00", available: false, patientName: "María Silva" },
        { time: "09:30", available: true },
        { time: "10:00", available: true },
        { time: "15:00", available: true },
        { time: "15:30", available: true },
        { time: "16:00", available: true },
        { time: "16:30", available: true },
        { time: "17:00", available: true }
      ],
      "tuesday": [
        { time: "08:00", available: true },
        { time: "08:30", available: true },
        { time: "09:00", available: true },
        { time: "09:30", available: true },
        { time: "10:00", available: true },
        { time: "15:00", available: true },
        { time: "15:30", available: true },
        { time: "16:00", available: true },
        { time: "16:30", available: true },
        { time: "17:00", available: true }
      ],
      "wednesday": [
        { time: "08:00", available: true },
        { time: "08:30", available: true },
        { time: "09:00", available: true },
        { time: "09:30", available: true },
        { time: "10:00", available: true },
        { time: "15:00", available: true },
        { time: "15:30", available: true },
        { time: "16:00", available: true },
        { time: "16:30", available: true },
        { time: "17:00", available: true }
      ],
      "thursday": [
        { time: "08:00", available: true },
        { time: "08:30", available: true },
        { time: "09:00", available: true },
        { time: "09:30", available: true },
        { time: "10:00", available: true },
        { time: "15:00", available: true },
        { time: "15:30", available: true },
        { time: "16:00", available: true },
        { time: "16:30", available: true },
        { time: "17:00", available: true }
      ],
      "friday": [
        { time: "08:00", available: true },
        { time: "08:30", available: true },
        { time: "09:00", available: true },
        { time: "09:30", available: true },
        { time: "10:00", available: true },
        { time: "15:00", available: true },
        { time: "15:30", available: true },
        { time: "16:00", available: true },
        { time: "16:30", available: true },
        { time: "17:00", available: true }
      ]
    }
  },
  {
    id: 3,
    name: "Dr. María López",
    specialty: "Pediatría",
    available: true,
    schedule: {
      "monday": [
        { time: "08:30", available: true },
        { time: "09:00", available: true },
        { time: "09:30", available: true },
        { time: "10:00", available: true },
        { time: "10:30", available: false, patientName: "Carlos Ruiz" },
        { time: "14:30", available: true },
        { time: "15:00", available: true },
        { time: "15:30", available: true },
        { time: "16:00", available: true },
        { time: "16:30", available: true }
      ],
      "tuesday": [
        { time: "08:30", available: true },
        { time: "09:00", available: true },
        { time: "09:30", available: true },
        { time: "10:00", available: true },
        { time: "10:30", available: true },
        { time: "14:30", available: true },
        { time: "15:00", available: true },
        { time: "15:30", available: true },
        { time: "16:00", available: true },
        { time: "16:30", available: true }
      ],
      "wednesday": [
        { time: "08:30", available: true },
        { time: "09:00", available: true },
        { time: "09:30", available: true },
        { time: "10:00", available: true },
        { time: "10:30", available: true },
        { time: "14:30", available: true },
        { time: "15:00", available: true },
        { time: "15:30", available: true },
        { time: "16:00", available: true },
        { time: "16:30", available: true }
      ],
      "thursday": [
        { time: "08:30", available: true },
        { time: "09:00", available: true },
        { time: "09:30", available: true },
        { time: "10:00", available: true },
        { time: "10:30", available: true },
        { time: "14:30", available: true },
        { time: "15:00", available: true },
        { time: "15:30", available: true },
        { time: "16:00", available: true },
        { time: "16:30", available: true }
      ],
      "friday": [
        { time: "08:30", available: true },
        { time: "09:00", available: true },
        { time: "09:30", available: true },
        { time: "10:00", available: true },
        { time: "10:30", available: true },
        { time: "14:30", available: true },
        { time: "15:00", available: true },
        { time: "15:30", available: true },
        { time: "16:00", available: true },
        { time: "16:30", available: true }
      ]
    }
  },
  {
    id: 4,
    name: "Dr. Juan Martínez",
    specialty: "Dermatología",
    available: true,
    schedule: {
      "monday": [
        { time: "10:00", available: true },
        { time: "10:30", available: true },
        { time: "11:00", available: true },
        { time: "11:30", available: true },
        { time: "12:00", available: true },
        { time: "14:00", available: false, patientName: "Ana Torres" },
        { time: "14:30", available: true },
        { time: "15:00", available: true },
        { time: "15:30", available: true },
        { time: "16:00", available: true }
      ],
      "tuesday": [
        { time: "10:00", available: true },
        { time: "10:30", available: true },
        { time: "11:00", available: true },
        { time: "11:30", available: true },
        { time: "12:00", available: true },
        { time: "14:00", available: true },
        { time: "14:30", available: true },
        { time: "15:00", available: true },
        { time: "15:30", available: true },
        { time: "16:00", available: true }
      ],
      "wednesday": [
        { time: "10:00", available: true },
        { time: "10:30", available: true },
        { time: "11:00", available: true },
        { time: "11:30", available: true },
        { time: "12:00", available: true },
        { time: "14:00", available: true },
        { time: "14:30", available: true },
        { time: "15:00", available: true },
        { time: "15:30", available: true },
        { time: "16:00", available: true }
      ],
      "thursday": [
        { time: "10:00", available: true },
        { time: "10:30", available: true },
        { time: "11:00", available: true },
        { time: "11:30", available: true },
        { time: "12:00", available: true },
        { time: "14:00", available: true },
        { time: "14:30", available: true },
        { time: "15:00", available: true },
        { time: "15:30", available: true },
        { time: "16:00", available: true }
      ],
      "friday": [
        { time: "10:00", available: true },
        { time: "10:30", available: true },
        { time: "11:00", available: true },
        { time: "11:30", available: true },
        { time: "12:00", available: true },
        { time: "14:00", available: true },
        { time: "14:30", available: true },
        { time: "15:00", available: true },
        { time: "15:30", available: true },
        { time: "16:00", available: true }
      ]
    }
  }
];

export const mockSpecialties: Specialty[] = [
  { id: 1, name: "Cardiología", description: "Especialidad del corazón y sistema cardiovascular", active: true },
  { id: 2, name: "Neurología", description: "Especialidad del sistema nervioso", active: true },
  { id: 3, name: "Pediatría", description: "Especialidad en salud infantil", active: true },
  { id: 4, name: "Dermatología", description: "Especialidad de la piel", active: true },
  { id: 5, name: "Ginecología", description: "Especialidad en salud femenina", active: true },
  { id: 6, name: "Traumatología", description: "Especialidad en lesiones y traumatismos", active: true }
];