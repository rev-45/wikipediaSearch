let searchInputEl = document.getElementById('searchInput');
let searchResultsEl = document.getElementById('searchResults');
let spinnerEl = document.getElementById('spinner');

function createAndAppendResults(result) {
    let {
        link,
        title,
        description
    } = result;
    let searchResultsItem = document.createElement('div');
    searchResultsItem.classList.add('result-item');
    let titleEl = document.createElement('a');
    titleEl.href = link;
    titleEl.textContent = title;
    titleEl.target = '_blank';
    titleEl.classList.add('result-title');
    searchResultsItem.appendChild(titleEl);

    let titleBreak = document.createElement('br');
    searchResultsItem.appendChild(titleBreak);

    let linkEl = document.createElement('a');
    linkEl.href = link;
    linkEl.textContent = link;
    linkEl.classList.add('result-url');
    linkEl.target = '_blank';
    searchResultsItem.appendChild(linkEl);

    let linkBreak = document.createElement('br');
    searchResultsItem.appendChild(linkBreak);

    let descriptionEl = document.createElement('p');
    descriptionEl.textContent = description;
    descriptionEl.classList.add('link-description');
    searchResultsItem.appendChild(descriptionEl);

    searchResultsEl.appendChild(searchResultsItem);
}




function search(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = '';
        let inputVal = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + inputVal;
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
                spinnerEl.classList.add("d-none");
                for (let result of search_results) {
                    createAndAppendResults(result);
                }
            });
    }
}


searchInputEl.addEventListener("keydown", search);