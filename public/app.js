$("#message").keypress((e) => {
  if (e.which === 13 && $("#message").val() !== "") {
    // prevent script injections by encoding < and >
    const newMessageText = $("#message")
      .val()
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const date = new Date().toLocaleDateString();

    // reset input field
    $("#message").val("");
    // create html for a new message
    createMessage("right", newMessageText, time, date);
    // post message to server
    postData("/", { newMessageText });
  }
});

// create the html for a message
const createMessage = (side, text, time, date) => {
  $("#chat-content").append(`
      <div class="chat-message-wrapper ${side}">
        <div class="chat-message">
          <div class="chat-message-text">${text}</div>
          <div class="chat-message-time">${time}</div>
          <div class="chat-message-date">${date}</div>
        </div>
      </div>
    `);
};

// send user message to server
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const date = new Date().toLocaleDateString();
    createMessage("left", newData["response"], time, date);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};