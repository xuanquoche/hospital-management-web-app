export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  avatar: string;
  lastVisit: {
    time: string;
    reason: string;
  };
  visitType: {
    type: 'direct' | 'video';
    detail: string;
  };
  keyInfo: {
    allergies: string;
    medications: string;
  };
  status: 'examined' | 'waiting' | 'cancelled';
}

export const mockPatients: Patient[] = [
  {
    id: 'BN-20458',
    name: 'Nguyễn Minh Anh',
    age: 32,
    gender: 'Nữ',
    avatar: 'https://github.com/shadcn.png',
    lastVisit: {
      time: 'Hôm nay · 08:00',
      reason: 'Đau đầu, mệt mỏi',
    },
    visitType: {
      type: 'direct',
      detail: 'Phòng 302',
    },
    keyInfo: {
      allergies: 'Paracetamol',
      medications: 'Amlodipine',
    },
    status: 'examined',
  },
  {
    id: 'BN-16742',
    name: 'Trần Gia Khánh',
    age: 45,
    gender: 'Nam',
    avatar: 'https://github.com/shadcn.png',
    lastVisit: {
      time: 'Hôm nay · 08:45',
      reason: 'Theo dõi tăng huyết áp',
    },
    visitType: {
      type: 'direct',
      detail: 'Phòng 302',
    },
    keyInfo: {
      allergies: 'Không ghi nhận',
      medications: 'Losartan',
    },
    status: 'waiting', // Using 'waiting' to represent "Đang khám" as active
  },
  {
    id: 'BN-19302',
    name: 'Phạm Thùy Dương',
    age: 28,
    gender: 'Nữ',
    avatar: 'https://github.com/shadcn.png',
    lastVisit: {
      time: 'Hôm nay · 09:30',
      reason: 'Tư vấn kết quả xét nghiệm máu',
    },
    visitType: {
      type: 'video',
      detail: 'Video call',
    },
    keyInfo: {
      allergies: 'Hải sản',
      medications: 'Vitamin D',
    },
    status: 'waiting',
  },
  {
    id: 'BN-15021',
    name: 'Lê Công Thành',
    age: 39,
    gender: 'Nam',
    avatar: 'https://github.com/shadcn.png',
    lastVisit: {
      time: 'Hôm nay · 10:00',
      reason: 'Đau ngực nhẹ',
    },
    visitType: {
      type: 'direct',
      detail: 'Phòng 302',
    },
    keyInfo: {
      allergies: 'Không',
      medications: 'Aspirin liều thấp',
    },
    status: 'waiting',
  },
  {
    id: 'BN-18890',
    name: 'Vũ Kiều My',
    age: 26,
    gender: 'Nữ',
    avatar: 'https://github.com/shadcn.png',
    lastVisit: {
      time: 'Hôm nay · 10:45',
      reason: 'Tư vấn thuốc đang dùng',
    },
    visitType: {
      type: 'video',
      detail: 'Video call',
    },
    keyInfo: {
      allergies: 'Penicillin',
      medications: 'Metformin',
    },
    status: 'waiting',
  },
  {
    id: 'BN-12004',
    name: 'Đào Quang Huy',
    age: 51,
    gender: 'Nam',
    avatar: 'https://github.com/shadcn.png',
    lastVisit: {
      time: 'Hôm qua · 15:30',
      reason: 'Theo dõi tiểu đường',
    },
    visitType: {
      type: 'direct',
      detail: 'Tái khám',
    },
    keyInfo: {
      allergies: 'Không',
      medications: 'Insulin',
    },
    status: 'examined',
  },
];

export const mockQuickAccess = [
  { id: 'BN-20458', name: 'Nguyễn Minh Anh', reason: 'Đau đầu mạn tính' },
  { id: 'BN-16742', name: 'Trần Gia Khánh', reason: 'Tăng huyết áp' },
  { id: 'BN-12004', name: 'Đào Quang Huy', reason: 'Đái tháo đường type 2' },
];
