export class OSLoader {
    constructor() {
        this.currentOS = '';
        this.osContent = document.getElementById('os-content');
        this.jsonContent = document.getElementById('json-content');
        this.companyInfo = document.getElementById('company-info');
        this.loadJsonBtn = document.getElementById('load-json-btn');
        this.loadCompanyBtn = document.getElementById('load-company-btn');
        
        this.hideAdditionalBlocks();
    }

    init() {
        this.setupEventListeners();
        this.disableButtons();
    }

    hideAdditionalBlocks() {
        this.jsonContent.style.display = 'none';
        this.companyInfo.style.display = 'none';
        this.jsonContent.innerHTML = '';
        this.companyInfo.innerHTML = '';
    }

    setupEventListeners() {
        document.querySelectorAll('.buttons-container button').forEach(button => {
            button.addEventListener('click', () => this.loadOS(button.dataset.os));
        });

        this.loadJsonBtn.addEventListener('click', () => {
            this.jsonContent.style.display = 'block';
            this.loadJSON();
        });

        this.loadCompanyBtn.addEventListener('click', () => {
            this.companyInfo.style.display = 'block';
            this.loadCompanyInfo();
        });
    }

    disableButtons() {
        this.loadJsonBtn.disabled = true;
        this.loadCompanyBtn.disabled = true;
    }

    enableButtons() {
        this.loadJsonBtn.disabled = false;
        this.loadCompanyBtn.disabled = false;
    }

    async loadOS(osName) {
        try {
            const response = await fetch(`/os/${osName}.html`);
            if (!response.ok) throw new Error('Network response was not ok');
            
            const html = await response.text();
            this.osContent.innerHTML = html;
            this.currentOS = osName;
            this.enableButtons();
            this.hideAdditionalBlocks();
        } catch (err) {
            console.error('Error loading OS:', err);
            this.osContent.innerHTML = '<p>Error loading OS information</p>';
            this.hideAdditionalBlocks();
        }
    }

    async loadJSON() {
        if (!this.currentOS) return;
        
        try {
            const response = await fetch(`/resources/${this.currentOS}.json`);
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            this.displayJSONData(data);
        } catch (err) {
            console.error('Error loading JSON:', err);
            this.jsonContent.innerHTML = '<p>Error loading additional information</p>';
        }
    }

    displayJSONData(data) {
        let html = '<h3>Additional Information:</h3>';
        for (const [key, value] of Object.entries(data)) {
            html += `<p><strong>${key}:</strong> ${Array.isArray(value) ? value.join(', ') : value}</p>`;
        }
        this.jsonContent.innerHTML = html;
    }

    async loadCompanyInfo() {
        try {
            const response = await fetch('/company_info');
            if (!response.ok) throw new Error('Network response was not ok');
            
            const text = await response.text();
            this.companyInfo.innerHTML = `<h3>Company Information:</h3><p>${text}</p>`;
        } catch (err) {
            console.error('Error loading company info:', err);
            this.companyInfo.innerHTML = '<p>Error loading company information</p>';
        }
    }
}