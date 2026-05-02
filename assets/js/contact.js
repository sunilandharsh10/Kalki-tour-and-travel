document.addEventListener("DOMContentLoaded", function () {

    const WHATSAPP_NUMBER = "919682701873";
    const form = document.getElementById("contactForm");

    function buildWhatsAppMessage(name, phone, email, message) {
        let text = `🏝️ *KALKI TOUR & TRAVELS - New Inquiry* 🏝️\n\n`;
        text += `👤 Name: ${name}\n`;
        text += `📞 Phone: ${phone}\n`;
        if (email) text += `✉️ Email: ${email}\n`;
        text += `💬 Message: ${message}\n\n`;
        text += `_Sent via website_`;

        return encodeURIComponent(text); // ✅ IMPORTANT FIX
    }

    function validateForm() {
        const name = document.getElementById("fullName").value.trim();
        const phone = document.getElementById("phoneNumber").value.trim();
        const message = document.getElementById("userMessage").value.trim();

        if (!name) {
            alert("Please enter your name");
            return false;
        }

        const cleanPhone = phone.replace(/[\s\-+()]/g, '');
        if (!/^[0-9]{7,15}$/.test(cleanPhone)) {
            alert("Enter valid phone number");
            return false;
        }

        if (!message) {
            alert("Please enter your message");
            return false;
        }

        return true;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!validateForm()) return;

        const name = document.getElementById("fullName").value.trim();
        const phone = document.getElementById("phoneNumber").value.trim();
        const email = document.getElementById("emailAddress").value.trim();
        const message = document.getElementById("userMessage").value.trim();

        const encodedMessage = buildWhatsAppMessage(name, phone, email, message);

        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        window.open(whatsappURL, "_blank");

        // optional UI reset
        form.reset();
    });

});