// js/auth.js

const users = [
  { username: "admin", password: "admin123" },
  { username: "tech", password: "tech456" },
  { username: "guest", password: "guest789" }
];

// Handles login from index.html
function loginUser(username, password) {
  const match = users.find(u => u.username === username && u.password === password);
  if (match) {
    localStorage.setItem("loggedInUser", username);
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials");
  }
}

// Clears session and redirects to login
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html"; // or "index.html" if login is now your entry point
}

// Protects dashboard from unauthenticated access
function checkAuth() {
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    window.location.href = "login.html"; // or "index.html"
  }
}