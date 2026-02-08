const BACKEND_URL = "https://ai-chat-backend-e2vg7kgog-engageits-projects.vercel.app/api/chat"; // <-- update if different

const chatLog = document.getElementById("chat-log");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.className = `chat-message chat-${sender}`;
  div.textContent = text;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

async function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  appendMessage("user", message);
  chatInput.value = "";
  appendMessage("bot", "Thinking...");

  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    // Remove the "Thinking..." placeholder
    const last = chatLog.lastChild;
    if (last && last.textContent === "Thinking...") {
      chatLog.removeChild(last);
    }

    if (data.reply) {
      appendMessage("bot", data.reply);
    } else {
      appendMessage("bot", "Sorry, I couldn't understand the response.");
    }
  } catch (err) {
    console.error(err);
    appendMessage("bot", "Error talking to the server.");
  }
}

chatSend.addEventListener("click", sendMessage);
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
