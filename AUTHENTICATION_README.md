# SmartStudy Authentication & Database Integration

## Overview

This document explains the new authentication and database system for SmartStudy. The system now provides:

- **User Authentication**: Secure login/registration with Firebase Auth
- **Data Persistence**: All user activities are saved to Firestore database
- **Real-time Updates**: Data is synchronized between local storage and database
- **Default Data**: New users start with empty profiles that get populated over time

## How It Works

### 1. User Registration Flow

```
User fills registration form → Firebase creates account → Default user data created → User logged in → Redirected to dashboard
```

**Default User Data Structure:**
```javascript
{
  profile: {
    firstName: '',
    lastName: '',
    email: 'user@example.com',
    avatar: '',
    bio: '',
    school: '',
    grade: '',
    joinDate: '2024-01-01T00:00:00.000Z'
  },
  preferences: {
    theme: 'dark',
    notifications: true,
    language: 'en',
    timezone: 'America/New_York'
  },
  studyData: {
    totalStudyTime: 0,
    totalSessions: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastStudyDate: null,
    favoriteSubjects: [],
    studyGoals: []
  },
  courses: {
    enrolled: [],
    completed: [],
    inProgress: [],
    progress: {}
  },
  notes: [],
  quizzes: {
    taken: [],
    scores: {},
    certificates: []
  },
  achievements: [],
  statistics: {
    dailyStudyTime: {},
    weeklyProgress: {},
    monthlyStats: {}
  }
}
```

### 2. User Login Flow

```
User enters credentials → Firebase authenticates → Check if user data exists → Load existing data OR create default → User logged in
```

### 3. Data Persistence

Every user action is automatically saved to the database:

- **Study Sessions**: Start/end times, duration, notes
- **Course Progress**: Topic completion, overall progress
- **Notes**: All user notes with timestamps
- **Quiz Results**: Scores, answers, completion times
- **Achievements**: Unlocked achievements
- **Statistics**: Daily, weekly, monthly study data

## File Structure

```
assets/js/
├── firebase-config.js      # Firebase configuration
├── auth-integration.js     # Main authentication service
├── user-data-service.js    # Advanced user data management
├── usage-examples.js       # Implementation examples
└── script.js              # General UI functionality
```

## Integration Guide

### Step 1: Include Required Scripts

Add these scripts to your HTML pages in this order:

```html
<!-- Firebase SDKs -->
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>

<!-- SmartStudy Scripts -->
<script src="assets/js/firebase-config.js"></script>
<script src="assets/js/auth-integration.js"></script>
<script src="assets/js/usage-examples.js"></script>
<script src="assets/js/script.js"></script>
```

### Step 2: Basic Authentication Setup

The system automatically initializes when the page loads. You can check if it's ready:

```javascript
// Wait for authentication to be ready
while (!window.authIntegration || !window.authIntegration.isInitialized) {
    await new Promise(resolve => setTimeout(resolve, 100));
}

// Check if user is logged in
if (window.authIntegration.isLoggedIn()) {
    console.log('User is logged in');
    const userData = window.authIntegration.getUserData();
    console.log('User data:', userData);
} else {
    console.log('User is not logged in');
}
```

### Step 3: Login Form Integration

```javascript
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value.trim();
    const password = this.querySelector('input[type="password"]').value.trim();
    
    try {
        const result = await window.authIntegration.loginUser(email, password);
        
        if (result.success) {
            window.authIntegration.showToast('Login successful!', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            window.authIntegration.showToast(result.error, 'error');
        }
    } catch (error) {
        window.authIntegration.showToast('Login failed: ' + error.message, 'error');
    }
});
```

### Step 4: Registration Form Integration

```javascript
document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const userData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password')
    };
    
    try {
        const result = await window.authIntegration.registerUser(
            userData.email, 
            userData.password, 
            userData
        );
        
        if (result.success) {
            window.authIntegration.showToast('Account created successfully!', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        } else {
            window.authIntegration.showToast(result.error, 'error');
        }
    } catch (error) {
        window.authIntegration.showToast('Registration failed: ' + error.message, 'error');
    }
});
```

### Step 5: Protected Page Setup

For pages that require authentication:

