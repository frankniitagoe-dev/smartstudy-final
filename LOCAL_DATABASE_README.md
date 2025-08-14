# SmartStudy Local Database System

## Overview
SmartStudy has been migrated from Firebase/Firestore to a local database system using browser localStorage. This provides a completely offline experience with no external dependencies.

## Features

### 🗄️ Local Database
- **localStorage-based**: All data is stored locally in the user's browser
- **No internet required**: Works completely offline
- **Fast performance**: No network latency
- **Privacy-focused**: Data stays on user's device

### 🔐 Authentication
- **Local user accounts**: Email/password authentication
- **Secure storage**: Passwords are hashed (simple hash for demo)
- **Session management**: Automatic login state persistence

### 📊 Data Collections
- **Users**: User accounts and profiles
- **Courses**: Available courses and content
- **Enrollments**: User course enrollments
- **Notebooks**: User study notes
- **Quiz Results**: Quiz performance data
- **Course Progress**: Learning progress tracking
- **Settings**: User preferences and app settings

## File Structure

```
assets/js/
├── local-database.js      # Core database service
├── demo-data.js          # Sample data initialization
└── database-manager.js   # Database management UI
```

## Usage

### Basic Database Operations

```javascript
// Get all documents from a collection
const users = localDB.getCollection('users');

// Add a new document
const result = localDB.addDocument('users', {
    name: 'John Doe',
    email: 'john@example.com'
});

// Get document by ID
const user = localDB.getDocument('users', 'user123');

// Update document
localDB.updateDocument('users', 'user123', {
    name: 'John Smith'
});

// Delete document
localDB.deleteDocument('users', 'user123');

// Query with filters
const activeUsers = localDB.queryCollection('users', { status: 'active' });
```

### Authentication

```javascript
// Register new user
const result = await localAuth.registerUser(email, password, userData);

// Login user
const result = await localAuth.loginUser(email, password);

// Check authentication status
if (localAuth.isUserAuthenticated()) {
    const user = localAuth.getCurrentUser();
}

// Logout
localAuth.logout();
```

### Database Management

The database manager provides a simple UI for managing local data:

- **Export Database**: Download all data as JSON file
- **Clear Database**: Remove all data
- **Reset Demo Data**: Reload sample content
- **View Status**: See collection counts and document totals

Access the database manager by clicking the ⚙️ button in the bottom-right corner of any page.

## Demo Data

The system automatically initializes with sample content:

- **5 Sample Courses**: Computer Science, Business, Engineering, Medicine, Law
- **Default Settings**: Light theme, notifications enabled
- **Empty Collections**: Ready for user data

## Data Persistence

- **Automatic Saving**: All changes are immediately saved to localStorage
- **Data Export**: Users can export their data for backup
- **Data Import**: Users can restore from exported files
- **Browser Storage**: Data persists across browser sessions

## Security Considerations

⚠️ **Important Notes for Production Use:**

1. **Password Hashing**: Current implementation uses simple hashing for demo purposes
   - In production, use bcrypt or similar secure hashing
   - Consider adding salt and multiple iterations

2. **Data Validation**: Implement proper input validation and sanitization
   - Validate email formats
   - Sanitize user inputs
   - Implement rate limiting for login attempts

3. **Storage Limits**: localStorage has size limitations
   - Monitor storage usage
   - Implement data compression if needed
   - Consider IndexedDB for larger datasets

## Migration from Firebase

The system has been designed to be a drop-in replacement for Firebase:

- **Same API patterns**: Similar method names and return formats
- **Compatible data structures**: Existing data can be imported
- **No external dependencies**: Removed all Firebase SDK references

## Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **localStorage Support**: Required for data persistence
- **JavaScript ES6+**: Uses modern JavaScript features

## Troubleshooting

### Common Issues

1. **Data Not Persisting**
   - Check if localStorage is enabled
   - Verify browser permissions
   - Check console for errors

2. **Authentication Fails**
   - Ensure email/password are correct
   - Check if user exists in database
   - Verify database initialization

3. **Demo Data Not Loading**
   - Wait for database to initialize
   - Check console for initialization messages
   - Use database manager to reset demo data

### Debug Commands

```javascript
// Check database status
console.log('DB Initialized:', localDB.isInitialized);

// View all collections
console.log('Users:', localDB.getCollection('users'));
console.log('Courses:', localDB.getCollection('courses'));

// Test database operations
window.testLocalDB();

// Access database manager
window.dbManager.show();
```

## Future Enhancements

- **IndexedDB Support**: For larger datasets
- **Data Encryption**: Client-side encryption for sensitive data
- **Sync Capabilities**: Optional cloud sync when online
- **Advanced Queries**: More sophisticated filtering and sorting
- **Data Analytics**: Usage statistics and insights

## Support

For issues or questions about the local database system:

1. Check the browser console for error messages
2. Use the database manager to inspect data
3. Export data before making changes
4. Reset demo data if needed

---

**Note**: This local database system is designed for educational and demonstration purposes. For production applications, consider implementing additional security measures and data validation.

