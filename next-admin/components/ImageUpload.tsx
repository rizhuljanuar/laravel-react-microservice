'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import api from '@/lib/api';

interface ImageUploadProps {
  value: string;
  onImageChange: (url: string) => void;
  onError: (message: string) => void;
}

const ImageUpload = ({ value, onImageChange, onError }: ImageUploadProps) => {
  const router = useRouter();

  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) {
      return;
    }

    const data = new FormData();
    data.append('image', files[0]);

    onError('');
    try {
      const response = await api.post('/upload', data);
      onImageChange(response.data.url);
    } catch (requestError) {
      if (
        axios.isAxiosError(requestError) &&
        requestError.response?.status === 401
      ) {
        router.push('/login');
        return;
      }

      if (axios.isAxiosError(requestError)) {
        onError(
          requestError.response?.data?.message ?? 'Failed to upload image.'
        );
      } else {
        onError('Failed to upload image.');
      }
    }
  };

  return (
    <>
      <div className="mb-3">
        <label className="form-label" htmlFor="image">
          Image
        </label>
        <input
          className="form-control"
          id="image"
          onChange={(event) => onImageChange(event.target.value)}
          required
          type="text"
          value={value}
        />
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="upload-image">
          Upload Image
        </label>
        <input
          accept="image/*"
          className="form-control"
          id="upload-image"
          onChange={upload}
          type="file"
        />
      </div>
    </>
  );
};

export default ImageUpload;
