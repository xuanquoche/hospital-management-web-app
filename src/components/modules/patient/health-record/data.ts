export interface Visit {
  id: string;
  date: string;
  title: string;
  doctor: string;
  facility: string;
  type: 'offline' | 'online';
  tags: string[];
  status: 'completed' | 'pending' | 'cancelled';

  // Details
  time?: string;
  department?: string;
  reason?: string;
  vitals?: {
    bloodPressure: string;
    heartRate: number;
    height: number;
    weight: number;
  };
  diagnosis?: string;
  diagnosisTags?: string[];
  prescription?: Array<{
    name: string;
    dosage: string;
    instruction: string;
  }>;
  doctorNote?: string;
}

export const mockVisits: Visit[] = [
  {
    id: 'HS-2025-0705-01',
    date: '2025-07-05',
    title: 'Khám tổng quát - Nội tổng quát',
    doctor: 'BS. Trần Quốc Huy',
    facility: 'Bệnh viện MediCare Quận 3',
    type: 'offline',
    tags: ['Đau đầu', 'Mệt mỏi', 'Xét nghiệm máu'],
    status: 'completed',
    time: '09:30',
    department: 'Khoa Nội tổng quát',
    reason:
      'Bệnh nhân than phiền đau đầu nhiều ngày, cảm giác mệt mỏi, khó ngủ.',
    vitals: {
      bloodPressure: '110/70',
      heartRate: 72,
      height: 160,
      weight: 52,
    },
    diagnosis: 'Rối loạn lo âu nhẹ',
    diagnosisTags: ['Rối loạn lo âu nhẹ', 'Thiếu ngủ'],
    prescription: [
      {
        name: 'Paracetamol 500mg',
        dosage: '15 viên',
        instruction: 'Uống 1 viên khi đau đầu, tối đa 3 lần/ngày',
      },
      {
        name: 'Vitamin B complex',
        dosage: '30 viên',
        instruction: 'Uống 1 viên sau ăn sáng',
      },
    ],
    doctorNote:
      'Khuyến khích bệnh nhân điều chỉnh giờ giấc sinh hoạt, hạn chế sử dụng thiết bị điện tử trước khi ngủ, duy trì tập thể dục nhẹ 30 phút mỗi ngày.',
  },
  {
    id: 'HS-2025-04-18-02',
    date: '2025-04-18',
    title: 'Khám từ xa - Tư vấn dinh dưỡng',
    doctor: 'BS. Lê Hoàng Yến',
    facility: 'Video call',
    type: 'online',
    tags: ['Tăng cân', 'Chế độ ăn'],
    status: 'completed',
    time: '14:00',
    department: 'Khoa Dinh dưỡng',
    reason: 'Tư vấn chế độ ăn giảm cân an toàn.',
    vitals: {
      bloodPressure: '120/80',
      heartRate: 75,
      height: 160,
      weight: 55,
    },
    diagnosis: 'Thừa cân nhẹ',
    diagnosisTags: ['Thừa cân'],
    prescription: [],
    doctorNote:
      'Áp dụng thực đơn giảm tinh bột, tăng rau xanh. Tái khám sau 1 tháng.',
  },
  {
    id: 'HS-2025-01-02-03',
    date: '2025-01-02',
    title: 'Khám bệnh - Tai mũi họng',
    doctor: 'BS. Nguyễn Hải Long',
    facility: 'Phòng khám số 204',
    type: 'offline',
    tags: ['Viêm họng', 'Đơn thuốc'],
    status: 'completed',
    time: '08:15',
    department: 'Khoa Tai Mũi Họng',
    reason: 'Đau họng, ho khan.',
    vitals: {
      bloodPressure: '115/75',
      heartRate: 80,
      height: 160,
      weight: 53,
    },
    diagnosis: 'Viêm họng cấp',
    diagnosisTags: ['Viêm họng'],
    prescription: [
      {
        name: 'Antibiotic X',
        dosage: '10 viên',
        instruction: 'Uống 2 lần/ngày sau ăn',
      },
    ],
    doctorNote: 'Uống nhiều nước ấm, tránh nước đá.',
  },
];
