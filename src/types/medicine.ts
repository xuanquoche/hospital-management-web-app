export enum BatchStatus {
  IN_STOCK = 'IN_STOCK',
  LOW_STOCK = 'LOW_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  EXPIRED = 'EXPIRED',
  DISPOSED = 'DISPOSED',
}

export interface Category {
  id: string;
  name: string;
  code: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Medicine {
  id: string;
  name: string;
  code: string;
  activeIngredient: string;
  description: string;
  unit: string;
  dosage: string;
  manufacturer: string;
  categoryId: string;
  lowStockThreshold: number;
  requiresPrescription: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface MedicineBatch {
  id: string;
  medicineId: string;
  batchNumber: string;
  quantity: number;
  currentStock: number;
  unitPrice: number;
  sellingPrice: number;
  manufactureDate: string;
  expiryDate: string;
  manufacturer: string;
  supplier: string;
  status: BatchStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
  medicine: Medicine;
}

export interface Meta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface MedicineBatchResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: MedicineBatch[];
  meta: Meta;
  timestamp: string;
}

export interface QueryMedicineBatchDto {
  page?: number;
  limit?: number;
  medicineId?: string;
  categoryId?: string;
  status?: BatchStatus;
  expiryDateBefore?: string;
  expiryDateAfter?: string;
  search?: string;
}

export interface CreateMedicineBatchDto {
  categoryId: string;
  medicineId: string;
  batchNumber: string;
  quantity: number;
  unitPrice: number;
  sellingPrice: number;
  manufactureDate: string;
  expiryDate: string;
  manufacturer: string;
  supplier: string;
  status: BatchStatus;
  notes?: string;
}

export interface CreateCategoryDto {
  name: string;
  code: string;
  description: string;
  isActive: boolean;
}

export interface CreateMedicineDto {
  name: string;
  code: string;
  activeIngredient: string;
  description: string;
  unit: string;
  dosage: string;
  manufacturer: string;
  categoryId: string;
  lowStockThreshold: number;
  requiresPrescription: boolean;
  isActive: boolean;
}

export enum MedicineUnit {
  TABLET = 'TABLET',
  CAPSULE = 'CAPSULE',
  SACHET = 'SACHET',
  BOTTLE = 'BOTTLE',
  TUBE = 'TUBE',
  AMPOULE = 'AMPOULE',
  VIAL = 'VIAL',
  BOX = 'BOX',
}
