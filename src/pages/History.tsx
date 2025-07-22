import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Skeleton } from '../components/ui/skeleton';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar, Download } from 'lucide-react';

// Mock data for demonstration
const mockHistoryData = [
  { date: '2024-01-01', net_worth: 95000, assets: 110000, liabilities: 15000 },
  { date: '2024-01-15', net_worth: 98500, assets: 115000, liabilities: 16500 },
  { date: '2024-02-01', net_worth: 102000, assets: 118000, liabilities: 16000 },
  { date: '2024-02-15', net_worth: 105500, assets: 122000, liabilities: 16500 },
  { date: '2024-03-01', net_worth: 108000, assets: 125000, liabilities: 17000 },
  { date: '2024-03-15', net_worth: 112000, assets: 130000, liabilities: 18000 },
  { date: '2024-04-01', net_worth: 115500, assets: 135000, liabilities: 19500 },
  { date: '2024-04-15', net_worth: 118000, assets: 138000, liabilities: 20000 },
  { date: '2024-05-01', net_worth: 121500, assets: 142000, liabilities: 20500 },
  { date: '2024-05-15', net_worth: 125650, assets: 145650, liabilities: 20000 },
];

export default function History() {
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('6m');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setHistoryData(mockHistoryData);
      setIsLoading(false);
    };

    fetchHistory();
  }, [selectedPeriod]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const calculateGrowth = () => {
    if (historyData.length < 2) return { amount: 0, percentage: 0 };
    
    const start = historyData[0].net_worth;
    const end = historyData[historyData.length - 1].net_worth;
    const amount = end - start;
    const percentage = ((amount / start) * 100);
    
    return { amount, percentage };
  };

  const growth = calculateGrowth();

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Net Worth History</h1>
          <p className="text-muted-foreground">Track your financial growth over time</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Net Worth</CardTitle>
            <TrendingUp className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(historyData[historyData.length - 1]?.net_worth || 0)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              As of {new Date().toLocaleDateString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Period Growth</CardTitle>
            <Calendar className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(growth.amount)}
            </div>
            <div className={`text-xs mt-1 ${growth.percentage >= 0 ? 'text-success' : 'text-destructive'}`}>
              {growth.percentage >= 0 ? '+' : ''}{growth.percentage.toFixed(1)}% growth
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Monthly</CardTitle>
            <TrendingUp className="h-5 w-5 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(growth.amount / 6)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Growth per month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle>Net Worth Trend</CardTitle>
          <CardDescription>
            Your financial journey over the selected period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  className="text-muted-foreground"
                />
                <YAxis 
                  tickFormatter={formatCurrency}
                  className="text-muted-foreground"
                />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value: any, name) => [
                    formatCurrency(value),
                    name === 'net_worth' ? 'Net Worth' : 
                    name === 'assets' ? 'Assets' : 'Liabilities'
                  ]}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="net_worth" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="assets" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="liabilities" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-primary"></div>
              <span className="text-muted-foreground">Net Worth</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-success border-dashed"></div>
              <span className="text-muted-foreground">Assets</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-destructive border-dashed"></div>
              <span className="text-muted-foreground">Liabilities</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}