class AdvancedPasswordGenerator {
    constructor() {
        this.characters = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
            similar: '0oOlI1'
        };

        this.settings = {
            length: 12,
            uppercase: true,
            lowercase: true,
            numbers: true,
            symbols: false,
            excludeSimilar: false,
            autoCopy: false,
            autoReveal: true,
            historyLimit: 10
        };

        this.history = [];
        this.isGenerating = false;

        // DOM elements
        this.elements = {
            // Panels
            generatePanel: document.getElementById('generate-panel'),
            historyPanel: document.getElementById('history-panel'),
            settingsPanel: document.getElementById('settings-panel'),
            
            // Navigation
            navContainer: document.getElementById('nav-container'),
            
            // Generate Panel Elements
            lengthSlider: document.getElementById('lengthSlider'),
            lengthValue: document.getElementById('lengthValue'),
            generateBtn: document.getElementById('generateBtn'),
            generateBtnContent: document.getElementById('generateBtnContent'),
            loadingSpinner: document.getElementById('loadingSpinner'),
            passwordInput: document.getElementById('passwordInput'),
            toggleVisibility: document.getElementById('toggleVisibility'),
            eyeIcon: document.getElementById('eyeIcon'),
            strengthBar: document.getElementById('strengthBar'),
            strengthText: document.getElementById('strengthText'),
            copyBtn: document.getElementById('copyBtn'),

            // Settings Panel Elements
            uppercase: document.getElementById('uppercase'),
            lowercase: document.getElementById('lowercase'),
            numbers: document.getElementById('numbers'),
            symbols: document.getElementById('symbols'),
            excludeSimilar: document.getElementById('excludeSimilar'),
            autoCopy: document.getElementById('autoCopy'),
            autoReveal: document.getElementById('autoReveal'),
            historyLimit: document.getElementById('historyLimit'),
            historyLimitValue: document.getElementById('historyLimitValue'),

            // History Panel Elements
            historyCount: document.getElementById('historyCount'),
            clearHistoryBtn: document.getElementById('clearHistoryBtn'),
            historyList: document.getElementById('historyList'),
            
            // Misc
            toast: document.getElementById('toast')
        };

