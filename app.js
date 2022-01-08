const messageInput = document.getElementById("message");

console.log(messageInput);

$(messageInput).keypress((e) => {
  if (e.which === 13) alert("Enter");
});
