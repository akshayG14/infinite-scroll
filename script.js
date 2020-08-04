console.log("JS loaded!!!");

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

// Unsplash API: https://unsplash.com/documentation
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Fetch photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    // console.log(photosArray);
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

// create elements for links and photos... Adding it to DOM
function displayPhotos() {
  // iterate through each photo object
  photosArray.forEach((photo) => {
    // creating <a> to link to unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    // create image for a photo
    const image = document.createElement("img");
    image.setAttribute("src", photo.urls.regular);
    image.setAttribute("alt", photo.alt_description);
    image.setAttribute("title", photo.alt_description);
    // place img within anchor element... as a whole will be placed within image-container
    item.appendChild(image);
    imageContainer.appendChild(item);
  });
}

// onInit
getPhotos();
