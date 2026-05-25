export type Patient = {
  id: number;
  name: string;
  birthDate: string;
  phone?: string | null;
  email?: string | null;
  cpf?: string | null;
  address?: string | null;
  profession?: string | null;
  origin?: string | null;
  events?: PatientEvent[];
  evolutions?: Evolution[];
};

export type PatientPayload = Omit<Patient, 'id' | 'events' | 'evolutions'>;

export type PatientEvent = {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  patientId: number;
};

export type EventPayload = Omit<PatientEvent, 'id' | 'patientId'>;

export type Evolution = {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  patientId: number;
};

export type EvolutionPayload = Omit<Evolution, 'id' | 'patientId'>;
