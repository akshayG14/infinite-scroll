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

// helper function to set attributes on DOM elements
function setAttributes(ele, attr) {
  for (const key in attr) {
    ele.setAttribute(key, attr[key]);
  }
}

// create elements for links and photos... Adding it to DOM
function displayPhotos() {
  // iterate through each photo object
  photosArray.forEach((photo) => {
    // creating <a> to link to unsplash
    const item = document.createElement("a");
    setAttributes(item, { href: photo.links.html, target: "_blank" });
    // create image for a photo
    const image = document.createElement("img");
    setAttributes(image, { src: photo.urls.regular, alt: photo.alt_description, title: photo.alt_description });
    item.appendChild(image);
    imageContainer.appendChild(item);
  });
}

// onInit
getPhotos();
