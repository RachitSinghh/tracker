# 🎯 Job Application Tracker

A comprehensive job application tracking system built with modern web technologies to help job seekers organize their search process and visualize career progress.

![Project Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Development Roadmap](#development-roadmap)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Overview

The Job Application Tracker is a full-stack web application designed to streamline the job search process. It provides job seekers with a centralized platform to manage applications, track progress, and visualize their career journey through interactive dashboards and real-time analytics.

### Key Objectives
- **Organization**: Centralize all job applications in one secure platform
- **Visualization**: Provide clear insights into application progress and success rates
- **Efficiency**: Reduce time spent managing job search activities
- **Security**: Ensure user data privacy with enterprise-level security measures

## ✨ Features

### Current Features
- 🔐 **Secure Authentication**: Email/password login with session management
- 📊 **Interactive Dashboard**: Real-time statistics and application analytics
- 📝 **Application Management**: Full CRUD operations for job applications
- 🎨 **Modern UI/UX**: Responsive design with smooth animations
- 🔒 **Data Privacy**: User-specific data isolation with RLS policies
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Application Status Tracking
- **Applied** - Initial application submitted
- **Interview** - Interview process in progress
- **Offer** - Job offer received
- **Rejected** - Application declined

### Dashboard Analytics
- Total applications count
- Applications by status
- Response rate metrics
- Timeline visualization

## 🛠 Tech Stack

### Frontend
- **React 18** - Component-based UI framework
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation and interaction library
- **Lucide React** - Modern icon library
- **Vite** - Fast build tool and development server

### Backend (Current)
- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL** - Relational database with advanced features
- **Row Level Security (RLS)** - Database-level access control
- **Real-time Subscriptions** - Live data synchronization

### Development Tools
- **ESLint** - Code quality and consistency
- **Git** - Version control system
- **VS Code** - Development environment

## 🚧 Development Roadmap

### Phase 1: Current Development
- ✅ Frontend application with React 18 and TypeScript
- ✅ Supabase integration with authentication
- ✅ Basic CRUD operations and dashboard
- 🔄 UI/UX enhancements and animations

### Phase 2: Backend Migration (In Progress)
- 🔄 **Node.js Backend**: Custom server implementation
- 🔄 **MongoDB Integration**: NoSQL database migration
- 🔄 **JWT Authentication**: Custom auth system
- 🔄 **RESTful API**: Comprehensive endpoint design

### Phase 3: Mobile Development (Planned)
- 📱 **React Native CLI**: Cross-platform mobile app
- 📱 **Offline Support**: Local data caching
- 📱 **Push Notifications**: Application reminders
- 📱 **Biometric Authentication**: Enhanced security

### Phase 4: Advanced Features (Future)
- 🤖 **AI Integration**: Job matching recommendations
- 📈 **Advanced Analytics**: Detailed progress insights
- 🔗 **API Integrations**: Job board connections
- 👥 **Social Features**: Application sharing and networking

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Git for version control

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/RachitSinghh/tracker.git
   cd tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   - Create a Supabase project
   - Run the SQL migrations from `supabase/migrations/`
   - Enable Row Level Security policies

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open Application**
   Navigate to `http://localhost:5173` in your browser

## 📁 Project Structure

```
tracker/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   └── pointer-highlight.tsx
│   │   ├── ApplicationForm.tsx
│   │   ├── ApplicationTable.tsx
│   │   ├── CelebrationModal.tsx
│   │   ├── Dashboard.tsx
│   │   ├── LandingPage.tsx
│   │   ├── LoginForm.tsx
│   │   └── SignUpForm.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── lib/
│   │   ├── supabase.ts
│   │   └── utils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── supabase/
│   └── migrations/
│       ├── 20251010175519_create_job_applications_table.sql
│       └── 20251010180512_add_user_id_to_applications.sql
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🗄 Database Schema

### Job Applications Table
```sql
CREATE TABLE job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  position text NOT NULL,
  status text NOT NULL DEFAULT 'Applied',
  apply_date date NOT NULL DEFAULT CURRENT_DATE,
  response_date date,
  job_url text,
  reason text,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### Security Policies
- Users can only view their own applications
- Users can only create applications linked to their account
- Users can only update/delete their own applications

## 🔐 Authentication

The application implements secure authentication using Supabase Auth:

- **Email/Password Registration**: Standard signup flow
- **Session Management**: Persistent login across browser sessions
- **Protected Routes**: Dashboard access requires authentication
- **Row Level Security**: Database-level access control

### Authentication Flow
1. User registers with email and password
2. Supabase creates user account and session
3. User is redirected to dashboard
4. All subsequent requests include session token
5. Database queries are filtered by user ID automatically

## 🎨 UI/UX Design

### Design Principles
- **Modern Dark Theme**: Sleek, professional appearance
- **Responsive Layout**: Works on all device sizes
- **Smooth Animations**: Framer Motion for delightful interactions
- **Accessibility**: WCAG compliance for inclusive design
- **Performance**: Optimized for fast loading and smooth interactions

### Key Components
- **Landing Page**: Hero section with animated text effects
- **Authentication Modals**: Clean, user-friendly forms
- **Dashboard**: Statistics cards and application table
- **Application Forms**: Comprehensive data entry with validation

## 🤝 Contributing

We welcome contributions to improve the Job Application Tracker! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with proper testing
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript compiler check

# Testing (Coming Soon)
npm test             # Run test suite
npm run test:coverage # Run tests with coverage
```

## 🔮 Future Enhancements

### Backend Migration Benefits
- **Custom Logic**: Tailored business logic implementation
- **Performance**: Optimized database queries and caching
- **Scalability**: Better handling of increased user load
- **Integration**: Easier third-party service connections

### Mobile App Features
- **Offline Mode**: Work without internet connection
- **Push Notifications**: Never miss important deadlines
- **Camera Integration**: Scan and store job posting images
- **Location Services**: Track applications by geographic area

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rachit Singh**
- GitHub: [@RachitSinghh](https://github.com/RachitSinghh)
- LinkedIn: [Your LinkedIn Profile]
- Email: [Your Email]

## 🙏 Acknowledgments

- [Supabase](https://supabase.com/) for providing excellent Backend-as-a-Service
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for beautiful icons
- The open-source community for inspiration and resources

---

**Made with ❤️ for job seekers everywhere**

*Last updated: October 2025*
