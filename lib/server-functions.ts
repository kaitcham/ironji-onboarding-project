'use server';

import { uploadToCloudinary } from '@/lib/cloudinary';

const API_URL = 'http://localhost:3001';

interface Attachment {
  id?: string;
  url: string;
  title: string;
  shipmentId: string;
  description: string;
}

interface Shipment {
  id?: string;
  first_name: string;
  last_name: string;
  address: string;
  country: string;
  zip_code?: string;
  city: string;
  state: string;
  attachments?: Attachment[];
}

export async function getShipments(page: number = 1) {
  const response = await fetch(`${API_URL}/shipments?_page=${page}`);
  return await response.json();
}

export async function getShipment(id: string) {
  const response = await fetch(`${API_URL}/shipments/${id}?_embed=attachments`);
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

export async function updateShipment(shipment: Partial<Shipment>) {
  const response = await fetch(`${API_URL}/shipments/${shipment.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shipment),
  });

  return await response.json();
}

export async function createAttachment(
  file: File,
  attachment: Omit<Attachment, 'url'>
) {
  const url = await uploadToCloudinary(file);
  const response = await fetch(`${API_URL}/attachments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...attachment, url }),
  });

  return await response.json();
}
