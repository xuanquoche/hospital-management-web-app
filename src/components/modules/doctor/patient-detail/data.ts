export interface PatientDetail {
  id: string;
  name: string;
  age: number;
  gender: string;
  dob: string;
  address: string;
  avatar: string;
  tags: string[];
  currentPlan: string;
  personalInfo: {
    height: string;
    weight: string;
    bmi: string;
    job: string;
    lifestyle: string;
    familyHistory: string[];
  };
  todayVisit: {
    id?: string;
    time: string;
    room: string;
    reason: string;
    diagnosis: string;
    plan: string;
    prescription: string;
    notes: string[];
  };
  vitals: {
    bp: string;
    heartRate: number;
    temp: number;
    spO2: number;
    respRate: number;
    weight: number;
    weightChange: string;
  };
  timeline: {
    date: string;
    time: string;
    title: string;
    type: string;
    doctor: string;
    status: string;
    desc?: string;
  }[];
  allergies: {
    name: string;
    reaction: string;
    severity: 'high' | 'medium' | 'low';
  }[];
  medications: {
    name: string;
    dosage: string;
  }[];
  documents: {
    date: string;
    name: string;
    type: string;
  }[];
  doctorNotes: {
    date: string;
    author: string;
    content: string;
  }[];
  contact: {
    phone: string;
    email: string;
    fullAddress: string;
  };
  nextAppointment: {
    date: string;
    type: string;
  };
  appointments: {
    id: string;
    appointmentDate: string;
    status: string;
    examinationType: string;
    symptoms: string | null;
    diagnosis: string | null;
    prescription: string | null;
    notes: string | null;
    completedAt: string | null;
    timeSlot: {
      startTime: string;
      endTime: string;
    };
  }[];
}

export const mockPatientDetail: PatientDetail = {
  id: 'BN-20458',
  name: 'Nguyễn Minh Anh',
  age: 32,
  gender: 'Nữ',
  dob: '05/03/1992',
  address: 'Sống tại TP. Hồ Chí Minh',
  avatar: 'https://github.com/shadcn.png',
  tags: ['Khám trực tiếp - Phòng 302', 'Đau đầu, mệt mỏi', 'Dị ứng: Paracetamol'],
  currentPlan: 'Theo dõi đau đầu mạn tính · Hẹn tái khám sau 2 tuần · Thuốc đang dùng: Amlodipine',
  personalInfo: {
    height: '160 cm',
    weight: '55 kg',
    bmi: '21.5',
    job: 'Nhân viên văn phòng',
    lifestyle: 'Ngồi nhiều, căng thẳng công việc',
    familyHistory: ['Tăng huyết áp', 'Không hút thuốc', 'Thỉnh thoảng uống cà phê'],
  },
  todayVisit: {
    time: '08:00',
    room: 'Phòng 302',
    reason: 'Đau đầu, mệt mỏi kéo dài 2 tuần',
    diagnosis: 'Nghi ngờ đau đầu do căng thẳng, theo dõi huyết áp',
    plan: 'Điều chỉnh lối sống, theo dõi huyết áp tại nhà 2 tuần - tái khám sau 14 ngày',
    prescription: 'Amlodipine 5mg buổi sáng · Thuốc giảm đau paracetamol tránh dùng do dị ứng',
    notes: [
      'Khuyên bệnh nhân ngủ đủ giấc, hạn chế caffeine sau 16:00.',
      'Nếu đau đầu tăng lên kèm nhìn mờ, buồn nôn, cần đi khám ngay.',
    ],
  },
  vitals: {
    bp: '125 / 78',
    heartRate: 76,
    temp: 36.7,
    spO2: 98,
    respRate: 18,
    weight: 55,
    weightChange: '+0,5 kg',
  },
  timeline: [
    {
      date: 'Hôm nay',
      time: '08:00',
      title: 'Đau đầu, mệt mỏi',
      type: 'Khám trực tiếp · Phòng 302',
      doctor: 'BS. Trần Quốc Huy',
      status: 'Đã khám',
    },
    {
      date: '01/11/2024',
      time: '',
      title: 'Tư vấn tăng huyết áp',
      type: 'Tái khám',
      doctor: 'Theo dõi huyết áp 1 tháng',
      status: 'Đánh giá đáp ứng thuốc',
    },
    {
      date: '10/09/2024',
      time: '',
      title: 'Khám sức khỏe tổng quát',
      type: 'Khám định kỳ',
      doctor: 'Xét nghiệm máu cơ bản',
      status: 'Chức năng gan thận bình thường',
    },
  ],
  allergies: [{ name: 'Paracetamol', reaction: 'Nổi mề đay', severity: 'high' }],
  medications: [
    { name: 'Amlodipine 5mg sáng', dosage: '' },
    { name: 'Vitamin D', dosage: '' },
  ],
  documents: [
    {
      date: '10/09/2024',
      name: 'Kết quả xét nghiệm máu',
      type: 'Kết quả trong giới hạn bình thường',
    },
    {
      date: 'Chưa thực hiện',
      name: 'Chụp MRI não',
      type: 'Cân nhắc nếu triệu chứng xấu đi',
    },
    {
      date: 'Đã upload',
      name: 'Hồ sơ khám sức khỏe công ty',
      type: 'Có ghi nhận tăng huyết áp nhẹ',
    },
  ],
  doctorNotes: [
    {
      date: 'Hôm nay · 08:20',
      author: 'BS. Trần Quốc Huy',
      content: 'Nghi nhiều đến đau đầu do căng thẳng, ưu tiên thay đổi lối sống trước khi tăng liều thuốc.',
    },
    {
      date: '01/11/2024 · 09:05',
      author: 'BS. Trần Quốc Huy',
      content: 'Bệnh nhân tuân thủ thuốc tương đối tốt, huyết áp cải thiện.',
    },
  ],
  contact: {
    phone: '(+84) 09xx xxx 123',
    email: 'minhanh.nguyen@example.com',
    fullAddress: 'Quận Bình Thạnh, TP. Hồ Chí Minh',
  },
  nextAppointment: {
    date: 'Sau 14 ngày',
    type: 'Buổi sáng',
  },
  appointments: [],
};
