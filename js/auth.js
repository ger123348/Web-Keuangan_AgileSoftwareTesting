document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('myDuitLoggedIn');
    
    // DASHBOARD PROTECTION
    if (window.location.pathname.includes('dashboard.html') && !isLoggedIn) {
        window.location.href = 'index.html';
        return;
    }
    
    // AUTO LOGIN REDIRECT
    if (window.location.pathname.includes('index.html') && isLoggedIn) {
        window.location.href = 'dashboard.html';
    }
    
    // LOGIN FORM
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === 'admin' && password === '123') {
                localStorage.setItem('myDuitLoggedIn', 'true');
                window.location.href = 'dashboard.html';
            } else {
                alert('Username/Password salah!');
            }
        });
    }
});

function logout() {
    localStorage.removeItem('myDuitLoggedIn');
    window.location.href = 'index.html';
}