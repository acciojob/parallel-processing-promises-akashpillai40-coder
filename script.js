const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Step 1: Function to download ONE image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img); // success
    img.onerror = () => reject("Failed to load: " + url); // error
  });
}

// Step 2: Main function
function downloadImages() {
  // Clear old data
  output.innerHTML = "";
  errorDiv.textContent = "";

  // Show loading
  loading.style.display = "block";

  // Step 3: Convert images → promises
  const promises = images.map((img) => downloadImage(img.url));

  // Step 4: Run all together
  Promise.all(promises)
    .then((results) => {
      // Hide loading
      loading.style.display = "none";

      // Step 5: Show images
      results.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((err) => {
      // Hide loading
      loading.style.display = "none";

      // Step 6: Show error
      errorDiv.textContent = err;
    });
}

// Step 7: Button click
btn.addEventListener("click", downloadImages);