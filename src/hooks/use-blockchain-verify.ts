import { useState, useCallback } from 'react';

import {
  verifyDocumentOnBlockchain,
  getDocumentFromBlockchain,
  type VerifyResult,
  type BlockchainRecord,
} from '@/lib/blockchain';

interface UseBlockchainVerifyReturn {
  isLoading: boolean;
  error: string | null;
  verifyResult: VerifyResult | null;
  blockchainRecord: BlockchainRecord | null;
  verify: (
    documentId: string,
    dataHash: string
  ) => Promise<VerifyResult | null>;
  getRecord: (documentId: string) => Promise<BlockchainRecord | null>;
  reset: () => void;
}

export function useBlockchainVerify(): UseBlockchainVerifyReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifyResult, setVerifyResult] = useState<VerifyResult | null>(null);
  const [blockchainRecord, setBlockchainRecord] =
    useState<BlockchainRecord | null>(null);

  const verify = useCallback(async (documentId: string, dataHash: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await verifyDocumentOnBlockchain(documentId, dataHash);
      setVerifyResult(result);
      return result;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Verification failed';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getRecord = useCallback(async (documentId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const record = await getDocumentFromBlockchain(documentId);
      setBlockchainRecord(record);
      return record;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to get record';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setVerifyResult(null);
    setBlockchainRecord(null);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    verifyResult,
    blockchainRecord,
    verify,
    getRecord,
    reset,
  };
}
