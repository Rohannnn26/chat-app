// Establish WebSocket connection
let url = `ws://${window.location.host}/ws/socket-server/`;
const chatSocket = new WebSocket(url);

// Handle WebSocket connection opening
chatSocket.onopen = function () {
    console.log("WebSocket connection established!");
};

// Handle incoming messages from the WebSocket server
chatSocket.onmessage = function (e) {
    let data = JSON.parse(e.data);
    console.log("Data received:", data);

    if (data.type === "chat") {
        let messages = document.getElementById("messages");
        messages.insertAdjacentHTML(
            "beforeend",
            `<div class="message p-3 rounded-lg max-w-xs ${
                data.isUser ? "bg-blue-500 text-white self-end" : "bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-200"
            }">
                <p>${data.message}</p>
            </div>`
        );

        // Scroll to bottom
        messages.scrollTop = messages.scrollHeight;
    }
};

// Handle form submission to send messages
let form = document.getElementById("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let message = e.target.message.value;

    // Send message via WebSocket
    chatSocket.send(JSON.stringify({ message: message, isUser: true }));

    // Clear input field
    form.reset();
});

// Dark Mode Toggle with LocalStorage
const darkModeToggle = document.getElementById("dark-mode-toggle");
const darkModeIcon = document.getElementById("dark-mode-icon");
const body = document.body;

// Check local storage for mode preference
if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark");
    darkModeIcon.textContent = "☀️";
}

darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        localStorage.setItem("darkMode", "enabled");
        darkModeIcon.textContent = "☀️";
    } else {
        localStorage.setItem("darkMode", "disabled");
        darkModeIcon.textContent = "🌙";
    }
});
