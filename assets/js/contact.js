function sendData(){
        const WHATSAPP_NUMBER = "919682701873";
        const toast = document.getElementById('toastMsg');
        
        function showToast(msg) {
            toast.textContent = msg || "✨ Opening WhatsApp chat! ✨";
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3200);
        }
        
        function buildWhatsAppMessage(name, phone, email, messageText) {
            let details = `🏝️ *KALKI TOUR & TRAVELS - New Inquiry* 🏝️%0A%0A`;
            details += `👤 *Name:* ${name || '—'}%0A`;
            details += `📞 *Phone:* ${phone || '—'}%0A`;
            if (email && email.trim() !== "") {
                details += `✉️ *Email:* ${email}%0A`;
            }
            details += `💬 *Message:* ${messageText || '—'}%0A%0A`;
            details += `_Sent via website contact form (Agent: Rohit mishra)_`;
            return details;
        }
        
        function showFieldError(input, msg) {
            const parent = input.parentElement;
            const existing = parent.querySelector('.error-feedback');
            if (existing) existing.remove();
            const errDiv = document.createElement('div');
            errDiv.className = 'error-feedback';
            errDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${msg}`;
            parent.appendChild(errDiv);
            input.style.borderColor = "#d9534f";
            input.addEventListener('input', function clear() {
                const err = parent.querySelector('.error-feedback');
                if (err) err.remove();
                input.style.borderColor = "#cfdfcf";
            }, { once: true });
        }
        
        function validateContactForm() {
            let valid = true;
            const nameInp = document.getElementById('fullName');
            const phoneInp = document.getElementById('phoneNumber');
            const msgInp = document.getElementById('userMessage');
            
            // Remove any previous global errors
            document.querySelectorAll('.error-feedback').forEach(e => e.remove());
            
            if (!nameInp.value.trim()) {
                showFieldError(nameInp, "Please enter your full name");
                valid = false;
            }
            const phoneVal = phoneInp.value.trim();
            if (!phoneVal) {
                showFieldError(phoneInp, "Mobile number is required");
                valid = false;
            } else {
                const digits = phoneVal.replace(/[\s\-+()]/g, '');
                if (!/^[0-9]{7,15}$/.test(digits)) {
                    showFieldError(phoneInp, "Enter a valid phone number (7-15 digits)");
                    valid = false;
                }
            }
            if (!msgInp.value.trim()) {
                showFieldError(msgInp, "Please share your message or travel requirement");
                valid = false;
            }
            return valid;
        }
        
        const form = document.getElementById('contactForm');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!validateContactForm()) return;
            
            const name = document.getElementById('fullName').value.trim();
            const phone = document.getElementById('phoneNumber').value.trim();
            const email = document.getElementById('emailAddress').value.trim();
            const message = document.getElementById('userMessage').value.trim();
            
            const waMessage = buildWhatsAppMessage(name, phone, email, message);
            const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;
            
            window.open(waUrl, '_blank');
            showToast("✓ Opening WhatsApp — just tap send! ✅");
            
            const btn = form.querySelector('button[type="submit"]');
            const originalHtml = btn.innerHTML;
            btn.innerHTML = '<i class="fab fa-whatsapp"></i> Redirecting...';
            btn.disabled = true;
            setTimeout(() => {
                btn.innerHTML = originalHtml;
                btn.disabled = false;
            }, 2000);
        });
        
        // Direct WhatsApp chat button (agent card)
        const directBtn = document.getElementById('directWhatsappBtn');
        const headerLink = document.getElementById('whatsappHeaderLink');
        
        function directAgentChat() {
            const personalMsg = `Hello Rohit / Kalki Team! I'm interested in planning a tour. Please share the best packages and guidance. (Inquiry via website profile card)`;
            const encoded = encodeURIComponent(personalMsg);
            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
            window.open(url, '_blank');
            showToast("Opening WhatsApp chat with Anjali (Senior Consultant) 💬");
        }
        
        if (directBtn) directBtn.addEventListener('click', (e) => {
            e.preventDefault();
            directAgentChat();
        });
        if (headerLink) headerLink.addEventListener('click', (e) => {
            e.preventDefault();
            directAgentChat();
        });
        
        // Make email clickable & phone clickable
        const emailEl = document.querySelector('.address-strip span:last-child');
        if (emailEl && emailEl.innerText.includes('mishraychit')) {
            emailEl.style.cursor = 'pointer';
            emailEl.addEventListener('click', () => {
                window.location.href = 'mailto:mishraychit@Kalkitourandtravels.com?subject=Tour%20Inquiry%20from%20Website';
            });
        }
        
        const phoneSpanTop = document.querySelector('.brand-bar .quick-contact span:first-child');
        if (phoneSpanTop) {
            phoneSpanTop.style.cursor = 'pointer';
            phoneSpanTop.addEventListener('click', () => window.location.href = 'tel:+919682701873');
        }
        
        // Enhance contact-detail phone click
        const phoneDetail = document.querySelector('.contact-detail-item:first-child div span');
        if (phoneDetail && phoneDetail.innerText.includes('9682701873')) {
            phoneDetail.style.cursor = 'pointer';
            phoneDetail.addEventListener('click', () => window.location.href = 'tel:+919682701873');
        }
        
        const whatsappSpan = document.querySelector('.contact-detail-item:nth-child(2) div span');
        if (whatsappSpan) {
            whatsappSpan.style.cursor = 'pointer';
            whatsappSpan.addEventListener('click', () => directAgentChat());
        }
        
        // Add a nice fallback for image: we already used randomuser + fallback with initials.
        // also add optional for agent card image load error : already covered.
        console.log("Kalki Tour Form with Professional Person Image Card ready");
    }