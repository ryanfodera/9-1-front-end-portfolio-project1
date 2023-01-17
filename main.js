const url = "https://www.balldontlie.io/api/v1/players";

var count = 1;

var playersContainer = document.getElementById("player-data");
var searchContainer = document.getElementById("search-data");
var searchBtn = document.getElementById("search-btn");
var btnLoadMore = document.getElementById("btn-more");

searchBtn.addEventListener('click', () => {
    var searchTerm = document.getElementById("playerName").value;
    if (searchTerm == "" || searchTerm == undefined || searchTerm == false) {
        alert("Player name cannot be empty")
        return
    }

    console.log("proceeding")
    var searchUrl = `${url}?search=${searchTerm}`;
    fetchAndRender(searchUrl, searchContainer, 'col-12');
    console.log("complete")
});

btnLoadMore.addEventListener('click', () => {
    count = count + 1;
    var pageSearchUrl = `${url}?&page=${count}`;
    fetchAndRender(pageSearchUrl, playersContainer, 'col-md-3')
});

function fetchAndRender(url, element, size) {
    console.log("proceeding 2")
    element.innerHTML = "";
    fetch(url)
        .then((res) => res.json())
        .then((resJson) => {
            console.log("fetched Players")
            var players = resJson.data;
            console.log("fetched Players", players)
            console.log(url)
            players.forEach((player) => {
                // append to div
                var innerhtml = `<div class="${size} p-2"><div class="card m-2">
            <div class="card-header pv">
                <h4 class="card-title m-0">${player.first_name} ${player.last_name} <span class="badge badge-primary">${player.position}</span></h4>
            </div>        
            <hr>    
            <div class="card-body pv">
                <h5 class="card-title my-1">${player.team.full_name} (${player.team.abbreviation})</h5>
                <p class="my-1">Conference: ${player.team.conference}</p>
                <p class="my-1">City: ${player.team.city}</p>
            </div>
            </div>
        </div>`;
                console.log("added: ", player)

                element.innerHTML += innerhtml;
            });
        })
        .catch((err) => console.log(err));
}

fetchAndRender(url, playersContainer, 'col-md-3');