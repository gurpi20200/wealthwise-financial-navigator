import { api } from './auth';

export interface Portfolio {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Asset {
  id: string;
  portfolio_id: string;
  type: 'stock' | 'crypto' | 'real_estate' | 'liability';
  identifier: string;
  quantity: number;
  purchase_price: number;
  current_value: number;
  purchase_date: string;
  metadata?: Record<string, any>;
}

export interface CreatePortfolioRequest {
  name: string;
  description?: string;
}

export interface CreateAssetRequest {
  type: 'stock' | 'crypto' | 'real_estate' | 'liability';
  identifier: string;
  quantity: number;
  purchase_price: number;
  purchase_date: string;
  metadata?: Record<string, any>;
}

export const portfoliosApi = {
  getAll: async (): Promise<Portfolio[]> => {
    const response = await api.get('/portfolios');
    return response.data;
  },

  getById: async (id: string): Promise<Portfolio> => {
    const response = await api.get(`/portfolios/${id}`);
    return response.data;
  },

  create: async (portfolio: CreatePortfolioRequest): Promise<Portfolio> => {
    const response = await api.post('/portfolios', portfolio);
    return response.data;
  },

  update: async (id: string, portfolio: Partial<Portfolio>): Promise<Portfolio> => {
    const response = await api.put(`/portfolios/${id}`, portfolio);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/portfolios/${id}`);
  },

  getAssets: async (portfolioId: string): Promise<Asset[]> => {
    const response = await api.get(`/portfolios/${portfolioId}/assets`);
    return response.data;
  },

  createAsset: async (portfolioId: string, asset: CreateAssetRequest): Promise<Asset> => {
    const response = await api.post(`/portfolios/${portfolioId}/assets`, asset);
    return response.data;
  },

  updateAsset: async (portfolioId: string, assetId: string, asset: Partial<Asset>): Promise<Asset> => {
    const response = await api.put(`/portfolios/${portfolioId}/assets/${assetId}`, asset);
    return response.data;
  },

  deleteAsset: async (portfolioId: string, assetId: string): Promise<void> => {
    await api.delete(`/portfolios/${portfolioId}/assets/${assetId}`);
  },

  getValuations: async (portfolioId: string, start?: string, end?: string) => {
    const params = new URLSearchParams();
    if (start) params.append('start', start);
    if (end) params.append('end', end);
    
    const response = await api.get(`/portfolios/${portfolioId}/valuations?${params}`);
    return response.data;
  },
};