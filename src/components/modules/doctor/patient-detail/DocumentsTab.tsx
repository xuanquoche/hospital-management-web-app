'use client';

import { format } from 'date-fns';
import {
  Download,
  ExternalLink,
  File,
  FileImage,
  FileText,
  Loader2,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useState } from 'react';

import { BlockchainFileVerify } from '@/components/modules/common/BlockchainFileVerify';
import { BlockchainVerifyButton } from '@/components/modules/common/BlockchainVerifyButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DocumentType } from '@/const/enum';
import { clientFetcher } from '@/lib/fetcher';
import { downloadDocument, viewDocument } from '@/utils/Helpers';

import { UploadMedicalDocumentModal } from './UploadMedicalDocumentModal';

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

interface DocumentsTabProps {
  patientId: string;
  appointments: { id: string; appointmentDate: string }[];
}

const getDocumentIcon = (type: DocumentType) => {
  switch (type) {
    case DocumentType.X_RAY:
    case DocumentType.MRI:
    case DocumentType.CT_SCAN:
    case DocumentType.ULTRASOUND:
      return <FileImage className='w-4 h-4' />;
    case DocumentType.LAB_RESULT:
    case DocumentType.MEDICAL_REPORT:
    case DocumentType.MEDICAL_CASE:
      return <FileText className='w-4 h-4' />;
    default:
      return <File className='w-4 h-4' />;
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

export const DocumentsTab = ({
  patientId,
  appointments,
}: DocumentsTabProps) => {
  const t = useTranslations('Doctor.MyPatients.Detail.Documents');
  const [documents, setDocuments] = useState<PatientDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] =
    useState<string>('');

  const fetchDocuments = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await clientFetcher.get(
        `/doctors/me/patients/${patientId}/documents`
      );
      setDocuments(response.data || []);
    } catch {
      setDocuments([]);
    } finally {
      setIsLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleOpenUploadModal = () => {
    if (appointments.length > 0) {
      setSelectedAppointmentId(appointments[0].id);
    }
    setUploadModalOpen(true);
  };

  const handleUploadSuccess = () => {
    fetchDocuments();
  };

  if (isLoading) {
    return (
      <div className='bg-white rounded-2xl border border-slate-100 p-12 flex justify-center items-center'>
        <Loader2 className='w-8 h-8 animate-spin text-teal-600' />
      </div>
    );
  }

  return (
    <div className='bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm'>
      <div className='p-6 border-b border-slate-100 flex justify-between items-center'>
        <div>
          <h3 className='font-bold text-slate-900'>{t('title')}</h3>
          <p className='text-xs text-slate-500 mt-1'>
            {t('totalDocs', { count: documents.length })}
          </p>
        </div>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={fetchDocuments}
            className='h-8'
          >
            <RefreshCw className='w-4 h-4 mr-1' />
            {t('refresh')}
          </Button>
          {appointments.length > 0 && (
            <Button
              size='sm'
              onClick={handleOpenUploadModal}
              className='bg-teal-600 hover:bg-teal-700 h-8'
            >
              <Plus className='w-4 h-4 mr-1' />
              {t('addDoc')}
            </Button>
          )}
        </div>
      </div>

      <div className='overflow-x-auto'>
        <Table>
          <TableHeader className='bg-slate-50/50'>
            <TableRow>
              <TableHead className='w-[250px]'>{t('docName')}</TableHead>
              <TableHead className='w-[150px]'>{t('type')}</TableHead>
              <TableHead className='w-[120px]'>{t('visitDate')}</TableHead>
              <TableHead className='w-[150px]'>{t('doctor')}</TableHead>
              <TableHead className='w-[120px]'>{t('uploadDate')}</TableHead>
              <TableHead className='max-w-[200px]'>{t('notes')}</TableHead>
              <TableHead className='text-right w-[100px]'>
                {t('actions')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className='text-center py-12 text-slate-500'
                >
                  <div className='flex flex-col items-center gap-2'>
                    <FileText className='w-12 h-12 text-slate-300' />
                    <p>{t('noDocs')}</p>
                    {appointments.length > 0 && (
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={handleOpenUploadModal}
                        className='mt-2'
                      >
                        <Plus className='w-4 h-4 mr-1' />
                        {t('uploadFirst')}
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              documents.map((doc) => (
                <TableRow
                  key={doc.id}
                  className='hover:bg-slate-50/50 transition-colors'
                >
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <div className='p-2 bg-slate-100 rounded-lg text-slate-600'>
                        {getDocumentIcon(doc.documentType)}
                      </div>
                      <span className='font-medium text-slate-900 truncate max-w-[180px]'>
                        {doc.title}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`font-normal ${getDocumentTypeBadgeColor(doc.documentType)}`}
                    >
                      {t(`Types.${doc.documentType}`)}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-slate-600'>
                    {format(new Date(doc.appointmentDate), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell className='text-slate-600 truncate max-w-[150px]'>
                    {doc.doctorName}
                  </TableCell>
                  <TableCell className='text-slate-600'>
                    {format(new Date(doc.createdAt), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell
                    className='text-slate-500 truncate max-w-[200px]'
                    title={doc.notes || ''}
                  >
                    {doc.notes || '-'}
                  </TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-1'>
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
                        className='h-8 w-8 text-slate-500 hover:text-teal-600'
                        title={t('view')}
                        onClick={() => viewDocument(doc.id)}
                      >
                        <ExternalLink className='w-4 h-4' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8 text-slate-500 hover:text-teal-600'
                        title={t('download')}
                        onClick={() => downloadDocument(doc.id)}
                      >
                        <Download className='w-4 h-4' />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedAppointmentId && (
        <UploadMedicalDocumentModal
          open={uploadModalOpen}
          onOpenChange={setUploadModalOpen}
          appointmentId={selectedAppointmentId}
          onSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
};
