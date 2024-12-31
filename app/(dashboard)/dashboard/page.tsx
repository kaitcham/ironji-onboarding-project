'use client';
import { useEffect, useState } from 'react';
import { getShipments } from '@/lib/server-functions';
import ShipmentsTable from '@/components/ShipmentsTable';
import CreateShipmentForm from '@/components/CreateShipmentForm';

export default function page() {
  const [page, setPage] = useState(1);
  const [shipments, setShipments] = useState({ data: [], pages: 1 });

  useEffect(() => {
    getShipments(page).then((data) => setShipments(data));
  }, [page]);

  return (
    <div className="dashboard__content">
      <div className="dashboard__content__header">
        <h3>Shipments</h3>
        <CreateShipmentForm />
      </div>
      <ShipmentsTable
        page={page}
        setPage={setPage}
        shipments={shipments.data}
        numberOfPages={shipments.pages}
      />
    </div>
  );
}
