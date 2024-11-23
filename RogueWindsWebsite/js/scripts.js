// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('.faq-item h3').forEach(question => {
    question.addEventListener('click', () => {
        const parent = question.parentElement;
        parent.classList.toggle('active');
    });
});

// Recognize azure//
document.getElementById("imageUpload").addEventListener("change", async (event) => {
    const file = event.target.files[0];

    if (!file) {
        alert("Please upload an image.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // Azure Computer Vision API settings
    const endpoint = "https://https://roguewinds.cognitiveservices.azure.com/.cognitiveservices.azure.com/vision/v3.2/analyze"; // Replace with your endpoint
    const subscriptionKey = "86BsbiBnzDvoohyyXLqpmUEVZhb7wezpKFvO8dAJmwJoHmbmW8jUJQQJ99AKACYeBjFXJ3w3AAAFACOGVanX"; // Replace with your API key

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Ocp-Apim-Subscription-Key": subscriptionKey,
                "Content-Type": "application/octet-stream",
            },
            body: file,
        });

        const data = await response.json();
        console.log(data);

        // Example: Display results in #productSuggestions
        const productSuggestions = document.getElementById("productSuggestions");
        productSuggestions.innerHTML = `
            <h3>Suggested Products:</h3>
            <ul>
                <li>${data.description.captions[0].text}</li>
            </ul>
        `;
    } catch (error) {
        console.error("Error:", error);
        alert("P.S Fixing the issue be back later, Roguewinds");
    }
});


//Voice Commands//
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    if (command.includes("about")) {
        window.location.href = "#about";
    } else if (command.includes("products")) {
        window.location.href = "#products";
    }
};
document.getElementById("voiceSearch").addEventListener("click", () => recognition.start());

function toggleSection(sectionId) {
    const content = document.getElementById(sectionId);

    // Check if the content is already expanded
    if (content.style.maxHeight) {
        content.style.maxHeight = null; // Collapse
    } else {
        // Collapse any other open sections
        const allContents = document.querySelectorAll(".collapsible-content");
        allContents.forEach(section => (section.style.maxHeight = null));

        // Expand the clicked section
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

function toggleContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm.style.display === 'none' || contactForm.style.display === '') {
        contactForm.style.display = 'block';
    } else {
        contactForm.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const reviewsBox = document.querySelector(".reviews-box");
    const reviews = Array.from(reviewsBox.children);

    // Randomize reviews on page load
    reviews.sort(() => Math.random() - 0.5);

    // Append them back to the container in the new order
    reviews.forEach((review) => reviewsBox.appendChild(review));
});


let slideIndex = 0;
showSlides();

// Function to show slides
function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slide");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; // Hide all slides
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1} // Reset to first slide
    slides[slideIndex - 1].style.display = "block"; // Show current slide
    setTimeout(showSlides, 5000); // Change image every 5 seconds
}

// Manual navigation
function plusSlides(n) {
    slideIndex += n - 1; // Adjust index
    showSlides();
}
