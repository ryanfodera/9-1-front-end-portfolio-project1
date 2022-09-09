const url = 'https://www.balldontlie.io/api/v1/players'

fetch(url)
.then((res) => res.json())
.then((resJson) => console.log(resJson))
.catch((err) => console.log(err));