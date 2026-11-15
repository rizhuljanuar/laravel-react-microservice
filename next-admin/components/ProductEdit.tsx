'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import api from '@/lib/api';
import ImageUpload from './ImageUpload';

const ProductEdit = ({ id }: { id: number }) => {
  const router = useRouter();

  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [price, setPrice] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        const product = response.data.data;

        setTitle(product.title);
        setDescription(product.description ?? '');
        setImage(product.image);
        setPrice(product.price);
      } catch (requestError) {
        if (
          axios.isAxiosError(requestError) &&
          requestError.response?.status === 401
        ) {
          router.push('/login');
          return;
        }

        if (axios.isAxiosError(requestError)) {
          const serverMessage =
            requestError.response?.data?.message ?? 'Failed to load product.';
          setError(serverMessage);
        } else {
          setError('Failed to load product.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await api.put(`/products/${id}`, {
        title: title,
        description: description,
        image: image,
        price: Number(price),
      });

      router.push('/products');
    } catch (requestError) {
      if (
        axios.isAxiosError(requestError) &&
        requestError.response?.status === 401
      ) {
        router.push('/login');
        return;
      }

      if (axios.isAxiosError(requestError)) {
        const serverMessage =
          requestError.response?.data?.message ?? 'Failed to update product.';
        setError(serverMessage);
      } else {
        setError('Failed to update product.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="col-md-10">
      <h1 className="h4 mb-4">Edit Product</h1>

      {isLoading && <p>Loading...</p>}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!isLoading && title.length > 0 && (
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="title">
              Title
            </label>
            <input
              className="form-control"
              id="title"
              onChange={(event) => setTitle(event.target.value)}
              required
              type="text"
              value={title}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              value={description}
            />
          </div>

          <ImageUpload
            onError={setError}
            onImageChange={setImage}
            value={image}
          />

          <div className="mb-3">
            <label className="form-label" htmlFor="price">
              Price
            </label>
            <input
              className="form-control"
              id="price"
              onChange={(event) => setPrice(event.target.value)}
              required
              step="0.01"
              type="number"
              value={price}
            />
          </div>

          <button
            className="btn btn-primary"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductEdit;
