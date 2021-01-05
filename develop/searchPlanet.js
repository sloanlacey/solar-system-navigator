const dropdownModifier = {
    target: document.querySelector(".planet"),
    addPlanetEntry: function(planet) {
        // Get existing planets in local storage
        const planetsSearched = localStorage.getItem("planetsSearched");
        let planetsArr = planetsSearched ? planetsSearched.split(",") : [];

        // If planet not already exists in list, add it
        if (!planetsArr.includes(planet)){
            planetsArr.unshift(planet);
            localStorage.setItem("planetsSearched", planetsArr.toString());
        }
    },
    addItem: function(planet) {
        // Captialize first letter for printing
        const name = planet.replace(planet.charAt(0), planet.charAt(0).toUpperCase());
        
        // List item wrapper
        const liEl = document.createElement("li");
        liEl.classList.add("planet-list-item", "row", `${planet}`);
        liEl.setAttribute("style", "margin-bottom: 1px");
        liEl.addEventListener("click", function(event) {
            window.location = `./${planet}.html`;
        })

        // Planet name
        const nameDivEl = document.createElement("div");
        nameDivEl.classList.add("col", "s8");
        nameDivEl.textContent = name;

        // Delete button
        const deleteIcon = document.createElement("i");
        const {deleteItem} = dropdownModifier;

        deleteIcon.classList.add("col", "s2", "offset-s1", "material-icons");
        deleteIcon.setAttribute("style", "font-size: 16px");
        deleteIcon.textContent = "delete";
        deleteIcon.addEventListener("click", function(event){
            event.stopPropagation();
            deleteItem(planet);
        });
        
        liEl.appendChild(nameDivEl);
        liEl.appendChild(deleteIcon);
        dropdownModifier.target.appendChild(liEl);
    },
    deletePlanetEntry: function(planet) {
        // Get existing planets in local storage
        const planetsSearched = localStorage.getItem("planetsSearched");
        let planetsArr = planetsSearched ? planetsSearched.split(",") : [];

        // Remove planet from array, save to local storage
        const planetAt = planetsArr.indexOf(planet);
        const arr = [...planetsArr.slice(0, planetAt), ...planetsArr.slice(planetAt + 1)];
        localStorage.setItem("planetsSearched", arr.toString());
    },
    deleteItem: function(planet) {
        // Remove list item from list
        const listItem = document.querySelector(`.planet-list-item.${planet}`);
        
        if (listItem) {
            dropdownModifier.target.removeChild(listItem);
        }

        if (!document.querySelector(".divider").nextElementSibling) {
            dropdownModifier.createPlaceholder();
        }
        
        // Recalculate dropdown dimension
        dropdownModifier.refresh();

        // Delete planet from local stroage
        dropdownModifier.deletePlanetEntry(planet);
    },
    createPlaceholder: function() {
        const liEl = document.createElement("li");
        liEl.classList.add("placeholder");
        liEl.setAttribute("style", "text-align: center");

        const pEl= document.createElement("p");
        pEl.setAttribute("style", "color: #999999");
        pEl.textContent = "No Search History Found";

        liEl.appendChild(pEl);
        dropdownModifier.target.appendChild(liEl);
    },
    clearPlaceholder: function() {
        // Remove placeholder
        const placeholderEl = document.querySelector(".placeholder");
        if (placeholderEl) {
            placeholderEl.parentNode.removeChild(placeholderEl);
        }
    },
    refresh: function() {
        const elem = M.Dropdown.getInstance(document.querySelector(".dropdown-trigger"));
        elem.recalculateDimensions();
    },
    showErr: function(bool) {
        document.querySelector(".errMsg").style.display = bool ? "block" : "none";
        dropdownModifier.refresh();
    },
    setup: function(planets) {
        // Setup dropdown
        if(planets.length !== 0) {
            dropdownModifier.clearPlaceholder();
            for (pl of planets){
                dropdownModifier.addItem(pl)
            };
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Initialize dropdown
    var elem = document.querySelector(".dropdown-trigger");
    M.Dropdown.init(elem, {
        coverTrigger: false,
        closeOnClick: false,
        hover: true
    });
    let planetsSearched = localStorage.getItem("planetsSearched");
    // Render search history to dropdown list
    if (planetsSearched) {
        const planetsArr = planetsSearched.split(",");
        dropdownModifier.setup(planetsArr);
    }
    
});

document.getElementById("searchBtn").addEventListener("click", function() {
    // Get planet input
    const planet = document.getElementById("planetInput").value.toLowerCase();
    const validName = planetNames[planet];

    // Display Error Message ?
    if (!validName){
        dropdownModifier.showErr(true);
        return;
    }
    dropdownModifier.showErr(false);

    // Update LocalStorage
    dropdownModifier.addPlanetEntry(planet);

    // Redirect to indicated planet page
    window.location = `./${planet}.html`;
})

document.addEventListener("keydown", function(event) {
    // Trigger searchBtn click event when "Enter" key pressed
    if (event.code === "Enter") {
        document.getElementById("searchBtn").click();
    }
})