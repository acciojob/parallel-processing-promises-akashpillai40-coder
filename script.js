const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// download single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject("Error loading " + url);
  });
}

// main function
function downloadImages() {
  output.innerHTML = "";

  const promises = images.map((img) => downloadImage(img.url));

  Promise.all(promises)
    .then((results) => {
      results.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

btn.addEventListener("click", downloadImages);