// Local Database Service for SmartStudy
// Replaces Firebase/Firestore with localStorage-based data management

class LocalDatabase {
    constructor() {
        this.dbName = 'smartstudy_db';
        this.version = '1.0';
        this.isInitialized = false;
        this.init();
    }

    // Initialize the local database
    init() {
        try {
            // Check if localStorage is available
            if (typeof Storage !== 'undefined') {
                // Initialize database structure
                this.initializeDatabase();
                this.isInitialized = true;
                console.log('✅ Local database initialized successfully');
            } else {
                throw new Error('localStorage is not supported in this browser');
            }
        } catch (error) {
            console.error('❌ Local database initialization failed:', error);
            this.isInitialized = false;
        }
    }

    // Initialize database structure with default collections
    initializeDatabase() {
        const collections = ['users', 'courses', 'enrollments', 'notebooks', 'quizResults', 'courseProgress', 'settings'];
        
        collections.forEach(collection => {
            if (!this.getCollection(collection)) {
                this.setCollection(collection, []);
            }
        });

        // Initialize default settings
        if (!this.getCollection('settings').length) {
            this.setCollection('settings', [
                {
                    id: 'default',
                    theme: 'light',
                    notifications: true,
                    emailUpdates: true,
                    studyReminders: true
                }
            ]);
        }
    }

    // Generic collection getter
    getCollection(collectionName) {
        try {
            const data = localStorage.getItem(`${this.dbName}_${collectionName}`);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error(`Error getting collection ${collectionName}:`, error);
            return [];
        }
    }

    // Generic collection setter
    setCollection(collectionName, data) {
        try {
            localStorage.setItem(`${this.dbName}_${collectionName}`, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error(`Error setting collection ${collectionName}:`, error);
            return false;
        }
    }

    // Add document to collection
    addDocument(collectionName, document) {
        try {
            const collection = this.getCollection(collectionName);
            const id = this.generateId();
            const newDoc = { id, ...document, createdAt: new Date().toISOString() };
            collection.push(newDoc);
            this.setCollection(collectionName, collection);
            return { success: true, id, document: newDoc };
        } catch (error) {
            console.error(`Error adding document to ${collectionName}:`, error);
            return { success: false, error: error.message };
        }
    }

    // Get document by ID
    getDocument(collectionName, id) {
        try {
            const collection = this.getCollection(collectionName);
            return collection.find(doc => doc.id === id) || null;
        } catch (error) {
            console.error(`Error getting document from ${collectionName}:`, error);
            return null;
        }
    }

    // Update document
    updateDocument(collectionName, id, updates) {
        try {
            const collection = this.getCollection(collectionName);
            const index = collection.findIndex(doc => doc.id === id);
            
            if (index !== -1) {
                collection[index] = { 
                    ...collection[index], 
                    ...updates, 
                    updatedAt: new Date().toISOString() 
                };
                this.setCollection(collectionName, collection);
                return { success: true, document: collection[index] };
            } else {
                return { success: false, error: 'Document not found' };
            }
        } catch (error) {
            console.error(`Error updating document in ${collectionName}:`, error);
            return { success: false, error: error.message };
        }
    }

    // Delete document
    deleteDocument(collectionName, id) {
        try {
            const collection = this.getCollection(collectionName);
            const filteredCollection = collection.filter(doc => doc.id !== id);
            
            if (filteredCollection.length !== collection.length) {
                this.setCollection(collectionName, filteredCollection);
                return { success: true };
            } else {
                return { success: false, error: 'Document not found' };
            }
        } catch (error) {
            console.error(`Error deleting document from ${collectionName}:`, error);
            return { success: false, error: error.message };
        }
    }

    // Query collection with filters
    queryCollection(collectionName, filters = {}) {
        try {
            let collection = this.getCollection(collectionName);
            
            // Apply filters
            Object.keys(filters).forEach(key => {
                if (filters[key] !== undefined && filters[key] !== null) {
                    collection = collection.filter(doc => doc[key] === filters[key]);
                }
            });
            
            return collection;
        } catch (error) {
            console.error(`Error querying collection ${collectionName}:`, error);
            return [];
        }
    }

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Clear all data
    clearDatabase() {
        try {
            const collections = ['users', 'courses', 'enrollments', 'notebooks', 'quizResults', 'courseProgress', 'settings'];
            collections.forEach(collection => {
                localStorage.removeItem(`${this.dbName}_${collection}`);
            });
            this.initializeDatabase();
            return { success: true };
        } catch (error) {
            console.error('Error clearing database:', error);
            return { success: false, error: error.message };
        }
    }

    // Export database (for backup)
    exportDatabase() {
        try {
            const collections = ['users', 'courses', 'enrollments', 'notebooks', 'quizResults', 'courseProgress', 'settings'];
            const exportData = {};
            
            collections.forEach(collection => {
                exportData[collection] = this.getCollection(collection);
            });
            
            return { success: true, data: exportData };
        } catch (error) {
            console.error('Error exporting database:', error);
            return { success: false, error: error.message };
        }
    }

    // Import database (for restore)
    importDatabase(data) {
        try {
            Object.keys(data).forEach(collection => {
                if (Array.isArray(data[collection])) {
                    this.setCollection(collection, data[collection]);
                }
            });
            return { success: true };
        } catch (error) {
            console.error('Error importing database:', error);
            return { success: false, error: error.message };
        }
    }
}

// Local Authentication Service
class LocalAuthService {
    constructor(database) {
        this.db = database;
        this.currentUser = null;
        this.isAuthenticated = false;
        this.loadCurrentUser();
    }

