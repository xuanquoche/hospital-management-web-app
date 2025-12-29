import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useRef, useState, useEffect } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const t = useTranslations('Admin.DoctorCreate.ImageUpload');
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      setPreview(value);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        if (onChange) {
          onChange(result); // Passing base64 for now
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='flex items-center gap-4'>
      <Avatar className='h-20 w-20 bg-slate-100'>
        <AvatarImage src={preview || ''} />
        <AvatarFallback className='bg-slate-100'>
          <User className='h-10 w-10 text-slate-300' />
        </AvatarFallback>
      </Avatar>
      <div>
        <p className='mb-2 text-sm font-medium text-slate-700'>{t('profilePhoto')}</p>
        <div className='flex items-center gap-3'>
          <Button
            type='button'
            variant='secondary'
            className='bg-teal-50 text-teal-700 hover:bg-teal-100'
            onClick={handleUploadClick}
          >
            {t('uploadPhoto')}
          </Button>
          <span className='text-xs text-slate-400'>{t('uploadFormat')}</span>
        </div>
        <input type='file' ref={fileInputRef} className='hidden' accept='image/*' onChange={handleFileChange} />
      </div>
    </div>
  );
};
