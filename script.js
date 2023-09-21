const accesskey = "wfBa0GjWWokd0hsiuy2BTlrZ7rGnJ2cpn7QszW6tc4s";

const formel = document.querySelector("form");
const inputel = document.getElementById("search");
const searchresult = document.querySelector(".search-result");
const showmore = document.getElementById("showmore");

let inputdata = "";
let page = 1;

async function searchimg() {
  inputdata = inputel.value;
  const url = `https://api.unsplash.com/search/photos/?page=${page}&query=${inputdata}&client_id=${accesskey}`;
  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  if (page === 1) {
    searchresult.innerHTML = "";
  }

  results.map((result) => {
    const imagewrapper = document.createElement("div");
    imagewrapper.classList.add("result"); // Corrected class name
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imagelink = document.createElement("a");
    imagelink.href = result.links.html;
    imagelink.target = "_blank";
    imagelink.textContent = result.alt_description;

    imagewrapper.appendChild(image);
    imagewrapper.appendChild(imagelink);
    searchresult.appendChild(imagewrapper);
  });

  page++;

  if (results.length > 0) {
    showmore.style.display = "block";
  } else {
    showmore.style.display = "none";
  }
}

formel.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchimg();
});

showmore.addEventListener("click", () => {
  searchimg();
});
