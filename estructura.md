+---public
|   |   favicon.ico
|   |   index.html
|   |   logo192.png
|   |   logo512.png
|   |   manifest.json
|   |   robots.txt
|   |
|   \---assets
|       \---images
\---src
    |   App.test.tsx
    |   App.tsx
    |   index.css
    |   index.tsx
    |   react-app-env.d.ts
    |   reportWebVitals.ts
    |   routes.tsx
    |   setupTests.ts
    |
    +---components
    |   |   CourseCard.tsx
    |   |   CoursesList.tsx
    |   |   Navbar.tsx
    |   |   NotificationBell.tsx
    |   |
    |   +---admin
    |   |       Dashboard.tsx
    |   |       DashboardCards.tsx
    |   |       ResourceContentEditor.tsx
    |   |       ResourceManager.tsx
    |   |       TutorManagementPanel.tsx
    |   |
    |   +---auth
    |   |       ProtectedRoute.tsx
    |   |
    |   +---common
    |   |       AdvancedSearch.tsx
    |   |       CourseCard.tsx
    |   |       CreateButton.tsx
    |   |       ErrorBoundary.tsx
    |   |       Footer.tsx
    |   |       LoadingScreen.tsx
    |   |       Navbar.tsx
    |   |       NotificationCenter.tsx
    |   |       ProjectCard.tsx
    |   |       StatsPanel.tsx
    |   |       ThemeToggle.tsx
    |   |
    |   +---dashboards
    |   |       AdminDashboard.tsx
    |   |       StudentDashboard.tsx
    |   |
    |   +---debug
    |   |       StorageDebug.tsx
    |   |       StorageDebugger.tsx
    |   |
    |   +---editor
    |   |       CodeEditor.tsx
    |   |       Terminal.tsx
    |   |
    |   +---forms
    |   +---help
    |   |       DynamicResources.tsx
    |   |       sampleData.ts
    |   |
    |   +---layout
    |   |       Footer.tsx
    |   |       Layout.tsx
    |   |       MainLayout.tsx
    |   |       Navbar.tsx
    |   |       Navigation.tsx
    |   |       Sidebar.tsx
    |   |
    |   +---onboarding
    |   |       GuidedTour.tsx
    |   |
    |   \---profile
    |           AchievementsPanel.tsx
    |
    +---config
    |       auth0.ts
    |       database.ts
    |       firebase.ts
    |       firebaseUtils.ts
    |
    +---constants
    |       roleColors.ts
    |
    +---context
    |       AdminContext.tsx
    |       AnnouncementContext.tsx
    |       AuthContext.tsx
    |       NotificationContext.tsx
    |       ThemeContext.tsx
    |
    +---mocks
    |       auth0.ts
    |       users.ts
    |       xterm.ts
    |
    +---pages
    |   |   Announcements.tsx
    |   |   Community.tsx
    |   |   Contact.tsx
    |   |   Courses.tsx
    |   |   Home.tsx
    |   |   index.ts
    |   |   LiveClassroom.tsx
    |   |
    |   +---admin
    |   |       Admin.tsx
    |   |       AdminDashboard.tsx
    |   |       Analytics.tsx
    |   |       AnnouncementForm.tsx
    |   |       AnnouncementsList.tsx
    |   |       ContentManagement.tsx
    |   |       CourseManagement.tsx
    |   |       MentorManagement.tsx
    |   |       OrganizationStructure.tsx
    |   |       PaymentManagement.tsx
    |   |       ResourceContentPage.tsx
    |   |       ResourcesManagement.tsx
    |   |       TutorManagement.tsx
    |   |       UserManagement.tsx
    |   |
    |   +---announcements
    |   |       Announcements.tsx
    |   |
    |   +---auth
    |   |       ForgotPassword.tsx
    |   |       Login.tsx
    |   |       ProfileSetup.tsx
    |   |       Register.tsx
    |   |
    |   +---community
    |   |       Community.tsx
    |   |       CreatePost.tsx
    |   |       CreateThread.tsx
    |   |       Forum.tsx
    |   |       ForumThread.tsx
    |   |
    |   +---error
    |   |       Error.tsx
    |   |       NotFound.tsx
    |   |
    |   +---info
    |   |       About.tsx
    |   |       CommunityGuidelines.tsx
    |   |       Contact.tsx
    |   |       Documentation.tsx
    |   |       FAQ.tsx
    |   |       Help.tsx
    |   |       Maintenance.tsx
    |   |       Privacy.tsx
    |   |       Terms.tsx
    |   |       Tutorials.tsx
    |   |
    |   +---learning
    |   |       Course.tsx
    |   |       CourseDetail.tsx
    |   |       Courses.tsx
    |   |       Editor.tsx
    |   |       Project.tsx
    |   |       ProjectDetail.tsx
    |   |       Projects.tsx
    |   |
    |   +---main
    |   |       Dashboard.tsx
    |   |       Home.tsx
    |   |
    |   +---payments
    |   |       carts.tsx
    |   |       Donations.tsx
    |   |       MakePayment.tsx
    |   |
    |   \---user
    |           Bookmarks.tsx
    |           Notifications.tsx
    |           Profile.tsx
    |           Settings.tsx
    |
    +---routes
    |       index.tsx
    |
    +---services
    |   |   authService.ts
    |   |   CourseContentService.ts
    |   |
    |   \---storage
    |           BackendStorage.ts
    |           config.ts
    |           FirebaseStorage.ts
    |           IndexedDBStorage.ts
    |           StorageInterface.ts
    |
    +---styles
    |   |   global.css
    |   |   xterm.css
    |   |
    |   \---components
    +---theme
    |   |   index.ts
    |   |   theme.ts
    |   |   tokens.ts
    |   |
    |   \---components
    \---types
    |        auth0.d.ts
    |       course.ts
    |       gamification.ts
    |        global.d.ts
    |        roles.ts
    |        xterm.d.ts
    |
    |