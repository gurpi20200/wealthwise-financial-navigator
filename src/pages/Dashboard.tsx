import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  RefreshCw,
  PieChart as PieChartIcon,
  BarChart3 
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

// Mock data for demonstration
const mockNetWorth = {
  total_net_worth: 125650.75,
  total_assets: 145650.75,
  total_liabilities: 20000,
  breakdown: {
    stocks: 75000,
    crypto: 25000,
    real_estate: 45650.75,
    liabilities: 20000,
  },
  top_assets: [
    { identifier: 'AAPL', type: 'stock', current_value: 15250, quantity: 100, unit_price: 152.50 },
    { identifier: 'BTC', type: 'crypto', current_value: 12000, quantity: 0.25, unit_price: 48000 },
    { identifier: 'TSLA', type: 'stock', current_value: 8500, quantity: 40, unit_price: 212.50 },
    { identifier: 'ETH', type: 'crypto', current_value: 6400, quantity: 2, unit_price: 3200 },
    { identifier: 'Home', type: 'real_estate', current_value: 45650.75, quantity: 1, unit_price: 45650.75 },
  ]
};

const COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--destructive))'];

export default function Dashboard() {
  const [netWorthData, setNetWorthData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNetWorthData(mockNetWorth);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const refreshPrices = async () => {
    setLastRefresh(new Date());
    // In real app, this would refetch current prices
    console.log('Refreshing prices...');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const pieData = netWorthData ? [
    { name: 'Stocks', value: netWorthData.breakdown.stocks, color: COLORS[0] },
    { name: 'Crypto', value: netWorthData.breakdown.crypto, color: COLORS[1] },
    { name: 'Real Estate', value: netWorthData.breakdown.real_estate, color: COLORS[2] },
    { name: 'Liabilities', value: -netWorthData.breakdown.liabilities, color: COLORS[3] },
  ] : [];

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your financial overview.</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshPrices}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Prices
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Worth</CardTitle>
            <DollarSign className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(netWorthData.total_net_worth)}
            </div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Assets</CardTitle>
            <TrendingUp className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(netWorthData.total_assets)}
            </div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Liabilities</CardTitle>
            <TrendingDown className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(netWorthData.total_liabilities)}
            </div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              -5.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Allocation Pie Chart */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5" />
              Asset Allocation
            </CardTitle>
            <CardDescription>Breakdown of your net worth by asset class</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {pieData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Assets */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Top Assets
            </CardTitle>
            <CardDescription>
              Live prices • Last updated {lastRefresh.toLocaleTimeString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {netWorthData.top_assets.map((asset: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{asset.identifier}</div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {asset.type} • {asset.quantity} {asset.type === 'stock' ? 'shares' : 'units'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-foreground">
                      {formatCurrency(asset.current_value)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatCurrency(asset.unit_price)} each
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}