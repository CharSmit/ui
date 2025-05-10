document.addEventListener('DOMContentLoaded', function() {
    
    function showAuth() {
        document.getElementById('authContainer').style.display = '';
        document.getElementById('bookingContent').style.display = 'none';
    }
    function showBooking() {
        document.getElementById('authContainer').style.display = 'none';
        document.getElementById('bookingContent').style.display = '';
    }

    
    document.getElementById('showRegister').addEventListener('click', function() {
        document.getElementById('loginFormContainer').classList.add('hidden');
        document.getElementById('registerFormContainer').classList.remove('hidden');
    });
    document.getElementById('showLogin').addEventListener('click', function() {
        document.getElementById('registerFormContainer').classList.add('hidden');
        document.getElementById('loginFormContainer').classList.remove('hidden');
    });

    
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value.trim();
        const password = document.getElementById('registerPassword').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();
        document.getElementById('registerUsernameError').style.display = 'none';
        document.getElementById('registerPasswordError').style.display = 'none';
        document.getElementById('confirmPasswordError').style.display = 'none';
        if (username.length < 3) {
            const usernameError = document.getElementById('registerUsernameError');
            usernameError.textContent = 'Username must be at least 3 characters long';
            usernameError.style.display = 'block';
            return;
        }
        if (password.length < 6) {
            const passwordError = document.getElementById('registerPasswordError');
            passwordError.textContent = 'Password must be at least 6 characters long';
            passwordError.style.display = 'block';
            return;
        }
        if (password !== confirmPassword) {
            const confirmPasswordError = document.getElementById('confirmPasswordError');
            confirmPasswordError.textContent = 'Passwords do not match';
            confirmPasswordError.style.display = 'block';
            return;
        }
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(user => user.username === username)) {
            const usernameError = document.getElementById('registerUsernameError');
            usernameError.textContent = 'Username already exists';
            usernameError.style.display = 'block';
            return;
        }
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! You are now logged in.');
        localStorage.setItem('currentUser', JSON.stringify({ username }));
        this.reset();
        showBooking();
        renderBookingForm();
    });

    
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        document.getElementById('loginUsernameError').style.display = 'none';
        document.getElementById('loginPasswordError').style.display = 'none';
        if (username.length < 3) {
            const usernameError = document.getElementById('loginUsernameError');
            usernameError.textContent = 'Username must be at least 3 characters long';
            usernameError.style.display = 'block';
            return;
        }
        if (password.length < 6) {
            const passwordError = document.getElementById('loginPasswordError');
            passwordError.textContent = 'Password must be at least 6 characters long';
            passwordError.style.display = 'block';
            return;
        }
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(user => user.username === username && user.password === password);
        if (!user) {
            const usernameError = document.getElementById('loginUsernameError');
            usernameError.textContent = 'Invalid username or password';
            usernameError.style.display = 'block';
            return;
        }
        localStorage.setItem('currentUser', JSON.stringify({ username }));
        showBooking();
        renderBookingForm();
    });

    
    function renderBookingForm() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const activity = JSON.parse(localStorage.getItem('selectedActivity'));
        const container = document.getElementById('bookingContent');
        if (!activity) {
            container.innerHTML = '<p>No activity selected.</p>';
            return;
        }
        
        let ticketRows = '';
        activity.prices.forEach(([label, price], idx) => {
            ticketRows += `
                <tr>
                    <td>${label}</td>
                    <td>${price}</td>
                    <td>
                        <select class="form-select ticket-qty" data-idx="${idx}">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </td>
                </tr>
            `;
        });
        container.innerHTML = `
            <h2 class="mb-4">Booking for ${activity.name}</h2>
            <img src="${activity.img}" class="img-fluid mb-3" alt="${activity.name}">
            <p>${activity.desc}</p>
            <form id="bookingForm">
                <div class="mb-3">
                    <label class="form-label">User</label>
                    <input type="text" class="form-control" id="username" value="${currentUser.username}" readonly>
                </div>
                <h5>Tickets</h5>
                <table class="table table-bordered w-auto mb-3">
                    <thead><tr><th>Type</th><th>Price</th><th>Quantity</th></tr></thead>
                    <tbody>${ticketRows}</tbody>
                </table>
                <div class="mb-3">
                    <label class="form-label">Total Price</label>
                    <input type="text" class="form-control" id="totalPrice" readonly value="£0">
                </div>
                <button type="submit" class="btn btn-primary">Payment</button>
            </form>
        `;
        function updateTotal() {
            let total = 0;
            document.querySelectorAll('.ticket-qty').forEach((sel, idx) => {
                const qty = Number(sel.value);
                const priceStr = activity.prices[idx][1].replace(/[^\d.]/g, '');
                const price = Number(priceStr);
                total += qty * price;
            });
            document.getElementById('totalPrice').value = `£${total}`;
        }
        document.querySelectorAll('.ticket-qty').forEach(sel => {
            sel.addEventListener('change', updateTotal);
        });
        document.getElementById('bookingForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const booking = {
                activity: activity.name,
                name: currentUser.username,
                tickets: Array.from(document.querySelectorAll('.ticket-qty')).map(sel => Number(sel.value)),
                prices: activity.prices,
                total: document.getElementById('totalPrice').value
            };
            localStorage.setItem('bookingInfo', JSON.stringify(booking));
            window.location.href = 'payment.html';
        });
    }

    
    if (localStorage.getItem('currentUser')) {
        showBooking();
        renderBookingForm();
    } else {
        showAuth();
    }
}); 