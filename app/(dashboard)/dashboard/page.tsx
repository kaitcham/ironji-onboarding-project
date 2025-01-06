'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getShipments } from '@/lib/server-functions';
import ShipmentsTable from '@/components/ShipmentsTable';
import CreateShipmentForm from '@/components/CreateShipmentForm';

export default function page() {
  const [page, setPage] = useState(1);
  const { isLoading, data: shipments } = useQuery({
    queryKey: ['shipments', page],
    queryFn: () => getShipments(page),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="dashboard__content">
      <div className="dashboard__content__header">
        <h3>Shipments</h3>
        <CreateShipmentForm page={page} length={shipments.length} />
      </div>
      <ShipmentsTable
        page={page}
        setPage={setPage}
        shipments={shipments?.data}
        numberOfPages={shipments?.pages}
      />
    </div>
  );
}
