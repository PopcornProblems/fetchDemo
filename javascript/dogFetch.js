const apiUrl = "https://dog.ceo/api/breeds/list/all";

const populateBreeds = () => {
    const breedsContainer = document.getElementById("breedsContainer");

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const breeds = Object.keys(data.message);
            breeds.forEach(breed => {
                const label = document.createElement('label');
                label.textContent = breed;

                const checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.name = "breeds[]"; // Use an array for multiple selection
                checkbox.value = breed;

                label.appendChild(checkbox);
                breedsContainer.appendChild(label);
            });
        })
        .catch(error => {
            console.error('Error fetching breed data:', error);
        });
};

const fetchDogPhotos = (breeds) => {
    // Clear previous photos
    photoContainer.innerHTML = "";

    breeds.forEach(breed => {
        // Make an API request for photos of the current breed
        const photoUrl = `https://dog.ceo/api/breed/${breed}/images/random/3`; // Change the number to the desired number of photos
        fetch(photoUrl)
            .then(response => response.json())
            .then(data => {
                const photos = data.message;
                // Display photos for the current breed
                photos.forEach(photoUrl => {
                    const img = document.createElement('img');
                    img.src = photoUrl;
                    img.alt = breed;
                    photoContainer.appendChild(img);
                });
            })
            .catch(error => {
                console.error(`Error fetching photos for ${breed}:`, error);
            });
    });
};

const handleSubmit = (event) => {
    event.preventDefault();
    const selectedBreeds = Array.from(document.querySelectorAll("input[name='breeds[]']:checked")).map(checkbox => checkbox.value);
    
    // Fetch and display dog photos for selected breeds
    fetchDogPhotos(selectedBreeds);
};

document.getElementById("breedForm").addEventListener("submit", handleSubmit);

const photoContainer = document.querySelector(".photo-container");

window.addEventListener("load", populateBreeds);