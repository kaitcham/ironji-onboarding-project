'use client';
import { useParams } from 'next/navigation';
import EditIcon from '@/components/EditIcon';
import { getShipment } from '@/lib/server-functions';
import AttachementHandler from '@/components/AttachementHandler';
import CreateShipmentForm from '@/components/CreateShipmentForm';
import { useQuery } from '@tanstack/react-query';

export default function page() {
  const { id } = useParams<{ id: string }>();
  const { isLoading, data: shipment } = useQuery({
    queryKey: ['shipment', id],
    queryFn: () => getShipment(String(id)),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="shipment__details__page">
      <div className="shipment__details__page__content">
        <h1 className="shipment__details__page__content__title">
          Shipment #{shipment.id}
        </h1>
        <div className="shipment__details__page__content__details">
          <div className="shipment__details__page__content__details__actions">
            <CreateShipmentForm
              queryKey={['shipment', id]}
              shipmentToUpdate={shipment}
              buttonContent={<EditIcon />}
            />
          </div>
          <p>
            <strong>First Name:</strong> {shipment.first_name}
          </p>
          <p>
            <strong>Last Name:</strong> {shipment.last_name}
          </p>
          <p>
            <strong>Address:</strong> {shipment.address}
          </p>
          <p>
            <strong>Country:</strong> {shipment.country}
          </p>
          <p>
            <strong>Zip Code:</strong> {shipment.zip_code}
          </p>
          <p>
            <strong>City:</strong> {shipment.city}
          </p>
          <p>
            <strong>State:</strong> {shipment.state}
          </p>
        </div>
      </div>
      <div className="shipment__details__page__attachments">
        <h2 className="shipment__details__page__attachments__title">
          Attachments
        </h2>
        {shipment.attachments && shipment.attachments.length > 0 ? (
          <ul className="attachments__list">
            {shipment.attachments.map((attachment: any) => (
              <li key={attachment.id} className="attachment">
                <a
                  target="_blank"
                  href={attachment.url}
                  rel="noopener noreferrer"
                >
                  {attachment.title}
                </a>
                <p>{attachment.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <p className="paragraph">No attachments yet.</p>
            <AttachementHandler shipmentId={shipment.id} />
          </>
        )}
      </div>
    </div>
  );
}
