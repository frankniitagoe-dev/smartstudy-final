# SmartStudy - Student Learning Platform

A comprehensive web-based learning platform designed for university students in Ghana, featuring interactive courses, auto-generated quizzes, and a modern glass morphism design.

## 🚀 Features

### Core Functionality
- **Preloaded University Courses**: Browse and enroll in various academic courses
- **Slide-to-Lesson Breakdown**: Upload slides that get automatically converted into structured lessons
- **Auto-Generated Quizzes**: Intelligent quiz generation from course content
- **Interactive Learning**: Engaging learning experience with progress tracking

### User Interface
- **Glass Morphism Design**: Modern, elegant UI with blur effects and transparency
- **Dark/Light Theme**: Toggle between themes for comfortable viewing
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Black & White Color Scheme**: Clean, academic-focused design

### Authentication & User Management
- **Firebase Integration**: Secure authentication with email, Google, and anonymous sign-in
- **Multi-step Registration**: Streamlined onboarding process
- **User Profiles**: Complete user management with settings and preferences

## 📁 Project Structure

```
SmartStudy/
├── index.html              # Landing page
├── about.html              # About page
├── login.html              # Login page
├── register.html           # Registration page
├── dashboard.html          # Main dashboard
├── courses.html            # Course browsing
├── upload.html             # Material upload
├── quiz.html               # Interactive quizzes
├── course-viewer.html      # Course content viewer
├── settings.html           # User settings
├── onboarding.html         # User onboarding
├── assets/
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   ├── js/
│   │   ├── script.js      # Main JavaScript
│   │   └── firebase-config.js  # Firebase configuration
│   └── images/            # Image assets
└── README.md              # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: Black (#000000) and White (#ffffff)
- **Glass Effects**: rgba(0, 0, 0, 0.8) for dark theme, rgba(255, 255, 255, 0.9) for light theme
- **Text**: High contrast for readability
- **Borders**: Subtle rgba values for glass morphism

### Typography
- **Primary Font**: Inter (300, 400, 500, 600, 700)
- **Secondary Font**: Poppins (400, 500, 600, 700)
- **Icons**: Font Awesome 6.0.0

### Components
- **Glass Cards**: Backdrop blur with border effects
- **Fixed Navigation**: Sticky headers and sidebars
- **Smooth Animations**: CSS transitions and transforms
- **Interactive Elements**: Hover effects and state changes

## 🔧 Technical Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Flexbox, Grid, Animations
- **JavaScript**: ES6+, DOM manipulation, Local Storage
- **Font Awesome**: Icon library
- **Google Fonts**: Inter and Poppins

### Backend Integration
- **Firebase Authentication**: Email, Google, Anonymous sign-in
- **Firebase Firestore**: User data storage (planned)
- **Local Storage**: Theme preferences and user data

### Development
- **Local Server**: Required for Firebase authentication
- **Responsive Design**: Mobile-first approach
- **Cross-browser Compatibility**: Modern browser support

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local HTTP server (for Firebase authentication)

### Installation

1. **Clone or Download** the project files
2. **Start a Local Server**:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx http-server
   
   # PHP
   php -S localhost:8000
   ```
3. **Open in Browser**: Navigate to `http://localhost:8000`

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Email/Password, Google, Anonymous)
3. Update `assets/js/firebase-config.js` with your Firebase configuration

## 📱 Pages Overview

### Public Pages
- **Home (`index.html`)**: Landing page with hero section and features
- **About (`about.html`)**: Mission and benefits information
- **Login (`login.html`)**: User authentication
- **Register (`register.html`)**: User registration with multi-step form

### Authenticated Pages
- **Dashboard (`dashboard.html`)**: Main hub with quick actions and progress
- **Courses (`courses.html`)**: Browse and filter available courses
- **Upload (`upload.html`)**: Upload slides and materials
- **Quiz (`quiz.html`)**: Interactive quiz system
- **Course Viewer (`course-viewer.html`)**: Lesson navigation and content
- **Settings (`settings.html`)**: User preferences and account management

## 🎯 Key Features

### Dashboard
- Quick action buttons
- Recent activity tracking
- Progress overview
- Statistics and analytics
- Theme toggle functionality

### Course Management
- Faculty and level filtering
- Course enrollment system
- Progress tracking
- Interactive course cards

### Upload System
- Drag & drop file upload
- Multiple file format support (PDF, PPT, DOC)
- Course metadata management
- Upload progress tracking

### Quiz System
- Multiple choice questions
- Timer functionality
- Progress tracking
- Score calculation
- Review capabilities

### Settings
- Profile management
- Notification preferences
- Security settings
- Data privacy controls
- Theme customization

## 🔒 Security Features

- **Firebase Authentication**: Secure user authentication
- **Input Validation**: Form validation and sanitization
- **Local Storage Security**: Secure data storage
- **HTTPS Requirement**: Firebase authentication requires secure connection

## 📊 Performance Optimizations

- **CSS Variables**: Efficient theming system
- **Hardware Acceleration**: Transform and opacity animations
- **Lazy Loading**: Optimized image loading
- **Minimal Dependencies**: Lightweight implementation

## 🎨 Customization

### Theme System
The application uses CSS custom properties for easy theming:

```css
[data-theme="light"] {
    --bg-primary: #ffffff;
    --text-primary: #000000;
    /* ... other variables */
}

[data-theme="dark"] {
    --bg-primary: #000000;
    --text-primary: #ffffff;
    /* ... other variables */
}
```

### Adding New Pages
1. Copy an existing page structure
2. Update navigation links
3. Maintain consistent styling
4. Add to the sidebar menu

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is created for educational purposes. Feel free to use and modify as needed.

## 🆘 Support

For issues or questions:
1. Check the browser console for errors
2. Ensure Firebase is properly configured
3. Verify local server is running
4. Check network connectivity

## 🚀 Future Enhancements

- [ ] Real-time collaboration features
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] AI-powered content recommendations
- [ ] Study group functionality
- [ ] Offline mode support
- [ ] Advanced quiz types
- [ ] Video integration
- [ ] Social learning features

---

**SmartStudy** - Empowering Ghanaian university students with modern learning technology. 