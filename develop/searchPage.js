const searchListModifier = {
    target: document.querySelector(".planet-list"),
    addPlanetEntry: function(planet) {
        // Get existing planets in local storage
        const planetsSearched = localStorage.getItem("planetsSearched");
        let planetsArr = planetsSearched ? planetsSearched.split(",") : [];

        // If planet not already exists in list, add it
        if (!planetsArr.includes(planet)){
            planetsArr.unshift(planet);
            localStorage.setItem("planetsSearched", planetsArr.toString());
        }
        window.location = `./${planet}.html`;
    },
    addItem: function(planet) {
        const divEl = document.createElement("div");
        divEl.setAttribute("href", `./${planet}.html`);
        divEl.classList.add("collection-item", planet);
        divEl.setAttribute("style", "display: flex; cursor: pointer");
        divEl.addEventListener("click", function() {
            window.location = `./${planet}.html`;
        })
        
        const name = planet.replace(planet.charAt(0), planet.charAt(0).toUpperCase());
        const nameSpanEl = document.createElement("span");
        nameSpanEl.textContent = name;

        const iconSpanEl = document.createElement("span");
        iconSpanEl.setAttribute("style", "margin-left: auto");

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("material-icons");
        deleteIcon.setAttribute("style", "font-size: 16px;");
        deleteIcon.textContent = "delete";
        deleteIcon.addEventListener("click", function(event){
            event.stopPropagation();
            searchListModifier.deleteItem(planet);
        });
        iconSpanEl.append(deleteIcon);
        divEl.append(nameSpanEl, iconSpanEl);
        searchListModifier.target.appendChild(divEl);
        
        searchListModifier.displayList(true);
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
        
        const planetItem = document.querySelector(`.collection-item.${planet}`);
        searchListModifier.target.removeChild(planetItem);
        searchListModifier.deletePlanetEntry(planet);

        if (!searchListModifier.target.firstElementChild) {
            searchListModifier.displayList(false);
        }
    },
    displayList: function(bool) {
        searchListModifier.target.style.display = bool ? "block" : "none";
    },
    setup: function(planets) {
        if(planets.length !== 0) {
            for (pl of planets){
                searchListModifier.addItem(pl)
            };
        }
    }
}

document.getElementById("search").addEventListener("click", function(event) {
    const planet = document.getElementById("searchText").value.toLowerCase();
    if (!planetNames[planet]) {
        document.querySelector(".errMsg").style.display = "block";
        return;
    }
    document.querySelector(".errMsg").style.display = "none";
    searchListModifier.addPlanetEntry(planet);
});

document.addEventListener("keydown", function(event) {
    if (event.code === "Enter") {
        document.getElementById("search").click();
    }
})

document.addEventListener("DOMContentLoaded", function() {
    let planetsSearched = localStorage.getItem("planetsSearched");
    if (planetsSearched) {
        const planetsArr = planetsSearched.split(",");
        searchListModifier.setup(planetsArr);
    } else {
        searchListModifier.displayList(false);
    }
});
