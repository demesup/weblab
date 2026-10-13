
/*
  Attribution: Based on layout logic by ddly
  https://codepen.io/ddly/pen/nLvoXb
*/

// Planet animation
const planet = document.querySelector(".planet");

// Search elements — use one consistent set of IDs
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("soul-search");
const searchBtn = document.getElementById("search-btn");
const searchError = document.getElementById("searchError");

// Animate the planet with mouse movement
document.addEventListener("mousemove", (e) => {
    if (!planet || !planet.parentElement) return;

    const xAxis = (window.innerWidth / 2 - e.clientX) / 25;
    const yAxis = (window.innerHeight / 2 - e.clientY) / 25;

    planet.parentElement.style.perspective = "1000px";
    planet.style.transform =
        `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
});

// Validate the destination
function validateDestination() {
    const value = searchInput.value.trim();
    let error = "";

    if (!value) {
        error = "Please enter a destination.";
    } else if (value.length < 2) {
        error = "Destination must contain at least 2 characters.";
    } else if (value.length > 100) {
        error = "Destination cannot exceed 100 characters.";
    } else if (/[\u0000-\u001F\u007F]/.test(value)) {
        error = "Your destination contains invalid characters.";
    } else if (/^https?:\/\//i.test(value)) {
        try {
            const url = new URL(value);

            if (
                !["http:", "https:"].includes(url.protocol) ||
                !url.hostname.includes(".") ||
                /\s/.test(value)
            ) {
                error = "Please enter a valid website URL.";
            }
        } catch {
            error = "Please enter a valid website URL.";
        }
    }

    searchInput.classList.toggle("invalid", Boolean(error));
    searchInput.classList.toggle(
        "valid",
        !error && Boolean(value)
    );

    searchInput.setAttribute(
        "aria-invalid",
        String(Boolean(error))
    );

    if (searchError) {
        searchError.textContent = error;
    }

    return !error;
}

// Clear validation when the input becomes empty
searchInput.addEventListener("input", () => {
    if (searchInput.value.length > 0) {
        validateDestination();
    } else {
        searchInput.classList.remove("invalid", "valid");
        searchInput.setAttribute("aria-invalid", "false");

        if (searchError) {
            searchError.textContent = "";
        }
    }
});

// Handle form submission, including Enter
function transmitSignal(event) {
    event.preventDefault();

    if (!validateDestination()) {
        searchInput.focus();
        return;
    }

    const destination = searchInput.value.trim();

    if (/^https?:\/\//i.test(destination)) {
        window.location.href = new URL(destination).href;
    } else {
        window.location.href =
            "https://www.google.com/search?q=" +
            encodeURIComponent(destination);
    }
}

// Use the form if it exists; otherwise use the button
if (searchForm) {
    searchForm.addEventListener("submit", transmitSignal);
} else if (searchBtn) {
    searchBtn.addEventListener("click", transmitSignal);
}
