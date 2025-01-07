'use server';

const API_URL = 'http://localhost:3001';

interface Shipment {
  id?: string;
  first_name: string;
  last_name: string;
  address: string;
  country: string;
  zip_code?: string;
  city: string;
  state: string;
}

export async function getShipments(page: number = 1) {
  const response = await fetch(`${API_URL}/shipments?_page=${page}`);
  return await response.json();
}

export async function getShipment(id: string) {
  const response = await fetch(`${API_URL}/shipments/${id}`);
  return await response.json();
}

export async function createShipment(shipment: Shipment) {
  const response = await fetch(`${API_URL}/shipments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shipment),
  });

  return await response.json();
}

export async function updateShipment(shipment: Shipment) {
  const response = await fetch(`${API_URL}/shipments/${shipment.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shipment),
  });

  return await response.json();
}
