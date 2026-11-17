 document.addEventListener("DOMContentLoaded", () => {

    // =================================
    // 1. MOBILE NAVIGATION MENU
    // =================================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
            });
        });
    }


    // =================================
    // 2. CURRENT YEAR
    // =================================

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // =================================
    // 3. DATE VALIDATION
    // =================================

    const travelDate = document.getElementById("travelDate");
    const returnDate = document.getElementById("returnDate");

    const today = new Date().toLocaleDateString("en-CA");

    if (travelDate) {
        travelDate.min = today;
    }

    if (returnDate) {
        returnDate.min = today;
    }

    if (travelDate && returnDate) {

        travelDate.addEventListener("change", () => {

            returnDate.min = travelDate.value || today;

            if (
                returnDate.value &&
                returnDate.value < travelDate.value
            ) {
                returnDate.value = "";
            }
        });
    }


    // =================================
    // 4. BOOK NOW - SELECT CAR
    // =================================

    document.querySelectorAll(".book-car").forEach(button => {

        button.addEventListener("click", () => {

            const selectedCar = button.dataset.car;
            const carSelect = document.getElementById("carSelect");

            if (carSelect) {
                carSelect.value = selectedCar;
            }

            const bookingSection = document.getElementById("booking");

            if (bookingSection) {
                bookingSection.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });


    // =================================
    // 5. WHATSAPP BOOKING FORM
    // =================================

    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener("submit", event => {

            event.preventDefault();

            if (!bookingForm.reportValidity()) {
                return;
            }

            const formData = new FormData(bookingForm);

            const details = Object.fromEntries(formData.entries());

            const mobile = String(details.mobile || "")
                .replace(/\D/g, "");

            // MOBILE NUMBER VALIDATION
            if (!/^[6-9]\d{9}$/.test(mobile)) {

                alert("Please enter a valid 10-digit mobile number.");

                return;
            }

            // RETURN DATE VALIDATION
            if (
                details.returnDate &&
                details.returnDate < details.travelDate
            ) {

                alert("Return date cannot be before travel date.");

                return;
            }

            // WHATSAPP MESSAGE
            const message = `
NEW BOOKING ENQUIRY - MAHAKAL CAR RENTALS

Customer Name: ${details.name || "Not specified"}

Mobile Number: ${mobile}

Car: ${details.car || "Not specified"}

Rental Type: ${details.rentalType || "Not specified"}

Pickup Location: ${details.pickup || "Not specified"}

Destination: ${details.destination || "Not specified"}

Travel Date: ${details.travelDate || "Not specified"}

Pickup Time: ${details.pickupTime || "Not specified"}

Return Date: ${details.returnDate || "Not specified"}

Passengers: ${details.passengers || "Not specified"}

Additional Requirements: ${details.requirements || "None"}
[11/16/2026 10:32 PM] Praveen Tiwari: Please contact me regarding availability and final pricing.
            `;

            // BUSINESS WHATSAPP NUMBER
            const whatsappNumber = "917023245984";

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(message);

            // OPEN WHATSAPP
            window.open(whatsappURL, "_blank");

            // SUCCESS MESSAGE
            const status = document.getElementById("formStatus");

            if (status) {
                status.textContent =
                    "WhatsApp opened. Please press Send to submit your enquiry.";
            }

        });
    }


    // =================================
    // 6. WEBSITE LOADED
    // =================================

    console.log("Mahakal Car Rentals website loaded successfully!");

});