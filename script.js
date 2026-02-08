async function send() {
  const msg = input.value;

  const res = await fetch("https://YOUR-VERCEL-APP.vercel.app/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: msg }]
    })
  });

  const data = await res.json();

  chat.innerHTML += `
    <p><b>You:</b> ${msg}</p>
    <p><b>Bot:</b> ${data.choices[0].message.content}</p>
  `;
}
