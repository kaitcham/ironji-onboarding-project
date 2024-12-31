const API_URL = 'http://localhost:3001';

export async function getShipments(page: number = 1) {
  const response = await fetch(`${API_URL}/shipments?_page=${page}`);
  return await response.json();
}
