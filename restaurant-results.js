const searchParams = JSON.parse(localStorage.getItem('restaurantSearchParams'));
const { filters, prioritised } = searchParams;

const restaurants = [
    {
        name: "Restaurant 1",
        price: 15,
        distance: 2.3,
        cuisine: "Chinese",
        rating: 4.2,
        service: ["Takeaway", "Eat in", "Delivery"],
        lat: 51.5, lon: -0.7,
        img: "images/placeholder.svg"
    },
    {
        name: "Restaurant 2",
        price: 12,
        distance: 4.1,
        cuisine: "Indian",
        rating: 4.5,
        service: ["Eat in", "Delivery"],
        lat: 51.51, lon: -0.71,
        img: "images/placeholder.svg"
    },
    {
        name: "Restaurant 3",
        price: 18,
        distance: 1.8,
        cuisine: "Italian",
        rating: 4.0,
        service: ["Takeaway", "Eat in"],
        lat: 51.49, lon: -0.69,
        img: "images/placeholder.svg"
    },
    {
        name: "Restaurant 4",
        price: 25,
        distance: 3.2,
        cuisine: "British",
        rating: 4.7,
        service: ["Eat in"],
        lat: 51.52, lon: -0.68,
        img: "images/placeholder.svg"
    },
    {
        name: "Restaurant 5",
        price: 35,
        distance: 1.5,
        cuisine: "Japanese",
        rating: 4.8,
        service: ["Eat in", "Takeaway"],
        lat: 51.48, lon: -0.72,
        img: "images/placeholder.svg"
    },
    {
        name: "Restaurant 6",
        price: 10,
        distance: 5.0,
        cuisine: "Mexican",
        rating: 3.9,
        service: ["Takeaway", "Delivery"],
        lat: 51.53, lon: -0.73,
        img: "images/placeholder.svg"
    },
    {
        name: "Restaurant 7",
        price: 28,
        distance: 2.7,
        cuisine: "French",
        rating: 4.6,
        service: ["Eat in"],
        lat: 51.47, lon: -0.67,
        img: "images/placeholder.svg"
    },
    {
        name: "Restaurant 8",
        price: 14,
        distance: 3.8,
        cuisine: "Thai",
        rating: 4.3,
        service: ["Takeaway", "Eat in", "Delivery"],
        lat: 51.54, lon: -0.74,
        img: "images/placeholder.svg"
    },
    {
        name: "Restaurant 9",
        price: 8,
        distance: 1.2,
        cuisine: "American",
        rating: 3.8,
        service: ["Takeaway", "Delivery"],
        lat: 51.46, lon: -0.66,
        img: "images/placeholder.svg"
    },
    {
        name: "Restaurant 10",
        price: 22,
        distance: 4.5,
        cuisine: "Mediterranean",
        rating: 4.4,
        service: ["Eat in", "Takeaway"],
        lat: 51.55, lon: -0.75,
        img: "images/placeholder.svg"
    },
    {
        name: "Restaurant 11",
        price: 16,
        distance: 2.9,
        cuisine: "Vegan",
        rating: 4.1,
        service: ["Eat in", "Takeaway", "Delivery"],
        lat: 51.45, lon: -0.65,
        img: "images/placeholder.svg"
    },
    {
        name: "Restaurant 12",
        price: 30,
        distance: 3.5,
        cuisine: "Korean",
        rating: 4.9,
        service: ["Eat in"],
        lat: 51.56, lon: -0.76,
        img: "images/placeholder.svg"
    }
];

if (!localStorage.getItem('restaurantReviews')) {
    localStorage.setItem('restaurantReviews', JSON.stringify({}));
}

let currentRestaurant = null;

function filterRestaurants(restaurants, filters) {
    return restaurants.filter(restaurant => {
        if (filters.search && !restaurant.name.toLowerCase().includes(filters.search.toLowerCase())) {
            return false;
        }

        if (filters.price) {
            const [min, max] = filters.price.split('-').map(Number);
            if (max) {
                if (restaurant.price < min || restaurant.price > max) return false;
            } else {
                if (restaurant.price < min) return false;
            }
        }

        if (filters.distance) {
            const [min, max] = filters.distance.split('-').map(Number);
            if (max) {
                if (restaurant.distance > max) return false;
            } else {
                if (filters.distance === "10+") {
                    if (restaurant.distance < 10) return false;
                } else {
                    if (restaurant.distance > min) return false;
                }
            }
        }

        if (filters.cuisine && restaurant.cuisine !== filters.cuisine) {
            return false;
        }

        if (filters.rating) {
            const minRating = parseFloat(filters.rating);
            if (restaurant.rating < minRating) return false;
        }

        if (filters.service && !restaurant.service.includes(filters.service)) {
            return false;
        }

        return true;
    });
}

