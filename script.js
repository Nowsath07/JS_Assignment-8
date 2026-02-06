const chatBody = document.getElementById("chatBody");

function appendMessage(message, className) {
    const div = document.createElement("div");
    div.className = className;
    div.innerText = message;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById("userInput");
    const userText = input.value.trim();

    if (userText === "") return;

    appendMessage(userText, "user-msg");
    input.value = "";

    setTimeout(() => {
        const reply = getBotResponse(userText);
        appendMessage(reply, "bot-msg");
    }, 500);
}

function getBotResponse(message) {
    message = message.toLowerCase();

    if (message.includes("water") || message.includes("hydration")) {
        return "You should drink about 2–3 liters of water daily. Increase intake if you exercise or live in a hot climate.";
    }
    else if (message.includes("exercise") || message.includes("workout")) {
        return "Aim for at least 30 minutes of moderate exercise like walking or cycling every day.";
    }
    else if (message.includes("sleep")) {
        return "Adults should get 7–9 hours of quality sleep every night for good health.";
    }
    else if (message.includes("diet") || message.includes("nutrition") || message.includes("food")) {
        return "A balanced diet includes fruits, vegetables, proteins, whole grains, and plenty of water.";
    }
    else {
        return "I can help with hydration, exercise, sleep, and nutrition. Please ask something related 😊";
    }
}
