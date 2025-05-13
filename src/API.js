export async function APIconnectie() {

    let page = 1
    const refreshButton = document.querySelector("#refreshButton");
    refreshButton.addEventListener("click", function(){
        page ++
        getCats();
    })
      
    //Data ophalen van favorites 
    function getFavorites() {
        return JSON.parse(localStorage.getItem('favorites') || '[]');
    }

    // Data van favorites opslaan 
    function setFavorites(favorites) {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    //Toggled een favoriete kat
    function toggleFavorite(id) {
        let favorites = getFavorites();
        let i = favorites.indexOf(id);
        if(i >-1){
            favorites.splice(i,1);

        }else {
            favorites.push(id); 
        }
        setFavorites(favorites);
        display()
    }

    function display(){
        let favorites = getFavorites();
        document.querySelectorAll(".favorite").forEach(button =>{
            let id = parseInt(button.dataset.id);
            if (favorites.includes(id)){
                button.classList.add("favorited");

            }
        })
    }

    async function getCats() {
        const url = `https://api.thecatapi.com/v1/images/search?limit=27&page=`+page;
        const api_key = "live_0fVuf0Q22tVHszoeEtNZm40Y0zdJ2ku58i9Rl9h5DwRbFiED7KoNPhe1xIvtmSbK"


        fetch(url,{headers: {
            'x-api-key': api_key
            }})
        .then((response) => {
        return response.json();
        })
        .then((data) => {
        let imagesData = [];
        if (Array.isArray(data)) {
            imagesData = data;
        } else if (data.results) {
            imagesData = data.results;
        } else {
            imagesData = [data];
        }
        
        document.getElementById('grid').innerHTML="";
        imagesData.map(function(imageData) {
                
            let gridCell = document.createElement('div');
            gridCell.classList = "col col-lg";
            gridCell.innerHTML = `
                <button class="favorite" data-id=${imageData.id}>Favorite</button>
                <img src="${imageData.url}">
                
            `

            
            document.getElementById('grid').appendChild(gridCell);
            
            });
            document.querySelectorAll(".favorite").forEach(button => {
                button.addEventListener("click", function(){
                    button.classList.toggle("favorited")
                    
                    const id = button.dataset.id
                    toggleFavorite(id)
                })
            })
        })
        .catch(function(error) {
        console.log(error);
        });
    }
    getCats();
    console.log(getFavorites())
}
