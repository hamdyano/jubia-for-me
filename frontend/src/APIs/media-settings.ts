/*const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
  const contentType = response.headers.get('content-type');
  
  // Debug logging
  console.log('Response status:', response.status);
  console.log('Response headers:', response.headers);
  console.log('Content-Type:', contentType);
 // In handleResponse function
if (!response.ok) {
  let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
  
  try {
    if (contentType && contentType.includes('application/json')) {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } else {
      const textResponse = await response.text();
      console.log('Non-JSON error response:', textResponse.slice(0, 200));
      
      // Extract error from HTML if possible
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(textResponse, 'text/html');
      const errorElement = htmlDoc.querySelector('h1, title, .error');
      if (errorElement) {
        errorMessage = errorElement.textContent || errorMessage;
      } else {
        errorMessage = `Server returned HTML. Status: ${response.status}`;
      }
    }
  } catch (parseError) {
    console.error('Error parsing error response:', parseError);
  }
  
  throw new Error(errorMessage);
}

  // Check if response is JSON
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    console.error('Non-JSON response received:', text.slice(0, 200));
    throw new Error(`Invalid content type. Expected JSON, received: ${contentType}`);
  }

  return response.json();
};

export const fetchMediaSettings = async (): Promise<MediaSetting[]> => {
  try {
    // Debug the URL being called
    const url = `${API_BASE_URL}/MediaSettings`;
    console.log('Fetching from URL:', url);
    console.log('API_BASE_URL:', API_BASE_URL);
    
    // Get auth token from storage
    const token = localStorage.getItem('authToken');
    console.log('Auth token exists:', !!token);
    
    const headers: HeadersInit = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    
    // Only add Authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    console.log('Request headers:', headers);

    const response = await fetch(url, {
      method: 'GET',
      headers,
      // Add these for CORS if needed
      mode: 'cors',
      credentials: 'include',
    });

    // Check for 401 Unauthorized
    if (response.status === 401) {
      console.log('Authentication failed, redirecting to signin');
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
      window.location.href = '/signin';
      throw new Error('Authentication required');
    }

    return await handleResponse(response);
  } catch (error) {
    console.error('API Error in fetchMediaSettings:', error);
    
    // Re-throw with more context
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Failed to load media settings. Please try again.');
    }
  }
};

// Create new media setting
export const createMediaSetting = async (data: Omit<MediaSetting, 'id'>): Promise<MediaSetting> => {
  const token = localStorage.getItem('authToken');
  const url = `${API_BASE_URL}/MediaSettings`;
  
  console.log('Creating media setting at URL:', url);
  
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
    localStorage.removeItem('userEmail');
    window.location.href = '/signin';
    throw new Error('Authentication required');
  }
  
  return handleResponse(response);
};

// Update media setting
export const updateMediaSetting = async (id: number, data: Partial<MediaSetting>): Promise<void> => {
  const token = localStorage.getItem('authToken');
  const url = `${API_BASE_URL}/MediaSettings/${id}`;
  
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
    localStorage.removeItem('userEmail');
    window.location.href = '/signin';
    throw new Error('Authentication required');
  }
  
  await handleResponse(response);
};

// Delete media setting
export const deleteMediaSetting = async (id: number): Promise<void> => {
  const token = localStorage.getItem('authToken');
  const url = `${API_BASE_URL}/MediaSettings/${id}`;
  
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
    localStorage.removeItem('userEmail');
    window.location.href = '/signin';
    throw new Error('Authentication required');
  }
  
  await handleResponse(response);
};

// Reorder media settings
export const reorderMediaSettings = async (sortOrders: Record<number, number>): Promise<void> => {
  const token = localStorage.getItem('authToken');
  const url = `${API_BASE_URL}/MediaSettings/reorder`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(sortOrders),
    mode: 'cors',
    credentials: 'include',
  });
  
  if (response.status === 401) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
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