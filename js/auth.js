// js/auth.js

const users = [
  { username: "admin", password: "admin123" },
  { username: "tech", password: "tech456" },
  { username: "guest", password: "guest789" }
];

function loginUser(username, password) {
  const match = users.find(u => u.username === username && u.password === password);
  if (match) {
    localStorage.setItem("loggedInUser", username);
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials");
  }
}

function logoutUser() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

function checkAuth() {
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    window.location.href = "login.html";
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      loginUser(username, password);
    });
  }
});