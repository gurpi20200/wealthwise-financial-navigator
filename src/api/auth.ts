
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const MOCK_MODE = import.meta.env.VITE_MOCK_AUTH === 'true';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

// Mock credentials and data
const MOCK_CREDENTIALS = {
  email: 'demo@wealthwise.com',
  password: 'demo123'
};

const MOCK_USER: User = {
  id: 'mock-user-123',
  email: 'demo@wealthwise.com'
};

const MOCK_AUTH_RESPONSE: AuthResponse = {
  access_token: 'mock-jwt-token-123',
  token_type: 'Bearer',
  user: MOCK_USER
};

// Configure axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 5 second timeout for fallback
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock authentication functions
const mockAuth = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (credentials.email === MOCK_CREDENTIALS.email && 
        credentials.password === MOCK_CREDENTIALS.password) {
      return MOCK_AUTH_RESPONSE;
    } else {
      throw {
        response: {
          data: {
            detail: 'Invalid email or password'
          }
        }
      };
    }
  },

  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In mock mode, any valid email/password combo works for signup
    if (credentials.email && credentials.password.length >= 6) {
      return {
        ...MOCK_AUTH_RESPONSE,
        user: {
          ...MOCK_USER,
          email: credentials.email
        }
      };
    } else {
      throw {
        response: {
          data: {
            detail: 'Invalid signup data'
          }
        }
      };
    }
  },

  getCurrentUser: async (): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_USER;
  }
};

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    if (MOCK_MODE) {
      console.log('🔧 Using mock authentication mode');
      return mockAuth.login(credentials);
    }

    try {
      const formData = new FormData();
      formData.append('username', credentials.email);
      formData.append('password', credentials.password);
      
      const response = await api.post('/login', formData);
      return response.data;
    } catch (error) {
      // Fallback to mock if backend is unreachable
      if (axios.isAxiosError(error) && !error.response) {
        console.log('⚠️ Backend unreachable, falling back to mock authentication');
        console.log('📝 Use credentials: demo@wealthwise.com / demo123');
        return mockAuth.login(credentials);
      }
      throw error;
    }
  },

  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    if (MOCK_MODE) {
      console.log('🔧 Using mock authentication mode');
      return mockAuth.signup(credentials);
    }

    try {
      const response = await api.post('/signup', {
        email: credentials.email,
        password: credentials.password,
      });
      return response.data;
    } catch (error) {
      // Fallback to mock if backend is unreachable
      if (axios.isAxiosError(error) && !error.response) {
        console.log('⚠️ Backend unreachable, falling back to mock authentication');
        return mockAuth.signup(credentials);
      }
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async (): Promise<User> => {
    if (MOCK_MODE) {
      return mockAuth.getCurrentUser();
    }

    try {
      const response = await api.get('/me');
      return response.data;
    } catch (error) {
      // Fallback to mock if backend is unreachable
      if (axios.isAxiosError(error) && !error.response) {
        console.log('⚠️ Backend unreachable, using mock user data');
        return mockAuth.getCurrentUser();
      }
      throw error;
    }
  },
};

export { api };
