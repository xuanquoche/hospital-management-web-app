export interface Appointment {
  id: string;
  time: string;
  duration: string;
  patientName: string;
  patientId: string;
  room: string;
  status: 'completed' | 'in-progress' | 'waiting' | 'cancelled';
  type: 'offline' | 'online';
  tags: string[];
}

export interface Patient {
  id: string;
  name: string;
  time: string;
  action: string;
  avatar?: string;
}

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    time: '08:00',
    duration: '30 phút',
    patientName: 'Nguyễn Minh Anh',
    patientId: 'BN-20458',
    room: 'Phòng 302',
    status: 'completed',
    type: 'offline',
    tags: ['Đau đầu, mệt mỏi', 'Ưu tiên'],
  },
  {
    id: '2',
    time: '08:45',
    duration: '30 phút',
    patientName: 'Trần Gia Khánh',
    patientId: 'BN-16742',
    room: 'Phòng 302',
    status: 'in-progress',
    type: 'offline',
    tags: ['Theo dõi tăng huyết áp'],
  },
  {
    id: '3',
    time: '09:30',
    duration: '20 phút',
    patientName: 'Phạm Thùy Dương',
    patientId: 'BN-19302',
    room: 'Video call',
    status: 'waiting',
    type: 'online',
    tags: ['Tư vấn kết quả xét nghiệm máu'],
  },
  {
    id: '4',
    time: '10:00',
    duration: '30 phút',
    patientName: 'Lê Công Thành',
    patientId: 'BN-15021',
    room: 'Phòng 302',
    status: 'waiting',
    type: 'offline',
    tags: ['Đau ngực nhẹ'],
  },
  {
    id: '5',
    time: '10:45',
    duration: '20 phút',
    patientName: 'Vũ Kiều My',
    patientId: 'BN-18890',
    room: 'Video call',
    status: 'waiting',
    type: 'online',
    tags: ['Tư vấn thuốc đang dùng'],
  },
];

export const mockRecentPatients: Patient[] = [
  {
    id: '1',
    name: 'Nguyễn Minh Anh',
    time: '08:00',
    action: 'Đau đầu - Đã kê đơn',
    avatar: 'https://github.com/shadcn.png',
  },
  {
    id: '2',
    name: 'Trần Gia Khánh',
    time: 'Đang khám',
    action: 'Huyết áp',
    avatar: 'https://github.com/shadcn.png',
  },
  {
    id: '3',
    name: 'Phạm Thùy Dương',
    time: 'Chờ lúc 09:30',
    action: 'Xét nghiệm máu',
    avatar: 'https://github.com/shadcn.png',
  },
];

export const mockStats = {
  total: 8,
  completed: 3,
  waiting: 5,
  cancelled: 0,
};
