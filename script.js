let fleet = [];

const addBtn = document.getElementById("addBtn");
const cardsContainer = document.getElementById("cardsContainer");

const filterCategory = document.getElementById("filterCategory");
const filterAvailability = document.getElementById("filterAvailability");
const clearFilter = document.getElementById("clearFilter");

function renderCards(list) {
    cardsContainer.innerHTML = "";

    if (list.length === 0) {
        cardsContainer.innerHTML = "<p>No Fleet Available</p>";
        return;
    }

    list.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="https://coding-platform.s3.amazonaws.com/dev/lms/tickets/5e80fcb6-3f8e-480c-945b-30a5359eb40e/JNmYjkVr3WOjsrbu.png">

            <p><b>Reg No:</b> ${item.reg}</p>
            <p><b>Category:</b> ${item.cat}</p>
            <p><b>Driver:</b> ${item.driver}</p>
            <p><b>Status:</b> ${item.avail}</p>

            <button onclick="updateDriver('${item.reg}')">Update Driver</button>
            <button onclick="changeAvailability('${item.reg}')">Change Availability</button>
            <button onclick="deleteFleet('${item.reg}')">Delete Vehicle</button>
        `;

        cardsContainer.appendChild(card);
    });
}

addBtn.addEventListener("click", () => {
    const reg = document.getElementById("regNo").value;
    const cat = document.getElementById("categorySelect").value;
    const driver = document.getElementById("driverName").value;
    const avail = document.getElementById("isAvailable").value;

    if (reg === "" || cat === "" || driver === "") {
        alert("Fill all details");
        return;
    }

    fleet.push({ reg, cat, driver, avail });
    renderCards(fleet);
});

function updateDriver(reg) {
    const name = prompt("Enter new driver name:");
    if (!name) return;

    fleet = fleet.map(item => 
        item.reg === reg ? { ...item, driver: name } : item
    );

    renderCards(fleet);
}

function changeAvailability(reg) {
    fleet = fleet.map(item =>
        item.reg === reg
            ? { ...item, avail: item.avail === "Available" ? "Unavailable" : "Available" }
            : item
    );

    renderCards(fleet);
}

function deleteFleet(reg) {
    fleet = fleet.filter(item => item.reg !== reg);
    renderCards(fleet);
    alert("Vehicle with registration number " + reg + " has been deleted!");
}


filterCategory.addEventListener("change", applyFilters);
filterAvailability.addEventListener("change", applyFilters);

function applyFilters() {
    const filteredList = fleet.filter(item =>
        (filterCategory.value === "" || item.cat === filterCategory.value) &&
        (filterAvailability.value === "" || item.avail === filterAvailability.value)
    );

    renderCards(filteredList);
}

clearFilter.addEventListener("click", () => {
    filterCategory.value = "";
    filterAvailability.value = "";
    renderCards(fleet);
});
