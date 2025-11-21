import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';

export const ImageUpload = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-20 w-20 bg-slate-100">
        <AvatarImage src={preview || ''} />
        <AvatarFallback className="bg-slate-100">
          <User className="h-10 w-10 text-slate-300" />
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Profile photo</p>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="secondary"
            className="bg-teal-50 text-teal-700 hover:bg-teal-100"
            onClick={handleUploadClick}
          >
            Upload photo
          </Button>
          <span className="text-xs text-slate-400">JPG, PNG, max 5MB</span>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};
