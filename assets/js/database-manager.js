// Simple Database Manager for SmartStudy
class DatabaseManager {
    constructor(database) {
        this.db = database;
        this.init();
    }

    init() {
        this.createSimpleUI();
        this.addEventListeners();
    }

    createSimpleUI() {
        const html = `
            <div id="dbManager" style="display:none; position:fixed; top:20px; right:20px; width:300px; background:white; border:1px solid #ccc; border-radius:8px; z-index:10000; padding:15px;">
                <h3>Database Manager</h3>
                <button id="closeDB">×</button>
                <div>Collections: <span id="colCount">-</span></div>
                <div>Documents: <span id="docCount">-</span></div>
                <button id="exportDB">Export</button>
                <button id="clearDB">Clear All</button>
                <button id="resetDemo">Reset Demo</button>
            </div>
            <button id="showDB" style="position:fixed; bottom:20px; right:20px; width:50px; height:50px; background:#007bff; color:white; border:none; border-radius:50%; z-index:9999;">⚙️</button>
        `;
        
        if (!document.getElementById('dbManager')) {
            document.body.insertAdjacentHTML('beforeend', html);
        }
    }

    addEventListeners() {
        document.getElementById('showDB')?.addEventListener('click', () => this.show());
        document.getElementById('closeDB')?.addEventListener('click', () => this.hide());
        document.getElementById('exportDB')?.addEventListener('click', () => this.export());
        document.getElementById('clearDB')?.addEventListener('click', () => this.clear());
        document.getElementById('resetDemo')?.addEventListener('click', () => this.resetDemo());
    }

    show() {
        document.getElementById('dbManager').style.display = 'block';
        this.updateStatus();
    }

    hide() {
        document.getElementById('dbManager').style.display = 'none';
    }

    updateStatus() {
        const collections = ['users', 'courses', 'enrollments', 'notebooks', 'quizResults', 'courseProgress', 'settings'];
        let totalDocs = 0;
        collections.forEach(col => {
            totalDocs += this.db.getCollection(col).length;
        });
        
        document.getElementById('colCount').textContent = collections.length;
        document.getElementById('docCount').textContent = totalDocs;
    }

    export() {
        const result = this.db.exportDatabase();
        if (result.success) {
            const dataStr = JSON.stringify(result.data, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `smartstudy_db_${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            alert('Database exported!');
        }
    }

    clear() {
        if (confirm('Clear all data?')) {
            this.db.clearDatabase();
            this.updateStatus();
            alert('Database cleared!');
        }
    }

    resetDemo() {
        if (confirm('Reset demo data?')) {
            this.db.clearDatabase();
            if (window.demoDataService) {
                window.demoDataService.initializeDemoData();
            }
            this.updateStatus();
            alert('Demo data reset!');
        }
    }
}

// Initialize when ready
if (typeof localDB !== 'undefined') {
    const dbManager = new DatabaseManager(localDB);
    window.dbManager = dbManager;
    console.log('✅ Database manager ready');
}
