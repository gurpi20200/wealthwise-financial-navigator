import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import { Plus, Briefcase, TrendingUp, Calendar } from 'lucide-react';

// Mock data for demonstration
const mockPortfolios = [
  {
    id: '1',
    name: 'Main Investment Portfolio',
    description: 'My primary long-term investment account',
    created_at: '2024-01-15T00:00:00Z',
    asset_count: 12,
    total_value: 85650.75,
    performance: 8.2,
  },
  {
    id: '2',
    name: 'Retirement Fund',
    description: '401(k) and IRA holdings',
    created_at: '2024-02-01T00:00:00Z',
    asset_count: 8,
    total_value: 45000.00,
    performance: 12.5,
  },
  {
    id: '3',
    name: 'Crypto Holdings',
    description: 'Digital assets and cryptocurrencies',
    created_at: '2024-03-10T00:00:00Z',
    asset_count: 5,
    total_value: 15000.00,
    performance: -5.1,
  },
];

export default function Portfolios() {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchPortfolios = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setPortfolios(mockPortfolios);
      setIsLoading(false);
    };

    fetchPortfolios();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portfolios</h1>
          <p className="text-muted-foreground">Manage and track your investment portfolios</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-card">
          <Plus className="h-4 w-4 mr-2" />
          New Portfolio
        </Button>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio) => (
          <Card key={portfolio.id} className="bg-gradient-card shadow-card border-0 hover:shadow-elevated transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{portfolio.name}</CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {portfolio.description}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Portfolio Stats */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Value</span>
                  <span className="font-semibold text-foreground">
                    {formatCurrency(portfolio.total_value)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Assets</span>
                  <span className="font-medium text-foreground">{portfolio.asset_count}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Performance</span>
                  <Badge 
                    variant={portfolio.performance >= 0 ? "default" : "destructive"}
                    className={portfolio.performance >= 0 ? "bg-success text-success-foreground" : ""}
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {portfolio.performance >= 0 ? '+' : ''}{portfolio.performance}%
                  </Badge>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    Created {formatDate(portfolio.created_at)}
                  </div>
                  <Link to={`/portfolios/${portfolio.id}`}>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary-light">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Portfolio Card */}
        <Card className="bg-gradient-card shadow-card border-2 border-dashed border-border hover:border-primary/50 transition-all duration-300 cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center h-64 text-center">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">Create New Portfolio</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start tracking a new set of investments
            </p>
            <Button variant="ghost" className="text-primary hover:text-primary-light">
              Get Started
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}