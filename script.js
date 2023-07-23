//  access
const accessKey = 'iDW0up-G96bkDL8ycJLkys72YWv5JLImF3DOcL2Nbk8';
// forms
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
// search results
const resultsEl = document.querySelector(".search-results");
// show more
const showMore = document.getElementById("show-more-button")

// Devise: 
//      Read input data and create dynamic variable. Use this dynamic variable to fetch data from unsplash
//      Get results of fetch and and use method to create img source element within a wrapper
// Code:

let inputData; // Query data
let page = 1;
const getImages = async () => {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if(page === 1) resultsEl.innerHTML = "";

    // for each result, create image element inside of an imageWrapper div
    results.map((result) => {
        // create div rapper with class name 'image-wrapper'
        const imageWrapper = document.createElement('div');
        imageWrapper.setAttribute('id', 'image-wrapper');
        imageWrapper.setAttribute('class', 'column');
        // create img element and set its src to photo address from results data
        const imageEl = document.createElement('img');
        imageEl.setAttribute('id', 'photo');
        imageEl.src = result.urls.full;
        //create wrapper for text block div
        const textBlockWrapper = document.createElement('div');
        textBlockWrapper.setAttribute('class', 'text-block');
        // create div for description text-block
        const textBlock = document.createElement('p');
        textBlock.innerHTML = result.alt_description;
        // append image and text wrappers to resultsEl parent
        resultsEl.appendChild(imageWrapper)
        // append imageEl with updated src as child to image wrapper and append textBlock as child to textBlockWrapper 
        imageWrapper.appendChild(imageEl)
        imageWrapper.appendChild(textBlockWrapper)
        textBlockWrapper.appendChild(textBlock);
        console.log("results: ", results)
    });

    page++

}

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    getImages();
    showMore.hidden = false;
})


showMore.addEventListener('click', () => {
    getImages();
})