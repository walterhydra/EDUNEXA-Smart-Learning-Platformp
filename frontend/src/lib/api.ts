const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'ADMIN';
  createdAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  code?: string;
  data?: {
    user: AuthUser;
    accessToken: string;
    refreshToken: string;
  };
  errors?: Record<string, string[]>;
}

export interface CheckEmailResponse {
  success: boolean;
  message?: string;
  data?: {
    email: string;
    available: boolean;
  };
}

export const api = {
  async register(data: { name: string; email: string; password: string; role: 'STUDENT' | 'ADMIN' }): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (err: any) {
      return {
        success: false,
        message: 'Unable to connect to backend server. Please check your backend connection.',
        code: 'NETWORK_ERROR',
      };
    }
  },

  async login(data: { email: string; password: string }): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (err: any) {
      return {
        success: false,
        message: 'Unable to connect to backend server. Please check your backend connection.',
        code: 'NETWORK_ERROR',
      };
    }
  },

  async checkEmail(email: string): Promise<CheckEmailResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      return await response.json();
    } catch (err) {
      return { success: false };
    }
  },

  async getMe(accessToken: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return await response.json();
    } catch (err) {
      return {
        success: false,
        message: 'Failed to verify session token.',
      };
    }
  },

  async getStudentDashboard(accessToken: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/student/dashboard`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return await response.json();
    } catch (err) {
      return { success: false };
    }
  },

  async getAdaptiveRecommendation(accessToken: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/student/adaptive-recommendation`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return await response.json();
    } catch (err) {
      return { success: false };
    }
  },

  async getAssignments(accessToken: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/student/assignments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return await response.json();
    } catch (err) {
      return { success: false };
    }
  },

  async addXP(accessToken: string, amount: number, activity: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/student/progress/xp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ amount, activity }),
      });
      return await response.json();
    } catch (err) {
      return { success: false };
    }
  },
};
