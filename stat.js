const url = "https://www.balldontlie.io/api/v1/players";

var playersContainer = document.getElementById("player-data");
var statContainer = document.getElementById("stat-data");
var searchContainer = document.getElementById("search-data");
var searchBtn = document.getElementById("search-btn");
var playerStatsSearchbtn = document.getElementById("player-search-btn");

searchBtn.addEventListener("click", () => {
    statContainer.innerHTML = "";
    var startYear = document.getElementById("startingSeason").value;
    var endYear = document.getElementById("endingSeason").value;
    var searchUrl = `https://www.balldontlie.io/api/v1/stats?seasons[]=${startYear}&seasons[]=${endYear}`;
    fetch(searchUrl)
        .then((res) => res.json())
        .then((resJson) => {
            var stats = resJson.data;
            stats.forEach((stat) => {
                // append to div
                var innerhtml = `<div class="col-md-4 m-1">
                <div class="card">
                    <div class="card-header pv">
                    <h4 class="card-title"> ${stat.player.first_name} ${stat.player.last_name}</h4>
                    </div>
                    <hr>
                    <div class="card-body pv">
                        <p class="my-1">Assists: ${stat.ast}</p>
                        <p class="my-1">Blocks: ${stat.blk}</p>
                        <p class="my-1">Offensive rebounds: ${stat.oreb}</p>
                        <p class="my-1">Defensive rebounds: ${stat.dreb}</p>
                        <p class="my-1">3pt percentage: ${stat.fg3_pct}</p>
                        <p class="my-1">3pt average: ${stat.fg3a}</p>
                        <p class="my-1">Field goal percentage: ${stat.fg_pct}</p>
                        <p class="my-1">Field goal average: ${stat.fga}</p>
                        <p class="my-1">Turnovers: ${stat.turnover}</p>
                    </div>
                    <hr>
                    <div class="card-footer text-muted">
                        <em>Played on: ${stat.game.date}</em>
                    </div>
                </div>
            </div>`;

                statContainer.innerHTML += innerhtml;
            });
        })
        .catch((err) => console.log(err));
});

playerStatsSearchbtn.addEventListener("click", () => {
    searchContainer.innerHTML = "";
    var searchTerm = document.getElementById("playerName").value;

    if (searchTerm == "" || searchTerm == undefined || searchTerm == false) {
        alert("Player name cannot be empty")
        return
    }
    console.log(searchTerm)
    var searchUrl = `${url}?search=${searchTerm}`;
    var playerIds = [];
    fetch(searchUrl)
        .then((res) => res.json())
        .then((resJson) => {
            var players = resJson.data;
            console.log(players)
            players.forEach((player) => {
                playerIds.push(player.id);
            });

            var playerIdsString = "";

            playerIds.forEach((id) => {
                playerIdsString += `&player_ids[]=${id}`;
            });

            console.log(playerIds)

            var startYear = document.getElementById("statStart").value;
            var currentUrl = `https://www.balldontlie.io/api/v1/stats?seasons[]=${startYear}${playerIdsString}&per_page=100`;

            fetch(currentUrl)
                .then((res) => res.json())
                .then((resJson) => {
                    var stats = resJson.data;
                    stats
                        .forEach((stat) => {
                            // append to div
                            var innerhtml = `<div class="col-md-4 m-1">
                <div class="card">
                    <div class="card-header pv">
                       <h4 class="card-title"> ${stat.player.first_name} ${stat.player.last_name}</h4>
                    </div>
                    <div class="card-body pv">
                        <p class="my-1">Assists: ${stat.ast}</p>
                        <p class="my-1">Blocks: ${stat.blk}</p>
                        <p class="my-1">Offensive rebounds: ${stat.oreb}</p>
                        <p class="my-1">Defensive rebounds: ${stat.dreb}</p>
                        <p class="my-1">3pt percentage: ${stat.fg3_pct}</p>
                        <p class="my-1">3pt average: ${stat.fg3a}</p>
                        <p class="my-1">Field goal percentage: ${stat.fg_pct}</p>
                        <p class="my-1">Field goal average: ${stat.fga}</p>
                        <p class="my-1">Turnovers: ${stat.turnover}</p>
                    </div>
                    <hr>
                    <div class="card-footer text-muted">
                        <small>Played on: ${stat.game.date}</small>
                    </div>
                </div>
            </div>`;

                            searchContainer.innerHTML += innerhtml;
                        })

                }).catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));


});
// fetchAndRender(url, playersContainer, 'col-md-3');