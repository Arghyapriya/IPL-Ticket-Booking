
function showToast(message) {
    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}

document.querySelectorAll('a[href*="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        const url = new URL(link.href, window.location.href);

        if (url.pathname === window.location.pathname && url.hash) {
            const target = document.getElementById(
                decodeURIComponent(url.hash.substring(1))
            );

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    });
});

window.addEventListener("load", function () {
    if (window.location.hash === "#booking") {
        const bookingSection = document.getElementById("booking");

        if (bookingSection) {
            bookingSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            showToast("Welcome! You can book your IPL tickets now.");
        }
    }
});

const bookingForm = document.querySelector("#booking form");

if (bookingForm) {
    let currentTooltip = null;

    function removeValidationTooltip() {
        if (currentTooltip) {
            currentTooltip.remove();
            currentTooltip = null;
        }
    }

    function showValidationTooltip(field) {
        removeValidationTooltip();

        const tooltip = document.createElement("span");
        tooltip.className = "validation-tooltip";
        tooltip.setAttribute("role", "alert");
        tooltip.textContent = field.validationMessage;

        let wrapper = field.closest(".validation-wrapper");

        if (!wrapper) {
            wrapper = document.createElement("span");
            wrapper.className = "validation-wrapper";

            field.parentNode.insertBefore(wrapper, field);
            wrapper.appendChild(field);
        }

        wrapper.appendChild(tooltip);
        currentTooltip = tooltip;

        field.focus();
    }

    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        removeValidationTooltip();

        if (!bookingForm.checkValidity()) {
            const invalidField = bookingForm.querySelector(":invalid");

            if (invalidField) {
                showValidationTooltip(invalidField);
            }

            return;
        }

        showToast(
            "Order accepted! Your IPL ticket booking has been submitted successfully."
        );

        bookingForm.reset();
    });

    bookingForm.addEventListener("input", function () {
        removeValidationTooltip();
    });

    bookingForm.addEventListener("change", function () {
        removeValidationTooltip();
    });

    bookingForm.addEventListener("reset", function () {
        removeValidationTooltip();
    });
}
// Activity 7: Live Booking Summary

const ticketPrices = {
    "CSK vs MI": {
        General: 800,
        Premium: 1500,
        VIP: 3000
    },
    "RCB vs KKR": {
        General: 900,
        Premium: 1800,
        VIP: 3500
    },
    "MI vs RR": {
        General: 700,
        Premium: 1400,
        VIP: 2800
    },
    "KKR vs SRH": {
        General: 800,
        Premium: 1600,
        VIP: 3200
    }
};

// Select booking form controls
const matchSelect = document.getElementById("match");
const standSelect = document.getElementById("stand");

const quantityInput = document.querySelector(
    "#quantity, #tickets"
);

// Select booking summary elements
const summaryMatch = document.getElementById("summaryMatch");
const summaryStand = document.getElementById("summaryStand");
const summaryPrice = document.getElementById("summaryPrice");
const summaryQuantity = document.getElementById("summaryQuantity");
const summaryTotal = document.getElementById("summaryTotal");

// Update booking summary
function updateBookingSummary(notify = true) {

    const match = matchSelect.value;
    const stand = standSelect.value;
    const quantity = Number(quantityInput.value);

    const validQuantity =
        Number.isInteger(quantity) &&
        quantity >= 1 &&
        quantity <= 10;

    let price = 0;

    if (match && stand && ticketPrices[match]) {
        price = ticketPrices[match][stand] || 0;
    }

    const total = price * (validQuantity ? quantity : 0);

    summaryMatch.textContent = match || "Not Selected";
    summaryStand.textContent = stand || "Not Selected";
    summaryPrice.textContent = "₹" + price.toLocaleString("en-IN");
    summaryQuantity.textContent = validQuantity ? quantity : 0;
    summaryTotal.textContent = "₹" + total.toLocaleString("en-IN");

    if (notify && match && stand && validQuantity) {
        showToast("Booking summary updated successfully!");
    }
}

// Add event listeners
if (
    matchSelect && standSelect && quantityInput &&
    summaryMatch && summaryStand && summaryPrice &&
    summaryQuantity && summaryTotal
) {
    matchSelect.addEventListener("change", function () {
        updateBookingSummary();
    });

    standSelect.addEventListener("change", function () {
        updateBookingSummary();
    });

    quantityInput.addEventListener("change", function () {
        updateBookingSummary();
    });

    quantityInput.addEventListener("input", function () {
        updateBookingSummary(false);
    });

    // Reset booking summary when form is reset
    const liveBookingForm = document.querySelector("#booking form");

    if (liveBookingForm) {
        liveBookingForm.addEventListener("reset", function () {
            setTimeout(function () {
                updateBookingSummary(false);
            }, 0);
        });
    }

    // Initialize booking summary
    updateBookingSummary(false);
}