```javascript
// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    if (!window.authIntegration.checkAuth()) {
        return; // Will redirect to login
    }
    
    // Load page content
    loadPageContent();
});

function loadPageContent() {
    const userData = window.authIntegration.getUserData();
    
    // Update UI with user data
    document.querySelector('.user-name').textContent = 
        `${userData.profile.firstName} ${userData.profile.lastName}`;
    
    document.querySelector('.study-time').textContent = 
        Math.round(userData.studyData.totalStudyTime);
}
```

## Data Management Examples

### Study Session Management

```javascript
// Start a study session
async function startStudy() {
    const session = await window.SmartStudyAuth.startStudySession('Mathematics', 'math101');
    console.log('Study session started:', session);
}

// End a study session
async function endStudy() {
    const notes = ['Learned quadratic equations', 'Need to review factoring'];
    await window.SmartStudyAuth.endStudySession(notes);
}
```

### Note Management

```javascript
// Save a note
async function saveNote() {
    const noteData = {
        title: 'Math Notes',
        content: 'Important formulas to remember...',
        subject: 'Mathematics',
        tags: ['formulas', 'important']
    };
    
    const savedNote = await window.SmartStudyAuth.saveNote(noteData);
    console.log('Note saved:', savedNote);
}
```

### Course Progress Tracking

```javascript
// Mark a topic as completed
async function completeTopic() {
    await window.SmartStudyAuth.updateCourseProgress('math101', 'algebra-basics', true);
    console.log('Topic marked as completed');
}
```

## Database Schema

### Users Collection

```
users/{userId}
├── profile: { ... }
├── preferences: { ... }
├── studyData: { ... }
├── courses: { ... }
├── notes: [ ... ]
├── quizzes: { ... }
├── achievements: [ ... ]
├── statistics: { ... }
├── createdAt: timestamp
└── updatedAt: timestamp
```

### Real-time Updates

The system automatically syncs data between local storage and the database:

```javascript
// Update user data
await window.authIntegration.updateUserData('profile.firstName', 'John');

// This will:
// 1. Update the database
// 2. Update local storage
// 3. Trigger any listeners
// 4. Show success/error feedback
```

## Security Rules

Make sure your Firestore security rules allow authenticated users to access their own data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Error Handling

The system provides comprehensive error handling:

```javascript
try {
    await window.authIntegration.updateUserData('profile.firstName', 'John');
} catch (error) {
    if (error.code === 'permission-denied') {
        window.authIntegration.showToast('Permission denied. Please log in again.', 'error');
    } else if (error.code === 'unavailable') {
        window.authIntegration.showToast('Database unavailable. Please try again.', 'error');
    } else {
        window.authIntegration.showToast('An error occurred: ' + error.message, 'error');
    }
}
```

## Testing

### Local Development

1. Set up Firebase project
2. Enable Authentication and Firestore
3. Update `firebase-config.js` with your project credentials
4. Test registration and login flows

### Production Deployment

1. Set up production Firebase project
2. Configure security rules
3. Update configuration files
4. Test all authentication flows

## Troubleshooting

### Common Issues

1. **Firebase not initialized**: Check if Firebase scripts are loaded in correct order
2. **Authentication fails**: Verify Firebase configuration and security rules
3. **Data not saving**: Check Firestore permissions and network connectivity
4. **User data not loading**: Ensure user is authenticated and database exists

### Debug Mode

Enable debug logging:

```javascript
// In browser console
localStorage.setItem('debug', 'true');
```

## Performance Considerations

- **Local Storage**: User data is cached locally for immediate access
- **Database Sync**: Updates are batched and sent to database
- **Real-time Updates**: Only changed data is transmitted
- **Offline Support**: Data can be saved locally and synced when online

## Future Enhancements

- **Offline Mode**: Full offline functionality with sync when online
- **Data Export**: Allow users to export their data
- **Backup/Restore**: User data backup and restoration
- **Analytics**: Study pattern analysis and insights
- **Social Features**: Share achievements and progress with friends

## Support

For issues or questions:

1. Check the browser console for error messages
2. Verify Firebase configuration
3. Check network connectivity
4. Review Firestore security rules
5. Ensure all required scripts are loaded

---

This system provides a robust foundation for user authentication and data persistence in SmartStudy. All user activities are automatically tracked and saved, providing a seamless experience across sessions.




