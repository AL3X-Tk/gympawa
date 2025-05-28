
// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Technical details accordion
document.getElementById('tech-details-btn').addEventListener('click', function() {
    const content = document.getElementById('tech-details-content');
    const icon = document.getElementById('tech-details-icon');

    content.classList.toggle('hidden');
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
});

// Energy calculator functionality
document.getElementById('calculate-btn').addEventListener('click', function() {
    // Get input values
    const equipmentType = document.getElementById('equipment-type').value;
    const machineCount = parseInt(document.getElementById('machine-count').value);
    const dailyUsers = parseInt(document.getElementById('daily-users').value);
    const workoutTime = parseInt(document.getElementById('workout-time').value);
    
    // Equipment-specific energy generation factors (in watts)
    const equipmentFactors = {
        'spin': 100,    // Spin bikes generate about 100W per user
        'treadmill': 50,
        'cable': 30,
        'elliptical': 75,
        'stair': 120
    };
    
    // Calculate energy generation
    const wattsPerUser = equipmentFactors[equipmentType] || 50;
    const dailyWatts = wattsPerUser * dailyUsers * (workoutTime/60); // Convert minutes to hours
    const dailyKwh = (dailyWatts / 1000).toFixed(1);
    const monthlyKwh = (dailyKwh * 30).toFixed(0);
    
    // Calculate cost savings (assuming Ksh 20 per kWh)
    const monthlySavings = (monthlyKwh * 20).toFixed(0);
    
    // Calculate CO2 reduction (assuming 0.5kg CO2 per kWh)
    const co2Reduction = (monthlyKwh * 0.5 * 12 / 1000).toFixed(1);
    
    // Update results
    document.getElementById('daily-energy').textContent = dailyKwh + ' kWh';
    document.getElementById('monthly-energy').textContent = monthlyKwh + ' kWh';
    document.getElementById('monthly-savings').textContent = 'Ksh ' + monthlySavings;
    document.getElementById('co2-reduction').textContent = co2Reduction + ' Tons';
    
    // Show results
    document.getElementById('calculator-results').classList.remove('hidden');
});

// Scroll animation for process steps
const processSteps = document.querySelectorAll('.process-step');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

processSteps.forEach(step => {
    observer.observe(step);
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });

        // Close mobile menu if open
        document.getElementById('mobile-menu').classList.add('hidden');
    });
});
