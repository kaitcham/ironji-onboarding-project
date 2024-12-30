import CreateShipmentForm from '@/components/CreateShipmentForm';

export default function page() {
  return (
    <div className="dashboard__content">
      <div className="dashboard__content__header">
        <h3>Shipments</h3>
        <CreateShipmentForm />
      </div>
    </div>
  );
}
