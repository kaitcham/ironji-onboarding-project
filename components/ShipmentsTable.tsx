'use client';

import Link from 'next/link';

interface Shipment {
  id: number;
  first_name: string;
  last_name: string;
  address: string;
  country: string;
  zip_code?: string;
  city: string;
  state: string;
}

interface ShipmentsTableProps {
  page: number;
  shipments: Shipment[];
  numberOfPages: number;
  setPage: (page: number) => void;
}

export default function ShipmentsTable({
  page,
  setPage,
  shipments,
  numberOfPages,
}: ShipmentsTableProps) {
  return (
    <div className="shipments__container">
      <div style={{ overflowX: 'auto' }}>
        <table className="shipments__container__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Country</th>
              <th>Zip Code</th>
              <th>City</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((shipment) => (
              <tr key={shipment.id}>
                <td>{shipment.id}</td>
                <td>{shipment.first_name}</td>
                <td>{shipment.last_name}</td>
                <td>{shipment.address}</td>
                <td>{shipment.country}</td>
                <td>{shipment.zip_code || 'N/A'}</td>
                <td>{shipment.city}</td>
                <td>{shipment.state}</td>
                <td>
                  <Link href={`/shipments/${shipment.id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="shipments__container__pagination">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="pagination__button"
        >
          Previous
        </button>
        <span className="page__info">
          Page {page} of {numberOfPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === numberOfPages}
          className="pagination__button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
