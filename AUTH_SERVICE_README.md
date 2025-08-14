# Authentication Service & Theme Manager Integration

This document explains how to use the updated authentication service and theme manager that integrate with your Firebase configuration.

## Overview

The authentication system now provides:
- **Centralized Auth Service**: Clean interface for all authentication operations
- **Theme Manager with Auth Integration**: Syncs theme preferences across devices
- **User Profile Management**: Easy access to user data and preferences
- **Protected Route Handling**: Simple authentication checks for pages
- **Admin Access Control**: Built-in admin verification

## File Structure

```
assets/js/
├── firebase-config.js      # Firebase configuration and core services
├── auth-service.js         # New centralized authentication service
├── theme-manager.js        # Updated theme manager with auth integration
└── auth-usage-example.js   # Usage examples and helper functions
```

## Setup Instructions

### 1. Include Scripts in Your HTML

Add these script tags to your HTML files in the correct order:

```html
<!-- Firebase SDKs (if not already included) -->
<script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-storage-compat.js"></script>

<!-- Your Firebase config -->
<script src="assets/js/firebase-config.js"></script>

<!-- Auth service and theme manager -->
<script src="assets/js/auth-service.js"></script>
<script src="assets/js/theme-manager.js"></script>

<!-- Usage examples (optional) -->
<script src="assets/js/auth-usage-example.js"></script>
```

### 2. Initialize Services

The services automatically initialize when the DOM loads, but you can also check if they're ready:

```javascript
// Check if auth service is ready
if (window.authService && window.authService.isInitialized) {
    console.log('Auth service is ready');
}

// Check if theme manager is ready
if (window.themeManager) {
    console.log('Theme manager is ready');
}
```

## Authentication Service Usage

### Basic Authentication Operations

```javascript
// Sign in with email/password
const result = await window.authService.signInWithEmail(email, password);
if (result.success) {
    console.log('Signed in:', result.user);
} else {
    console.error('Sign in failed:', result.error);
}

// Register new user
const userData = {
    firstName: 'John',
    lastName: 'Doe'
};
const result = await window.authService.registerWithEmail(email, password, userData);

// Google sign in
const result = await window.authService.signUpWithGoogle();

// Sign out
await window.authService.signOut();
```

### User Management

```javascript
// Get current user
const user = await window.authService.getCurrentUser();

// Check if user is authenticated
if (window.authService.isAuthenticated()) {
    console.log('User is signed in');
}

// Get user profile from Firestore
const profile = await window.authService.getUserProfile();

// Update user profile
await window.authService.updateUserProfile({
    'profile.bio': 'New bio text'
});

// Update user preferences
await window.authService.updateUserPreferences({
    theme: 'light',
    notifications: false
});
```

### Authentication State Changes

```javascript
// Listen to authentication state changes
window.authService.onAuthStateChanged((user) => {
    if (user) {
        console.log('User signed in:', user.email);
        // Update UI for authenticated user
    } else {
        console.log('User signed out');
        // Update UI for guest user
    }
});
```

## Theme Manager Usage

### Basic Theme Operations

```javascript
// Get current theme
const currentTheme = window.themeManager.getCurrentTheme();

// Set theme programmatically
await window.themeManager.setTheme('light');

// Check if user is signed in
const user = window.themeManager.getCurrentUser();
```

### Theme Integration with Auth

The theme manager now automatically:
- Syncs theme preferences with user accounts
- Stores preferences in Firestore
- Loads user preferences when signing in
- Falls back to localStorage when signed out

## Protected Routes

### Simple Route Protection

```javascript
// Check if user can access protected page
if (!checkProtectedRoute()) {
    return; // Will redirect to login
}

// Your protected page code here
```

### Admin Route Protection

```javascript
// Check if user is admin
if (!(await checkAdminRoute())) {
    return; // Will redirect if not admin
}

// Your admin page code here
```

## HTML Integration Examples

### Navigation Updates

```html
<!-- Guest-only links -->
<a href="login.html" class="nav-link guest-only">Login</a>
<a href="register.html" class="nav-link guest-only">Register</a>

<!-- Auth-required links -->
<a href="dashboard.html" class="nav-link auth-required">Dashboard</a>
<a href="profile.html" class="nav-link auth-required">Profile</a>

<!-- User info display -->
<div id="userInfo" class="auth-required">
    <!-- Will be populated by JavaScript -->
</div>
```

### Form Integration

```html
<!-- Login form -->
<form onsubmit="handleSignIn(event)">
    <input type="email" id="email" required>
    <input type="password" id="password" required>
    <button type="submit">Sign In</button>
</form>

<!-- Registration form -->
<form onsubmit="handleRegistration(event)">
    <input type="text" id="firstName" required>
    <input type="text" id="lastName" required>
    <input type="email" id="email" required>
    <input type="password" id="password" required>
    <button type="submit">Register</button>
</form>

<!-- Google sign in -->
<button onclick="handleGoogleSignIn()">Sign in with Google</button>
```

### Error Handling

```html
<!-- Error message display -->
<div id="errorMessage" style="display: none;" class="error-message">
    <!-- Error messages will be displayed here -->
</div>
```

## CSS Classes for UI States

The system automatically adds CSS classes to help style different authentication states:

```css
/* When user is authenticated */
.authenticated .guest-only { display: none; }
.authenticated .auth-required { display: block; }

/* When user is a guest */
.guest .auth-required { display: none; }
.guest .guest-only { display: block; }
```

## Profile Data Structure

User profiles are stored in Firestore with this structure:

```javascript
{
    uid: "user123",
    email: "user@example.com",
    profile: {
        firstName: "John",
        lastName: "Doe",
        displayName: "John Doe",
        avatar: "https://...",
        bio: "Student bio",
        school: "University Name",
        grade: "12th Grade"
    },
    preferences: {
        theme: "dark",
        notifications: true
    },
    stats: {
        totalStudyTime: 0,
        coursesCompleted: 0,
        quizzesTaken: 0,
        notesCreated: 0
    },
    createdAt: Timestamp,
    updatedAt: Timestamp
}
```

## Troubleshooting

### Common Issues

1. **Services not loading**: Ensure scripts are loaded in the correct order
2. **Firebase not ready**: Services wait for Firebase to initialize automatically
3. **Authentication errors**: Check browser console for detailed error messages
4. **Theme not syncing**: Verify user is signed in and Firestore rules allow updates

### Debug Mode

Enable debug logging by checking the browser console. All services log their operations:

```javascript
// Check service status
console.log('Auth service:', window.authService);
console.log('Theme manager:', window.themeManager);
console.log('Firebase:', typeof firebase);
```

## Best Practices

1. **Always check authentication state** before accessing protected features
2. **Use the provided helper functions** instead of direct Firebase calls
3. **Handle errors gracefully** and provide user feedback
4. **Test authentication flows** in both signed-in and signed-out states
5. **Use CSS classes** for showing/hiding UI elements based on auth state

## Migration from Old System

If you're updating from the previous authentication system:

1. Replace direct Firebase auth calls with `window.authService` methods
2. Update theme toggle handlers to use `window.themeManager`
3. Add CSS classes for authentication states
4. Test all authentication flows

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify Firebase configuration is correct
3. Ensure all required scripts are loaded
4. Check Firestore security rules