function sortRestaurants(restaurants, prioritised) {
    if (prioritised.length === 0) return restaurants;

    return restaurants.sort((a, b) => {
        for (const filter of prioritised) {
            let diff = 0;
            switch (filter) {
                case 'priceFilter':
                    diff = a.price - b.price;
                    break;
                case 'distanceFilter':
                    diff = a.distance - b.distance;
                    break;
                case 'ratingFilter':
                    diff = b.rating - a.rating;
                    break;
            }
            if (diff !== 0) return diff;
        }
        return 0;
    });
}

function displayResults() {
    const filteredRestaurants = filterRestaurants(restaurants, filters);
    const sortedRestaurants = sortRestaurants(filteredRestaurants, prioritised);
    
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    if (sortedRestaurants.length === 0) {
        resultsContainer.innerHTML = '<div class="alert alert-warning mt-4">No restaurants found matching your criteria.</div>';
        return;
    }

    sortedRestaurants.forEach(restaurant => {
        const reviews = JSON.parse(localStorage.getItem('restaurantReviews'))[restaurant.name] || [];
        const averageRating = reviews.length > 0 
            ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
            : restaurant.rating;

        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4 mb-4 fade-in';
        card.innerHTML = `
            <div class="card restaurant-card h-100">
                <img src="${restaurant.img}" class="card-img-top" alt="${restaurant.name} - ${restaurant.cuisine} restaurant with ${restaurant.service.join(', ')} services">
                <div class="card-body">
                    <h5 class="card-title">${restaurant.name}</h5>
                    <p class="card-text">
                        <strong>Price:</strong> £${restaurant.price}<br>
                        <strong>Distance:</strong> ${restaurant.distance}km<br>
                        <strong>Cuisine:</strong> ${restaurant.cuisine}<br>
                        <div class="rating">
                            <strong>Rating:</strong> 
                            <span class="stars">${'★'.repeat(Math.round(averageRating))}${'☆'.repeat(5-Math.round(averageRating))}</span>
                            <span class="review-count">(${reviews.length} reviews)</span>
                        </div>
                        <strong>Service:</strong> ${restaurant.service.join(', ')}
                    </p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-outline-primary review-btn" data-restaurant="${restaurant.name}">Review</button>
                        <button class="btn btn-primary" onclick="alert('Book restaurant (not implemented)')">Book</button>
                    </div>
                </div>
            </div>
        `;
        resultsContainer.appendChild(card);
    });

    document.querySelectorAll('.review-btn').forEach(btn => {
        btn.onclick = function() {
            const restaurantName = this.getAttribute('data-restaurant');
            showReviewModal(restaurantName);
        };
    });
}

function showReviewModal(restaurantName) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please log in to write a review');
        window.location.href = 'login.html';
        return;
    }

    currentRestaurant = restaurantName;
    const modal = new bootstrap.Modal(document.getElementById('reviewModal'));
    document.getElementById('reviewModalLabel').textContent = `Write a Review for ${restaurantName}`;
    modal.show();
}

document.getElementById('submitReview').onclick = function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please log in to write a review');
        return;
    }

    const rating = document.getElementById('reviewRating').value;
    const text = document.getElementById('reviewText').value;

    if (!rating || !text) {
        alert('Please fill in all fields');
        return;
    }

    const reviews = JSON.parse(localStorage.getItem('restaurantReviews'));
    if (!reviews[currentRestaurant]) {
        reviews[currentRestaurant] = [];
    }

    reviews[currentRestaurant].push({
        user: currentUser.username,
        rating: parseInt(rating),
        text: text,
        date: new Date().toISOString()
    });

    localStorage.setItem('restaurantReviews', JSON.stringify(reviews));

    const modal = bootstrap.Modal.getInstance(document.getElementById('reviewModal'));
    modal.hide();
    document.getElementById('reviewForm').reset();
    displayResults();
};

document.addEventListener('DOMContentLoaded', () => {
    displayResults();
    
    document.getElementById('backButton').onclick = () => {
        window.location.href = 'restaurants.html';
    };
    
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.onclick = function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        };
    }
}); 