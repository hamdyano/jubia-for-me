const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Service row for main tabs
export interface ServiceSettingRow {
  id: number;
  englishName: string;
  arabicName: string;
  sorting: number;
}

// Attribute detail row
export interface AttributeDetail {
  id: number;
  englishName: string;
  arabicName: string;
  sorting: number;
}

// Tab names and endpoints for dynamic API use
export const SERVICE_TABS = [
  { name: "Catalogue", endpoint: "ServiceCatalogues" },
  { name: "Kind", endpoint: "ServiceKinds" },
  { name: "Size", endpoint: "ServiceSizes" },
  { name: "Attributes", endpoint: "ServiceAttributes" },
];

// Basic fetch helper for CORS
export const fetchWithCors = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    mode: 'cors',
    credentials: 'include',
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: 'Request failed' };
    }
    throw new Error(errorData.message || 'Request failed');
  }

  return response.json();
};

// ---------- MAIN TAB CRUD ----------

// Fetch all rows for a given endpoint
export async function fetchRows(endpoint: string): Promise<ServiceSettingRow[]> {
  return fetchWithCors(`${API_BASE_URL}/${endpoint}`);
}

// Create a row for a given endpoint
export async function createRow(endpoint: string, data: Omit<ServiceSettingRow, "id">): Promise<ServiceSettingRow> {
  return fetchWithCors(`${API_BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// Update a row for a given endpoint
export async function updateRow(endpoint: string, id: number, data: Omit<ServiceSettingRow, "id">): Promise<void> {
  await fetchWithCors(`${API_BASE_URL}/${endpoint}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...data }),
  });
}

// Delete a row for a given endpoint
export async function deleteRow(endpoint: string, id: number): Promise<void> {
  await fetchWithCors(`${API_BASE_URL}/${endpoint}/${id}`, {
    method: "DELETE",
  });
}

// ---------- ATTRIBUTE DETAILS CRUD ----------

// Fetch attribute details
export async function fetchAttributeDetails(attributeId: number): Promise<AttributeDetail[]> {
  return fetchWithCors(`${API_BASE_URL}/ServiceAttributes/${attributeId}/details`);
}

// Create attribute detail
export async function createAttributeDetail(attributeId: number, data: Omit<AttributeDetail, "id">): Promise<AttributeDetail> {
  return fetchWithCors(`${API_BASE_URL}/ServiceAttributes/${attributeId}/details`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// Update attribute detail
export async function updateAttributeDetail(detailId: number, data: Omit<AttributeDetail, "id"> & { serviceAttributeId: number }): Promise<void> {
  await fetchWithCors(`${API_BASE_URL}/ServiceAttributes/details/${detailId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: detailId, ...data }),
  });
}

// Delete attribute detail
export async function deleteAttributeDetail(detailId: number): Promise<void> {
  await fetchWithCors(`${API_BASE_URL}/ServiceAttributes/details/${detailId}`, {
    method: "DELETE",
  });
}