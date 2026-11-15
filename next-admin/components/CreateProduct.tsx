'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import api from '@/lib/api';

const CreateProduct = () => {
  const router = useRouter();

  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [price, setPrice] = useState('');
  const [title, setTitle] = useState('');

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await api.post('/products', {
        description: description,
        image: image,
        price: Number(price),
        title: title,
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
          requestError.response?.data?.message ?? 'Failed to create product.';
        setError(serverMessage);
      } else {
        setError('Failed to create product.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="col-md-10">
      <h1 className="h4 mb-4">Create Product</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

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

        <div className="mb-3">
          <label className="form-label" htmlFor="image">
            Image
          </label>
          <input
            className="form-control"
            id="image"
            onChange={(event) => setImage(event.target.value)}
            required
            type="text"
            value={image}
          />
        </div>

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
          {isSubmitting ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
