
    // ======================= GENERATE 100+ HOTELS =======================
    const citiesList = ["Prayagraj", "Lunckow", "Ayodhya", "Varanasi"];
    const hotelNames = [
        "Grand Heritage", "Sunrise Palace", "Royal Orchid", "Sea Breeze Resort", "Urban Nirvana", "Luxury Inn",
        "Silver Crest", "Golden Tulip", "Maple Tree", "Crystal Sands", "Palm Grove", "Serenity Suites", "Elite Haven",
        "Aster Lodge", "Blue Lagoon", "Emerald Court", "Orchid Paradise", "Red Fox Hotel", "Saffron Stays", "Tranquil Bliss"
    ];
    const amenitiesMaster = [
        { name: "AC Room", price: 1000 },
        { name: "Breakfast", price: 300 },
        { name: "Lunch", price: 500 },
        { name: "Dinner", price: 700 },
        { name: "WiFi (High Speed)", price: 200 },
        { name: "Swimming Pool Access", price: 800 },
        { name: "Parking", price: 150 }
    ];

    function randomRating() {
        return (3.5 + Math.random() * 1.4).toFixed(1);
    }

    function randomImage(id) {
        const images = [
            "https://picsum.photos/id/104/400/280", "https://picsum.photos/id/106/400/280", "https://picsum.photos/id/29/400/280",
            "https://picsum.photos/id/169/400/280", "https://picsum.photos/id/127/400/280", "https://picsum.photos/id/26/400/280",
            "https://picsum.photos/id/203/400/280", "https://picsum.photos/id/452/400/280"
        ];
        return images[id % images.length];
    }

    let hotels = [];
    let hotelId = 1;
    for (let i = 0; i < 105; i++) {
        const city = citiesList[i % citiesList.length];
        const nameIndex = i % hotelNames.length;
        const basePrice = 1500 + (i * 47) % 6000;  // base price per person per night (1500 to 7500)
        const rating = randomRating();
        // Assign random amenities (2 to 6)
        const shuffled = [...amenitiesMaster];
        const amenityCount = 2 + (i % 5);
        const availableAmenities = [];
        for (let k = 0; k < amenityCount && k < shuffled.length; k++) {
            const randIdx = Math.floor(Math.random() * shuffled.length);
            if (!availableAmenities.some(a => a.name === shuffled[randIdx].name)) {
                availableAmenities.push({ ...shuffled[randIdx] });
            }
        }
        hotels.push({
            hotelId: hotelId++,
            hotelName: `${hotelNames[nameIndex]} ${city.substring(0,2)}${i}`,
            city: city,
            basePricePerPerson: basePrice,
            availableAmenities: availableAmenities,
            image: randomImage(i),
            rating: parseFloat(rating)
        });
    }

    // DOM elements
    const citySelect = document.getElementById("citySelect");
    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");
    const hotelsGrid = document.getElementById("hotelsGridContainer");
    const bookingModal = document.getElementById("bookingModal");
    const modalHotelNameSpan = document.getElementById("modalHotelName");
    const modalAmenitiesList = document.getElementById("modalAmenitiesList");
    const personsInput = document.getElementById("personsCount");
    const nightsInput = document.getElementById("nightsCount");
    const basePerPersonSpan = document.getElementById("basePerPerson");
    const amenitiesPerPersonSpan = document.getElementById("amenitiesPerPerson");
    const totalPerPersonSpan = document.getElementById("totalPerPerson");
    const displayPersonsSpan = document.getElementById("displayPersons");
    const displayNightsSpan = document.getElementById("displayNights");
    const grandTotalSpan = document.getElementById("grandTotal");
    const sendWhatsAppBtn = document.getElementById("sendWhatsAppBtn");
    const closeModalBtn = document.getElementById("closeBookingModalBtn");

    let currentHotel = null;
    let currentSelectedAmenities = new Map(); // amenity name -> price

    // Filter & Render
    let currentFilteredHotels = [...hotels];
    let debounceTimer;

    function filterAndSortHotels() {
        let filtered = [...hotels];
        const city = citySelect.value;
        const term = searchInput.value.toLowerCase().trim();
        if (city !== "all") filtered = filtered.filter(h => h.city === city);
        if (term) {
            filtered = filtered.filter(h => 
                h.hotelName.toLowerCase().includes(term) || 
                h.availableAmenities.some(am => am.name.toLowerCase().includes(term))
            );
        }
        const sortType = sortSelect.value;
        if (sortType === "price_asc") filtered.sort((a,b) => a.basePricePerPerson - b.basePricePerPerson);
        else if (sortType === "rating") filtered.sort((a,b) => b.rating - a.rating);
        currentFilteredHotels = filtered;
        renderHotels(currentFilteredHotels);
    }

    function renderHotels(hotelsArray) {
        if (!hotelsArray.length) {
            hotelsGrid.innerHTML = `<div class="no-results">✨ No hotels found. Try different filters ✨</div>`;
            return;
        }
        hotelsGrid.innerHTML = "";
        hotelsArray.forEach(hotel => {
            const amenityChips = hotel.availableAmenities.slice(0,5).map(am => `<span class="amenity-chip">${am.name}</span>`).join('');
            const extraCount = hotel.availableAmenities.length > 5 ? ` +${hotel.availableAmenities.length-5}` : '';
            const card = document.createElement("div");
            card.className = "hotel-card";
            card.innerHTML = `
                <div class="hotel-image" style="background-image: url('${hotel.image}'); background-size: cover;">
                    <div class="hotel-rating">⭐ ${hotel.rating}</div>
                </div>
                <div class="hotel-content">
                    <div class="hotel-name">${hotel.hotelName}</div>
                    <span class="hotel-city">📍 ${hotel.city}</span>
                    <div class="amenity-chips">${amenityChips}<span class="amenity-chip">${extraCount}</span></div>
                    <div class="price-row-card">
                        <div><span class="base-price-label">Per person / night</span><br><span class="final-price">₹${hotel.basePricePerPerson.toLocaleString()}</span></div>
                        <div><span style="font-size:0.7rem;">+ amenities</span></div>
                    </div>
                    <button class="book-now-btn" data-id="${hotel.hotelId}">✈️ Select & Customize</button>
                </div>
            `;
            hotelsGrid.appendChild(card);
        });
        document.querySelectorAll(".book-now-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = parseInt(btn.getAttribute("data-id"));
                const hotel = hotels.find(h => h.hotelId === id);
                if (hotel) openBookingModal(hotel);
            });
        });
    }

    function openBookingModal(hotel) {
        currentHotel = hotel;
        currentSelectedAmenities.clear();
        modalHotelNameSpan.innerText = `${hotel.hotelName} (${hotel.city})`;
        basePerPersonSpan.innerText = `₹${hotel.basePricePerPerson}`;
        
        // Render amenities checkboxes
        modalAmenitiesList.innerHTML = "";
        hotel.availableAmenities.forEach(amenity => {
            const div = document.createElement("div");
            div.className = "amenity-option";
            div.innerHTML = `
                <div class="amenity-info">
                    <input type="checkbox" class="amenity-checkbox" data-name="${amenity.name}" data-price="${amenity.price}">
                    <label> ${amenity.name}</label>
                </div>
                <div class="amenity-price">+₹${amenity.price} /person/night</div>
            `;
            modalAmenitiesList.appendChild(div);
        });
        
        // attach checkbox events
        document.querySelectorAll(".amenity-checkbox").forEach(cb => {
            cb.addEventListener("change", (e) => {
                const name = cb.getAttribute("data-name");
                const price = parseInt(cb.getAttribute("data-price"));
                if (cb.checked) currentSelectedAmenities.set(name, price);
                else currentSelectedAmenities.delete(name);
                updatePriceBreakdown();
            });
        });
        
        personsInput.value = 2;
        nightsInput.value = 1;
        personsInput.addEventListener("input", () => updatePriceBreakdown());
        nightsInput.addEventListener("input", () => updatePriceBreakdown());
        
        updatePriceBreakdown();
        bookingModal.classList.add("active");
    }
    
    function updatePriceBreakdown() {
        if (!currentHotel) return;
        const persons = parseInt(personsInput.value) || 1;
        const nights = parseInt(nightsInput.value) || 1;
        const basePerPerson = currentHotel.basePricePerPerson;
        let amenitiesTotalPerPerson = 0;
        for (let price of currentSelectedAmenities.values()) {
            amenitiesTotalPerPerson += price;
        }
        const totalPerPerson = basePerPerson + amenitiesTotalPerPerson;
        const grandTotal = totalPerPerson * persons * nights;
        
        basePerPersonSpan.innerText = `₹${basePerPerson}`;
        amenitiesPerPersonSpan.innerText = `₹${amenitiesTotalPerPerson}`;
        totalPerPersonSpan.innerText = `₹${totalPerPerson}`;
        displayPersonsSpan.innerText = persons;
        displayNightsSpan.innerText = nights;
        grandTotalSpan.innerText = `₹${grandTotal.toLocaleString()}`;
    }
    
    function closeModal() {
        bookingModal.classList.remove("active");
        currentHotel = null;
        currentSelectedAmenities.clear();
    }
    
    function sendWhatsApp() {
        if (!currentHotel) return;
        const fullName = document.getElementById("fullName").value.trim();
        const mobile = document.getElementById("mobileNo").value.trim();
        const address = document.getElementById("address").value.trim();
        if (!fullName || !mobile || !address) {
            alert("Please fill in all details: Full Name, Mobile, Address");
            return;
        }
        if (!/^\d{8,15}$/.test(mobile)) {
            alert("Please enter a valid mobile number (8-15 digits)");
            return;
        }
        
        const persons = parseInt(personsInput.value);
        const nights = parseInt(nightsInput.value);
        const base = currentHotel.basePricePerPerson;
        const amenitiesList = Array.from(currentSelectedAmenities.keys());
        const amenitiesTotal = Array.from(currentSelectedAmenities.values()).reduce((a,b)=>a+b,0);
        const totalPerPerson = base + amenitiesTotal;
        const grandTotal = totalPerPerson * persons * nights;
        
        const message = `🏨 *NEW HOTEL BOOKING* 🏨
━━━━━━━━━━━━━━━━━━
🏨 Hotel: ${currentHotel.hotelName}
📍 City: ${currentHotel.city}
⭐ Rating: ${currentHotel.rating}
━━━━━━━━━━━━━━━━━━
👥 Persons: ${persons}
🌙 Nights: ${nights}
💰 Price Breakdown:
• Base per person/night: ₹${base}
• Selected Amenities: ${amenitiesList.length ? amenitiesList.join(", ") : "None"} (+₹${amenitiesTotal}/person/night)
• Total per person/night: ₹${totalPerPerson}
━━━━━━━━━━━━━━━━━━
💵 *GRAND TOTAL: ₹${grandTotal.toLocaleString()}*
━━━━━━━━━━━━━━━━━━
👤 Guest: ${fullName}
📞 Mobile: ${mobile}
🏠 Address: ${address}
━━━━━━━━━━━━━━━━━━
Please confirm availability. Thank you! 🙏`;
        
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${encoded}`, '_blank');
        closeModal();
        // reset fields
        document.getElementById("fullName").value = "";
        document.getElementById("mobileNo").value = "";
        document.getElementById("address").value = "";
    }
    
    function triggerFilterWithLoading() {
        if (debounceTimer) clearTimeout(debounceTimer);
        hotelsGrid.innerHTML = `<div class="loading-spinner"><div class="spinner"></div> Fetching best stays...</div>`;
        debounceTimer = setTimeout(() => {
            filterAndSortHotels();
        }, 250);
    }
    
    citySelect.addEventListener("change", triggerFilterWithLoading);
    searchInput.addEventListener("input", triggerFilterWithLoading);
    sortSelect.addEventListener("change", triggerFilterWithLoading);
    sendWhatsAppBtn.addEventListener("click", sendWhatsApp);
    closeModalBtn.addEventListener("click", closeModal);
    bookingModal.addEventListener("click", (e) => { if (e.target === bookingModal) closeModal(); });
    
    triggerFilterWithLoading();
