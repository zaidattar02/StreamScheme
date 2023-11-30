function performSearch() {
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
        const resultsContainer = document.querySelector('.search-results');
        resultsContainer.innerHTML = ''; // Clear previous results
        data.title_results.forEach(title => {
          const titleDiv = document.createElement('div');
          titleDiv.classList.add('result-item'); 

          titleDiv.innerHTML = `
            <h3>${title.name}</h3>
            <p>Type: ${title.type}</p>
            <button class="btn btn-primary details-button" data-title-id="${title.id}">Details</button>
            <div class="details-content" id="details-${title.id}" style="display: none;"></div>
          `;
          resultsContainer.appendChild(titleDiv);
        });
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

  document.querySelector('.search-results').addEventListener('click', function(event) {
    if (event.target.classList.contains('details-button')) {
      const titleId = event.target.getAttribute('data-title-id');
      const detailsContentDiv = document.getElementById(`details-${titleId}`);
      
      if (detailsContentDiv.innerHTML === '') {
        // Details haven't been fetched yet
        const titleDetailsUrl = `https://api.watchmode.com/v1/title/${titleId}/details/?apiKey=Qy9ey3Mff5Cc8riipG4NS05mwjVFZqiNPQPcOPf2&append_to_response=sources`;
        
        fetch(titleDetailsUrl)
          .then(response => response.json())
          .then(detailsData => {
            let sourcesListHTML = '';
            // let sourcesSet = new Set();
            let uniqueSources = [];
            
            if(detailsData.sources && detailsData.sources.length > 0) {
                sourcesListHTML = '<ul class="sources">';
                
                detailsData.sources.forEach(source => {
                    let sourceIdentifier = `${source.name} (${source.type}) <a href="${source.web_url}" target="_blank">link</a>`; // Create a unique identifier for each source
                    if (!uniqueSources.includes(sourceIdentifier)) {
                        uniqueSources.push(sourceIdentifier); // Add to the array if not already present
                    }
                });
            
                // Map over the uniqueSources array to create list items
                sourcesListHTML += uniqueSources.map(name => `<li>${name}</li>`).join('');
                sourcesListHTML += '</ul>';
            }

            detailsContentDiv.innerHTML = `
              <img src="${detailsData.poster}" alt="${detailsData.title} Poster" />
              <p> Genre: ${detailsData.genre_names}</p>
              <p>Plot Overview: ${detailsData.plot_overview}</p>
              <p>IMDb Rating: ${detailsData.user_rating}</p>
              <b> <p> Where to watch: </p> </b>
              ${sourcesListHTML}
            `;
            detailsContentDiv.style.display = 'block';
          })
          .catch(error => {
            console.error('Error fetching title details:', error);
          });
      } else {
        // Toggle visibility of details
        detailsContentDiv.style.display = detailsContentDiv.style.display === 'none' ? 'block' : 'none';
      }
    }
  });
  