'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { OrderItem } from '@/app/types';

const OrderItems = ({ id }: { id: number }) => {
  const router = useRouter();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await api.get(`/orders/${id}`);
        const order = response.data.data;

        setOrderItems(order.order_items);
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
            requestError.response?.data?.message ?? 'Failed to load order.';
          setError(serverMessage);
        } else {
          setError('Failed to load order.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id]);

  return (
    <div className="col-md-10">
      <h1 className="h4 mb-4">Order Items</h1>

      {isLoading && <p>Loading...</p>}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!isLoading && !error && (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Product Title</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((orderItem) => {
              return (
                <tr key={orderItem.id}>
                  <td>{orderItem.product_title}</td>
                  <td>{orderItem.price}</td>
                  <td>{orderItem.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderItems;
