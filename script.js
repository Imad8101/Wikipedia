let searchInputEl = document.getElementById('searchInput');
let searchResultsCont = document.getElementById('searchResults');
let spinnerEl = document.getElementById('spinner');

function createAndAppendSearchResults(result) {
    //creating result item container
    let resultItemEl = document.createElement('div');
    resultItemEl.classList.add('result-item');
    searchResultsCont.appendChild(resultItemEl);
    //creating title element  
    let {
        link,
        title,
        description
    } = result;
    let titleEl = document.createElement('a');
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add('result-title');
    resultItemEl.appendChild(titleEl);

    //creat title br element
    let titleBrEl = document.createElement('br');
    resultItemEl.appendChild(titleBrEl);
    //URL element
    let urlElem = document.createElement('a');
    urlElem.href = link;
    urlElem.target = "_blank";
    urlElem.textContent = link;
    urlElem.classList.add('result-url');
    resultItemEl.appendChild(urlElem);
    //br
    let lineBreakEl = document.createElement('br');
    resultItemEl.appendChild(lineBreakEl);
    //description element 
    let descriptionElem = document.createElement('p');
    descriptionElem.classList.add('link-description');
    descriptionElem.textContent = description;
    resultItemEl.appendChild(descriptionElem);

}

function displayResults(searchResult) {
    spinnerEl.classList.toggle('d-none');
    for (let result of searchResult) {
        createAndAppendSearchResults(result);

    }

}

function searchWiki(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle('d-none');
        searchResultsCont.textContent = "";
        let userInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + userInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }

}

searchInputEl.addEventListener('keydown', searchWiki);