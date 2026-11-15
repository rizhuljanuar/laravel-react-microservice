'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Order } from '@/app/types';

const Orders = () => {
  const router = useRouter();

  const [error, setError] = useState('');
  const [exportError, setExportError] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  const loadOrders = async () => {
    setError('');
    setIsLoading(true);

    try {
      const response = await api.get('/orders');
      setOrders(response.data.data);
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
          requestError.response?.data?.message ?? 'Failed to load orders.';
        setError(serverMessage);
      } else {
        setError('Failed to load orders.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async () => {
    setExportError('');
    setIsExporting(true);

    try {
      const response = await api.get('/export', { responseType: 'blob' });

      const blob = new Blob([response.data], { type: 'text/csv' });
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'orders.csv';
      link.click();

      window.URL.revokeObjectURL(downloadUrl);
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
          requestError.response?.data?.message ?? 'Failed to export orders.';
        setExportError(serverMessage);
      } else {
        setExportError('Failed to export orders.');
      }
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="col-md-10">
      {isLoading && <p>Loading orders...</p>}

      {error && (
        <div className="alert alert-danger" role="alert">
          <p className="mb-2">{error}</p>
          <button
            className="btn btn-outline-primary btn-sm"
            type="button"
            onClick={loadOrders}
          >
            Try again
          </button>
        </div>
      )}

      {exportError && (
        <div className="alert alert-danger" role="alert">
          {exportError}
        </div>
      )}

      {!isLoading && (
        <button
          className="btn btn-outline-primary btn-sm mb-3"
          disabled={isExporting}
          onClick={handleExport}
          type="button"
        >
          {isExporting ? 'Exporting...' : 'Export'}
        </button>
      )}

      {!isLoading && !error && (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Total</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.first_name}</td>
                  <td>{order.last_name}</td>
                  <td>{order.email}</td>
                  <td>{order.total}</td>
                  <td>
                    <Link
                      className="btn btn-outline-primary btn-sm"
                      href={`/orders/${order.id}`}
                    >
                      View
                    </Link>
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

export default Orders;
