export interface Invoice {
  id: string;
  title: string;
  date: string;
  amount: number;
  status: 'unpaid' | 'paid';
  facility: string;

  // Details
  dueDate?: string;
  services?: Array<{
    name: string;
    amount: number;
  }>;
  discount?: number;
  total?: number;
}

export interface PaymentMethod {
  id: string;
  type: 'visa' | 'bank' | 'wallet';
  name: string;
  detail: string;
  isDefault?: boolean;
}

export const mockInvoices: Invoice[] = [
  {
    id: 'HD-2025-0705-01',
    title: 'Khám tổng quát + Xét nghiệm máu',
    date: '2025-07-05',
    amount: 850000,
    status: 'unpaid',
    facility: 'Bệnh viện MediCare Quận 3',
    dueDate: '2025-07-12',
    services: [
      { name: 'Dịch vụ khám tổng quát', amount: 500000 },
      { name: 'Xét nghiệm máu tổng quát', amount: 300000 },
      { name: 'Phụ phí hồ sơ', amount: 50000 },
    ],
    discount: 0,
    total: 850000,
  },
  {
    id: 'HD-2025-0418-02',
    title: 'Khám từ xa - Tư vấn dinh dưỡng',
    date: '2025-04-18',
    amount: 400000,
    status: 'unpaid',
    facility: 'Video call',
    dueDate: '2025-04-25',
    services: [{ name: 'Phí tư vấn trực tuyến (30 phút)', amount: 400000 }],
    discount: 0,
    total: 400000,
  },
  {
    id: 'HD-2025-0102-03',
    title: 'Khám Tai mũi họng',
    date: '2025-01-02',
    amount: 350000,
    status: 'paid',
    facility: 'Phòng khám số 204',
    dueDate: '2025-01-02',
    services: [{ name: 'Khám chuyên khoa Tai Mũi Họng', amount: 350000 }],
    discount: 0,
    total: 350000,
  },
];

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm_1',
    type: 'visa',
    name: 'Thẻ Visa **** 1234',
    detail: 'Hết hạn 08/27 · Chủ thẻ: NGUYEN M A',
    isDefault: true,
  },
  {
    id: 'pm_2',
    type: 'bank',
    name: 'Chuyển khoản ngân hàng',
    detail: 'Hiển thị thông tin tài khoản sau khi xác nhận',
  },
  {
    id: 'pm_3',
    type: 'wallet',
    name: 'Ví điện tử / QR',
    detail: 'Thanh toán bằng mã QR hoặc ví điện tử được hỗ trợ',
  },
];

export const mockTransactions = [
  {
    id: 'TR-2025-0102-03',
    invoiceId: 'HD-2025-0102-03',
    date: '2025-01-02',
    amount: 350000,
    method: 'Thẻ Visa **** 1234',
  },
  {
    id: 'TR-2024-1205-08',
    invoiceId: 'HD-2024-1205-08',
    date: '2024-12-05',
    amount: 780000,
    method: 'Chuyển khoản ngân hàng',
  },
];