    // Load current user from localStorage
    loadCurrentUser() {
        try {
            const userData = localStorage.getItem('smartstudy_current_user');
            if (userData) {
                this.currentUser = JSON.parse(userData);
                this.isAuthenticated = true;
            }
        } catch (error) {
            console.error('Error loading current user:', error);
            this.logout();
        }
    }

    // Save current user to localStorage
    saveCurrentUser(user) {
        try {
            localStorage.setItem('smartstudy_current_user', JSON.stringify(user));
            this.currentUser = user;
            this.isAuthenticated = true;
        } catch (error) {
            console.error('Error saving current user:', error);
        }
    }

    // Register new user
    async registerUser(email, password, userData) {
        try {
            // Check if user already exists
            const existingUsers = this.db.queryCollection('users', { email });
            if (existingUsers.length > 0) {
                return { success: false, error: 'User with this email already exists' };
            }

            // Create user document
            const user = {
                email,
                password: this.hashPassword(password), // In production, use proper hashing
                ...userData,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };

            const result = this.db.addDocument('users', user);
            if (result.success) {
                // Remove password from user object before saving
                const { password, ...safeUser } = result.document;
                this.saveCurrentUser(safeUser);
                return { success: true, user: safeUser };
            } else {
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: error.message };
        }
    }

    // Login user
    async loginUser(email, password) {
        try {
            const users = this.db.queryCollection('users', { email });
            if (users.length === 0) {
                return { success: false, error: 'User not found' };
            }

            const user = users[0];
            if (this.hashPassword(password) !== user.password) {
                return { success: false, error: 'Invalid password' };
            }

            // Update last login
            this.db.updateDocument('users', user.id, { lastLogin: new Date().toISOString() });

            // Remove password from user object
            const { password: _, ...safeUser } = user;
            this.saveCurrentUser(safeUser);

            return { success: true, user: safeUser };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    }

    // Logout user
    logout() {
        try {
            localStorage.removeItem('smartstudy_current_user');
            this.currentUser = null;
            this.isAuthenticated = false;
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, error: error.message };
        }
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Check if user is authenticated
    isUserAuthenticated() {
        return this.isAuthenticated;
    }

    // Simple password hashing (in production, use proper hashing)
    hashPassword(password) {
        // This is a simple hash for demo purposes
        // In production, use bcrypt or similar
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString();
    }

    // Change password
    async changePassword(userId, currentPassword, newPassword) {
        try {
            const user = this.db.getDocument('users', userId);
            if (!user) {
                return { success: false, error: 'User not found' };
            }

            if (this.hashPassword(currentPassword) !== user.password) {
                return { success: false, error: 'Current password is incorrect' };
            }

            const result = this.db.updateDocument('users', userId, {
                password: this.hashPassword(newPassword)
            });

            return result;
        } catch (error) {
            console.error('Change password error:', error);
            return { success: false, error: error.message };
        }
    }
}

// Initialize local database and auth service
const localDB = new LocalDatabase();
const localAuth = new LocalAuthService(localDB);

// Export for use in other scripts
window.LocalDatabase = LocalDatabase;
window.LocalAuthService = LocalAuthService;
window.localDB = localDB;
window.localAuth = localAuth;

console.log('✅ Local database and authentication services initialized');
