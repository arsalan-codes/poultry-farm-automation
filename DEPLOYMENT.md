# 🚀 Deployment Guide

This guide covers multiple deployment options for the Poultry Farm Automation System.

## 📋 Prerequisites

- GitHub account
- Node.js 18+ installed locally
- Git configured with your credentials

## 🔧 Quick GitHub Setup

### 1. Create GitHub Repository

1. Go to [https://github.com](https://github.com)
2. Click **"+ New repository"**
3. Repository name: `poultry-farm-automation`
4. Description: `🐓 Modern poultry farm automation system with real-time monitoring, device control, and bilingual support`
5. Set to **Public** (recommended)
6. **DO NOT** initialize with README (we already have one)
7. Click **"Create repository"**

### 2. Push Your Code

Run these commands in your terminal:

```bash
cd "c:\Users\Arsalan\Desktop\project"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/poultry-farm-automation.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

## 🌐 Deployment Options

### Option 1: Vercel Deployment (Recommended)

**Easiest and most feature-rich option with zero configuration.**

1. Go to [https://vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click **"New Project"**
4. Import your `poultry-farm-automation` repository
5. Keep all default settings
6. Click **"Deploy"**

**Benefits:**
- ✅ Automatic deployments on every push
- ✅ Preview deployments for pull requests
- ✅ Built-in analytics and performance monitoring
- ✅ Custom domain support
- ✅ Serverless functions support (for future backend)

### Option 2: GitHub Pages Deployment

**Free static hosting directly from your GitHub repository.**

#### Automatic Deployment (Recommended)

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to **"Pages"** section
   - Source: **"GitHub Actions"**

2. **Configure for Static Export**:
   
   Uncomment these lines in [`next.config.js`](next.config.js):
   ```javascript
   output: 'export',
   trailingSlash: true,
   images: {
     unoptimized: true
   },
   basePath: '/poultry-farm-automation',
   assetPrefix: '/poultry-farm-automation/',
   ```

3. **Push Changes**:
   ```bash
   git add .
   git commit -m "Enable GitHub Pages deployment"
   git push
   ```

4. **Access Your Site**:
   - URL: `https://YOUR_USERNAME.github.io/poultry-farm-automation/`
   - GitHub Actions will automatically build and deploy

#### Manual Deployment

```bash
# Build for static export
npm run build

# The 'out' folder contains your static files
# Upload these to any static hosting service
```

### Option 3: Netlify Deployment

1. Go to [https://netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `out` (if using static export) or `.next` (for SSR)

### Option 4: Other Hosting Services

**Railway.app:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway init
railway up
```

**Heroku:**
```bash
# Install Heroku CLI, then:
heroku create your-app-name
git push heroku main
```

## 🔧 Environment Configuration

### Production Environment Variables

Create `.env.production.local` for production-specific settings:

```env
# App Configuration
NEXT_PUBLIC_APP_NAME="Poultry Farm Automation"
NEXT_PUBLIC_VERSION="1.0.0"
NEXT_PUBLIC_ENVIRONMENT="production"

# API Configuration (when backend is ready)
NEXT_PUBLIC_API_URL="https://api.yourfarm.com"
NEXT_PUBLIC_WS_URL="wss://api.yourfarm.com/ws"

# Analytics (optional)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

### Development vs Production

**Development:**
```bash
npm run dev
# Runs on http://localhost:3000
```

**Production Build:**
```bash
npm run build
npm start
# Optimized production build
```

**Static Export:**
```bash
npm run build
# Creates 'out' folder with static files
```

## 🚦 Deployment Checklist

### Pre-Deployment
- [ ] All features tested locally
- [ ] Environment variables configured
- [ ] Dependencies updated (`npm audit fix`)
- [ ] Build runs without errors (`npm run build`)
- [ ] Linting passes (`npm run lint`)

### Post-Deployment
- [ ] Site loads correctly
- [ ] Authentication works
- [ ] Theme switching functions
- [ ] Language toggle works
- [ ] Sensor monitoring displays
- [ ] Device controls respond
- [ ] Analytics dashboard shows data
- [ ] Mobile responsiveness confirmed

## 🐛 Common Issues & Solutions

### Build Errors

**Issue:** `Module not found` errors
```bash
# Solution: Clean install
rm -rf node_modules package-lock.json
npm install
```

**Issue:** TypeScript errors
```bash
# Solution: Type check
npm run type-check
# Fix reported issues
```

### Deployment Issues

**Issue:** GitHub Pages 404 errors
- Ensure `basePath` and `assetPrefix` are configured in [`next.config.js`](next.config.js)
- Check that `output: 'export'` is enabled

**Issue:** Vercel deployment fails
- Check build logs in Vercel dashboard
- Ensure Node.js version is 18+ in project settings

**Issue:** Environment variables not working
- Double-check variable names (must start with `NEXT_PUBLIC_`)
- Verify they're set in your hosting platform's dashboard

### Performance Optimization

**Large Bundle Size:**
```bash
# Analyze bundle
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

**Slow Loading:**
- Enable Next.js Image Optimization
- Implement code splitting
- Add service worker for caching

## 📊 Monitoring & Analytics

### Built-in Monitoring

Add to your deployment:

```javascript
// Add to next.config.js
const nextConfig = {
  // ... existing config
  experimental: {
    instrumentationHook: true,
  },
}
```

### External Services

**Recommended monitoring tools:**
- Vercel Analytics (if using Vercel)
- Google Analytics 4
- Sentry for error tracking
- Lighthouse for performance monitoring

## 🔄 Continuous Deployment

### Automatic Deployments

**GitHub Actions:** Already configured in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

**Webhook Deployments:**
Most hosting services automatically deploy when you push to your main branch.

### Manual Deployments

```bash
# Update version
npm version patch

# Push changes
git push origin main --tags

# Hosting services will auto-deploy
```

## 🎯 Next Steps

1. **Create your GitHub repository**
2. **Push your code** using the commands above
3. **Choose a deployment platform** (Vercel recommended)
4. **Configure your domain** (optional)
5. **Set up monitoring** and analytics
6. **Plan for backend integration** when ready

## 🆘 Support

- **GitHub Issues:** Create issues in your repository
- **Documentation:** Refer to the main [README.md](README.md)
- **Community:** Next.js Discord, React communities

---

**Happy Deploying! 🚀**