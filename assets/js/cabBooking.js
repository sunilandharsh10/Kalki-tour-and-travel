// ===== VEHICLE BOOKING APPLICATION =====

// Vehicle Data
const vehicles = {
  sedan: [
    { name: "Swift Dzire / similar", icon: "fa-car-side", capacity: "4 + luggage", features: ["AC", "Clean Interior", "Good Mileage"], price: 3500, type: "Sedan" },
    { name: "Honda Amaze", icon: "fa-car-side", capacity: "4 persons", features: ["Spacious", "Premium Audio"], price: 3800, type: "Sedan" },
    { name: "Toyota Etios", icon: "fa-car-side", capacity: "4 + 2 bags", features: ["Comfort Seats", "USB Charging"], price: 3700, type: "Sedan" }
  ],
  suv: [
    { name: "Maruti Ertiga", icon: "fa-car", capacity: "6-7 persons", features: ["7 Seater", "AC", "Family Friendly"], price: 5000, type: "SUV" },
    { name: "Toyota Innova Crysta", icon: "fa-car", capacity: "7 persons", features: ["Premium", "Luggage Space", "Smooth Ride"], price: 6500, type: "SUV" },
    { name: "Mahindra XUV700", icon: "fa-car", capacity: "7 persons", features: ["Luxury SUV", "Sunroof", "Powerful AC"], price: 7000, type: "SUV" }
  ],
  tempo: [
    { name: "Tempo Traveller (9 Seater)", icon: "fa-truck", capacity: "9 persons", features: ["Pushback Seats", "AC", "Extra Legroom"], price: 8500, type: "Tempo" },
    { name: "Tempo Traveller (12 Seater)", icon: "fa-truck", capacity: "12 persons", features: ["Spacious", "Charging Points", "Curtains"], price: 10000, type: "Tempo" },
    { name: "Luxury Tempo (16 Seater)", icon: "fa-truck", capacity: "16 persons", features: ["LED Lights", "Music System", "Water Bottles"], price: 13000, type: "Tempo" }
  ]
};

let selectedVehicle = null;
let selectedCategory = "sedan";

// Render Vehicles based on category
function renderVehicles(category) {
  const grid = document.getElementById('vehiclesGrid');
  const vehicleList = vehicles[category];
  if (!vehicleList) return;

  grid.innerHTML = vehicleList.map((v, idx) => `
    <div class="vehicle-card" data-vehicle='${JSON.stringify(v)}'>
      <div class="vehicle-img">
        <i class="fas ${v.icon}"></i>
        <div class="vehicle-badge">${v.type}</div>
      </div>
      <div class="vehicle-info">
        <h3>${v.name}</h3>
        <div class="capacity"><i class="fas fa-user-friends"></i> ${v.capacity}</div>
        <div class="features">
          ${v.features.map(f => `<span class="feature-tag">${f}</span>`).join('')}
        </div>
        <div class="price-row">
          <div><span class="price">₹${v.price.toLocaleString()}</span> <small>/ per day</small></div>
          <button class="book-now-btn" data-vehicle='${JSON.stringify(v)}'><i class="fas fa-ticket-alt"></i> Select</button>
        </div>
      </div>
    </div>
  `).join('');

  // Attach event listeners to select buttons
  document.querySelectorAll('.book-now-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const vehicleData = JSON.parse(btn.getAttribute('data-vehicle'));
      selectVehicle(vehicleData);
    });
  });
}

// Select a vehicle
function selectVehicle(vehicle) {
  selectedVehicle = vehicle;
  const displayDiv = document.getElementById('selectedVehicleDisplay');
  displayDiv.innerHTML = `<i class="fas ${vehicle.icon}"></i> Selected: ${vehicle.name} (${vehicle.capacity}) — ₹${vehicle.price}/day`;
  displayDiv.style.background = "#fff0df";
  
  // Update estimated fare preview
  updateFarePreview();
  
  // Scroll to form
  document.getElementById('bookingForm').scrollIntoView({ behavior: 'smooth' });
}

// Update fare preview display
function updateFarePreview() {
  const fareSpan = document.getElementById('estimatedFareDisplay');
  if (selectedVehicle) {
    fareSpan.innerHTML = `₹${selectedVehicle.price} + driver & fuel (final as per itinerary)`;
    fareSpan.style.color = "#c2822e";
  } else {
    fareSpan.innerHTML = "— select a vehicle first";
  }
}

// Tab switching logic
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedCategory = btn.getAttribute('data-category');
      renderVehicles(selectedCategory);
      // reset selected vehicle when changing category
      selectedVehicle = null;
      document.getElementById('selectedVehicleDisplay').innerHTML = `<i class="fas fa-car"></i> No vehicle selected`;
      updateFarePreview();
    });
  });
}

// Handle form submission
function initFormSubmission() {
  const form = document.getElementById('bookingFormElement');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!selectedVehicle) {
      alert("Please select a vehicle first from the options above.");
      return;
    }
    
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const journeyDate = document.getElementById('journeyDate').value;
    const pickup = document.getElementById('pickup').value.trim();
    const drop = document.getElementById('drop').value.trim();
    const passengers = document.getElementById('passengers').value;
    const tourType = document.getElementById('tourType').value;
    const message = document.getElementById('message').value;
    const email = document.getElementById('email').value;
    
    if (!fullName || !phone || !journeyDate || !pickup || !drop || !passengers) {
      alert("Please fill all required fields (*)");
      return;
    }
    
    // Phone number validation (basic)
    if (phone.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }
    
    // Prepare WhatsApp message
    const vehicleInfo = `${selectedVehicle.name} (${selectedVehicle.capacity}) | ₹${selectedVehicle.price}/day`;
    const waMessage = `🙏 *New Booking Request - Prayag Tourist Guide* 🙏%0A%0A
📌 *Vehicle:* ${vehicleInfo}%0A
👤 *Name:* ${fullName}%0A
📞 *Phone:* ${phone}%0A
📧 *Email:* ${email || 'Not provided'}%0A
📅 *Journey Date:* ${journeyDate}%0A
📍 *Pickup:* ${pickup}%0A
🏁 *Drop:* ${drop}%0A
👥 *Passengers:* ${passengers}%0A
🔄 *Tour Type:* ${tourType}%0A
💬 *Special Request:* ${message || 'None'}%0A%0A
🔹 *Please confirm availability & best price.`;
    
    const whatsappUrl = `https://wa.me/919935353482?text=${waMessage}`;
    
    // Show modal
    const modal = document.getElementById('successModal');
    modal.style.display = 'flex';
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  });
}

// Close modal function (global for onclick)
window.closeModal = function() {
  document.getElementById('successModal').style.display = 'none';
}

// Close modal on outside click
function initModalClose() {
  window.onclick = function(event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  }
}

// Set minimum date for journey date picker
function setMinDate() {
  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('journeyDate');
  if (dateInput) {
    dateInput.min = today;
  }
}

// Passenger change listener for visual update
function initPassengerListener() {
  const passengerSelect = document.getElementById('passengers');
  if (passengerSelect) {
    passengerSelect.addEventListener('change', () => {
      if(selectedVehicle) updateFarePreview();
    });
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  renderVehicles('sedan');
  initTabs();
  initFormSubmission();
  initModalClose();
  setMinDate();
  initPassengerListener();
});