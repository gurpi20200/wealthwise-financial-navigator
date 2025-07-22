# WealthWise - Professional Portfolio Management

A modern, responsive financial portfolio management application built with React, TypeScript, and Tailwind CSS. WealthWise helps you track your investments, monitor net worth, and manage multiple portfolios with professional-grade charts and analytics.

## 🚀 Features

- **Professional Dashboard** - Clean overview of net worth, asset allocation, and live price tracking
- **Portfolio Management** - Create and manage multiple investment portfolios
- **Net Worth History** - Track financial growth over time with interactive charts
- **Asset Tracking** - Support for stocks, crypto, real estate, and liabilities
- **Live Price Updates** - Real-time asset pricing with refresh capabilities
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode** - Professional themes for any preference
- **Data Export** - Export your financial data as CSV or JSON

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **State Management**: React Query
- **UI Components**: Shadcn/ui components
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── api/           # API service layer and HTTP client setup
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks (auth, data fetching)
├── pages/         # Route components and main views
├── lib/           # Utility functions and helpers
└── styles/        # Global styles and Tailwind configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- FastAPI backend server (see API endpoints below)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd wealthwise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   Create a `.env` file in the project root:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🔌 API Integration

WealthWise connects to a FastAPI backend with the following endpoints:

### Authentication
- `POST /login` - User authentication
- `POST /signup` - User registration
- `GET /me` - Get current user info

### Portfolios
- `GET /portfolios` - List all portfolios
- `POST /portfolios` - Create new portfolio
- `PUT /portfolios/{id}` - Update portfolio
- `DELETE /portfolios/{id}` - Delete portfolio

### Assets
- `GET /portfolios/{id}/assets` - List portfolio assets
- `POST /portfolios/{id}/assets` - Add new asset
- `PUT /portfolios/{id}/assets/{asset_id}` - Update asset
- `DELETE /portfolios/{id}/assets/{asset_id}` - Delete asset

### Net Worth & Analytics
- `GET /networth/current` - Current net worth breakdown
- `GET /networth/history` - Historical net worth data
- `GET /portfolios/{id}/valuations` - Portfolio performance data

### Data Export
- `GET /export/csv` - Export data as CSV
- `GET /export/json` - Export data as JSON

## 🎨 Design System

WealthWise uses a professional financial design system with:

- **Primary Colors**: Deep navy blues for trust and professionalism
- **Success Colors**: Emerald greens for positive growth
- **Warning Colors**: Amber for caution
- **Destructive Colors**: Reds for losses
- **Gradients**: Subtle gradients for visual depth
- **Typography**: Clean, readable fonts optimized for financial data
- **Shadows**: Professional elevation with subtle shadows

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Adaptive Layout**: Responsive grid system
- **Touch Friendly**: Large touch targets for mobile interaction
- **Progressive Enhancement**: Works on all screen sizes

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Route-level authorization
- **Data Validation**: Client-side form validation with Zod
- **Error Handling**: Graceful error states and messaging

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

The project uses:
- ESLint for code linting
- TypeScript for type safety
- Prettier formatting (recommended)

## 📊 Chart Configuration

WealthWise uses Recharts for data visualization:

- **Pie Charts**: Asset allocation breakdown
- **Line Charts**: Net worth history and trends
- **Bar Charts**: Portfolio comparisons
- **Custom Tooltips**: Professional formatting
- **Responsive**: Charts adapt to container size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋‍♂️ Support

For support and questions:
- Check the documentation
- Open an issue on GitHub
- Contact the development team

---

**Built with ❤️ for professional portfolio management**