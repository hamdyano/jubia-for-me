const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface RegisterData {
  name: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginData {
  email: string;
  password: string;
}

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

// Generic row for media/tab tables
export interface MediaSettingRow {
  id: number;
  englishName: string;
  arabicName: string;
  sorting: number;
}

// Tab names and endpoints for dynamic API use
export const TABS = [
  { name: "Catalogue", endpoint: "Catalogues" },
  { name: "Kind", endpoint: "Kinds" },
  { name: "Size", endpoint: "Sizes" },
  { name: "Weight", endpoint: "Weights" },
  { name: "Surface", endpoint: "Surfaces" },
  { name: "Color", endpoint: "Colors" },
  { name: "Shape", endpoint: "Shapes" },
  { name: "Thickness", endpoint: "Thicknesses" },
  { name: "Brand", endpoint: "Brands" },
  { name: "Trading Unit", endpoint: "TradingUnits" },
  { name: "Package Unit", endpoint: "PackageUnits" },
];

// Add this function to handle CORS requests
export const fetchWithCors = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    mode: 'cors',
    credentials: 'include' // Add this if using cookies/authentication
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Request failed');
  }
  
  return response.json();
};

// Update your API calls to use this function
export const fetchMediaSettings = async () => {
  return fetchWithCors(`${API_BASE_URL}/api/mediasettings`);
};

// Create a helper function to handle responses
async function handleResponse(response: Response) {
  // Clone the response to read it multiple times
  const responseClone = response.clone();
  
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    // If JSON parsing fails, read as text
    const text = await responseClone.text();
    return { message: text };
  }
}

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await handleResponse(response);
      throw new Error(errorData.message || 'Registration failed');
    }

    return handleResponse(response);
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'Registration failed');
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await handleResponse(response);
      throw new Error(errorData.message || 'Login failed');
    }

    return handleResponse(response);
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'Login failed');
  }
};

// ---------- NEW GENERIC CRUD FUNCTIONS FOR ALL TABS ----------

// Fetch all rows for a given endpoint
export async function fetchRows(endpoint: string): Promise<MediaSettingRow[]> {
  const res = await fetch(`${API_BASE_URL}/${endpoint}`);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return res.json();
}

// Create a row for a given endpoint
export async function createRow(endpoint: string, data: Omit<MediaSettingRow, "id">): Promise<MediaSettingRow> {
  const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`Failed to create row in ${endpoint}`);
  return res.json();
}

// Update a row for a given endpoint
export async function updateRow(endpoint: string, id: number, data: Omit<MediaSettingRow, "id">): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...data })
  });
  if (!res.ok) throw new Error(`Failed to update row in ${endpoint}`);
}

// Delete a row for a given endpoint
export async function deleteRow(endpoint: string, id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error(`Failed to delete row in ${endpoint}`);
}