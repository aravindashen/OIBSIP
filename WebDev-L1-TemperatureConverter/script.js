document.addEventListener('DOMContentLoaded', () => {
    const tempInput = document.getElementById('tempInput');
    const unitInput = document.getElementById('unitInput');
    const convertBtn = document.getElementById('convertBtn');
    const errorMessage = document.getElementById('errorMessage');
    const resultSection = document.getElementById('resultSection');
    const resultsGrid = document.getElementById('resultsGrid');

    const ABSOLUTE_ZERO = {
        celsius: -273.15,
        fahrenheit: -459.67,
        kelvin: 0
    };

    const clearError = () => {
        errorMessage.textContent = '';
        errorMessage.classList.add('hidden');
    };

    const showError = (message) => {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        resultSection.classList.add('hidden');
    };

    const getUnitSymbol = (unit) => {
        if (unit === 'celsius') return '°C';
        if (unit === 'fahrenheit') return '°F';
        if (unit === 'kelvin') return 'K';
    };

    const processConversion = () => {
        clearError();
        
        // Don't calculate if input is empty
        if(tempInput.value === '') {
            resultSection.classList.add('hidden');
            return;
        }

        const inputValue = parseFloat(tempInput.value);
        const fromUnit = unitInput.value;

        if (isNaN(inputValue)) {
            showError("Please enter a valid numeric value.");
            return;
        }

        if (inputValue < ABSOLUTE_ZERO[fromUnit]) {
            showError(`Below absolute zero (${ABSOLUTE_ZERO[fromUnit]} ${getUnitSymbol(fromUnit)}).`);
            return;
        }

        calculateAndDisplay(inputValue, fromUnit);
    };

    function calculateAndDisplay(value, unit) {
        let celsius, fahrenheit, kelvin;

        if (unit === 'celsius') {
            fahrenheit = (value * 9/5) + 32;
            kelvin = value + 273.15;
        } else if (unit === 'fahrenheit') {
            celsius = (value - 32) * 5/9;
            kelvin = (value - 32) * 5/9 + 273.15;
        } else if (unit === 'kelvin') {
            celsius = value - 273.15;
            fahrenheit = (value - 273.15) * 9/5 + 32;
        }

        resultsGrid.innerHTML = '';
        
        const conversions = [
            { name: 'Celsius', val: celsius, symbol: '°C', key: 'celsius' },
            { name: 'Fahrenheit', val: fahrenheit, symbol: '°F', key: 'fahrenheit' },
            { name: 'Kelvin', val: kelvin, symbol: 'K', key: 'kelvin' }
        ];

        conversions.forEach(conv => {
            if (conv.key !== unit && conv.val !== undefined) {
                const card = document.createElement('div');
                card.className = 'result-card';
                card.innerHTML = `
                    <span class="unit-name">${conv.name}</span>
                    <span class="unit-value">${conv.val.toFixed(2)} ${conv.symbol}</span>
                `;
                resultsGrid.appendChild(card);
            }
        });

        resultSection.classList.remove('hidden');
    }

    // Event Listeners for real-time conversion and button click
    tempInput.addEventListener('input', processConversion);
    unitInput.addEventListener('change', processConversion);
    convertBtn.addEventListener('click', processConversion);
});