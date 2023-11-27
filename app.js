function performSearch(){
    const searchQuery = document.getElementById('search-box').value.trim();
    if (!searchQuery) {
        console.error('Search query is empty');
        return;
    }
    const url = `https://api.watchmode.com/v1/search/?apiKey=Qy9ey3Mff5Cc8riipG4NS05mwjVFZqiNPQPcOPf2&search_field=name&search_value=${encodeURIComponent(searchQuery)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const resultsContainer = document.createElement('div');
            data.title_results.forEach(title => {
              const titleDiv = document.createElement('div');
              titleDiv.innerHTML = `
                <h3>${title.name}</h3>
                <p>Type: ${title.type}</p>
              `;
              resultsContainer.appendChild(titleDiv);
            });
            
            // Append the resultsContainer to a specific part of your page, e.g., below the search box
            document.querySelector('.search-results').appendChild(resultsContainer);
          })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

document.getElementById('button-addon2').addEventListener('click', performSearch);

document.getElementById('search-box').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});