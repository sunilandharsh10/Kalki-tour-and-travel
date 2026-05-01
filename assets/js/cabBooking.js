document.addEventListener('DOMContentLoaded', function() {
    // City-specific vehicle data
    const cityData = {
      varanasi: {
        sedan: [
          { id: "swift_varanasi", name: "Swift Desire", capacity: "4 Seats", airport: 1200, hr8: 2000, hr12: 2500, outstation: 12 },
          { id: "ertiga_varanasi", name: "Ertiga", capacity: "5-6 Seats", airport: 1400, hr8: 2500, hr12: 3000, outstation: 14 }
        ],
        suv: [
          { id: "innova_varanasi", name: "Toyota Innova", capacity: "7 Seats", airport: 1800, hr8: 2800, hr12: 3400, outstation: 16 },
          { id: "crysta_varanasi", name: "Toyota Crysta", capacity: "7 Seats", airport: 1800, hr8: 3000, hr12: 4000, outstation: 19 }
        ],
        tempo: [
          { id: "tempo_varanasi", name: "Tempo Traveller", capacity: "10-17 Seats", airport: 3000, hr8: 6000, hr12: 7000, outstation: 27 }
        ]
      },
      prayag: {
        sedan: [
          { id: "swift_prayag", name: "Swift Desire", capacity: "4 Seats", airport: 1000, hr8: 2000, hr12: 2500, outstation: 12 },
          { id: "ertiga_prayag", name: "Ertiga", capacity: "5-6 Seats", airport: 1200, hr8: 2500, hr12: 3000, outstation: 14 }
        ],
        suv: [
          { id: "innova_prayag", name: "Toyota Innova", capacity: "7 Seats", airport: 1500, hr8: 2800, hr12: 3400, outstation: 17 },
          { id: "crysta_prayag", name: "Toyota Crysta", capacity: "7 Seats", airport: 1700, hr8: 3000, hr12: 4000, outstation: 19 }
        ],
        tempo: [
          { id: "tempo_prayag", name: "Tempo Traveller", capacity: "10-17 Seats", airport: 3000, hr8: 5500, hr12: 7000, outstation: 27 }
        ]
      },
      ayodhya: {
        sedan: [
          { id: "swift_ayodhya", name: "Swift Desire", capacity: "4 Seats", airport: 1100, hr8: 1900, hr12: 2400, outstation: 12 },
          { id: "ertiga_ayodhya", name: "Ertiga", capacity: "5-6 Seats", airport: 1300, hr8: 2400, hr12: 2900, outstation: 14 }
        ],
        suv: [
          { id: "innova_ayodhya", name: "Toyota Innova", capacity: "7 Seats", airport: 1700, hr8: 2700, hr12: 3300, outstation: 16 },
          { id: "crysta_ayodhya", name: "Toyota Crysta", capacity: "7 Seats", airport: 1800, hr8: 2900, hr12: 3900, outstation: 19 }
        ],
        tempo: [
          { id: "tempo_ayodhya", name: "Tempo Traveller", capacity: "10-17 Seats", airport: 3000, hr8: 5800, hr12: 6800, outstation: 27 }
        ]
      }
    };

    let currentCity = 'varanasi';
    let selectedCategory = 'sedan';
    let selectedVehicleData = null;

    // Get DOM elements
    const vehiclesGrid = document.getElementById('vehiclesGrid');
    const selectedDisplay = document.getElementById('selectedVehicleDisplay');
    const estimatedFareSpan = document.getElementById('estimatedFareDisplay');
    const tourTypeSelect = document.getElementById('tourType');

    // Check if elements exist before proceeding
    if (!vehiclesGrid) {
      console.error('vehiclesGrid element not found');
      return;
    }

    // City buttons
    const cityBtns = document.querySelectorAll('.city-btn');
    cityBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        cityBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentCity = this.getAttribute('data-city');
        selectedVehicleData = null;
        updateSelectedDisplay();
        renderVehicles();
      });
    });

    // Tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        tabBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        selectedCategory = this.getAttribute('data-category');
        selectedVehicleData = null;
        updateSelectedDisplay();
        renderVehicles();
      });
    });

    // Tour type change
    if (tourTypeSelect) {
      tourTypeSelect.addEventListener('change', function() {
        updateFareDisplay();
        updateSelectedDisplay();
      });
    }

    function getPriceForTourType(vehicle) {
      const tourType = tourTypeSelect ? tourTypeSelect.value : 'Airport Transfer';
      switch(tourType) {
        case 'Airport Transfer': return vehicle.airport;
        case '8 Hours / 80km': return vehicle.hr8;
        case '12 Hours / 120km': return vehicle.hr12;
        case 'Outstation': return `₹${vehicle.outstation}/km`;
        default: return vehicle.airport;
      }
    }

    function getRawPrice(vehicle) {
      const tourType = tourTypeSelect ? tourTypeSelect.value : 'Airport Transfer';
      switch(tourType) {
        case 'Airport Transfer': return vehicle.airport;
        case '8 Hours / 80km': return vehicle.hr8;
        case '12 Hours / 120km': return vehicle.hr12;
        case 'Outstation': return vehicle.outstation;
        default: return vehicle.airport;
      }
    }

    function updateFareDisplay() {
      if (selectedVehicleData && estimatedFareSpan) {
        const price = getPriceForTourType(selectedVehicleData);
        const isOutstation = tourTypeSelect && tourTypeSelect.value === 'Outstation';
        if (isOutstation) {
          estimatedFareSpan.innerHTML = price;
        } else {
          estimatedFareSpan.innerHTML = `₹${price}`;
        }
      } else if (estimatedFareSpan) {
        estimatedFareSpan.innerHTML = '—';
      }
    }

    function updateSelectedDisplay() {
      if (selectedVehicleData && selectedDisplay) {
        const price = getPriceForTourType(selectedVehicleData);
        selectedDisplay.innerHTML = `<i class="fas fa-car"></i> Selected: ${selectedVehicleData.name} (${selectedVehicleData.capacity}) — ${price}`;
      } else if (selectedDisplay) {
        selectedDisplay.innerHTML = `<i class="fas fa-car"></i> No vehicle selected`;
      }
      updateFareDisplay();
    }

    function selectVehicle(vehicle) {
      selectedVehicleData = vehicle;
      updateSelectedDisplay();
      renderVehicles(); // Re-render to show selected state
    }

    function renderVehicles() {
      const vehicles = cityData[currentCity][selectedCategory];
      if (!vehicles || vehicles.length === 0) {
        vehiclesGrid.innerHTML = '<div style="text-align:center;padding:2rem;">No vehicles available in this category</div>';
        return;
      }

      let html = '';
      vehicles.forEach(vehicle => {
        const isSelected = selectedVehicleData && selectedVehicleData.id === vehicle.id;
        const cardClass = isSelected ? 'vehicle-card selected' : 'vehicle-card';
        
        html += `
          <div class="${cardClass}" data-id="${vehicle.id}">
            <div class="vehicle-icon">
              <i class="fas ${selectedCategory === 'sedan' ? 'fa-car-side' : (selectedCategory === 'suv' ? 'fa-car' : 'fa-truck')}"></i>
            </div>
            <h3>${vehicle.name}</h3>
            <div class="vehicle-capacity"><i class="fas fa-users"></i> ${vehicle.capacity}</div>
            <div class="vehicle-prices">
              <div class="price-item"><span class="price-label">Airport Transfer:</span><span class="price-value">₹${vehicle.airport}</span></div>
              <div class="price-item"><span class="price-label">8H/80km:</span><span class="price-value">₹${vehicle.hr8}</span></div>
              <div class="price-item"><span class="price-label">12H/120km:</span><span class="price-value">₹${vehicle.hr12}</span></div>
              <div class="price-item"><span class="price-label">Outstation:</span><span class="price-value">₹${vehicle.outstation}/km</span></div>
            </div>
            <button class="select-btn" data-id="${vehicle.id}">${isSelected ? '✓ Selected' : 'Select Vehicle'}</button>
          </div>
        `;
      });
      
      vehiclesGrid.innerHTML = html;
      
      // Attach click events to select buttons
      const selectBtns = document.querySelectorAll('.select-btn');
      selectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const vehicleId = btn.getAttribute('data-id');
          const vehicle = vehicles.find(v => v.id === vehicleId);
          if (vehicle) selectVehicle(vehicle);
        });
      });
      
      // Attach click events to vehicle cards
      const vehicleCards = document.querySelectorAll('.vehicle-card');
      vehicleCards.forEach(card => {
        card.addEventListener('click', (e) => {
          if (e.target.classList && e.target.classList.contains('select-btn')) return;
          const vehicleId = card.getAttribute('data-id');
          const vehicle = vehicles.find(v => v.id === vehicleId);
          if (vehicle) selectVehicle(vehicle);
        });
      });
    }

    // Set min date for date picker
    const dateInput = document.getElementById('journeyDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }

    // Form submission
    const form = document.getElementById('bookingFormElement');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName')?.value.trim();
        const phone = document.getElementById('phone')?.value.trim();
        const pickup = document.getElementById('pickup')?.value.trim();
        const drop = document.getElementById('drop')?.value.trim();
        const journeyDate = document.getElementById('journeyDate')?.value;
        const passengers = document.getElementById('passengers')?.value;
        
        if (!fullName) { alert('Please enter full name'); return; }
        if (!phone) { alert('Please enter phone number'); return; }
        if (!pickup) { alert('Please enter pickup location'); return; }
        if (!drop) { alert('Please enter drop location'); return; }
        if (!journeyDate) { alert('Please select journey date'); return; }
        if (!passengers) { alert('Please select number of passengers'); return; }
        if (!selectedVehicleData) { alert('Please select a vehicle'); return; }
        
        const cityNames = { prayag: 'Prayagraj', varanasi: 'Varanasi', ayodhya: 'Ayodhya' };
        const tourType = document.getElementById('tourType')?.value;
        const priceValue = getPriceForTourType(selectedVehicleData);
        const isOutstation = tourType === 'Outstation';
        
        const message = `🚕 *CAB BOOKING REQUEST - Kalki tour and travels* 🚕
━━━━━━━━━━━━━━━━━━━━━━
📍 *City:* ${cityNames[currentCity]}
🚗 *Vehicle:* ${selectedVehicleData.name} (${selectedVehicleData.capacity})
👤 *Name:* ${fullName}
📞 *Phone:* ${phone}
📅 *Date:* ${journeyDate}
📍 *Pickup:* ${pickup}
🏁 *Drop:* ${drop}
👥 *Passengers:* ${passengers}
⏱️ *Tour Type:* ${tourType}
💰 *Fare:* ${isOutstation ? `${priceValue}` : `${priceValue}`}
💬 *Notes:* ${document.getElementById('message')?.value || 'None'}
━━━━━━━━━━━━━━━━━━━━━━
🙏 Please confirm availability.`;
        
        const encodedMsg = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/919682701873?text=${encodedMsg}`;
        
        const modal = document.getElementById('successModal');
        if (modal) modal.style.display = 'flex';
        window.open(whatsappUrl, '_blank');
      });
    }

    // Modal close functions
    window.closeModal = function() {
      const modal = document.getElementById('successModal');
      if (modal) modal.style.display = 'none';
    };
    
    window.onclick = function(e) {
      const modal = document.getElementById('successModal');
      if (e.target === modal && modal) modal.style.display = 'none';
    };

    // Initialize
    renderVehicles();
    updateSelectedDisplay();
  });