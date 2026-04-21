/**
 * Boat Booking JavaScript
 * Prayag Tourist Guide - Boat Services
 */

(function() {
    // BOAT DATA - All marine themed
    const boatsList = [
        { 
            id: "shikara_classic", 
            category: "shikara", 
            model: "Classic Shikara", 
            desc: "Handcrafted wooden boat with traditional charm, perfect for evening aarti and leisurely ride.", 
            capacity: "Up to 6 seats", 
            price: 499, 
            priceLabel: "starting ₹499/ride"
        },
        { 
            id: "deluxe_shikara", 
            category: "shikara", 
            model: "Deluxe Cushion Shikara", 
            desc: "Extra padded seats + awning, includes Ganga Jal & flower petals experience.", 
            capacity: "Up to 5 seats", 
            price: 799, 
            priceLabel: "₹799/ride"
        },
        { 
            id: "ganga_cruise_luxury", 
            category: "cruise", 
            model: "Sangam Maha Cruise", 
            desc: "Luxury cruising with panoramic views, upper deck, refreshments & guide.", 
            capacity: "Up to 25 guests", 
            price: 2499, 
            priceLabel: "from ₹2499/hr"
        },
        { 
            id: "solar_eco_cruise", 
            category: "cruise", 
            model: "Eco Solar Catamaran", 
            desc: "Silent engine, bird watching, interpretive river heritage tour.", 
            capacity: "Up to 20 guests", 
            price: 1899, 
            priceLabel: "₹1899/hr"
        },
        { 
            id: "speed_boat_rapid", 
            category: "speedboat", 
            model: "Aqua Thrill Speed Boat", 
            desc: "High speed boating experience, life jackets included, quick ride to Sangam.", 
            capacity: "Up to 8 seats", 
            price: 1299, 
            priceLabel: "₹1299/30 min"
        },
        { 
            id: "premium_speed", 
            category: "speedboat", 
            model: "Premium Jet Boat", 
            desc: "Extra powerful engine, smooth ride with music system, ideal for group fun.", 
            capacity: "Up to 7 seats", 
            price: 1699, 
            priceLabel: "₹1699/30 min"
        }
    ];

    let selectedBoatId = null;
    let selectedBoatPrice = 0;

    /**
     * Get icon HTML based on boat category
     */
    function getIconHtml(category) {
        if (category === 'shikara') return '<i class="fas fa-ship"></i>';
        if (category === 'cruise') return '<i class="fas fa-sailboat"></i>';
        return '<i class="fas fa-rocket"></i>';
    }

    /**
     * Render boats grid
     */
    function renderBoats(category = "shikara") {
        const gridContainer = document.getElementById("vehiclesGrid");
        if (!gridContainer) return;
        
        const filtered = boatsList.filter(b => b.category === category);
        if (filtered.length === 0) {
            gridContainer.innerHTML = `<div class="no-vehicles">No boats available in this category. Please check back later.</div>`;
            return;
        }
        
        let html = '';
        filtered.forEach(boat => {
            const isSelected = (selectedBoatId === boat.id);
            const cardClass = isSelected ? "vehicle-card selected" : "vehicle-card";
            html += `
                <div class="${cardClass}" data-id="${boat.id}" data-category="${boat.category}" data-price="${boat.price}">
                    <div class="vehicle-icon">${getIconHtml(boat.category)}</div>
                    <h3>${boat.model}</h3>
                    <div class="vehicle-capacity"><i class="fas fa-users"></i> ${boat.capacity}</div>
                    <p class="vehicle-desc">${boat.desc}</p>
                    <div class="vehicle-price"><i class="fas fa-tag"></i> ${boat.priceLabel}</div>
                    <button class="select-btn" data-id="${boat.id}">${isSelected ? '✓ Selected' : 'Select Boat'}</button>
                </div>
            `;
        });
        gridContainer.innerHTML = html;
        attachCardEvents();
    }

    /**
     * Attach event listeners to boat cards
     */
    function attachCardEvents() {
        document.querySelectorAll('.select-btn').forEach(btn => {
            btn.removeEventListener('click', handleSelectClick);
            btn.addEventListener('click', handleSelectClick);
        });
        document.querySelectorAll('.vehicle-card').forEach(card => {
            card.removeEventListener('click', cardClickHandler);
            card.addEventListener('click', cardClickHandler);
        });
    }

    /**
     * Handle select button click
     */
    function handleSelectClick(e) {
        e.stopPropagation();
        const btn = e.currentTarget;
        const boatId = btn.getAttribute('data-id');
        selectBoatById(boatId);
    }

    /**
     * Handle card click
     */
    function cardClickHandler(e) {
        if (e.target.classList && e.target.classList.contains('select-btn')) return;
        const card = e.currentTarget;
        const boatId = card.getAttribute('data-id');
        if (boatId) selectBoatById(boatId);
    }

    /**
     * Select boat by ID
     */
    function selectBoatById(boatId) {
        const boat = boatsList.find(b => b.id === boatId);
        if (!boat) return;
        
        selectedBoatId = boat.id;
        selectedBoatPrice = boat.price;
        
        const displayDiv = document.getElementById("selectedVehicleDisplay");
        if (displayDiv) {
            displayDiv.innerHTML = `${getIconHtml(boat.category)} Selected: ${boat.model} (${boat.capacity}) — Starting ₹${boat.price}`;
        }
        
        updateEstimatedFare();
        
        const currentActiveTab = document.querySelector('.tab-btn.active')?.getAttribute('data-category') || 'shikara';
        renderBoats(currentActiveTab);
    }

    /**
     * Update estimated fare display
     */
    function updateEstimatedFare() {
        const fareSpan = document.getElementById("estimatedFareDisplay");
        if (fareSpan && selectedBoatId) {
            const boat = boatsList.find(b => b.id === selectedBoatId);
            if (boat) {
                fareSpan.innerHTML = `₹${boat.price}* (approx)`;
            } else {
                fareSpan.innerHTML = `—`;
            }
        } else if (fareSpan) {
            fareSpan.innerHTML = `—`;
        }
    }

    /**
     * Initialize tabs
     */
    function initTabs() {
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const currentSelectedBoat = boatsList.find(b => b.id === selectedBoatId);
                if (currentSelectedBoat && currentSelectedBoat.category !== category) {
                    selectedBoatId = null;
                    selectedBoatPrice = 0;
                    const displayDiv = document.getElementById("selectedVehicleDisplay");
                    if (displayDiv) displayDiv.innerHTML = `<i class="fas fa-ship"></i> No boat selected`;
                    updateEstimatedFare();
                }
                renderBoats(category);
            });
        });
    }

    /**
     * Setup form submission with WhatsApp
     */
    function setupFormSubmit() {
        const form = document.getElementById("bookingFormElement");
        if (!form) return;
        
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const fullName = document.getElementById("fullName")?.value.trim();
            const phone = document.getElementById("phone")?.value.trim();
            const journeyDate = document.getElementById("journeyDate")?.value;
            const pickup = document.getElementById("pickup")?.value.trim();
            const drop = document.getElementById("drop")?.value.trim();
            const passengers = document.getElementById("passengers")?.value;
            const email = document.getElementById("email")?.value.trim() || "Not provided";
            const tourType = document.getElementById("tourType")?.value || "Boat Ride";
            const message = document.getElementById("message")?.value.trim() || "No special requests";

            // Validation
            if (!fullName) { alert("Please enter full name"); return; }
            if (!phone) { alert("Please enter phone number"); return; }
            if (!journeyDate) { alert("Please select boat date"); return; }
            if (!pickup) { alert("Please enter boarding ghat location"); return; }
            if (!passengers) { alert("Please select number of passengers"); return; }
            if (!selectedBoatId) { alert("Please select a boat type to continue booking"); return; }

            const selectedBoatObj = boatsList.find(b => b.id === selectedBoatId);
            if (!selectedBoatObj) { alert("Invalid boat selection"); return; }

            // Build WhatsApp message
            const whatsappMsg = `🛶 *BOAT BOOKING REQUEST - Prayag Tourist Guide* 🛶
--------------------------------
👤 Name: ${fullName}
📞 Phone: ${phone}
📧 Email: ${email}
📅 Boat Date: ${journeyDate}
⛵ Boat Type: ${selectedBoatObj.model}
👥 Capacity: ${selectedBoatObj.capacity}
💰 Estimated Fare: ₹${selectedBoatObj.price}
📍 Boarding Ghat: ${pickup}
🏁 Route/Destination: ${drop || "Standard river circuit"}
👥 Passengers: ${passengers}
🎟️ Ride Type: ${tourType}
💬 Special Requests: ${message}
--------------------------------
🌊 Ganga Aarti / Sangam exploration. Kindly confirm availability.`;

            const encodedMsg = encodeURIComponent(whatsappMsg);
            const phoneNumber = "9451212326";
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMsg}`;
            
            const modal = document.getElementById("successModal");
            if (modal) modal.style.display = "flex";
            window.open(whatsappUrl, "_blank");
        });
    }

    /**
     * Set minimum date for date picker
     */
    function setMinDate() {
        const dateInput = document.getElementById("journeyDate");
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute("min", today);
        }
    }

    /**
     * Add capacity warning functionality
     */
    function enhanceCapacityWarning() {
        const passengerSelect = document.getElementById("passengers");
        if (passengerSelect) {
            passengerSelect.addEventListener("change", function() {
                if (selectedBoatId) {
                    const boat = boatsList.find(b => b.id === selectedBoatId);
                    if (boat) {
                        let maxCapacity = 0;
                        if (boat.id === "shikara_classic") maxCapacity = 6;
                        else if (boat.id === "deluxe_shikara") maxCapacity = 5;
                        else if (boat.id === "ganga_cruise_luxury") maxCapacity = 25;
                        else if (boat.id === "solar_eco_cruise") maxCapacity = 20;
                        else if (boat.id === "speed_boat_rapid") maxCapacity = 8;
                        else if (boat.id === "premium_speed") maxCapacity = 7;
                        else maxCapacity = 10;
                        
                        const selectedPax = parseInt(passengerSelect.value, 10);
                        let existingWarn = document.getElementById("boatCapacityWarn");
                        
                        if (selectedPax > maxCapacity) {
                            if (!existingWarn) {
                                const warnSpan = document.createElement("div");
                                warnSpan.id = "boatCapacityWarn";
                                warnSpan.style.color = "#e67e22";
                                warnSpan.style.fontSize = "0.8rem";
                                warnSpan.style.marginTop = "6px";
                                warnSpan.style.fontWeight = "500";
                                warnSpan.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Note: Selected boat capacity up to ${maxCapacity} persons. Consider booking multiple boats or upgrade.`;
                                passengerSelect.parentNode.insertBefore(warnSpan, passengerSelect.nextSibling);
                            } else {
                                existingWarn.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Note: Selected boat capacity up to ${maxCapacity} persons. Consider booking multiple boats or upgrade.`;
                                existingWarn.style.display = "block";
                            }
                        } else {
                            if (existingWarn) existingWarn.style.display = "none";
                        }
                    }
                }
            });
        }
    }

    /**
     * Close modal
     */
    window.closeModal = function() {
        const modal = document.getElementById("successModal");
        if (modal) modal.style.display = "none";
    };
    
    /**
     * Click outside modal to close
     */
    window.onclick = function(event) {
        const modal = document.getElementById("successModal");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    /**
     * Initialize all functionality
     */
    function init() {
        renderBoats('shikara');
        initTabs();
        setupFormSubmit();
        setMinDate();
        enhanceCapacityWarning();
    }
    
    // Start the application
    init();
})();