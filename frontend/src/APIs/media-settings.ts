const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Tab config: maps tab names to backend endpoints and Size tab fields
export const TABS = [
  { name: "Catalogue", endpoint: "/media_catalogue" },
  { name: "Kind", endpoint: "/media_kind" },
  { name: "Size", endpoint: "/media_size", hasWidth: true, hasHeight: true },
  { name: "Weight", endpoint: "/media_weight" },
  { name: "Surface", endpoint: "/media_surface" },
  { name: "Color", endpoint: "/media_color" },
  { name: "Shape", endpoint: "/media_shape" },
  { name: "Thickness", endpoint: "/media_thickness" },
  { name: "Brand", endpoint: "/media_brand" },
  { name: "Trading Unit", endpoint: "/media_tradingunit" },
  { name: "Package Unit", endpoint: "/media_packageunit" },
];

// Main row interface (Width/Height only for Size tab)
export interface MediaSettingRow {
  id: number;
  englishName: string;
  arabicName: string;
  sorting: number;
  width?: number;
  height?: number;
}

// Helper for error and JSON response handling
const handleResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type');
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } else {
        const text = await response.text();
        errorMessage = text.slice(0, 200);
      }
    } catch (_) {}
    throw new Error(errorMessage);
  }
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error(`Invalid response type: ${contentType}`);
  }
  return response.json();
};

// GET all rows for a tab
export const fetchRows = async (endpoint: string): Promise<MediaSettingRow[]> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('authToken');
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    mode: 'cors',
    credentials: 'include',
  });
  if (response.status === 401) {
    localStorage.removeItem('authToken');
    window.location.href = '/signin';
    throw new Error('Authentication required');
  }
  return handleResponse(response);
};

// POST create a new row
export const createRow = async (endpoint: string, data: Omit<MediaSettingRow, 'id'>): Promise<MediaSettingRow> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('authToken');
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
    mode: 'cors',
    credentials: 'include',
  });
  if (response.status === 401) {
    localStorage.removeItem('authToken');
    window.location.href = '/signin';
    throw new Error('Authentication required');
  }
  return handleResponse(response);
};

// PUT update a row
export const updateRow = async (endpoint: string, id: number, data: Omit<MediaSettingRow, 'id'>): Promise<void> => {
  const url = `${API_BASE_URL}${endpoint}/${id}`;
  const token = localStorage.getItem('authToken');
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
    mode: 'cors',
    credentials: 'include',
  });
  if (response.status === 401) {
    localStorage.removeItem('authToken');
    window.location.href = '/signin';
    throw new Error('Authentication required');
  }
  await handleResponse(response);
};

// DELETE a row
export const deleteRow = async (endpoint: string, id: number): Promise<void> => {
  const url = `${API_BASE_URL}${endpoint}/${id}`;
  const token = localStorage.getItem('authToken');
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    mode: 'cors',
    credentials: 'include',
  });
  if (response.status === 401) {
    localStorage.removeItem('authToken');
    window.location.href = '/signin';
    throw new Error('Authentication required');
  }
  await handleResponse(response);
};





/*
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface MediaSetting {
  id: number;
  catalogue: string;
  kind: string;
  size: string;
  weight: string;
  surface: string;
  color: string;
  shape: string;
  thickness: string;
  brand: string;
  tradingUnit: string;
  packageUnit: string;
  englishName: string;
  arabicName: string;
  sorting: number;
}

// Helper function to handle errors
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Request failed');
  }
  return response.json();
};

export const fetchMediaSettings = async (): Promise<MediaSetting[]> => {
  try {
    // Get auth token from storage
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(`${API_BASE_URL}/api/MediaSettings`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}` // Add auth header
      }
    });

    // Check for 401 Unauthorized
    if (response.status === 401) {
      // Handle token expiration
      window.location.href = '/signin';
      throw new Error('Authentication required');
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      
      // Log the first 100 characters of the response
      console.error('Non-JSON response:', text.slice(0, 100));
      throw new Error(`Invalid content type. Received: ${contentType}`);
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Request failed');
    }

    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to load media settings. Please try again.');
  }
};

// Create new media setting
export const createMediaSetting = async (data: Omit<MediaSetting, 'id'>): Promise<MediaSetting> => {
  const response = await fetch(`${API_BASE_URL}/api/mediasettings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(response);
};

// Update media setting
export const updateMediaSetting = async (id: number, data: Partial<MediaSetting>): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/mediasettings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  await handleResponse(response);
};

// Delete media setting
export const deleteMediaSetting = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/mediasettings/${id}`, {
    method: 'DELETE'
  });
  await handleResponse(response);
};

// Reorder media settings
export const reorderMediaSettings = async (sortOrders: Record<number, number>): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/mediasettings/reorder`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sortOrders)
  });
  await handleResponse(response);
};


*/