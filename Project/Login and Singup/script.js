// Login aur Signup form toggle
function showLogin() {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}

function showSignup() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
}

// Signup Form Submit
document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let username = document.getElementById("signupUsername").value;
  let password = document.getElementById("signupPassword").value;

  localStorage.setItem("username", username);
  localStorage.setItem("password", password);

  alert("Signup successful!");
  showLogin();
});

// Login Form Submit
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let username = document.getElementById("loginUsername").value;
  let password = document.getElementById("loginPassword").value;

  let storedUsername = localStorage.getItem("username");
  let storedPassword = localStorage.getItem("password");

  if (username === storedUsername && password === storedPassword) {
    alert("Login successful!");
    window.location.href="welcom.html"
  } else {
    alert("Incorrect username or password!");
  }
});