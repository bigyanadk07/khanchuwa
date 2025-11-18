// src/api/api.ts
export const API_URL = "http://localhost:5000";

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

async function handleResponse(res: Response) {
  if (!res.ok) {
    let errorMessage = "Request failed";
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      errorMessage = res.statusText || `HTTP error! status: ${res.status}`;
    }
    throw new Error(errorMessage);
  }

  const data = await res.json();
  return data;
}

export async function loginRequest(email: string, password: string) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await handleResponse(res);
    
    if (!data.token) {
      throw new Error("Invalid response: No token received");
    }

    return data;
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error("Cannot connect to server. Please check if the backend is running.");
    }
    throw error;
  }
}

export async function signupRequest(credentials: SignupCredentials) {
  try {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await handleResponse(res);
    
    if (!data.token) {
      throw new Error("Invalid response: No token received");
    }

    return data;
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error("Cannot connect to server. Please check if the backend is running.");
    }
    throw error;
  }
}