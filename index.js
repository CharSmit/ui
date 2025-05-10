document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Display user information
    const userGreeting = document.getElementById('userGreeting');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const authLink = document.getElementById('authLink');
    
    userGreeting.classList.remove('hidden');
    usernameDisplay.textContent = currentUser.username;
    authLink.textContent = 'Logout';
    authLink.href = '#';
    authLink.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('bookingConfirmed')) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show';
        alertDiv.innerHTML = `
            <strong>Success!</strong> Your booking has been confirmed.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.querySelector('.container').insertBefore(alertDiv, document.querySelector('.container').firstChild);
    }

    // Display user bookings
    const userBookings = JSON.parse(localStorage.getItem('userBookings')) || {};
    const bookings = userBookings[currentUser.username] || [];
    const bookingsList = document.getElementById('userBookings');
    
    if (bookings.length > 0) {
        bookingsList.innerHTML = `
            <h4 class="mb-3">Your Bookings</h4>
            ${bookings.map(booking => `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${booking.activity}</h5>
                        <p class="card-text">
                            <strong>Date:</strong> ${booking.date}<br>
                            <strong>Time:</strong> ${booking.time}<br>
                            <strong>Number of People:</strong> ${booking.people}
                        </p>
                    </div>
                </div>
            `).join('')}
        `;
    } else {
        bookingsList.innerHTML = `
            <h4 class="mb-3">Your Bookings</h4>
            <p class="text-muted">You have no bookings yet.</p>
        `;
    }

    // Display recent reviews
    const allReviews = [];
    const restaurantReviews = JSON.parse(localStorage.getItem('restaurantReviews')) || {};
    
    for (const restaurant in restaurantReviews) {
        restaurantReviews[restaurant].forEach(review => {
            allReviews.push({
                ...review,
                restaurant: restaurant
            });
        });
    }

    const recentReviews = allReviews
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);

    const reviewsContainer = document.getElementById('recentReviews');
    if (recentReviews.length > 0) {
        reviewsContainer.innerHTML = recentReviews.map(review => `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${review.restaurant}</h5>
                        <div class="rating mb-2">
                            ${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}
                        </div>
                        <p class="card-text">${review.text}</p>
                        <p class="card-text"><small class="text-muted">By ${review.user} on ${new Date(review.date).toLocaleDateString()}</small></p>
                    </div>
                </div>
            </div>
        `).join('');
    } else {
        reviewsContainer.innerHTML = '<div class="col-12"><p class="text-center">No reviews yet.</p></div>';
    }
}); 