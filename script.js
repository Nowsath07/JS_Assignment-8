const chatBody = document.getElementById("chatBody");

const accessToken = "YOUR_DIALOGFLOW_CLIENT_ACCESS_TOKEN";
const projectId = "YOUR_PROJECT_ID";

function appendMessage(message, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.className = sender === "user" ? "user-msg" : "bot-msg";
    msgDiv.innerText = message;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function sendMessage() {
    const userInput = document.getElementById("userInput");
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage(text, "user");
    userInput.value = "";

    fetch(`https://api.dialogflow.com/v1/query?v=20150910`, {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: text,
            lang: "en",
            sessionId: "health-bot-session"
        })
    })
    .then(res => res.json())
    .then(data => {
        const reply = data.result.fulfillment.speech;
        appendMessage(reply, "bot");
    })
    .catch(() => {
        appendMessage("Sorry, I am having trouble responding right now 😕", "bot");
    });
}
