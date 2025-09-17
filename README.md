# 🐓 Poultry Farm Automation System

A modern, comprehensive web application for automating poultry farm monitoring and control processes. Built with Next.js, TypeScript, and Material Design 3, featuring real-time sensor monitoring, device control, and bilingual support.

## ✨ Features

### 🔐 Authentication & Security
- **Role-based Access Control**: Admin, Manager, and User roles with appropriate permissions
- **Secure Login System**: JWT-like token management with persistent sessions
- **Demo Accounts**: Pre-configured accounts for testing different user roles

### 🌍 Internationalization
- **Bilingual Support**: Complete English and Persian (Farsi) translations
- **RTL Layout**: Proper right-to-left layout support for Persian text
- **Dynamic Font Loading**: Vazirmatn for Persian, Roboto for English
- **Real-time Language Switching**: Instant language toggle without page reload

### 🌓 Theme System
- **Material Design 3**: Modern design system with proper color tokens
- **Dark/Light Mode**: Complete theme switching with smooth transitions
- **Persistent Preferences**: Theme and language settings saved to localStorage
- **Consistent Theming**: All components respond to theme changes

### 📊 Real-time Monitoring
- **Environmental Sensors**: 
  - 🌬️ Oxygen levels (O₂)
  - 💨 CO₂ concentration
  - 💧 Humidity (bedding moisture)
  - 🌡️ Relative humidity (air moisture)
  - 🔥 Temperature monitoring
  - 💡 Light intensity
- **Auto-refresh**: Real-time data updates every 2 seconds
- **Status Indicators**: Color-coded normal/warning/danger states
- **Visual Feedback**: Material Design cards with progress indicators

### 🎛️ Device Control
- **Ventilation Management**: 
  - Multiple intake and exhaust fans
  - Real-time on/off control
  - Variable intensity adjustment (0-100%)
- **Lighting Systems**:
  - LED light array control
  - Intensity dimming capabilities
  - Individual device management
- **Live Updates**: Immediate visual feedback for all control actions

### 📈 Analytics Dashboard
- **Multiple Time Ranges**: Real-time, daily, weekly, monthly views
- **Interactive Charts**: Line, area, and bar chart options
- **Data Export**: CSV export functionality for historical data
- **Trend Analysis**: Statistical insights and averages
- **Responsive Charts**: Mobile-friendly data visualization

## 🚀 Technology Stack

### Frontend Framework
- **Next.js 14.2.5**: React framework with App Router
- **React 18.3.1**: Modern React with hooks and context
- **TypeScript 5.5.4**: Full type safety and development experience

### Styling & UI
- **Tailwind CSS 3.4.6**: Utility-first CSS framework
- **Material Design 3**: Google's latest design system
- **React Icons 5.2.1**: Comprehensive icon library
- **Custom CSS Variables**: Dynamic theming system

### Data Visualization
- **Recharts 2.12.7**: React charting library for analytics
- **Custom Components**: Reusable chart components

### State Management
- **React Context API**: Global state for auth, theme, and language
- **localStorage**: Persistent user preferences
- **TypeScript Interfaces**: Type-safe state management

### Development Tools
- **ESLint**: Code linting with Next.js configuration
- **PostCSS & Autoprefixer**: CSS processing
- **Git**: Version control system

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm (comes with Node.js)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/poultry-farm-automation.git
cd poultry-farm-automation
```

### 2. Install Dependencies
```bash
npm install

# If you encounter peer dependency issues:
npm install --legacy-peer-deps
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

## 🎮 Usage Guide

### Demo Accounts
The application includes pre-configured demo accounts:

| Role | Username | Password | Permissions |
|------|----------|----------|------------|
| Admin | admin | admin123 | Full access to all features |
| Manager | manager | manager123 | Monitor + device control |
| User | user | user123 | View-only access |

### Navigation
1. **Login**: Use demo accounts or create new credentials
2. **Dashboard**: Real-time sensor monitoring with live updates
3. **Device Control**: Manage fans and lighting systems
4. **Analytics**: View historical data and export reports

### Language & Theme
- **Language Toggle**: Click the language button (EN/فا) in the header
- **Theme Toggle**: Click the sun/moon icon to switch between light/dark modes
- **Persistent Settings**: Your preferences are automatically saved

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css         # Global styles and Material Design tokens
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Login page
│   └── dashboard/
│       └── page.tsx        # Main dashboard
├── components/             # Reusable UI components
│   └── dashboard/
│       ├── SensorCard.tsx      # Individual sensor display
│       ├── DeviceControlCard.tsx # Device control interface
│       └── AnalyticsChart.tsx   # Charts and analytics
├── lib/                    # Core application logic
│   ├── auth.tsx           # Authentication context and logic
│   ├── theme.tsx          # Theme management context
│   └── language.tsx       # Internationalization system
├── types/                  # TypeScript type definitions
│   └── index.ts           # Application-wide types
└── public/                 # Static assets
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific settings:

```env
# App Configuration
NEXT_PUBLIC_APP_NAME="Poultry Farm Automation"
NEXT_PUBLIC_VERSION="1.0.0"

# Future API Configuration (when backend is implemented)
# NEXT_PUBLIC_API_URL="https://api.yourfarm.com"
# JWT_SECRET="your-jwt-secret"
```

### Customization

#### Adding New Languages
1. Update `src/lib/language.tsx` with new translation keys
2. Add language-specific fonts in `globals.css`
3. Update language toggle component

#### Theme Customization
1. Modify CSS variables in `globals.css`
2. Update Material Design tokens
3. Customize component styles

#### Adding New Sensors
1. Update types in `src/types/index.ts`
2. Add sensor logic in dashboard page
3. Create new sensor card components

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Manual Deployment
```bash
npm run build
npm start
```

### Static Export (GitHub Pages)
```bash
# Add to next.config.js:
# output: 'export'
# trailingSlash: true

npm run build
# Deploy the 'out/' folder to your static hosting
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📋 Development Roadmap

### Phase 1: Core Features ✅
- [x] Authentication system
- [x] Real-time sensor monitoring
- [x] Device control panel
- [x] Bilingual interface
- [x] Dark/Light theme
- [x] Analytics dashboard

### Phase 2: Backend Integration (Planned)
- [ ] REST API development
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Real hardware sensor integration
- [ ] WebSocket for real-time updates
- [ ] User management system

### Phase 3: Advanced Features (Future)
- [ ] Email/SMS notifications
- [ ] Historical data storage
- [ ] Predictive analytics with AI/ML
- [ ] Mobile app (React Native)
- [ ] Multi-farm support
- [ ] Advanced reporting system

## 🐛 Known Issues

1. **Node.js Compatibility**: Requires Node.js 18+ for optimal performance
2. **Dependency Conflicts**: May require `--legacy-peer-deps` flag during installation
3. **Real-time Data**: Currently simulated; will be replaced with actual sensor integration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - Initial work and development
- **Contributors** - See [CONTRIBUTORS.md](CONTRIBUTORS.md) for full list

## 🙏 Acknowledgments

- Material Design 3 by Google
- React and Next.js communities
- Persian (Farsi) localization contributors
- Open source library maintainers

## 📞 Support

For support, email Arsalanrezazadeh4@gmail.com or create an issue in the GitHub repository.

---

<div align="center">

**🐓 Built with ❤️ for modern poultry farming**

[Live Demo](https://your-deployment-url.vercel.app) | [Documentation](https://github.com/yourusername/poultry-farm-automation/wiki) | [Issues](https://github.com/yourusername/poultry-farm-automation/issues)

</div>
