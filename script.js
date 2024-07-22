// Hamburger Navigation Bar (Under 768 px)
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    hamburger.classList.toggle('active');
});

// Home Page
document.addEventListener("DOMContentLoaded", function() {
    // Gallery Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const carItems = document.querySelectorAll('.car-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;

            carItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Featured Cars Slider
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(-${index * 100}%)`;
            dots[i].classList.remove('active');
            if (i === index) {
                dots[i].classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    dotsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('dot')) {
            const dotIndex = Array.from(dots).indexOf(event.target);
            currentSlide = dotIndex;
            showSlide(currentSlide);
        }
    });

    showSlide(currentSlide); // Initial display
});

// Login Page
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const dob = document.getElementById('dob').value;
        const genderMale = document.getElementById('male').checked;
        const genderFemale = document.getElementById('female').checked;
        const terms = document.getElementById('terms').checked;

        let hasError = false;

        // Clear previous error messages
        document.getElementById('name-error').textContent = '';
        document.getElementById('email-error').textContent = '';
        document.getElementById('password-error').textContent = '';
        document.getElementById('confirm-password-error').textContent = '';
        document.getElementById('dob-error').textContent = '';
        document.getElementById('gender-error').textContent = '';
        document.getElementById('terms-error').textContent = '';

        // Validate name length
        if (name.length < 3) {
            document.getElementById('name-error').textContent = 'Name must be at least 3 characters long.';
            hasError = true;
        }

        // Validate email
        const emailParts = email.split('@');
        if (emailParts.length !== 2 || emailParts[1] !== 'gmail.com' || emailParts[0].length < 3) {
            document.getElementById('email-error').textContent = 'Email must be a valid Gmail address with at least 3 characters before "@gmail.com".';
            hasError = true;
        }

        // Validate password (must contain at least one letter and one number)
        let hasLetter = false;
        let hasNumber = false;
        for (let i = 0; i < password.length; i++) {
            if (isNaN(password[i])) {
                hasLetter = true;
            } else {
                hasNumber = true;
            }
        }
        if (!hasLetter || !hasNumber) {
            document.getElementById('password-error').textContent = 'Password must contain both letters and numbers.';
            hasError = true;
        }

        // Validate password confirmation
        if (password !== confirmPassword) {
            document.getElementById('confirm-password-error').textContent = 'Passwords do not match.';
            hasError = true;
        }

        // Validate date of birth (minimum 6 years old)
        const dobDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        const monthDifference = today.getMonth() - dobDate.getMonth();
        if (!dob) {
            document.getElementById('dob-error').textContent = 'Please select your birth date.';
            hasError = true;
        }
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }
        if (age < 6) {
            document.getElementById('dob-error').textContent = 'You must be at least 6 years old.';
            hasError = true;
        }

        // Validate gender
        if (!genderMale && !genderFemale) {
            document.getElementById('gender-error').textContent = 'Please select your gender.';
            hasError = true;
        }

        // Validate terms and conditions
        if (!terms) {
            document.getElementById('terms-error').textContent = 'You must agree to the terms and conditions.';
            hasError = true;
        }

        if (hasError) {
            console.log('Validation failed');
            return false;
        }

        console.log('Validation passed');
        // If all validations pass, submit the form programmatically
        window.location.href = 'index.html';  // Redirect to the home page
        return true;
    });
});

// CARS PAGE
document.addEventListener("DOMContentLoaded", function() {
    // Gallery Filtering
    const brandSelect = document.getElementById('brand-select');
    const statusCheckboxes = document.querySelectorAll('.status-checkbox');
    const carSearch = document.getElementById('car-search');
    const carItems = document.querySelectorAll('.cars-item');
    const carsFound = document.getElementById('cars-found');

    function filterCars() {
        const selectedBrand = brandSelect.value;
        const selectedStatuses = Array.from(statusCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        const searchText = carSearch.value.toLowerCase();

        let count = 0;
        carItems.forEach(item => {
            const brand = item.dataset.brand;
            const status = item.dataset.status;
            const name = item.querySelector('.car-details h3').textContent.toLowerCase();

            const matchesBrand = selectedBrand === 'all' || brand === selectedBrand;
            const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(status);
            const matchesSearchText = name.includes(searchText);

            if (matchesBrand && matchesStatus && matchesSearchText) {
                item.style.display = 'flex';
                count++;
            } else {
                item.style.display = 'none';
            }
        });

        carsFound.textContent = `${count} cars found`;
    }

    brandSelect.addEventListener('change', filterCars);
    statusCheckboxes.forEach(checkbox => checkbox.addEventListener('change', filterCars));
    carSearch.addEventListener('input', filterCars);

    // Initialize car list on page load
    filterCars();
});

// Brand Carousels
var copy = document.querySelector(".logos-slide").cloneNode(true);
document.querySelector(".logos").appendChild(copy);

// Showroom Carousels
let currentSlide = 0;

function showSlide(index) {
    const slides = document.getElementsByClassName('carousel-item');
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[currentSlide].style.display = 'block';
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

document.addEventListener('DOMContentLoaded', function () {
    showSlide(currentSlide);
});
