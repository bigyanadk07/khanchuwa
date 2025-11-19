// src/api/api.ts
export const API_URL = "http://localhost:5000/api";

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

async function handleResponse(res: Response) {
  if (!res.ok) {
    let errorMessage = "Request failed";
    let errorDetails = null;
    
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
      errorDetails = errorData;
      console.error("Server error response:", errorData);
    } catch {
      errorMessage = res.statusText || `HTTP error! status: ${res.status}`;
    }
    
    const error: any = new Error(errorMessage);
    error.details = errorDetails;
    error.status = res.status;
    throw error;
  }

  const data = await res.json();
  return data;
}

export async function loginRequest(email: string, password: string) {
  try {
    console.log("Login request to:", `${API_URL}/auth/login`);
    
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
    console.error("Login error:", error);
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error("Cannot connect to server. Please check if the backend is running.");
    }
    throw error;
  }
}

export async function signupRequest(credentials: SignupCredentials) {
  try {
    const requestPayload = {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
    };
    
    console.log("Signup request to:", `${API_URL}/auth/register`);
    console.log("Request payload:", { ...requestPayload, password: "[REDACTED]" });
    
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(requestPayload),
    });

    console.log("Response status:", res.status);
    console.log("Response headers:", Object.fromEntries(res.headers.entries()));

    const data = await handleResponse(res);
    
    console.log("Signup response data:", { ...data, token: data.token ? "[PRESENT]" : "[MISSING]" });
    
    if (!data.token) {
      throw new Error("Invalid response: No token received");
    }

    return data;
  } catch (error: any) {
    console.error("Signup error:", error);
    console.error("Error details:", error.details);
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error("Cannot connect to server. Please check if the backend is running.");
    }
    throw error;
  }
}