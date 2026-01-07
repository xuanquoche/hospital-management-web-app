'use client';

import { Camera, Loader2 } from 'lucide-react';
import React, { useRef, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { clientFetcher } from '@/lib/fetcher';
import { cn } from '@/lib/utils';
import { toast } from 'react-toastify';

interface AvatarUploaderProps {
  src?: string;
  fallback?: string;
  alt?: string;
  className?: string;
  onUploadSuccess?: (url: string) => void;
  editable?: boolean;
}

interface UploadResponse {
  url: string;
  publicId: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}

export const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  src,
  fallback = 'U',
  alt = 'Avatar',
  className,
  onUploadSuccess,
  editable = true,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Client-side preview
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      setPreviewUrl(base64String);
      setIsUploading(true);

      try {
        // API Integration
        const formData = new FormData();
        formData.append('file', file);

        const response = (await clientFetcher.postFormData('/upload/avatar', formData)) as UploadResponse;

        if (response && response.url) {
          onUploadSuccess?.(response.url);
        }
        toast.success('Avatar uploaded successfully');
      } catch (error) {
        console.error('Avatar upload failed:', error);
        toast.error('Avatar upload failed');
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={cn('relative inline-block', className)}>
      <Avatar className='h-full w-full border-2 border-white shadow-sm'>
        <AvatarImage src={previewUrl || src} alt={alt} className='object-cover' />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>

      {editable && (
        <>
          <input type='file' ref={fileInputRef} onChange={handleFileChange} accept='image/*' className='hidden' />
          <Button
            size='icon'
            variant='secondary'
            className='absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-md border border-white hover:bg-slate-100'
            onClick={handleEditClick}
            disabled={isUploading}
            type='button'
          >
            {isUploading ? <Loader2 className='h-4 w-4 animate-spin' /> : <Camera className='h-4 w-4 text-slate-600' />}
            <span className='sr-only'>Change Avatar</span>
          </Button>
        </>
      )}
    </div>
  );
};
