export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  available: string;
  price: number;
  image: string;
}

export interface DoctorFormValues {
  name: string;
  username: string;
  phone: string;
  email: string;
  dob: string;
  experience: number;
  department: string;
  designation: string;
  license: string;
  bloodGroup: string;
  gender: string;
  bio: string;
  address: string;
  appointmentType: string;
  consultationCharge: number;
  education: { degree: string; university: string; from: string; to: string }[];
  awards: { name: string; date: string }[];
  certifications: string[];
}
