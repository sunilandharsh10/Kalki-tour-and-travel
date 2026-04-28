document.addEventListener('DOMContentLoaded', function() {
    // City-specific Puja Data
    const pujaData = {
        prayag: [
            { id: 1, name: "Triveni Sangam Snan Puja", category: "Popular", deity: "Ganga-Yamuna-Saraswati", duration: "1.5 hrs", price: 0, desc: "Sacred bath ritual at the holy confluence of three rivers.", icon: "🌊", popular: true },
            { id: 2, name: "Dashashwamedh Ganga Aarti Puja", category: "Popular", deity: "Mother Ganga", duration: "1 hr", price: 2100, desc: "Participate in the famous Ganga Aarti at Prayag.", icon: "🪔", popular: true },
            { id: 3, name: "Rudrabhishek", category: "Abhishek", deity: "Lord Shiva", duration: "2.5 hrs", price: 5100, desc: "Powerful ritual for health, prosperity at Sangam.", icon: "🕉️", popular: false },
            { id: 4, name: "Pitru Dosh Nivaran Puja", category: "Pitru", deity: "Ancestors", duration: "2 hrs", price: 4800, desc: "Ancestral rituals at Triveni for peace.", icon: "👴", popular: false },
            // { id: 5, name: "Navgraha Shanti Puja", category: "Dosha", deity: "Nine Planets", duration: "3 hrs", price: 6500, desc: "Pacifies planetary doshas.", icon: "⭐", popular: true },
            // { id: 6, name: "Baglamukhi Puja", category: "Dosha", deity: "Maa Baglamukhi", duration: "2 hrs", price: 4500, desc: "For victory over enemies and legal issues.", icon: "🐝", popular: false }
        ],
        varanasi: [
            { id: 7, name: "Kashi Vishwanath Abhishek", category: "Abhishek", deity: "Lord Shiva", duration: "2 hrs", price: 5500, desc: "Sacred milk & water offering at Kashi temple.", icon: "🔱", popular: true },
            { id: 8, name: "Dashashwamedh", category: "Popular", deity: "Mother Ganga", duration: "1 hr", price: 2500, desc: "Witness the grand Ganga Aarti with pandit.", icon: "🪔", popular: true },
            { id: 9, name: "Kaal Sarp Dosh Puja", category: "Dosha", deity: "Lord Shiva", duration: "4 hrs", price: 8500, desc: "Famous Trimbakeshwar style ritual in Kashi.", icon: "🐍", popular: true },
            { id: 10, name: "Maha Mrityunjaya Jaap", category: "Abhishek", deity: "Lord Shiva", duration: "3 hrs", price: 6100, desc: "For long life and health protection.", icon: "🕉️", popular: true },
            { id: 11, name: "Annapurna Puja", category: "Popular", deity: "Maa Annapurna", duration: "1.5 hrs", price: 4100, desc: "For abundance of food and prosperity.", icon: "🍚", popular: false },
            { id: 12, name: "Rudraksha Diksha Puja", category: "Abhishek", deity: "Lord Shiva", duration: "2 hrs", price: 3800, desc: "Blessing with sacred rudraksha beads.", icon: "📿", popular: false },
            { id: 13, name: "Pitru Dosh Nivaran Puja", category: "Pitru", deity: "Ancestors", duration: "2 hrs", price: 4800, desc: "Ancestral rituals at Triveni for peace.", icon: "👴", popular: false }
        ],
        ayodhya: [
            { id: 13, name: "Ram Janmabhoomi Puja", category: "Popular", deity: "Lord Ram", duration: "1.5 hrs", price: 5100, desc: "Special puja at Ram Janmabhoomi temple.", icon: "🏹", popular: true },
            { id: 14, name: "Ayodhya Deepotsav Puja", category: "Popular", deity: "Lord Ram", duration: "2 hrs", price: 3500, desc: "Participate in the grand diya ceremony.", icon: "🪔", popular: true },
            { id: 15, name: "Ram Darbar Abhishek", category: "Abhishek", deity: "Ram-Sita-Lakshman-Hanuman", duration: "2 hrs", price: 4500, desc: "Complete royal puja to Ram family.", icon: "👑", popular: true },
            { id: 16, name: "Hanuman Chalisa Path", category: "Popular", deity: "Lord Hanuman", duration: "1 hr", price: 2100, desc: "108 recitations of Hanuman Chalisa.", icon: "🙏", popular: true },
            { id: 17, name: "Sarayu River Puja", category: "Abhishek", deity: "Sarayu Maiya", duration: "1.5 hrs", price: 3100, desc: "Sacred ritual at the holy Sarayu river.", icon: "🌊", popular: false },
            { id: 18, name: "Ram Raksha Stotram", category: "Popular", deity: "Lord Ram", duration: "1 hr", price: 2500, desc: "Protective hymn recitation for family safety.", icon: "🛡️", popular: false }
        ]
    };

    const cityNames = {
        prayag: { name: "Prayagraj", subtitle: "Triveni Sangam", icon: "🙏" },
        varanasi: { name: "Varanasi", subtitle: "Kashi - City of Light", icon: "🔱" },
        ayodhya: { name: "Ayodhya", subtitle: "Ram Janmabhoomi", icon: "🚩" }
    };

    let currentCity = "prayag";
    let currentFilter = "all";
    let currentSearchTerm = "";
    let visibleCount = 6;
    let selectedPujaForBooking = null;

    const pujaGrid = document.getElementById("pujaGridContainer");
    const activeCityDisplay = document.getElementById("activeCityDisplay");
    const modal = document.getElementById("bookingModal");
    const modalPujaName = document.getElementById("modalPujaName");
    const modalCityName = document.getElementById("modalCityName");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const searchInput = document.getElementById("searchPujaInput");
    const searchBtn = document.getElementById("searchPujaBtn");
    const confirmBookingBtn = document.getElementById("confirmBookingBtn");

    function getFilteredPujas() {
        let pujas = [...pujaData[currentCity]];
        if (currentFilter !== "all") {
            pujas = pujas.filter(p => p.category === currentFilter);
        }
        if (currentSearchTerm.trim() !== "") {
            const term = currentSearchTerm.toLowerCase();
            pujas = pujas.filter(p =>
                p.name.toLowerCase().includes(term) ||
                p.deity.toLowerCase().includes(term) ||
                p.desc.toLowerCase().includes(term)
            );
        }
        return pujas;
    }

    function renderGrid() {
        if (!pujaGrid) return;
        const filtered = getFilteredPujas();
        const toShow = filtered.slice(0, visibleCount);
        const hasMore = filtered.length > visibleCount;

        if (toShow.length === 0) {
            pujaGrid.innerHTML = `<div class="no-results" style="grid-column:1/-1; text-align:center; padding:3rem;">🙏 No pujas found in ${cityNames[currentCity].name}. Try another search or filter.</div>`;
            if (loadMoreBtn) loadMoreBtn.style.display = "none";
            return;
        }

        pujaGrid.innerHTML = toShow.map(puja => `
            <div class="puja-card" data-id="${puja.id}">
                <div class="card-img">
                    <span style="font-size: 3rem;">${puja.icon || '🪔'}</span>
                    <div class="puja-city-tag">${cityNames[currentCity].icon} ${cityNames[currentCity].name}</div>
                    <div class="puja-category-tag">${puja.category}</div>
                </div>
                <div class="card-content">
                    <h3>${puja.name}</h3>
                    <div class="puja-meta">
                        <span class="duration"><i class="far fa-clock"></i> ${puja.duration}</span>
                        
                    </div>
                    <p class="puja-desc">${puja.desc}</p>
                    <button class="book-btn" data-id="${puja.id}"><i class="fas fa-hands-praying"></i> Book Puja in ${cityNames[currentCity].name}</button>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.book-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.getAttribute('data-id'));
                const puja = pujaData[currentCity].find(p => p.id === id);
                if (puja && modal) {
                    selectedPujaForBooking = puja;
                    if (modalPujaName) modalPujaName.innerText = `${puja.name} `;
                    if (modalCityName) modalCityName.innerText = `📍 Location: ${cityNames[currentCity].name} - ${cityNames[currentCity].subtitle}`;
                    modal.style.display = "flex";
                }
            });
        });

        if (loadMoreBtn) loadMoreBtn.style.display = hasMore ? "inline-flex" : "none";
    }

    function loadMore() {
        const filteredTotal = getFilteredPujas().length;
        visibleCount = Math.min(visibleCount + 4, filteredTotal);
        renderGrid();
    }

    function resetAndRender() {
        visibleCount = 6;
        renderGrid();
    }

    // City Selection
    const cityBtns = document.querySelectorAll('.city-btn');
    cityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            cityBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCity = this.getAttribute('data-city');
            if (activeCityDisplay) {
                activeCityDisplay.innerHTML = `📍 Currently in: ${cityNames[currentCity].name} (${cityNames[currentCity].subtitle})`;
            }
            currentFilter = "all";
            currentSearchTerm = "";
            if (searchInput) searchInput.value = "";
            const filterChips = document.querySelectorAll('.filter-chip');
            filterChips.forEach(chip => {
                chip.classList.remove('active');
                if (chip.getAttribute('data-filter') === 'all') chip.classList.add('active');
            });
            resetAndRender();
        });
    });

    // Filter Chips
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentFilter = chip.getAttribute('data-filter');
            resetAndRender();
        });
    });

    // Search
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            if (searchInput) {
                currentSearchTerm = searchInput.value;
                resetAndRender();
            }
        });
    }
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                currentSearchTerm = searchInput.value;
                resetAndRender();
            }
        });
    }

    // Load More
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMore);
    }

    // Modal
    const closeModalBtn = document.querySelector('.close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (modal) modal.style.display = "none";
        });
    }
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = "none";
        });
    }

    // Booking Confirmation
    if (confirmBookingBtn) {
        confirmBookingBtn.addEventListener("click", () => {
            const userName = document.getElementById("userName")?.value.trim();
            const userPhone = document.getElementById("userPhone")?.value.trim();
            const userEmail = document.getElementById("userEmail")?.value.trim();
            
            if (!userName) { alert("Please enter your full name."); return; }
            if (!userPhone) { alert("Please enter mobile number."); return; }
            if (!selectedPujaForBooking) { alert("Please select a puja first."); return; }

            const message = `🕉️ *PUJA BOOKING REQUEST* 🕉️
━━━━━━━━━━━━━━━━━━━━━━
📍 *Holy City:* ${cityNames[currentCity].name} (${cityNames[currentCity].subtitle})
🙏 *Puja Name:* ${selectedPujaForBooking.name}
💰 *Price:* ₹${selectedPujaForBooking.price}
👤 *Name:* ${userName}
📞 *Mobile:* ${userPhone}
📧 *Email:* ${userEmail || "Not provided"}
━━━━━━━━━━━━━━━━━━━━━━
Please share puja date, pandit availability & payment link.`;

            const encodedMsg = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/919682701873?text=${encodedMsg}`;
            window.open(whatsappUrl, "_blank");
            if (modal) modal.style.display = "none";
            
            const nameInput = document.getElementById("userName");
            const phoneInput = document.getElementById("userPhone");
            const emailInput = document.getElementById("userEmail");
            if (nameInput) nameInput.value = "";
            if (phoneInput) phoneInput.value = "";
            if (emailInput) emailInput.value = "";
            
            alert("Redirecting to WhatsApp. Our team will confirm your booking shortly.");
        });
    }

    // Initialize
    resetAndRender();
});