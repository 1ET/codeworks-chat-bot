$("#message").keypress((e) => {
  if (e.which === 13 && $("#message").val() !== '') {
    // prevent script injections by encoding < and >
    const newMessageText = $("#message").val().replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = new Date().toLocaleDateString();
    
    console.log(time, date)
    $("#message").val("");

    createMessage("right", newMessageText, time, date);
  }
});

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


