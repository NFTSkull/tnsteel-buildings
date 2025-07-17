// Simple RTO Calculator - Standalone Version
console.log('Loading simple RTO calculator...');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready, initializing RTO calculator...');
    
    // Building data
    const buildingData = {
        carport: [
            { size: '12x20', display: '12\' x 20\' - Single Car', price: 1495 },
            { size: '18x20', display: '18\' x 20\' - 1.5 Car', price: 1795 },
            { size: '20x20', display: '20\' x 20\' - Double Car', price: 1995 },
            { size: '24x24', display: '24\' x 24\' - Large Double', price: 2495 },
            { size: '30x20', display: '30\' x 20\' - Triple Car', price: 2995 },
            { size: '36x20', display: '36\' x 20\' - RV/Boat', price: 3495 },
            { size: '40x20', display: '40\' x 20\' - Commercial', price: 3995 }
        ],
        garage: [
            { size: '12x20', display: '12\' x 20\' - Single Car', price: 2995 },
            { size: '18x20', display: '18\' x 20\' - 1.5 Car', price: 3795 },
            { size: '20x20', display: '20\' x 20\' - Double Car', price: 4295 },
            { size: '24x24', display: '24\' x 24\' - Large Double', price: 5495 },
            { size: '30x20', display: '30\' x 20\' - Triple Car', price: 6495 },
            { size: '36x20', display: '36\' x 20\' - Workshop', price: 7995 },
            { size: '40x20', display: '40\' x 20\' - Commercial', price: 8995 }
        ],
        barn: [
            { size: '30x40', display: '30\' x 40\' - Small Barn', price: 7995 },
            { size: '36x40', display: '36\' x 40\' - Medium Barn', price: 9495 },
            { size: '40x60', display: '40\' x 60\' - Large Barn', price: 14995 },
            { size: '50x60', display: '50\' x 60\' - XL Barn', price: 18995 },
            { size: '60x80', display: '60\' x 80\' - Horse Barn', price: 28995 },
            { size: '60x100', display: '60\' x 100\' - Agricultural', price: 35995 },
            { size: '80x100', display: '80\' x 100\' - Commercial', price: 47995 }
        ],
        commercial: [
            { size: '40x60', display: '40\' x 60\' - Small Commercial', price: 19995 },
            { size: '50x80', display: '50\' x 80\' - Medium Commercial', price: 29995 },
            { size: '60x100', display: '60\' x 100\' - Large Commercial', price: 44995 },
            { size: '80x100', display: '80\' x 100\' - Warehouse', price: 59995 },
            { size: '100x120', display: '100\' x 120\' - Industrial', price: 89995 },
            { size: '120x150', display: '120\' x 150\' - Distribution', price: 134995 }
        ]
    };
    
    // Get elements
    const buildingTypeSelect = document.getElementById('building-type');
    const buildingSizeSelect = document.getElementById('building-size');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultsDiv = document.getElementById('calculator-results');
    
    console.log('Elements found:', {
        buildingType: !!buildingTypeSelect,
        buildingSize: !!buildingSizeSelect,
        calculateBtn: !!calculateBtn,
        resultsDiv: !!resultsDiv
    });
    
    if (!buildingTypeSelect || !buildingSizeSelect || !calculateBtn || !resultsDiv) {
        console.error('Some elements are missing!');
        return;
    }
    
    // Building type change handler
    function handleBuildingTypeChange() {
        const selectedType = buildingTypeSelect.value;
        console.log('Building type changed to:', selectedType);
        
        // Clear building size options
        buildingSizeSelect.innerHTML = '<option value="">Choose Size</option>';
        
        if (selectedType && buildingData[selectedType]) {
            // Enable building size dropdown
            buildingSizeSelect.disabled = false;
            buildingSizeSelect.style.opacity = '1';
            buildingSizeSelect.style.cursor = 'pointer';
            
            // Add size options
            buildingData[selectedType].forEach(item => {
                const option = document.createElement('option');
                option.value = item.size;
                option.textContent = item.display;
                option.dataset.price = item.price;
                buildingSizeSelect.appendChild(option);
            });
            
            console.log('Added', buildingData[selectedType].length, 'size options');
        } else {
            // Disable building size dropdown
            buildingSizeSelect.disabled = true;
            buildingSizeSelect.style.opacity = '0.6';
            buildingSizeSelect.style.cursor = 'not-allowed';
            buildingSizeSelect.innerHTML = '<option value="">Select building type first</option>';
        }
        
        // Hide results
        resultsDiv.classList.remove('show');
    }
    
    // Calculate button handler
    function handleCalculateClick() {
        console.log('Calculate button clicked!');
        
        const buildingType = buildingTypeSelect.value;
        const buildingSize = buildingSizeSelect.value;
        const roofStyle = document.getElementById('roof-style').value;
        const termLength = parseInt(document.getElementById('term-length').value);
        const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;
        
        console.log('Form values:', {
            buildingType,
            buildingSize,
            roofStyle,
            termLength,
            downPayment
        });
        
        // Validation
        if (!buildingType) {
            alert('Please select a building type');
            return;
        }
        
        if (!buildingSize) {
            alert('Please select a building size');
            return;
        }
        
        // Get base price
        const selectedOption = buildingSizeSelect.querySelector(`option[value="${buildingSize}"]`);
        if (!selectedOption) {
            alert('Invalid building size selected');
            return;
        }
        
        const basePrice = parseFloat(selectedOption.dataset.price);
        console.log('Base price found:', basePrice);
        
        if (!basePrice || basePrice === 0) {
            alert('Please contact us for custom pricing on this size');
            return;
        }
        
        // Calculate costs
        const deliveryCost = Math.round(basePrice * 0.2 + 500); // 20% + $500 base
        const roofCost = roofStyle === 'vertical' ? 300 : 0;
        const totalCost = basePrice + deliveryCost + roofCost;
        const totalFinanced = Math.max(0, totalCost - downPayment);
        
        // Calculate monthly payment with RTO markup
        const rtoMultiplier = {
            12: 1.35,
            24: 1.55,
            36: 1.75,
            48: 1.95,
            60: 2.15
        };
        
        const totalRTOCost = totalFinanced * (rtoMultiplier[termLength] || 1.75);
        const monthlyPayment = totalRTOCost / termLength;
        
        console.log('Calculated values:', {
            basePrice,
            deliveryCost,
            roofCost,
            totalCost,
            totalFinanced,
            monthlyPayment,
            totalRTOCost
        });
        
        // Update results display
        try {
            document.getElementById('base-cost').textContent = `$${basePrice.toLocaleString()}`;
            document.getElementById('delivery-cost').textContent = `$${deliveryCost.toLocaleString()}`;
            document.getElementById('roof-cost').textContent = `$${roofCost.toLocaleString()}`;
            document.getElementById('down-payment-display').textContent = `$${downPayment.toLocaleString()}`;
            document.getElementById('total-financed').textContent = `$${Math.round(totalFinanced).toLocaleString()}`;
            document.getElementById('monthly-payment').textContent = `$${Math.round(monthlyPayment).toLocaleString()}`;
            document.getElementById('total-payments').textContent = `$${Math.round(totalRTOCost).toLocaleString()}`;
            
            // Show results
            resultsDiv.classList.add('show');
            
            // Scroll to results
            setTimeout(() => {
                resultsDiv.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
            
            console.log('Results displayed successfully!');
        } catch (error) {
            console.error('Error updating results:', error);
        }
    }
    
    // Attach event handlers
    buildingTypeSelect.addEventListener('change', handleBuildingTypeChange);
    calculateBtn.addEventListener('click', handleCalculateClick);
    
    console.log('RTO Calculator initialized successfully!');
    
    // Global test function
    window.testRTOCalculator = function() {
        console.log('=== TESTING RTO CALCULATOR ===');
        console.log('Building type element:', buildingTypeSelect);
        console.log('Building size element:', buildingSizeSelect);
        console.log('Calculate button:', calculateBtn);
        console.log('Results div:', resultsDiv);
        
        // Test building type change
        buildingTypeSelect.value = 'garage';
        handleBuildingTypeChange();
        
        // Test building size selection
        setTimeout(() => {
            buildingSizeSelect.value = '20x20';
            handleCalculateClick();
        }, 1000);
    };
}); 