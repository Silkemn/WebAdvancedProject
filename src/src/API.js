export async function APIconnectie() {
    let page = 1;
    const api_key = "live_0fVuf0Q22tVHszoeEtNZm40Y0zdJ2ku58i9Rl9h5DwRbFiED7KoNPhe1xIvtmSbK";
    //elementen selecteren
    const refreshButton = document.querySelector("#refreshButton");
    const showfavorites = document.getElementById("showfavorites");
    const breedSelect = document.getElementById("breedSelect");
    const breedInfo = document.getElementById("breedInfo");
    const grid = document.getElementById("grid");

    let breeds = [];

    // favorieten 
    function getFavorites() {
        return JSON.parse(localStorage.getItem("favorites") || "[]");
    }

    function setFavorites(favorites) {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    function toggleFavorite(id) {
        let favorites = getFavorites();
        const index = favorites.indexOf(id);
        if (index > -1) {
            favorites.splice(index, 1);
        } else {
            favorites.push(id);
        }
        setFavorites(favorites);
    }



    function favoriteClickHandler(event) {
        const button = event.currentTarget;
        const id = button.dataset.id;
        toggleFavorite(id);
    }

    function activateFavoriteButtons() {
        document.querySelectorAll(".favorite").forEach(button => {
            button.addEventListener("click", function () {
                button.classList.toggle("favorited")

                const id = button.dataset.id
                toggleFavorite(id)
            })
        })
    }



    async function getCats() {
        grid.innerHTML = `<div class="Laden" > Loading... </div>`;
        breedInfo.innerHTML = "";
        const url = `https://api.thecatapi.com/v1/images/search?limit=27&page=` + page;
        const api_key = "live_0fVuf0Q22tVHszoeEtNZm40Y0zdJ2ku58i9Rl9h5DwRbFiED7KoNPhe1xIvtmSbK"


        fetch(url, {
            headers: {
                'x-api-key': api_key
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let imagesData = data;

                document.getElementById('grid').innerHTML = "";
                imagesData.map(function (imageData) {

                    let gridCell = document.createElement('div');
                    gridCell.classList = "col col-lg";
                    gridCell.innerHTML = `
                    <button class="favorite" data-id="${data.id}">❤️</button>                
                    <img src="${imageData.url}">`


                    document.getElementById('grid').appendChild(gridCell);

                });
                document.querySelectorAll(".favorite").forEach(button => {
                    button.addEventListener("click", function () {
                        button.classList.toggle("favorited")

                        const id = button.dataset.id
                        toggleFavorite(id)
                    })
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        activateFavoriteButtons();
    }
    getCats();


    //  display favorites 
    async function displayFavorites() {
        grid.innerHTML = `<div class="Laden" > Loading... </div>`;
        const favorites = getFavorites();

        for (const favorite of favorites) {
            const url = `https://api.thecatapi.com/v1/images/${favorite}`;
            const res = await fetch(url, {
                headers: { "x-api-key": api_key },
            });
            const data = await res.json();


            const breed = data.breeds?.[0];
            const gridCell = document.createElement("div");
            gridCell.className = "col col-lg";
            gridCell.innerHTML = `
        <button class="favorite favorited" data-id="${data.id}">❤️</button>
        <img src="${data.url}" alt="cat" />
        ${breed ? `<p><strong>${breed.name}</strong></p>` : ""}
      `;
            grid.appendChild(gridCell);
        }

        activateFavoriteButtons();
    }




    // Rassen ophalen 
    async function loadBreeds() {
        const res = await fetch("https://api.thecatapi.com/v1/breeds");
        breeds = await res.json();
        breeds.forEach((breed) => {
            const option = document.createElement("option");
            option.value = breed.id;
            option.textContent = breed.name;
            breedSelect.appendChild(option);
        });
    }

    //Zoekfunctie naar rassen 
    const searchInput = document.getElementById("searchBreed");
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();

        const matchedBreed = breeds.find(breed => breed.name.toLowerCase().includes(query));

        if (matchedBreed) {
            breedSelect.value = matchedBreed.id;
            loadBreedImages();
        } else {
            grid.innerHTML = "<p>No breed found.</p>";
            breedInfo.innerHTML = "";
        }
    });
    // filteren op ras 
    async function loadBreedImages() {
        const breedId = breedSelect.value;
        if (!breedId) return;

        const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=27`;
        const res = await fetch(url, {
            headers: { "x-api-key": api_key },
        });
        const data = await res.json();

        const breedData = data[0]?.breeds[0];
        breedInfo.innerHTML = breedData
            ? `<div class="breedInformation"> 
      <h2>${breedData.name}</h2>
      <p>${breedData.description}</p>
      <p><strong>Temperament:</strong> ${breedData.temperament}</p> </div> `
            : "";

        grid.innerHTML = "";
        data.forEach((imageData) => {
            const breed = imageData.breeds?.[0];
            const gridCell = document.createElement("div");
            gridCell.className = "col col-lg";
            gridCell.innerHTML = `
        <button class="favorite" data-id="${imageData.id}">❤️</button>
        <img src="${imageData.url}" alt="cat" />
        ${breed ? `<p><strong>${breed.name}</strong></p>` : ""}
      `;
            grid.appendChild(gridCell);
        });

        activateFavoriteButtons();
    }


    // events 
    refreshButton.addEventListener("click", () => {
        page++;
        getCats();
    });

    showfavorites.addEventListener("change", () => {
        if (showfavorites.checked) {
            displayFavorites();
        } else {
            getCats();
        }
    });

    breedSelect.addEventListener("change", () => {
        if (breedSelect.value) {
            loadBreedImages();
        } else {
            getCats();
        }
    });

    loadBreeds();
    getCats();
}


