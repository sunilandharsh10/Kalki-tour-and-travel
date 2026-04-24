document.addEventListener('DOMContentLoaded', function() {
    let selectedVehicle = null;
    let selectedPrice = 0;

    const priceOptions = document.querySelectorAll('.price-option');
    const selectedDisplaySpan = document.getElementById('selectedVehicleDisplay');
    const totalAmountSpan = document.getElementById('totalAmount');
    const form = document.getElementById('bookingForm');
    const dateInput = document.getElementById('tourDate');
    const passengersSelect = document.getElementById('passengers');

    // Vehicle name mapping using object
    const vehicleNames = {
      sedan: 'Sedan (4 Seater)',
      suv: 'SUV (6-7 Seater)',
      tempo: 'Tempo Traveller (10-17 Seater)'
    };

    // Vehicle capacity mapping
    const vehicleCapacity = {
      sedan: 4,
      suv: 7,
      tempo: 17
    };

    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }

    priceOptions.forEach(option => {
      option.addEventListener('click', function() {
        priceOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        
        const vehicle = this.getAttribute('data-vehicle');
        const price = parseInt(this.getAttribute('data-price'));
        
        selectedVehicle = vehicle;
        selectedPrice = price;
        
        // Using object mapping for vehicle name
        const vehicleName = vehicleNames[vehicle] || 'Unknown Vehicle';
        
        selectedDisplaySpan.innerHTML = `${vehicleName} — ₹${price.toLocaleString()}`;
        totalAmountSpan.innerHTML = `₹${price.toLocaleString()}`;
      });
    });

    // Capacity check when passengers change
    if (passengersSelect) {
      passengersSelect.addEventListener('change', function() {
        const pax = parseInt(this.value);
        if (selectedVehicle && pax > vehicleCapacity[selectedVehicle]) {
          alert(`⚠️ ${vehicleNames[selectedVehicle]} capacity is only ${vehicleCapacity[selectedVehicle]} passengers. Please select a larger vehicle.`);
        }
      });
    }

    // Form submission
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName')?.value.trim();
        const phone = document.getElementById('phone')?.value.trim();
        const tourDate = document.getElementById('tourDate')?.value;
        const pickup = document.getElementById('pickup')?.value.trim();
        const passengers = document.getElementById('passengers')?.value;
        
        if (!fullName) { alert('Please enter your full name'); return; }
        if (!phone) { alert('Please enter phone number'); return; }
        if (!tourDate) { alert('Please select tour date'); return; }
        if (!pickup) { alert('Please enter pickup location'); return; }
        if (!passengers) { alert('Please select number of passengers'); return; }
        if (!selectedVehicle) { alert('Please select a vehicle (Sedan, SUV, or Tempo Traveller)'); return; }
        
        // Using object mapping for vehicle name
        const vehicleName = vehicleNames[selectedVehicle] || 'Unknown Vehicle';
        const email = document.getElementById('email')?.value || 'Not provided';
        const messageText = document.getElementById('message')?.value || 'None';
        
        const whatsappMsg = `🚐 *PRAYAGRAJ CITY TOUR BOOKING* 🚐
━━━━━━━━━━━━━━━━━━━━━━
📍 *Tour:* Prayagraj City Tour (1 Day)
📜 *Historical Sites:* Anand Bhawan, Khusro Bagh, Allahabad Museum, Azad Park, All Saints Cathedral, Alop Shankari Temple, Nagvasuki Temple
👤 *Name:* ${fullName}
📞 *Phone:* ${phone}
📧 *Email:* ${email}
📅 *Tour Date:* ${tourDate}
📍 *Pickup:* ${pickup}
👥 *Passengers:* ${passengers}
🚗 *Vehicle:* ${vehicleName}
💰 *Total Amount:* ₹${selectedPrice}
💬 *Special Requests:* ${messageText}
━━━━━━━━━━━━━━━━━━━━━━
🙏 Please confirm availability & guide details.`;
        
        const encodedMsg = encodeURIComponent(whatsappMsg);
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
    
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        const modal = document.getElementById('successModal');
        if (modal) modal.style.display = 'none';
      });
    }
    
    window.onclick = function(e) {
      const modal = document.getElementById('successModal');
      if (e.target === modal) modal.style.display = 'none';
    };
  });