document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("keydown", (e) => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
    (e.ctrlKey && e.key.toLowerCase() === "u")
  ) {
    e.preventDefault();
  }
});

let devtoolsOpen = false;
const checkDevTools = () => {
  const threshold = 160;
  if (
    window.outerWidth - window.innerWidth > threshold ||
    window.outerHeight - window.innerHeight > threshold
  ) {
    devtoolsOpen = true;
    window.location.replace("403.html");
  } else {
    devtoolsOpen = false;
  }
};

setInterval(checkDevTools, 1000);

// Redirect to login if not authenticated and not on index.html
if (!sessionStorage.getItem("authenticated") && !window.location.pathname.endsWith("index.html")) {
  window.location.replace("index.html");
}

// Show login modal on keyword detection
let keyword = "password";
let typedInput = "";

document.addEventListener("keydown", (e) => {
  typedInput += e.key;
  if (typedInput.includes(keyword)) {
    showLogin();
    typedInput = "";
  }
});

function showLogin() {
  let overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0, 0, 0, 0.6)";
  overlay.style.zIndex = "9999";

  let popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.width = "420px";
  popup.style.background = "#ffffff";
  popup.style.padding = "40px";
  popup.style.boxShadow = "0px 4px 20px rgba(0, 0, 0, 0.2)";
  popup.style.borderRadius = "10px";
  popup.style.fontFamily = "Segoe UI, Arial, sans-serif";
  popup.style.textAlign = "center";
  popup.style.position = "relative";

  let closeButton = document.createElement("span");
  closeButton.innerHTML = "&times;";
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "15px";
  closeButton.style.fontSize = "24px";
  closeButton.style.cursor = "pointer";
  closeButton.onclick = () => document.body.removeChild(overlay);

  let logo = document.createElement("img");
  logo.src = "pdfviewer.png";
  logo.alt = "PDF Viewer";
  logo.style.width = "200px";
  logo.style.marginBottom = "20px";

  let title = document.createElement("h2");
  title.innerText = "Sign in";
  title.style.color = "#1b1b1b";
  title.style.fontSize = "24px";
  title.style.fontWeight = "600";

  let subtitle = document.createElement("p");
  subtitle.innerText = "to continue to PDF Viewer";
  subtitle.style.color = "#666";
  subtitle.style.fontSize = "16px";
  subtitle.style.marginBottom = "20px";

  let usernameInput = document.createElement("input");
  usernameInput.type = "text";
  usernameInput.placeholder = "Email, phone, or Skype";
  usernameInput.style.width = "93.7%";
  usernameInput.style.padding = "12px";
  usernameInput.style.marginBottom = "5px";
  usernameInput.style.border = "1px solid #ccc";
  usernameInput.style.borderRadius = "5px";

  let passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.placeholder = "Password";
  passwordInput.style.width = "93.7%";
  passwordInput.style.padding = "12px";
  passwordInput.style.marginBottom = "10px";
  passwordInput.style.border = "1px solid #ccc";
  passwordInput.style.borderRadius = "5px";

  let usernameError = document.createElement("p");
  usernameError.style.color = "red";
  usernameError.style.fontSize = "14px";
  usernameError.style.marginTop = "0px";
  usernameError.style.marginBottom = "10px";
  usernameError.style.display = "none";
  usernameError.innerText = "Invalid username or password";

  let loginButton = document.createElement("button");
  loginButton.innerText = "Next";
  loginButton.style.background = "#0078D4";
  loginButton.style.color = "white";
  loginButton.style.padding = "14px 20px";
  loginButton.style.border = "none";
  loginButton.style.borderRadius = "5px";
  loginButton.style.cursor = "pointer";
  loginButton.style.fontSize = "16px";
  loginButton.style.width = "100%";
  loginButton.style.fontWeight = "600";
  loginButton.onclick = () => {
    if (usernameInput.value === "Jan Olsen" && passwordInput.value === "dingleweedsucks") {
      sessionStorage.setItem("authenticated", "true");
      window.location.replace("home.html");
    } else {
      usernameError.style.display = "block";
    }
  };

  popup.appendChild(closeButton);
  popup.appendChild(logo);
  popup.appendChild(title);
  popup.appendChild(subtitle);
  popup.appendChild(usernameInput);
  popup.appendChild(passwordInput);
  popup.appendChild(usernameError);
  popup.appendChild(loginButton);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
}
