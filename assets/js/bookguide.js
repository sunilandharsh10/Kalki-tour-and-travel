(function() {
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Service selection state
        let selectedDuration = 'full';
        let selectedDurationPrice = 3250;
        let foreignSelected = false;
        let foreignFeeAmount = 1000; // Default for Full Day
        let outstationSelected = false;
        let outstationPrice = 2200;
        let earlyLateSelected = false;
        let extraCitySelected = false;
        let specialEventSelected = false;
        
        // Get DOM elements
        const halfDayBtn = document.getElementById('halfDayBtn');
        const fullDayBtn = document.getElementById('fullDayBtn');
        const foreignCheckbox = document.getElementById('foreignLangCheckbox');
        const foreignPriceDisplay = document.getElementById('foreignPriceDisplay');
        const outstationCheckbox = document.getElementById('outstationCheckbox');
        const outstationRangeContainer = document.getElementById('outstationRangeContainer');
        const outstationRange = document.getElementById('outstationRange');
        const outstationValueSpan = document.getElementById('outstationValue');
        const earlyLateCheckbox = document.getElementById('earlyLateCheckbox');
        const extraCityCheckbox = document.getElementById('extraCityCheckbox');
        const specialEventCheckbox = document.getElementById('specialEventCheckbox');
        
        const baseFeeSpan = document.getElementById('baseFee');
        const totalFeeSpan = document.getElementById('totalFee');
        const foreignRow = document.getElementById('foreignRow');
        const outstationRow = document.getElementById('outstationRow');
        const earlyRow = document.getElementById('earlyRow');
        const extraCityRow = document.getElementById('extraCityRow');
        const specialEventRow = document.getElementById('specialEventRow');
        const foreignFeeSpan = document.getElementById('foreignFee');
        const outstationFeeSpan = document.getElementById('outstationFee');
        const earlyFeeSpan = document.getElementById('earlyFee');
        const extraCityFeeSpan = document.getElementById('extraCityFee');
        
        // Function to update foreign language fee based on duration
        function updateForeignLanguageFee() {
            if (selectedDuration === 'half') {
                foreignFeeAmount = 850;
            } else {
                foreignFeeAmount = 850;
            }
            
            // Update display
            if (foreignPriceDisplay) {
                foreignPriceDisplay.innerText = `+₹${foreignFeeAmount}`;
            }
            
            // If foreign language is selected, update the total
            if (foreignSelected) {
                updateTotal();
            }
        }
        
        // Function to update total fee
        function updateTotal() {
            let total = selectedDurationPrice;
            let foreignFee = foreignSelected ? foreignFeeAmount : 0;
            let outstationFeeValue = outstationSelected ? outstationPrice : 0;
            let earlyFee = earlyLateSelected ? 850 : 0;
            let extraCityFee = extraCitySelected ? 500 : 0;
            let specialEventFee = specialEventSelected ? 450 : 0;
            
            total += foreignFee + outstationFeeValue + earlyFee + extraCityFee + specialEventFee;
            
            if (baseFeeSpan) baseFeeSpan.innerText = `₹${selectedDurationPrice}`;
            
            if (foreignRow) foreignRow.style.display = foreignSelected ? 'flex' : 'none';
            if (foreignFeeSpan) foreignFeeSpan.innerText = `+₹${foreignFee}`;
            
            if (outstationRow) outstationRow.style.display = outstationSelected ? 'flex' : 'none';
            if (outstationFeeSpan) outstationFeeSpan.innerText = `+₹${outstationFeeValue}`;
            
            if (earlyRow) earlyRow.style.display = earlyLateSelected ? 'flex' : 'none';
            if (earlyFeeSpan) earlyFeeSpan.innerText = `+₹${earlyFee}`;
            
            if (extraCityRow) extraCityRow.style.display = extraCitySelected ? 'flex' : 'none';
            if (extraCityFeeSpan) extraCityFeeSpan.innerText = `+₹${extraCityFee}`;
            
            if (specialEventRow) specialEventRow.style.display = specialEventSelected ? 'flex' : 'none';
            
            if (totalFeeSpan) totalFeeSpan.innerText = `₹${total}`;
        }
        
        // Set duration function
        function setDuration(duration, price) {
            selectedDuration = duration;
            selectedDurationPrice = price;
            
            if (halfDayBtn && fullDayBtn) {
                if (duration === 'half') {
                    halfDayBtn.classList.add('duration-full');
                    halfDayBtn.classList.remove('duration-half');
                    fullDayBtn.classList.add('duration-half');
                    fullDayBtn.classList.remove('duration-full');
                } else {
                    fullDayBtn.classList.add('duration-full');
                    fullDayBtn.classList.remove('duration-half');
                    halfDayBtn.classList.add('duration-half');
                    halfDayBtn.classList.remove('duration-full');
                }
            }
            
            // Update foreign language fee when duration changes
            updateForeignLanguageFee();
            updateTotal();
        }
        
        // Add event listeners
        if (halfDayBtn) halfDayBtn.addEventListener('click', () => setDuration('half', 2500));
        if (fullDayBtn) fullDayBtn.addEventListener('click', () => setDuration('full', 3250));
        
        if (foreignCheckbox) {
            foreignCheckbox.addEventListener('change', function() {
                foreignSelected = this.checked;
                updateTotal();
            });
        }
        
        if (outstationCheckbox) {
            outstationCheckbox.addEventListener('change', function() {
                outstationSelected = this.checked;
                if (outstationSelected) {
                    if (outstationRangeContainer) outstationRangeContainer.classList.remove('hidden');
                    if (outstationRange) outstationPrice = parseInt(outstationRange.value);
                } else {
                    if (outstationRangeContainer) outstationRangeContainer.classList.add('hidden');
                    outstationPrice = 0;
                }
                updateTotal();
            });
        }
        
        if (outstationRange) {
            outstationRange.addEventListener('input', function() {
                outstationPrice = parseInt(this.value);
                if (outstationValueSpan) outstationValueSpan.innerText = outstationPrice;
                updateTotal();
            });
        }
        
        if (earlyLateCheckbox) {
            earlyLateCheckbox.addEventListener('change', function() {
                earlyLateSelected = this.checked;
                updateTotal();
            });
        }
        
        if (extraCityCheckbox) {
            extraCityCheckbox.addEventListener('change', function() {
                extraCitySelected = this.checked;
                updateTotal();
            });
        }
        
        if (specialEventCheckbox) {
            specialEventCheckbox.addEventListener('change', function() {
                specialEventSelected = this.checked;
                updateTotal();
            });
        }
        
        // Radio group styling
        document.querySelectorAll('.radio-group').forEach(group => {
            group.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.addEventListener('change', function() {
                    const parentLabel = this.closest('.radio-option');
                    if(parentLabel) {
                        parentLabel.parentElement.querySelectorAll('.radio-option').forEach(opt => opt.classList.remove('selected'));
                        if(this.checked) parentLabel.classList.add('selected');
                    }
                });
                if(radio.checked) {
                    const parentLabel = radio.closest('.radio-option');
                    if(parentLabel) parentLabel.classList.add('selected');
                }
            });
        });
        
        // Set minimum date for tour date picker
        const dateInput = document.getElementById('tourDate');
        if(dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
        
        // Form submission
        const form = document.getElementById('touristForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const fullName = document.getElementById('fullName')?.value.trim();
                const gender = document.querySelector('input[name="gender"]:checked')?.value;
                const phone = document.getElementById('phone')?.value.trim();
                const city = document.getElementById('city')?.value.trim();
                const tourDate = document.getElementById('tourDate')?.value;
                const consent = document.getElementById('consentCheckbox')?.checked;
                
                if(!fullName) { alert('Please enter your full name'); return; }
                if(!gender) { alert('Please select gender'); return; }
                if(!phone) { alert('Please enter phone number'); return; }
                if(!city) { alert('Please enter city of visit'); return; }
                if(!tourDate) { alert('Please select tour date'); return; }
                if(!consent) { alert('Please accept the Traveler Declaration and Consent'); return; }
                
                const languagesSelect = document.getElementById('languages');
                const selectedLanguages = languagesSelect ? Array.from(languagesSelect.selectedOptions).map(opt => opt.value).join(', ') : 'Not specified';
                const guideGenderPref = document.querySelector('input[name="guideGender"]:checked')?.value || 'No Preference';
                const durationName = selectedDuration === 'half' ? 'Half Day (Up to 4 hours) - ₹2500' : 'Full Day (4-8 hours) - ₹3250';
                
                let extras = [];
                if(foreignSelected) extras.push(`Foreign Language Allowance (+₹${foreignFeeAmount})`);
                if(outstationSelected) extras.push(`Outstation Service (+₹${outstationPrice})`);
                if(earlyLateSelected) extras.push('Early/Late Hours (+₹850)');
                if(extraCitySelected) extras.push('Extra City Allowance (+₹500)');
                if(specialEventSelected) extras.push('Special Event Allowance (+₹450 avg)');
                
                const total = selectedDurationPrice + (foreignSelected ? foreignFeeAmount : 0) + (outstationSelected ? outstationPrice : 0) + (earlyLateSelected ? 850 : 0) + (extraCitySelected ? 500 : 0) + (specialEventSelected ? 450 : 0);
                
                const message = `📋 *TRAVELER REGISTRATION - GetMyGuide* 📋
━━━━━━━━━━━━━━━━━━━━━━
👤 *Personal Details*
• Name: ${fullName}
• Gender: ${gender}
• Phone: ${phone}
• Email: ${document.getElementById('email')?.value || 'Not provided'}
• Nationality: ${document.getElementById('nationality')?.value}

📍 *Travel Details*
• City: ${city}
• Tour Date: ${tourDate}
• Travelers: ${document.getElementById('travelers')?.value}
• Interests: ${document.getElementById('interests')?.value || 'Not specified'}

🗣️ *Guide Preferences*
• Languages: ${selectedLanguages}
• Guide Gender: ${guideGenderPref}

⏱️ *Service Details*
• Duration: ${durationName}
• Extras: ${extras.length ? extras.join(', ') : 'None'}

💰 *Total Fee: ₹${total}*
✅ Declaration Accepted
━━━━━━━━━━━━━━━━━━━━━━
IATO & TGFI Agreement (Oct 2025 - Sep 2027)`;
                
                const encodedMsg = encodeURIComponent(message);
                const whatsappUrl = `https://wa.me/917905472290?text=${encodedMsg}`;
                
                const modal = document.getElementById('successModal');
                if (modal) modal.style.display = 'flex';
                window.open(whatsappUrl, '_blank');
            });
        }
        
        // Modal functions
        window.closeModal = function() {
            const modal = document.getElementById('successModal');
            if (modal) modal.style.display = 'none';
        };
        
        window.onclick = function(e) {
            const modal = document.getElementById('successModal');
            if(e.target === modal && modal) modal.style.display = 'none';
        };
        
        // Initialize with default values
        setDuration('full', 3250);
    });
})();