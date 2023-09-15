const apiKey = "Your API KEY";

const form = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMoreButton = document.getElementById("show-more");


async function searchImages() {
    let inputData = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    const results = data.results;

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");

        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;

        imageWrapper.appendChild(image);
        searchResults.appendChild(imageWrapper);
    });

    page++;

    if (page > 1) {
        showMoreButton.style.display = "block";
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMoreButton.addEventListener("click", () => {
    searchImages();
});