import { ethers } from 'ethers';

const MEDICAL_RECORD_REGISTRY_ABI = [
  {
    inputs: [
      { internalType: 'bytes32', name: '_recordId', type: 'bytes32' },
      { internalType: 'bytes32', name: '_dataHash', type: 'bytes32' },
    ],
    name: 'verifyRecord',
    outputs: [
      { internalType: 'bool', name: 'isValid', type: 'bool' },
      { internalType: 'bool', name: 'isRevoked', type: 'bool' },
      {
        internalType: 'enum HospitalMedicalRecordRegistry.RecordType',
        name: 'recordType',
        type: 'uint8',
      },
      { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: '_recordId', type: 'bytes32' }],
    name: 'getRecord',
    outputs: [
      { internalType: 'bytes32', name: 'dataHash', type: 'bytes32' },
      { internalType: 'bytes32', name: 'appointmentId', type: 'bytes32' },
      { internalType: 'address', name: 'uploader', type: 'address' },
      {
        internalType: 'enum HospitalMedicalRecordRegistry.RecordType',
        name: 'recordType',
        type: 'uint8',
      },
      { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
      { internalType: 'bool', name: 'isRevoked', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getStatistics',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export enum RecordType {
  LAB_RESULT = 0,
  X_RAY = 1,
  MRI = 2,
  CT_SCAN = 3,
  ULTRASOUND = 4,
  PRESCRIPTION = 5,
  MEDICAL_REPORT = 6,
  MEDICAL_CASE = 7,
  OTHER = 8,
}

export const RECORD_TYPE_LABELS: Record<RecordType, string> = {
  [RecordType.LAB_RESULT]: 'Kết quả xét nghiệm',
  [RecordType.X_RAY]: 'X-Ray',
  [RecordType.MRI]: 'MRI',
  [RecordType.CT_SCAN]: 'CT Scan',
  [RecordType.ULTRASOUND]: 'Siêu âm',
  [RecordType.PRESCRIPTION]: 'Đơn thuốc',
  [RecordType.MEDICAL_REPORT]: 'Báo cáo y tế',
  [RecordType.MEDICAL_CASE]: 'Bệnh án',
  [RecordType.OTHER]: 'Khác',
};

export interface VerifyResult {
  isValid: boolean;
  isRevoked: boolean;
  recordType: RecordType;
  recordTypeLabel: string;
  timestamp: number;
  recordedAt: Date | null;
}

export interface BlockchainRecord {
  dataHash: string;
  appointmentId: string;
  uploader: string;
  recordType: RecordType;
  recordTypeLabel: string;
  timestamp: number;
  recordedAt: Date;
  isRevoked: boolean;
}

const RPC_URL =
  process.env.NEXT_PUBLIC_POLYGON_RPC_URL ||
  'https://rpc-amoy.polygon.technology';
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MEDICAL_RECORD_CONTRACT || '';

function getProvider() {
  return new ethers.JsonRpcProvider(RPC_URL);
}

function getContract() {
  if (!CONTRACT_ADDRESS) {
    throw new Error('NEXT_PUBLIC_MEDICAL_RECORD_CONTRACT is not configured');
  }
  const provider = getProvider();
  return new ethers.Contract(
    CONTRACT_ADDRESS,
    MEDICAL_RECORD_REGISTRY_ABI,
    provider
  );
}

function stringToBytes32(str: string): string {
  const bytes = ethers.toUtf8Bytes(str);
  if (bytes.length > 32) {
    return ethers.keccak256(bytes);
  }
  return ethers.zeroPadValue(bytes, 32);
}

export async function verifyDocumentOnBlockchain(
  documentId: string,
  dataHash: string
): Promise<VerifyResult> {
  const contract = getContract();
  const recordIdBytes = stringToBytes32(documentId);
  const dataHashBytes = dataHash.startsWith('0x') ? dataHash : `0x${dataHash}`;

  const [isValid, isRevoked, recordType, timestamp] =
    await contract.verifyRecord(recordIdBytes, dataHashBytes);

  const recordTypeNum = Number(recordType) as RecordType;

  return {
    isValid,
    isRevoked,
    recordType: recordTypeNum,
    recordTypeLabel: RECORD_TYPE_LABELS[recordTypeNum] || 'Không xác định',
    timestamp: Number(timestamp),
    recordedAt:
      Number(timestamp) > 0 ? new Date(Number(timestamp) * 1000) : null,
  };
}

export async function getDocumentFromBlockchain(
  documentId: string
): Promise<BlockchainRecord | null> {
  try {
    const contract = getContract();
    const recordIdBytes = stringToBytes32(documentId);

    const [
      dataHash,
      appointmentId,
      uploader,
      recordType,
      timestamp,
      isRevoked,
    ] = await contract.getRecord(recordIdBytes);

    if (Number(timestamp) === 0) {
      return null;
    }

    const recordTypeNum = Number(recordType) as RecordType;

    return {
      dataHash,
      appointmentId,
      uploader,
      recordType: recordTypeNum,
      recordTypeLabel: RECORD_TYPE_LABELS[recordTypeNum] || 'Không xác định',
      timestamp: Number(timestamp),
      recordedAt: new Date(Number(timestamp) * 1000),
      isRevoked,
    };
  } catch {
    return null;
  }
}

export async function getBlockchainStatistics(): Promise<number> {
  try {
    const contract = getContract();
    const total = await contract.getStatistics();
    return Number(total);
  } catch {
    return 0;
  }
}

export function getPolygonscanUrl(txHash: string): string {
  const isMainnet =
    RPC_URL.includes('polygon-mainnet') || RPC_URL.includes('matic');
  const baseUrl = isMainnet
    ? 'https://polygonscan.com'
    : 'https://amoy.polygonscan.com';
  return `${baseUrl}/tx/${txHash}`;
}

export function getContractUrl(): string {
  const isMainnet =
    RPC_URL.includes('polygon-mainnet') || RPC_URL.includes('matic');
  const baseUrl = isMainnet
    ? 'https://polygonscan.com'
    : 'https://amoy.polygonscan.com';
  return `${baseUrl}/address/${CONTRACT_ADDRESS}`;
}
