

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






