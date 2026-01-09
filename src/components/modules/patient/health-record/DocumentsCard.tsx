'use client';

import { format } from 'date-fns';
import {
  Download,
  ExternalLink,
  File,
  FileImage,
  FileText,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

import { BlockchainFileVerify } from '@/components/modules/common/BlockchainFileVerify';
import { BlockchainVerifyButton } from '@/components/modules/common/BlockchainVerifyButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DocumentType, DocumentTypeLabels } from '@/const/enum';
import { clientFetcher } from '@/lib/fetcher';
import { downloadDocument, viewDocument } from '@/utils/Helpers';

interface BlockchainInfo {
  dataHash: string;
  txHash: string;
}

interface PatientDocument {
  id: string;
  title: string;
  documentType: DocumentType;
  documentUrl: string;
  notes: string | null;
  createdAt: string;
  appointmentId: string;
  appointmentDate: string;
  doctorName: string;
  fileContentHash: string | null;
  blockchain: BlockchainInfo | null;
}

const getDocumentIcon = (type: DocumentType) => {
  switch (type) {
    case DocumentType.X_RAY:
    case DocumentType.MRI:
    case DocumentType.CT_SCAN:
    case DocumentType.ULTRASOUND:
      return <FileImage className='w-5 h-5 text-slate-500' />;
    case DocumentType.LAB_RESULT:
    case DocumentType.MEDICAL_REPORT:
    case DocumentType.MEDICAL_CASE:
      return <FileText className='w-5 h-5 text-slate-500' />;
    default:
      return <File className='w-5 h-5 text-slate-500' />;
  }
};

const getDocumentTypeBadgeColor = (type: DocumentType) => {
  switch (type) {
    case DocumentType.LAB_RESULT:
      return 'bg-purple-50 text-purple-700 border-purple-100';
    case DocumentType.X_RAY:
    case DocumentType.MRI:
    case DocumentType.CT_SCAN:
    case DocumentType.ULTRASOUND:
      return 'bg-blue-50 text-blue-700 border-blue-100';
    case DocumentType.PRESCRIPTION:
      return 'bg-green-50 text-green-700 border-green-100';
    case DocumentType.MEDICAL_CASE:
      return 'bg-red-50 text-red-700 border-red-100';
    case DocumentType.MEDICAL_REPORT:
      return 'bg-orange-50 text-orange-700 border-orange-100';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-100';
  }
};

export const DocumentsCard = () => {
  const [documents, setDocuments] = useState<PatientDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDocuments = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await clientFetcher.get('/patients/me/documents');
      setDocuments(response.data || []);
    } catch {
      setDocuments([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='mb-4 flex justify-between items-start'>
        <div>
          <h3 className='text-lg font-bold text-slate-900'>
            Tài liệu & báo cáo
          </h3>
          <p className='text-sm text-slate-500'>
            {documents.length > 0
              ? `${documents.length} tài liệu đã lưu`
              : 'Các file PDF và hình ảnh đã lưu.'}
          </p>
        </div>
        <Button
          variant='ghost'
          size='icon'
          onClick={fetchDocuments}
          disabled={isLoading}
          className='h-8 w-8'
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {isLoading ? (
        <div className='flex justify-center py-8'>
          <Loader2 className='w-6 h-6 animate-spin text-teal-600' />
        </div>
      ) : documents.length === 0 ? (
        <div className='text-center py-8 text-slate-500'>
          <FileText className='w-12 h-12 mx-auto text-slate-300 mb-2' />
          <p className='text-sm'>Chưa có tài liệu nào</p>
        </div>
      ) : (
        <div className='space-y-4 max-h-[400px] overflow-y-auto'>
          {documents.map((doc) => (
            <div key={doc.id} className='flex items-start gap-3'>
              <div className='p-2 bg-slate-100 rounded-lg'>
                {getDocumentIcon(doc.documentType)}
              </div>
              <div className='flex-1 min-w-0'>
                <div className='flex justify-between items-start gap-2'>
                  <div className='min-w-0 flex-1'>
                    <p className='text-sm font-bold text-slate-900 truncate'>
                      {doc.title}
                    </p>
                    <div className='flex items-center gap-2 mt-1 flex-wrap'>
                      <Badge
                        className={`text-xs font-normal ${getDocumentTypeBadgeColor(doc.documentType)}`}
                      >
                        {DocumentTypeLabels[doc.documentType] ||
                          doc.documentType}
                      </Badge>
                      <span className='text-xs text-slate-500'>
                        {format(new Date(doc.createdAt), 'dd/MM/yyyy')}
                      </span>
                    </div>
                    <p className='text-xs text-slate-400 mt-1 truncate'>
                      BS. {doc.doctorName}
                    </p>
                  </div>
                  <div className='flex gap-1 flex-shrink-0'>
                    {doc.blockchain && (
                      <>
                        <BlockchainVerifyButton
                          documentId={doc.id}
                          txHash={doc.blockchain.txHash}
                        />
                        <BlockchainFileVerify
                          documentId={doc.id}
                          txHash={doc.blockchain.txHash}
                          documentTitle={doc.title}
                        />
                      </>
                    )}
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-7 w-7 text-slate-500 hover:text-teal-600'
                      onClick={() => viewDocument(doc.id)}
                      title='Xem file'
                    >
                      <ExternalLink className='w-4 h-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-7 w-7 text-slate-500 hover:text-teal-600'
                      onClick={() => downloadDocument(doc.id)}
                      title='Tải xuống'
                    >
                      <Download className='w-4 h-4' />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
