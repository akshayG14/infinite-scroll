const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API: https://unsplash.com/documentation
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Fetch photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

// Check if all images are loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    imagesLoaded = 0;
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
  totalImages = photosArray.length;
  // iterate through each photo object
  photosArray.forEach((photo) => {
    // creating <a> to link to unsplash
    const item = document.createElement("a");
    setAttributes(item, { href: photo.links.html, target: "_blank" });
    // create image for a photo
    const image = document.createElement("img");
    setAttributes(image, { src: photo.urls.regular, alt: photo.alt_description, title: photo.alt_description });
    // Event listener, check when each image is loaded
    image.addEventListener("load", imageLoaded);
    item.appendChild(image);
    imageContainer.appendChild(item);
  });
}

// check to see if scrolling near bottom of page, if so load more photos
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// onInit
getPhotos();
