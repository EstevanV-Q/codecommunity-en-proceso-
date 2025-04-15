# CodeCommunity Project Structure
la estructura mas grafica
## Project Overview
A comprehensive learning platform built with React and TypeScript, featuring course management, community interaction, and administrative tools.

## Directory Structure

### Root (/)
- 📄 .babelrc - Babel configuration
- 📄 .eslintrc.json - ESLint rules
- 📄 .gitignore - Git ignore rules
- 📄 package.json - Project dependencies and scripts
- 📄 tsconfig.json - TypeScript configuration
- 📄 README.md - Project documentation

### Public (/public)
- 📁 assets/
  - 📄 logo.svg - Project logo
  - 📄 default-avatar.png - Default user avatar
  - 📄 course-placeholder.jpg - Course default image
- 📄 index.html - Main HTML file
- 📄 manifest.json - PWA manifest
- 📄 robots.txt - SEO configuration

### Source (/src)
#### Components (/src/components)
##### Admin
- 📄 DashboardCards.tsx - Admin dashboard statistics
- 📄 ResourceManager.tsx - Resource management interface
- 📄 ResourceContentEditor.tsx - Content editing tool
- 📄 TutorManagementPanel.tsx - Tutor management system
- 📄 UserManagement.tsx - User administration
- 📄 AdminStats.tsx - Administrative statistics

##### Authentication
- 📄 LoginForm.tsx - User login interface
- 📄 RegisterForm.tsx - User registration
- 📄 PasswordReset.tsx - Password recovery

##### Common
- 📄 AdvancedSearch.tsx - Search functionality
- 📄 CreateButton.tsx - Universal create button
- 📄 ThemeToggle.tsx - Theme switcher
- 📄 LoadingSpinner.tsx - Loading indicator
- 📄 ErrorBoundary.tsx - Error handling

##### Course
- 📄 CourseCard.tsx - Course display card
- 📄 CourseList.tsx - Course listing
- 📄 CourseDetail.tsx - Course information
- 📄 CourseProgress.tsx - Progress tracking

##### Debug
- 📄 StorageDebug.tsx - Storage debugging tool
- 📄 StorageDebugger.tsx - Advanced debugging

##### Editor
- 📄 CodeEditor.tsx - Code editing interface
- 📄 MonacoConfig.tsx - Monaco editor setup

##### Forum
- 📄 ThreadList.tsx - Forum threads listing
- 📄 ThreadDetail.tsx - Thread view
- 📄 CommentSection.tsx - Comments system

##### Help
- 📄 DynamicResources.tsx - Dynamic help resources
- 📄 FAQSection.tsx - FAQ display

##### Layout
- 📄 Navigation.tsx - Main navigation
- 📄 Footer.tsx - Site footer
- 📄 Sidebar.tsx - Side navigation
- 📄 Header.tsx - Page header

##### Profile
- 📄 AchievementsPanel.tsx - User achievements
- 📄 UserProfile.tsx - Profile display
- 📄 ProfileEditor.tsx - Profile editing

#### Configuration (/src/config)
- 📄 firebase.ts - Firebase setup
- 📄 routes.ts - Route definitions
- 📄 api.ts - API configuration

#### Constants (/src/constants)
- 📄 roles.ts - User role definitions
- 📄 paths.ts - Application paths
- 📄 settings.ts - Global settings

#### Context (/src/context)
- 📄 AdminContext.tsx - Admin state management
- 📄 AuthContext.tsx - Authentication context
- 📄 ThemeContext.tsx - Theme management
- 📄 NotificationContext.tsx - Notification system

#### Hooks (/src/hooks)
- 📄 useAuth.ts - Authentication hook
- 📄 useStorage.ts - Storage management
- 📄 useTheme.ts - Theme hook

#### Mock Data (/src/mocks)
- 📄 users.ts - User mock data
- 📄 courses.ts - Course mock data
- 📄 resources.ts - Resource mock data

#### Pages (/src/pages)
##### Admin
- 📄 Admin.tsx - Admin dashboard
- 📄 PaymentManagement.tsx - Payment system
- 📄 OrganizationStructure.tsx - Organization management

##### Authentication
- 📄 Login.tsx - Login page
- 📄 Register.tsx - Registration page
- 📄 ProfileSetup.tsx - Initial profile setup

##### Community
- 📄 Forum.tsx - Community forum
- 📄 Mentorship.tsx - Mentorship program

##### Information
- 📄 Documentation.tsx - Platform documentation
- 📄 Help.tsx - Help center

##### Learning
- 📄 Courses.tsx - Course catalog
- 📄 Resources.tsx - Learning resources

##### Main
- 📄 Home.tsx - Homepage
- 📄 Dashboard.tsx - User dashboard

#### Services (/src/services)
##### API
- 📄 auth.ts - Authentication service
- 📄 courses.ts - Course management
- 📄 users.ts - User management

##### Storage
- 📄 BackendStorage.ts - Backend storage implementation
- 📄 FirebaseStorage.ts - Firebase storage
- 📄 IndexedDBStorage.ts - Local storage
- 📄 StorageInterface.ts - Storage interface
- 📄 config.ts - Storage configuration

##### Utils
- 📄 validation.ts - Data validation
- 📄 formatting.ts - Data formatting

#### Styles (/src/styles)
- 📄 global.css - Global styles
- 📄 variables.css - CSS variables

#### Theme (/src/theme)
- 📄 theme.ts - Theme configuration
- 📄 tokens.ts - Design tokens

#### Types (/src/types)
- 📄 auth.ts - Authentication types
- 📄 course.ts - Course types
- 📄 user.ts - User types
- 📄 gamification.ts - Gamification types

#### Root Components
- 📄 App.tsx - Main application component
- 📄 index.tsx - Application entry point
- 📄 routes.tsx - Route configuration

## Key Features and Functionality

### Authentication System
- User registration and login
- Role-based access control
- Password recovery
- Profile management
- Social authentication

### Learning Platform
- Course creation and management
- Interactive code editor
- Progress tracking
- Resource library
- Achievement system
- Assessments and quizzes

### Community Features
- Discussion forum
- Mentorship program
- Real-time chat
- Code sharing
- Collaborative learning

### Admin Dashboard
- User management
- Content moderation
- Analytics and reporting
- System configuration
- Resource management

### Technical Implementation
- React with TypeScript
- Material-UI components
- Firebase integration
- IndexedDB for offline support
- Monaco Editor for code
- Real-time updates
- Responsive design
- Progressive Web App

### Development Tools
- TypeScript configuration
- ESLint setup
- Testing framework
- Build optimization
- Development scripts