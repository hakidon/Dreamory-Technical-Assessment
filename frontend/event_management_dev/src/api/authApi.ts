interface AuthData {
  email: string;
  password: string;
}

const BASE_URL = 'http://localhost:5000';

export const registerUser = async (data: AuthData) => {
  const response = await fetch(`${BASE_URL}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to register user');
  }

  return response.json();
};

export const loginUser = async (data: AuthData) => {
  const response = await fetch(`${BASE_URL}/api/login`, {
    method: 'POST',  
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to login');
  }

  return response.json();
};

export const verifyToken = async (token: string) => {
  const response = await fetch(`${BASE_URL}/api/verify`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to verify token');
  }

  return response.json();
};

export const checkCredentials = async (user_id: string, password: string) => {
  const response = await fetch(`${BASE_URL}/api/check-id-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id, password }),
  });

  if (!response.ok) {
    throw new Error('Failed to check credentials');
  }

  return response.json();
};
