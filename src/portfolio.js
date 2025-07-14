var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (var tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (var tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

function openMenu() {
    document.getElementById("side-menu").style.right = "0";
}

function closeMenu() {
    document.getElementById("side-menu").style.right = "-200px";
}
const scriptURL =
  "https://script.google.com/macros/s/AKfycbw0rqIFiQyHs4njwYl48Y5b6JJb8R9pcN3QCNdgam8-kJnAIouHAzjzoERrYNgU0A1H/exec";
const form = document.forms["submit-to-google-sheet"];

// Add success/error message elements
const message = document.createElement("div");
message.style.marginTop = "10px";
form.appendChild(message);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form),
    mode: "no-cors", 
  })
    .then(() => {
      message.textContent = "Message sent successfully!";
      message.style.color = "green";
      form.reset();
    })
    .catch((error) => {
      message.textContent = "Error sending message. Please try again.";
      message.style.color = "red";
      console.error("Error!", error);
    })
    .finally(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;

      setTimeout(() => {
        message.textContent = "";
      }, 5000);
    });
});