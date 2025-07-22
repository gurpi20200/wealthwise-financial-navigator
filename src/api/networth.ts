import { api } from './auth';

export interface NetWorthData {
  total_net_worth: number;
  total_assets: number;
  total_liabilities: number;
  breakdown: {
    stocks: number;
    crypto: number;
    real_estate: number;
    liabilities: number;
  };
  top_assets: Array<{
    identifier: string;
    type: string;
    current_value: number;
    quantity: number;
    unit_price: number;
  }>;
}

export interface NetWorthHistory {
  date: string;
  net_worth: number;
  assets: number;
  liabilities: number;
}

export const networthApi = {
  getCurrent: async (): Promise<NetWorthData> => {
    const response = await api.get('/networth/current');
    return response.data;
  },

  getHistory: async (period?: string, start?: string, end?: string): Promise<NetWorthHistory[]> => {
    const params = new URLSearchParams();
    if (period) params.append('period', period);
    if (start) params.append('start', start);
    if (end) params.append('end', end);
    
    const response = await api.get(`/networth/history?${params}`);
    return response.data;
  },

  exportCSV: async (): Promise<Blob> => {
    const response = await api.get('/export/csv', { responseType: 'blob' });
    return response.data;
  },

  exportJSON: async (): Promise<Blob> => {
    const response = await api.get('/export/json', { responseType: 'blob' });
    return response.data;
  },
};