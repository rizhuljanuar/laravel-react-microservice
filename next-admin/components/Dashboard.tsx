'use client';

import axios from 'axios';
import Chart from 'chart.js/auto';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import api from '@/lib/api';
import { ChartRecord } from '@/app/types';

const Dashboard = () => {
  const router = useRouter();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [records, setRecords] = useState<ChartRecord[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await api.get('/chart');
        setRecords(response.data.data);
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
            requestError.response?.data?.message ?? 'Failed to load chart.';
          setError(serverMessage);
        } else {
          setError('Failed to load chart.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (records.length === 0 || !canvasRef.current) {
      return;
    }

    const chart = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: records.map((record) => record.date),
        datasets: [
          {
            label: 'Sales',
            data: records.map((record) => record.sum),
          },
        ],
      },
    });

    return () => {
      chart.destroy();
    };
  }, [records]);

  return (
    <main className="col-md-10 px-4 py-3">
      <h1 className="h2">Dashboard</h1>

      <h2 className="h4 mb-3">Daily Sales</h2>

      {isLoading && <p>Loading chart...</p>}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <canvas ref={canvasRef} />
    </main>
  );
};

export default Dashboard;
