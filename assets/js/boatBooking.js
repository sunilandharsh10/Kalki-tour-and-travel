document.addEventListener('DOMContentLoaded', function() {
    // Boat Data for Prayagraj (Sangam) - No Cruise Boat, Only Hand Boat & Speed Boat
    const prayagBoatData = {
      handBoat: [
        { id: "prayag_hand_boat_10seat_2hr", name: "Private Hand Boat (10 Seater)", capacity: "Up to 10 seats", duration: "1 to 2 hours", price: 1000, priceLabel: "Starting ₹1,000 (1-2 hours)", desc: "Perfect for families. Enjoy peaceful private boat ride at Sangam.", icon: "fa-ship", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=220&fit=crop" },
        { id: "prayag_hand_boat_10seat_30min", name: "Private Pontoon Boat (10 Seater)", capacity: "Up to 10 seats", duration: "30 min to 1 hour", price: 2500, priceLabel: "Starting ₹2,500 (30 min - 1 hour)", desc: "Luxury pontoon boat with comfortable seating.", icon: "fa-ship", img: "https://images.unsplash.com/photo-1566159396892-2c40a0e6c6d0?w=400&h=220&fit=crop" },
        { id: "prayag_sharing_boat", name: "Shared / Public Boat", capacity: "Shared seating", duration: "30 min to 1 hour", price: 200, priceLabel: "Starting ₹200 per person", desc: "Economical option for solo travelers and couples.", icon: "fa-users", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=220&fit=crop" },
        { id: "prayag_large_boat", name: "Large / Group Boat", capacity: "15-20 seats", duration: "30 min to 1 hour", price: 500, priceLabel: "Starting ₹500 per person", desc: "Spacious boat ideal for large groups and families.", icon: "fa-sailboat", img: "https://images.unsplash.com/photo-1566159396892-2c40a0e6c6d0?w=400&h=220&fit=crop" }
      ],
      speedBoat: [
        { id: "prayag_speed_boat_large", name: "Premium Speed Boat", capacity: "Up to 8 seats", duration: "45 min", price: 2500, priceLabel: "Starting ₹2,500 per boat", desc: "High-speed luxury speed boat with music system.", icon: "fa-rocket", img: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=400&h=220&fit=crop" }
      ],
      cruise: []  // No cruise boats for Prayagraj
    };

    // Boat Data for Varanasi (Kashi) - Has all options including Cruise
    const varanasiBoatData = {
      handBoat: [
        { id: "varanasi_hand_boat", name: "Hand Boat (8 Person Max)", capacity: "Up to 8 seats", duration: "1 hour", price: 1200, priceLabel: "Starting ₹1,200 per boat", desc: "Traditional wooden boat for Ganga Aarti view.", icon: "fa-ship", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=220&fit=crop" },
        { id: "varanasi_sharing_boat", name: "Shared Boat", capacity: "Shared seating", duration: "45 min", price: 150, priceLabel: "Starting ₹150 per person", desc: "Economical shared boat for Ganga Aarti.", icon: "fa-users", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=220&fit=crop" }
      ],
      speedBoat: [
        { id: "varanasi_speed_boat", name: "Speed Boat", capacity: "Up to 6 seats", duration: "30 min", price: 1800, priceLabel: "Starting ₹1,800 per boat", desc: "Fast boat ride covering longer distances.", icon: "fa-rocket", img: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=400&h=220&fit=crop" }
      ],
      cruise: [
        { id: "varanasi_cruise", name: "Luxury Ganga Cruise", capacity: "Up to 30 seats", duration: "1.5 hours", price: 3500, priceLabel: "Starting ₹3,500 per person", desc: "Luxury cruise with dinner and live music.", icon: "fa-sailboat", img: "https://images.unsplash.com/photo-1551808522-1a6a523f96d3?w=400&h=220&fit=crop" }
      ]
    };

    let currentCity = 'prayag';
    let currentCategory = 'handBoat';
    let selectedBoatData = null;

    const vehiclesGrid = document.getElementById('vehiclesGrid');
    const selectedDisplay = document.getElementById('selectedVehicleDisplay');
    const estimatedFareSpan = document.getElementById('estimatedFareDisplay');
    const passengersSelect = document.getElementById('passengers');
    const cruiseTab = document.getElementById('cruiseTab');
    const speedBoatTab = document.querySelector('.tab-btn[data-category="speedBoat"]');

    function getCurrentBoatData() {
      if (currentCity === 'prayag') {
        return prayagBoatData[currentCategory];
      } else {
        return varanasiBoatData[currentCategory];
      }
    }

    function updateTabsForCity() {
      if (currentCity === 'prayag') {
        // Disable Cruise tab for Prayagraj
        if (cruiseTab) {
          cruiseTab.classList.add('disabled');
        }
        // Speed Boat is available in Prayagraj (Premium Speed Boat only)
        if (speedBoatTab) {
          speedBoatTab.classList.remove('disabled');
        }
        // If current category is cruise, switch to handBoat
        if (currentCategory === 'cruise') {
          currentCategory = 'handBoat';
          const handBoatTab = document.querySelector('.tab-btn[data-category="handBoat"]');
          if (handBoatTab) {
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            handBoatTab.classList.add('active');
          }
        }
      } else {
        // Enable all tabs for Varanasi
        if (cruiseTab) {
          cruiseTab.classList.remove('disabled');
        }
        if (speedBoatTab) {
          speedBoatTab.classList.remove('disabled');
        }
      }
    }

    function renderBoats() {
      const boats = getCurrentBoatData();
      
      if (!boats || boats.length === 0) {
        let message = '';
        if (currentCity === 'prayag' && currentCategory === 'cruise') {
          message = '🚢 Cruise boat service is not available in Prayagraj (Sangam). Please select Hand Boat or Speed Boat for boat ride.';
        } else {
          message = 'No boats available in this category';
        }
        vehiclesGrid.innerHTML = `<div style="text-align:center;padding:2rem;color:#e67e22;">${message}</div>`;
        return;
      }

      let html = '';
      boats.forEach(boat => {
        const isSelected = selectedBoatData && selectedBoatData.id === boat.id;
        const cardClass = isSelected ? 'vehicle-card selected' : 'vehicle-card';
        
        html += `
          <div class="${cardClass}" data-id="${boat.id}">
            <div class="vehicle-img" style="background-image: url('${boat.img}'); background-size: cover; background-position: center; height: 200px;">
              <div class="vehicle-icon-overlay">
                <i class="fas ${boat.icon}"></i>
              </div>
            </div>
            <h3>${boat.name}</h3>
            <div class="vehicle-capacity"><i class="fas fa-users"></i> ${boat.capacity}</div>
            <div class="vehicle-prices">
              <div class="price-item"><span class="price-label"><i class="far fa-clock"></i> Duration:</span><span class="price-value">${boat.duration}</span></div>
              <div class="price-item"><span class="price-label"><i class="fas fa-tag"></i> Price:</span><span class="price-value">${boat.priceLabel}</span></div>
            </div>
            <p class="vehicle-desc" style="padding:0 1.2rem 0.5rem; font-size:0.75rem; color:#6c7e8f;">${boat.desc}</p>
            <button class="select-btn" data-id="${boat.id}">${isSelected ? '✓ Selected' : 'Select Boat'}</button>
          </div>
        `;
      });
      
      vehiclesGrid.innerHTML = html;
      
      document.querySelectorAll('.select-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const boatId = btn.getAttribute('data-id');
          const boat = boats.find(b => b.id === boatId);
          if (boat) selectBoat(boat);
        });
      });
      
      document.querySelectorAll('.vehicle-card').forEach(card => {
        card.addEventListener('click', (e) => {
          if (e.target.classList.contains('select-btn')) return;
          const boatId = card.getAttribute('data-id');
          const boat = boats.find(b => b.id === boatId);
          if (boat) selectBoat(boat);
        });
      });
    }

    function selectBoat(boat) {
      selectedBoatData = boat;
      selectedDisplay.innerHTML = `<i class="fas fa-${boat.icon.replace('fa-', '')}"></i> Selected: ${boat.name} (${boat.capacity}) — ${boat.priceLabel}`;
      updateFareDisplay();
      renderBoats();
    }

    function updateFareDisplay() {
      if (selectedBoatData) {
        const passengers = parseInt(passengersSelect?.value) || 1;
        const isPerPerson = selectedBoatData.priceLabel.includes('per person');
        if (isPerPerson) {
          const total = selectedBoatData.price * passengers;
          estimatedFareSpan.innerHTML = `${selectedBoatData.priceLabel} (Total: ₹${total} for ${passengers} persons)`;
        } else {
          estimatedFareSpan.innerHTML = selectedBoatData.priceLabel;
        }
      } else {
        estimatedFareSpan.innerHTML = '—';
      }
    }

    // City Selection
    document.querySelectorAll('.city-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.city-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentCity = this.getAttribute('data-city');
        selectedBoatData = null;
        updateTabsForCity();
        renderBoats();
        updateFareDisplay();
        selectedDisplay.innerHTML = '<i class="fas fa-ship"></i> No boat selected';
      });
    });

    // Category Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        if (this.classList.contains('disabled')) {
          alert('This service is not available in the selected city.');
          return;
        }
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentCategory = this.getAttribute('data-category');
        selectedBoatData = null;
        renderBoats();
        updateFareDisplay();
        selectedDisplay.innerHTML = '<i class="fas fa-ship"></i> No boat selected';
      });
    });

    // Passengers change
    if (passengersSelect) {
      passengersSelect.addEventListener('change', updateFareDisplay);
    }

    // Set min date
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
        const journeyDate = document.getElementById('journeyDate')?.value;
        const pickup = document.getElementById('pickup')?.value.trim();
        const passengers = document.getElementById('passengers')?.value;
        
        if (!fullName) { alert('Please enter full name'); return; }
        if (!phone) { alert('Please enter phone number'); return; }
        if (!journeyDate) { alert('Please select boat date'); return; }
        if (!pickup) { alert('Please enter boarding ghat'); return; }
        if (!passengers) { alert('Please select number of passengers'); return; }
        if (!selectedBoatData) { alert('Please select a boat'); return; }
        
        const cityNames = { prayag: 'Prayagraj (Triveni Sangam)', varanasi: 'Varanasi (Kashi)' };
        const categoryNames = { handBoat: 'Hand Boat', speedBoat: 'Speed Boat', cruise: 'Cruise Boat' };
        
        const message = `⛵ *BOAT BOOKING REQUEST - Kashi Dham Tours* ⛵
━━━━━━━━━━━━━━━━━━━━━━
📍 *City:* ${cityNames[currentCity]}
🚤 *Boat Type:* ${categoryNames[currentCategory]}
⛵ *Boat Name:* ${selectedBoatData.name}
👥 *Capacity:* ${selectedBoatData.capacity}
⏱️ *Duration:* ${selectedBoatData.duration}
💰 *Price:* ${selectedBoatData.priceLabel}
👤 *Name:* ${fullName}
📞 *Phone:* ${phone}
📧 *Email:* ${document.getElementById('email')?.value || 'Not provided'}
📅 *Date:* ${journeyDate}
📍 *Boarding Ghat:* ${pickup}
🏁 *Route:* ${document.getElementById('drop')?.value || 'Standard route'}
👥 *Passengers:* ${passengers}
🎟️ *Ride Type:* ${document.getElementById('tourType')?.value}
💬 *Requests:* ${document.getElementById('message')?.value || 'None'}
━━━━━━━━━━━━━━━━━━━━━━
🙏 Please confirm availability & share boat details.`;
        
        const encodedMsg = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/917905472290?text=${encodedMsg}`;
        
        const modal = document.getElementById('successModal');
        if (modal) modal.style.display = 'flex';
        window.open(whatsappUrl, '_blank');
      });
    }
    
    window.closeModal = function() {
      const modal = document.getElementById('successModal');
      if (modal) modal.style.display = 'none';
    };
    
    window.onclick = function(e) {
      const modal = document.getElementById('successModal');
      if (e.target === modal) modal.style.display = 'none';
    };
    
    // Initialize
    updateTabsForCity();
    renderBoats();
  });