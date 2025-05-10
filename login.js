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
    
    alert('Registration successful! Please login.');
    document.getElementById('registerFormContainer').classList.add('hidden');
    document.getElementById('loginFormContainer').classList.remove('hidden');
    
    this.reset();
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
    window.location.href = 'index.html';
}); 