import AttachementHandler from '@/components/AttachementHandler';
import { getShipment } from '@/lib/server-functions';

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const shipment = await getShipment(id);

  return (
    <div className="shipment__details__page">
      <div className="shipment__details__page__content">
        <h1 className="shipment__details__page__content__title">
          Shipment #{shipment.id}
        </h1>
        <div className="shipment__details__page__content__details">
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
