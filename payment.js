document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    const booking = JSON.parse(localStorage.getItem('bookingInfo'));
    const container = document.getElementById('paymentContent');
    if (!booking) {
        container.innerHTML = '<p>No booking information found.</p>';
        return;
    }

    let ticketSummary = '';
    booking.prices.forEach(([label, price], idx) => {
        const qty = booking.tickets[idx];
        if (qty > 0) {
            ticketSummary += `<tr><td>${label}</td><td>${price}</td><td>${qty}</td></tr>`;
        }
    });

    container.innerHTML = `
        <h2 class="mb-4">Payment for ${booking.activity}</h2>
        <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title">Booking Summary</h5>
                <p><strong>Name:</strong> ${booking.name}</p>
                <table class="table table-bordered w-auto mb-3">
                    <thead><tr><th>Type</th><th>Price</th><th>Quantity</th></tr></thead>
                    <tbody>${ticketSummary}</tbody>
                </table>
                <p><strong>Total:</strong> ${booking.total}</p>
            </div>
        </div>
        <form id="paymentForm">
            <div class="mb-3">
                <label for="cardNumber" class="form-label">Card Number</label>
                <input type="text" class="form-control" id="cardNumber" maxlength="19" placeholder="1234 5678 9012 3456" required>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="expiry" class="form-label">Expiry Date</label>
                    <input type="text" class="form-control" id="expiry" maxlength="5" placeholder="MM/YY" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="cvv" class="form-label">CVV</label>
                    <input type="text" class="form-control" id="cvv" maxlength="4" placeholder="123" required>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Pay</button>
        </form>
        <div id="paymentSuccess" class="alert alert-success mt-4 d-none" role="alert">
            Payment successful! Thank you for your booking.
        </div>
    `;

    document.getElementById('paymentForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const cardNumber = document.getElementById('cardNumber').value.replace(/\s+/g, '');
        const expiry = document.getElementById('expiry').value;
        const cvv = document.getElementById('cvv').value;
        if (cardNumber.length < 13 || cardNumber.length > 19 || !/^\d+$/.test(cardNumber)) {
            alert('Please enter a valid card number.');
            return;
        }
        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
            alert('Please enter a valid expiry date (MM/YY).');
            return;
        }
        if (cvv.length < 3 || cvv.length > 4 || !/^\d+$/.test(cvv)) {
            alert('Please enter a valid CVV.');
            return;
        }

        
        const userBookings = JSON.parse(localStorage.getItem('userBookings')) || {};
        if (!userBookings[currentUser.username]) {
            userBookings[currentUser.username] = [];
        }

        
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        userBookings[currentUser.username].push({
            activity: booking.activity,
            date: formattedDate,
            time: new Date().toLocaleTimeString(),
            people: booking.tickets.reduce((a, b) => a + b, 0)
        });
        localStorage.setItem('userBookings', JSON.stringify(userBookings));

        
        localStorage.removeItem('bookingInfo');
        window.location.href = 'index.html?bookingConfirmed=true';
    });
}); 