        this.init();
    }

    init() {
        // Event listeners
        this.elements.navContainer.addEventListener('click', (e) => this.handleTabSwitch(e));
        this.elements.lengthSlider.addEventListener('input', () => this.updateLength());
        this.elements.generateBtn.addEventListener('click', () => this.generatePassword());
        this.elements.toggleVisibility.addEventListener('click', () => this.togglePasswordVisibility());
        this.elements.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.elements.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
        this.elements.autoCopy.addEventListener('change', () => this.updateSettings());
        this.elements.autoReveal.addEventListener('change', () => this.updateSettings());
        this.elements.historyLimit.addEventListener('input', () => this.updateHistoryLimit());
        
        // Character options
        ['uppercase', 'lowercase', 'numbers', 'symbols', 'excludeSimilar'].forEach(option => {
            this.elements[option].addEventListener('change', () => this.updateSettings());
        });

        this.loadSettings();
        this.switchTab('generate'); // Set initial tab
    }
    
    handleTabSwitch(e) {
        const tabButton = e.target.closest('.nav-tab');
        if (tabButton && tabButton.dataset.tab) {
            this.switchTab(tabButton.dataset.tab);
        }
    }

    switchTab(tabId) {
        // Hide all panels
        this.elements.generatePanel.classList.add('hidden');
        this.elements.historyPanel.classList.add('hidden');
        this.elements.settingsPanel.classList.add('hidden');

        // Deactivate all nav buttons
        this.elements.navContainer.querySelectorAll('.nav-tab').forEach(btn => btn.classList.remove('active'));

        // Activate the selected tab and panel
        const activePanel = document.getElementById(`${tabId}-panel`);
        const activeBtn = this.elements.navContainer.querySelector(`[data-tab="${tabId}"]`);
        
        if (activePanel) activePanel.classList.remove('hidden');
        if (activeBtn) activeBtn.classList.add('active');
    }

    updateLength() {
        this.settings.length = parseInt(this.elements.lengthSlider.value);
        this.elements.lengthValue.textContent = this.settings.length;
        this.saveSettings();
    }

    updateSettings() {
        this.settings.uppercase = this.elements.uppercase.checked;
        this.settings.lowercase = this.elements.lowercase.checked;
        this.settings.numbers = this.elements.numbers.checked;
        this.settings.symbols = this.elements.symbols.checked;
        this.settings.excludeSimilar = this.elements.excludeSimilar.checked;
        this.settings.autoCopy = this.elements.autoCopy.checked;
        this.settings.autoReveal = this.elements.autoReveal.checked;
        
        // Ensure at least one character type is selected
        if (!this.settings.uppercase && !this.settings.lowercase && 
            !this.settings.numbers && !this.settings.symbols) {
            this.elements.lowercase.checked = true;
            this.settings.lowercase = true;
            this.showToast('At least one character type must be selected!', true);
        }
        
        this.saveSettings();
    }

    updateHistoryLimit() {
        this.settings.historyLimit = parseInt(this.elements.historyLimit.value);
        this.elements.historyLimitValue.textContent = this.settings.historyLimit;
        this.trimHistory();
        this.saveSettings();
    }

    saveSettings() {
        localStorage.setItem('passwordGeneratorSettings', JSON.stringify(this.settings));
    }

    loadSettings() {
        const savedSettings = localStorage.getItem('passwordGeneratorSettings');
        if (savedSettings) {
            this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
            this.elements.lengthSlider.value = this.settings.length;
            this.elements.lengthValue.textContent = this.settings.length;
            this.elements.uppercase.checked = this.settings.uppercase;
            this.elements.lowercase.checked = this.settings.lowercase;
            this.elements.numbers.checked = this.settings.numbers;
            this.elements.symbols.checked = this.settings.symbols;
            this.elements.excludeSimilar.checked = this.settings.excludeSimilar;
            this.elements.autoCopy.checked = this.settings.autoCopy;
            this.elements.autoReveal.checked = this.settings.autoReveal;
            this.elements.historyLimit.value = this.settings.historyLimit;
            this.elements.historyLimitValue.textContent = this.settings.historyLimit;
        }
        
        const savedHistory = localStorage.getItem('passwordHistory');
        if (savedHistory) {
            this.history = JSON.parse(savedHistory);
            this.updateHistoryDisplay();
        }
    }

    generatePassword() {
        if (this.isGenerating) return;
        this.isGenerating = true;

        this.elements.generateBtnContent.classList.add('hidden');
        this.elements.loadingSpinner.classList.remove('hidden');

        setTimeout(() => {
            let chars = '';
            if (this.settings.uppercase) chars += this.characters.uppercase;
            if (this.settings.lowercase) chars += this.characters.lowercase;
            if (this.settings.numbers) chars += this.characters.numbers;
            if (this.settings.symbols) chars += this.characters.symbols;

            if (this.settings.excludeSimilar) {
                chars = chars.split('').filter(char => !this.characters.similar.includes(char)).join('');
            }

            if (!chars) {
                this.showToast('Please select at least one character type!', true);
                this.resetGenerateButton();
                return;
            }

            let password = '';
            for (let i = 0; i < this.settings.length; i++) {
                const randomIndex = Math.floor(Math.random() * chars.length);
                password += chars[randomIndex];
            }

            this.displayPassword(password);
            this.updateStrength(password);
            this.addToHistory(password);
            if (this.settings.autoCopy) this.copyToClipboard();
            if (this.settings.autoReveal) {
                this.elements.passwordInput.type = 'text';
                this.updateEyeIcon();
                setTimeout(() => {
                    if (this.elements.passwordInput.type === 'text') {
                       this.elements.passwordInput.type = 'password';
                       this.updateEyeIcon();
                    }
                }, 2000);
            }

            this.resetGenerateButton();
        }, 300);
    }

    resetGenerateButton() {
        this.elements.generateBtnContent.classList.remove('hidden');
        this.elements.loadingSpinner.classList.add('hidden');
        this.isGenerating = false;
    }

    displayPassword(password) {
        this.elements.passwordInput.value = password;
        this.elements.copyBtn.disabled = false;
    }

    updateStrength(password) {
        let score = 0;
        if (!password) {
            this.elements.strengthText.textContent = 'Generate a password';
            this.elements.strengthBar.className = `h-3 rounded-full transition-all duration-500 w-0`;
            this.elements.strengthBar.style.width = '0%';
            return;
        }
        
        // Length score
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        if (password.length >= 16) score += 1;
        
        // Character type score
        if (/[A-Z]/.test(password)) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) score += 1;
        
        const totalPossibleScore = 7;
        const percentage = (score / totalPossibleScore) * 100;
        
        let strength;
        if (percentage < 30) strength = { text: 'Very Weak', class: 'strength-very-weak' };
        else if (percentage < 50) strength = { text: 'Weak', class: 'strength-weak' };
        else if (percentage < 70) strength = { text: 'Fair', class: 'strength-fair' };
        else if (percentage < 90) strength = { text: 'Good', class: 'strength-good' };
        else strength = { text: 'Strong', class: 'strength-strong' };

        this.elements.strengthText.textContent = strength.text;
        this.elements.strengthBar.className = `h-3 rounded-full transition-all duration-500 ${strength.class}`;
        this.elements.strengthBar.style.width = `${Math.max(10, percentage)}%`;
    }

    togglePasswordVisibility() {
        const isPassword = this.elements.passwordInput.type === 'password';
        this.elements.passwordInput.type = isPassword ? 'text' : 'password';
        this.updateEyeIcon();
    }

    updateEyeIcon() {
        const isPassword = this.elements.passwordInput.type === 'password';
        this.elements.eyeIcon.innerHTML = isPassword ?
            `<path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>` :
            `<path d="M128,160a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm0-48a16,16,0,1,0,16,16A16,16,0,0,0,128,112Zm126.16,3.44-32.47-32.47a7.92,7.92,0,0,0-11.31,0L194,99.31a144.43,144.43,0,0,0-23.94-15.2,143.53,143.53,0,0,0-84.12,0A144.43,144.43,0,0,0,62,99.31L45.62,82.93a7.92,7.92,0,0,0-11.31,0L2.84,114.4a8,8,0,0,0,0,11.31L35.31,158.2a8,8,0,0,0,11.32,0L63,141.86a133.23,133.23,0,0,0,24.18,15.48C93.12,160.74,110.16,164,128,164s34.88-3.26,50.82-9.66a133.23,133.23,0,0,0,24.18-15.48L219.34,158.2a7.92,7.92,0,0,0,11.31,0l31.47-31.47A8,8,0,0,0,254.16,115.44ZM48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128c-4.43,8.3-10.13,16.14-16.89,23.31L197.3,134.4a48.08,48.08,0,0,0-69.3-69.3L111.14,48.24C116.65,47.41,122.28,47,128,47c30.78,0,57.67,11.19,79.93,33.25A133.47,133.47,0,0,1,231,128C223.84,141.46,192.43,192,128,192a140.1,140.1,0,0,1-30.73-3.66L80.5,205.11C85.3,206.51,90.34,207,95.5,207,93.12,208,61.43,194.74,36.34,169.65,17.51,150.82,9,132,8.69,131.24a8,8,0,0,0,0-6.5C9,124,17.51,105.18,36.34,86.35L25,97.71A133.33,133.33,0,0,1,48.07,97.25Z"></path>`;
    }

    copyToClipboard() {
        if (!this.elements.passwordInput.value) return;
        
        navigator.clipboard.writeText(this.elements.passwordInput.value)
            .then(() => this.showToast('Password copied to clipboard!'))
            .catch(() => this.showToast('Failed to copy password!', true));
    }

    showToast(message, isError = false) {
        this.elements.toast.textContent = message;
        this.elements.toast.classList.toggle('error', isError);
        this.elements.toast.classList.add('show');
        setTimeout(() => {
            this.elements.toast.classList.remove('show');
        }, 3000);
    }

    addToHistory(password) {
        this.history.unshift({
            password,
            timestamp: new Date().toLocaleString()
        });
        this.trimHistory();
        this.updateHistoryDisplay();
        localStorage.setItem('passwordHistory', JSON.stringify(this.history));
    }

    trimHistory() {
        if (this.history.length > this.settings.historyLimit) {
            this.history = this.history.slice(0, this.settings.historyLimit);
        }
    }

    updateHistoryDisplay() {
        this.elements.historyCount.textContent = this.history.length;
        if (this.history.length === 0) {
            this.elements.historyList.innerHTML = '<p class="text-[#60758a] text-sm text-center py-8">No passwords generated yet</p>';
            return;
        }

        this.elements.historyList.innerHTML = this.history.map((item, index) => `
            <div class="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-lg">
                <span class="text-[#111418] font-mono text-sm truncate mr-2">${item.password}</span>
                <div class="flex items-center space-x-2 flex-shrink-0">
                    <span class="text-[#60758a] text-xs hidden sm:inline">${item.timestamp}</span>
                    <button class="copy-history-btn text-[#0d80f2] hover:bg-[#e6f0fa] p-1 rounded-full transition-colors" data-index="${index}" title="Copy password">
                        <svg class="pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM15 5L20 10V21C20 22.1 19.1 23 18 23H8C6.9 23 6 22.1 6 21V7C6 5.9 6.9 5 8 5H15ZM15 6H8V21H18V10H15V6Z" fill="currentColor"/>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');

        // Add event listeners for copy buttons
        this.elements.historyList.querySelectorAll('.copy-history-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = btn.dataset.index;
                navigator.clipboard.writeText(this.history[index].password)
                    .then(() => this.showToast('Password copied to clipboard!'))
                    .catch(() => this.showToast('Failed to copy password!', true));
            });
        });
    }

    clearHistory() {
        this.history = [];
        localStorage.removeItem('passwordHistory');
        this.updateHistoryDisplay();
        this.showToast('History cleared!');
    }
}

// Initialize the app once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedPasswordGenerator();
});
