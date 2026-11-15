'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Product } from '@/app/types';
import Delete from './Delete';

const Products = () => {
  const router = useRouter();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    setError('');
    setIsLoading(true);

    try {
      const response = await api.get('/products');
      setProducts(response.data.data);
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
          requestError.response?.data?.message ?? 'Failed to load products.';
        setError(serverMessage);
      } else {
        setError('Failed to load products.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="col-md-10">
      {isLoading && <p>Loading products...</p>}

      {error && (
        <div className="alert alert-danger" role="alert">
          <p className="mb-2">{error}</p>
          <button
            className="btn btn-outline-primary btn-sm"
            type="button"
            onClick={loadProducts}
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Image</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>
                    <img
                      alt={product.title}
                      className="img-thumbnail"
                      src={product.image}
                      width={100}
                    />
                  </td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>
                    <Delete
                      endpoint="products"
                      id={product.id}
                      onError={setError}
                      onDelete={handleDelete}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Products;
