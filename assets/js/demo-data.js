// Demo Data Service for SmartStudy
// Provides sample data to populate the local database

class DemoDataService {
    constructor(database) {
        this.db = database;
    }

    // Initialize demo data
    async initializeDemoData() {
        try {
            // Check if demo data already exists
            const existingCourses = this.db.getCollection('courses');
            if (existingCourses.length > 0) {
                console.log('Demo data already exists, skipping initialization');
                return;
            }

            console.log('Initializing demo data...');

            // Add sample courses
            await this.addSampleCourses();
            
            // Add sample settings
            await this.addSampleSettings();

            console.log('✅ Demo data initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize demo data:', error);
        }
    }

    // Add sample courses
    async addSampleCourses() {
        const sampleCourses = [
            {
                title: 'Introduction to Computer Science',
                description: 'Learn the fundamentals of computer science and programming',
                category: 'Computer Science',
                level: 'Beginner',
                duration: '8 weeks',
                topics: ['Programming Basics', 'Data Structures', 'Algorithms'],
                instructor: 'Dr. Sarah Johnson',
                rating: 4.8,
                enrolledStudents: 1250,
                image: 'assets/images/course1.jpg'
            },
            {
                title: 'Business Management Fundamentals',
                description: 'Essential principles of business management and leadership',
                category: 'Business Administration',
                level: 'Intermediate',
                duration: '6 weeks',
                topics: ['Leadership', 'Strategic Planning', 'Team Management'],
                instructor: 'Prof. Michael Chen',
                rating: 4.6,
                enrolledStudents: 980,
                image: 'assets/images/course2.jpg'
            },
            {
                title: 'Engineering Mathematics',
                description: 'Advanced mathematical concepts for engineering students',
                category: 'Engineering',
                level: 'Advanced',
                duration: '10 weeks',
                topics: ['Calculus', 'Linear Algebra', 'Differential Equations'],
                instructor: 'Dr. Robert Williams',
                rating: 4.7,
                enrolledStudents: 750,
                image: 'assets/images/course3.jpg'
            },
            {
                title: 'Medical Ethics and Law',
                description: 'Understanding ethical and legal issues in healthcare',
                category: 'Medicine',
                level: 'Intermediate',
                duration: '7 weeks',
                topics: ['Medical Ethics', 'Healthcare Law', 'Patient Rights'],
                instructor: 'Dr. Emily Rodriguez',
                rating: 4.9,
                enrolledStudents: 650,
                image: 'assets/images/course4.jpg'
            },
            {
                title: 'Legal Research Methods',
                description: 'Effective legal research and writing techniques',
                category: 'Law',
                level: 'Beginner',
                duration: '5 weeks',
                topics: ['Legal Research', 'Case Analysis', 'Legal Writing'],
                instructor: 'Prof. David Thompson',
                rating: 4.5,
                enrolledStudents: 420,
                image: 'assets/images/course5.jpg'
            }
        ];

        sampleCourses.forEach(course => {
            this.db.addDocument('courses', course);
        });

        console.log(`Added ${sampleCourses.length} sample courses`);
    }

    // Add sample settings
    async addSampleSettings() {
        const defaultSettings = {
            id: 'default',
            theme: 'light',
            notifications: true,
            emailUpdates: true,
            studyReminders: true,
            language: 'en',
            timezone: 'UTC',
            accessibility: {
                fontSize: 'medium',
                highContrast: false,
                screenReader: false
            }
        };

        // Update existing settings or create new ones
        const existingSettings = this.db.getCollection('settings');
        if (existingSettings.length === 0) {
            this.db.addDocument('settings', defaultSettings);
        } else {
            this.db.updateDocument('settings', existingSettings[0].id, defaultSettings);
        }

        console.log('Sample settings added/updated');
    }

    // Clear all demo data
    clearDemoData() {
        try {
            this.db.clearDatabase();
            console.log('Demo data cleared successfully');
            return { success: true };
        } catch (error) {
            console.error('Failed to clear demo data:', error);
            return { success: false, error: error.message };
        }
    }

    // Export demo data
    exportDemoData() {
        try {
            const collections = ['courses', 'settings'];
            const exportData = {};
            
            collections.forEach(collection => {
                exportData[collection] = this.db.getCollection(collection);
            });
            
            return { success: true, data: exportData };
        } catch (error) {
            console.error('Failed to export demo data:', error);
            return { success: false, error: error.message };
        }
    }
}

// Initialize demo data service when database is ready
if (typeof localDB !== 'undefined') {
    const demoDataService = new DemoDataService(localDB);
    window.demoDataService = demoDataService;
    
    // Initialize demo data after a short delay
    setTimeout(() => {
        demoDataService.initializeDemoData();
    }, 1000);
    
    console.log('✅ Demo data service initialized');
}
