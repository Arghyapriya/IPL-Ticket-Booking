
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

// Smooth scrolling for links on the current page
document.querySelectorAll('a[href*="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        const url = new URL(link.href, window.location.href);

        if (
            url.origin === window.location.origin &&
            url.pathname === window.location.pathname &&
            url.hash
        ) {
            const target = document.getElementById(
                decodeURIComponent(url.hash.substring(1))
            );

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                history.replaceState(null, "", url.hash);

                if (url.hash === "#booking") {
                    showToast("Welcome! You can book your IPL tickets now.");
                }
            }
        }
    });
});

// Show toast when opening the booking page
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

// Booking form submission
const bookingForm = document.querySelector("#booking form");

if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (bookingForm.checkValidity()) {
            showToast(
                "Order accepted! Your IPL ticket booking has been submitted successfully."
            );

            bookingForm.reset();
        } else {
            bookingForm.reportValidity();
        }
    });
}
