# Queen's Startup Summit Website

A modern, responsive website for Queen's Startup Summit (QSS) - Canada's premier student-run entrepreneurship competition and conference.

## 🚀 About Queen's Startup Summit

Queen's Startup Summit is a student-run organization founded in 2013 in partnership with the Queen's Innovation Connector. We support the advancement of student entrepreneurship by providing opportunities for students to collaborate, compete, and realize their potential through engaging events, workshops, and our flagship annual Summit.

### Event Highlights
- **600+ Total Participants** from across Canada
- **$35K+ Awarded in Prizes** to winning teams
- **200+ Ideas Pitched** during competitions
- **25+ Schools Represented** from coast to coast

## 🌟 Features

### Modern Web Technologies
- **React 18** with TypeScript for robust component architecture
- **Vite** for lightning-fast development and optimized builds
- **Tailwind CSS 4** with custom mobile-first design system
- **Three.js & React Three Fiber** for immersive 3D experiences
- **Framer Motion** for smooth animations and transitions

### Performance Optimizations
- **Lazy Loading**: 3D components and heavy assets load only when needed
- **Code Splitting**: Optimized bundle chunks for faster initial load times
- **Mobile-First**: Responsive design prioritizing mobile performance
- **Progressive Enhancement**: Core functionality works without JavaScript

### Accessibility & UX
- **WCAG 2.1 Compliant**: Proper contrast ratios, keyboard navigation, screen reader support
- **Touch-Friendly**: 44px minimum touch targets for mobile devices
- **Reduced Motion**: Respects user preferences for motion sensitivity
- **Semantic HTML**: Proper heading hierarchy and landmark elements

## 🛠 Tech Stack

### Frontend Framework
- **React 18.2.0** - Modern React with concurrent features
- **TypeScript** - Type-safe development experience
- **Vite 5.0.8** - Next-generation frontend tooling

### Styling & Design
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Custom Design System** - Mobile-optimized spacing, typography, and components
- **CSS Custom Properties** - Dynamic theming and responsive design

### 3D Graphics & Animation
- **Three.js 0.160.1** - 3D graphics library
- **@react-three/fiber 8.15.15** - React renderer for Three.js
- **@react-three/drei 9.96.4** - Useful helpers for React Three Fiber
- **@react-three/rapier 1.3.0** - Physics engine integration
- **meshline 3.2.0** - Advanced line rendering

### UI Components & Icons
- **Lucide React 0.534.0** - Beautiful, customizable icons
- **LightGallery 2.9.0** - Responsive image gallery with zoom and thumbnails

### Build Tools & Optimization
- **Terser 5.43.1** - JavaScript minification
- **PostCSS 8.5.6** - CSS processing and optimization
- **Autoprefixer 10.4.21** - Automatic vendor prefixing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/queens-startup-summit.git
   cd queens-startup-summit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally

## 📱 Mobile-First Design

The website is built with a mobile-first approach, ensuring optimal performance and user experience across all devices:

### Responsive Breakpoints
- **xs**: 375px+ (Small mobile devices)
- **sm**: 640px+ (Large mobile devices)
- **md**: 768px+ (Tablets)
- **lg**: 1024px+ (Small laptops)
- **xl**: 1280px+ (Large laptops)
- **2xl**: 1536px+ (Desktop monitors)

### Performance Features
- **Conditional 3D Rendering**: 3D components only load on desktop devices
- **Optimized Images**: Responsive image loading with proper sizing
- **Touch Targets**: Minimum 44px touch targets for accessibility
- **Reduced Animations**: Respects `prefers-reduced-motion` settings

## 🎨 Design System

### Brand Colors
- **Primary Teal**: `#58baba` - Main brand color
- **Secondary Yellow**: `#ddc946` - Accent and call-to-action color

## 🔧 Build Optimization

### Bundle Analysis
The build process creates optimized chunks for better caching and performance:

- **vendor.js**: React and core dependencies (~140KB)
- **three-core.js**: Three.js core library (~670KB)
- **three-rapier.js**: Physics engine (~2MB, lazy loaded)
- **gallery.js**: Image gallery functionality (~48KB, lazy loaded)

### Performance Metrics
- **Initial Bundle**: ~42KB (main application code)
- **3D Assets**: Lazy loaded only for desktop users
- **Build Time**: ~25 seconds (optimized from 49 seconds)
- **Lighthouse Score**: 95+ on all metrics

## 📂 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation and mobile menu
│   ├── Hero.tsx        # Landing section with 3D badge
│   ├── About.tsx       # About QSS section
│   ├── Testimonial.tsx # Student testimonials
│   ├── GetInvolved.tsx # Registration information
│   ├── Gallery.tsx     # Event photo gallery
│   ├── Sponsors.tsx    # Partner organizations
│   ├── Contact.tsx     # Contact information
│   ├── Footer.tsx      # Site footer
│   └── Badge3D.tsx     # Interactive 3D badge
├── assets/             # Static assets
├── styles/             # Global styles and Tailwind config
└── utils/              # Utility functions and helpers
```

## 🤝 Contributing

We welcome contributions from the community! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and conventions
- Write meaningful commit messages
- Test your changes across different devices and browsers
- Ensure accessibility standards are maintained
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


**Built with ❤️ by the QSS Tech Team**

*Empowering the next generation of Canadian entrepreneurs*