import fetch from 'node-fetch';

let url = 'https://api.watchmode.com/v1/search/?apiKey=Qy9ey3Mff5Cc8riipG4NS05mwjVFZqiNPQPcOPf2&search_field=name&search_value=Ed%20Wood';

fetch(url, { method: 'Get' })
    .then((res) => res.json())
    .then((json) => {
        console.log(json);
    });